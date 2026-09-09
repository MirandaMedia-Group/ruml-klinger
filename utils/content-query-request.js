// HTTP transport bez klientské GraphQL knihovny. SSR data přenáší useAsyncData.
export const createContentQueryRequest = (endpoint, fetcher = globalThis.fetch) => async ({ query, variables, signal }) => {
	const response = await fetcher(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		credentials: 'omit',
		body: JSON.stringify({ query, variables }),
		signal,
	})
	if (!response.ok) {
		const error = new Error(`GraphQL HTTP ${response.status}`)
		error.name = 'ContentQueryHttpError'
		error.statusCode = response.status
		throw error
	}
	const result = await response.json()
	// Částečná data s GraphQL chybou nejsou úspěch (dříve errorPolicy: none).
	if (result?.errors?.length) {
		const error = new Error(result.errors.map((item) => item.message).join('; '))
		error.name = 'ContentQueryGraphQLError'
		error.graphQLErrors = result.errors
		throw error
	}
	return result?.data
}
