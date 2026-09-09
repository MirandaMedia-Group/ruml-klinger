import assert from 'node:assert/strict'
import test from 'node:test'
import { loadContentQuery } from '../../utils/load-content-query.js'

const options = {
	query: 'test-query', variables: { localeID: 'cs-message' }, retryDelayMs: 0,
	validate: (data) => Boolean(data && Object.hasOwn(data, 'siteMessage')),
	fallback: () => ({ siteMessage: null }),
}

test('volitelný dotaz po chybě zopakuje HTTP požadavek a vrátí obnovenou hlášku', async () => {
	const requests = []
	const data = { siteMessage: { siteMessageAcf: { text: 'Obnovená hláška' } } }
	const result = await loadContentQuery({
		...options,
		request: async (request) => {
			requests.push(request)
			if (requests.length === 1) throw new Error('Dočasný výpadek')
			return data
		},
	})
	assert.deepEqual(result, data)
	assert.equal(requests.length, 2)
	assert.notEqual(requests[0].signal, requests[1].signal)
	assert.deepEqual(requests[1].variables, options.variables)
})

test('neexistující hláška se nezkouší znovu a zůstává pravdivým payload objektem', async () => {
	let attempts = 0
	const result = await loadContentQuery({
		...options,
		request: async () => { attempts += 1; return { siteMessage: null } },
	})
	assert.equal(attempts, 1)
	assert.deepEqual(result, { siteMessage: null })
	assert.ok(result)
})

test('neúplná odpověď po retry skončí prázdnou hláškou a jedním fallback logem', async () => {
	const failures = []
	const exhausted = []
	const result = await loadContentQuery({
		...options,
		request: async () => null,
		onFailure: (error, attempt) => failures.push(attempt),
		onExhausted: (error) => exhausted.push(error.name),
	})
	assert.deepEqual(result, { siteMessage: null })
	assert.deepEqual(failures, [0, 1])
	assert.deepEqual(exhausted, ['RequiredContentDataError'])
})

test('zaseknutý klient skončí timeoutem i když ignoruje AbortSignal', async () => {
	const signals = []
	const failures = []
	const result = await loadContentQuery({
		...options, timeoutMs: 10,
		request: ({ signal }) => {
			signals.push(signal)
			return new Promise(() => {})
		},
		onFailure: (error) => failures.push(error.name),
	})
	assert.deepEqual(result, { siteMessage: null })
	assert.equal(signals.length, 2)
	assert.ok(signals.every((signal) => signal.aborted))
	assert.deepEqual(failures, ['ContentQueryTimeoutError', 'ContentQueryTimeoutError'])
})

test('povinný obsah bez fallbacku stále předá chybu volajícímu', async () => {
	const error = new Error('API není dostupné')
	await assert.rejects(loadContentQuery({
		...options, fallback: undefined,
		request: async () => { throw error },
	}), (received) => received === error)
})
