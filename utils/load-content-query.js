import { withRequiredDataRetry } from './with-required-data-retry.js'

export const loadContentQuery = async ({
	request, query, variables, validate, retries = 1, retryDelayMs = 200,
	timeoutMs = 8_000, onFailure, fallback, onExhausted,
}) => {
	try {
		return await withRequiredDataRetry({
			retries,
			delayMs: retryDelayMs,
			validate,
			onFailure,
			load: async () => {
				const controller = new AbortController()
				let timeout
				try {
					return await Promise.race([
						request({ query, variables, signal: controller.signal }),
						new Promise((_, reject) => {
							timeout = setTimeout(() => {
								const error = new Error(`GraphQL dotaz překročil limit ${timeoutMs} ms.`)
								error.name = 'ContentQueryTimeoutError'
								reject(error)
								controller.abort()
							}, timeoutMs)
						}),
					])
				} finally {
					clearTimeout(timeout)
				}
			},
		})
	} catch (error) {
		if (!fallback) throw error
		onExhausted?.(error)
		// Pravdivá hodnota se přenese v Nuxt payloadu i při výpadku API.
		return fallback()
	}
}
