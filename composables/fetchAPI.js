export async function fetchAPI(id, path) {
	const apiURL = 'https://pet-center-stage.axfone.eu/api/v1'
	const apiToken = 'Basic bWlyYW5kYS1hcGk6WDJxeHp1WEZhSg=='
	const requestHeaders = {
		Authorization: `${apiToken}`,
		'Content-Type': 'application/json',
	}
	const requestUrl = `${apiURL}${path}`

	const { data, error } = await useAsyncData(id, () => $fetch(requestUrl, { headers: requestHeaders }))
	if (error.value) {
		console.error(error.value)
		throw new Error('Vyskytla se chyba, zkuste to prosim znovu: ' + requestUrl)
	}
	return data
}
