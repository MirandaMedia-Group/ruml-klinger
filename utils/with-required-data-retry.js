const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs))

export class RequiredContentDataError extends Error {
	constructor() {
		super('GraphQL odpověď neobsahuje všechna povinná data.')
		this.name = 'RequiredContentDataError'
	}
}

export const withRequiredDataRetry = async ({ load, validate, retries = 1, delayMs = 200, onFailure }) => {
	let lastError

	for (let attempt = 0; attempt <= retries; attempt += 1) {
		try {
			const data = await load(attempt)
			if (!validate(data)) throw new RequiredContentDataError()
			return data
		} catch (error) {
			lastError = error
			await onFailure?.(error, attempt)
			if (attempt < retries) await wait(delayMs)
		}
	}

	throw lastError
}
