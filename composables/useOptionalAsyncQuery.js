import { loadContentQuery } from '~/utils/load-content-query'
import { createContentQueryRequest } from '~/utils/content-query-request'

export const useOptionalAsyncQuery = ({ key, label, query, variables, validate, fallback, timeoutMs = 2_000 }) => {
	const request = createContentQueryRequest(useRuntimeConfig().public.graphqlEndpoint)
	const route = useRoute()
	// Fallback musí vzniknout uvnitř handleru, aby ho klient převzal ze SSR payloadu.
	return useAsyncData(key, () => loadContentQuery({
		request,
		query,
		variables: unref(variables),
		validate,
		fallback,
		timeoutMs,
		onFailure: (error, attempt) => console.warn('[content-query:attempt-failed]', JSON.stringify({
			label, route: route.path, attempt: attempt + 1, error: { name: error.name, message: error.message },
		})),
		onExhausted: (error) => console.warn('[content-query:optional-fallback]', JSON.stringify({
			label, route: route.path, error: { name: error.name, message: error.message },
		})),
	}))
}
