import assert from 'node:assert/strict'
import test from 'node:test'
import { createContentQueryRequest } from '../../utils/content-query-request.js'
import { loadContentQuery } from '../../utils/load-content-query.js'

test('GraphQL odešle text, proměnné a signál; nepřenáší cookies uživatele', async () => {
	const signal = new AbortController().signal
	const request = createContentQueryRequest('https://cms.invalid/graphql', async (url, options) => {
		assert.equal(url, 'https://cms.invalid/graphql')
		assert.equal(options.method, 'POST')
		assert.equal(options.credentials, 'omit')
		assert.equal(options.signal, signal)
		assert.deepEqual(JSON.parse(options.body), { query: 'query Page($id: ID!) { page(id: $id) { title } }', variables: { id: 'cs' } })
		return Response.json({ data: { page: { title: 'Česky' } } })
	})
	assert.deepEqual(await request({ query: 'query Page($id: ID!) { page(id: $id) { title } }', variables: { id: 'cs' }, signal }), { page: { title: 'Česky' } })
})

test('HTTP chyba není zaměněna za úspěch', async () => {
	const request = createContentQueryRequest('unused', async () => new Response('Bad gateway', { status: 502 }))
	await assert.rejects(request({ query: '{}' }), error => error.name === 'ContentQueryHttpError' && error.statusCode === 502)
})

test('GraphQL chyby odmítnou i částečná data při HTTP 200', async () => {
	const request = createContentQueryRequest('unused', async () => Response.json({ data: { page: null }, errors: [{ message: 'CMS failure', path: ['page'] }] }))
	await assert.rejects(request({ query: '{}' }), error => error.name === 'ContentQueryGraphQLError' && error.graphQLErrors[0].message === 'CMS failure')
})

test('neplatný JSON je chyba, prázdná data podléhají validaci a retry', async () => {
	await assert.rejects(createContentQueryRequest('unused', async () => new Response('<html>'))({ query: '{}' }), SyntaxError)
	let calls = 0
	const request = createContentQueryRequest('unused', async () => { calls++; return Response.json({ data: null }) })
	await assert.rejects(loadContentQuery({ request, query: '{}', retryDelayMs: 0, validate: data => Boolean(data?.page) }), { name: 'RequiredContentDataError' })
	assert.equal(calls, 2)
})

test('HTTP transport opakuje GraphQL chybu a obnoví obsah', async () => {
	let calls = 0
	const request = createContentQueryRequest('unused', async () => Response.json(++calls === 1 ? { errors: [{ message: 'Temporary failure' }] } : { data: { page: { title: 'OK' } } }))
	assert.deepEqual(await loadContentQuery({ request, query: '{}', retryDelayMs: 0, validate: data => Boolean(data?.page) }), { page: { title: 'OK' } })
	assert.equal(calls, 2)
})
