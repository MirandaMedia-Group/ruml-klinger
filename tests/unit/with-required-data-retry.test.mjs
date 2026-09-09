import assert from 'node:assert/strict'
import test from 'node:test'
import { RequiredContentDataError, withRequiredDataRetry } from '../../utils/with-required-data-retry.js'

test('po přechodné chybě zopakuje načtení a vrátí validní data', async () => {
	let attempts = 0
	const result = await withRequiredDataRetry({
		delayMs: 0,
		load: async () => {
			attempts += 1
			if (attempts === 1) throw new Error('Dočasná síťová chyba')
			return { homepage: { id: 1 } }
		},
		validate: (data) => Boolean(data?.homepage),
	})

	assert.deepEqual(result, { homepage: { id: 1 } })
	assert.equal(attempts, 2)
})

test('zopakuje i neúplnou odpověď a po vyčerpání pokusů vyhodí popisnou chybu', async () => {
	let attempts = 0
	await assert.rejects(
		withRequiredDataRetry({
			delayMs: 0,
			load: async () => {
				attempts += 1
				return { homepage: null }
			},
			validate: (data) => Boolean(data?.homepage),
		}),
		RequiredContentDataError,
	)
	assert.equal(attempts, 2)
})

test('validní odpověď neopakuje', async () => {
	let attempts = 0
	await withRequiredDataRetry({
		load: async () => {
			attempts += 1
			return { homepage: { id: 1 } }
		},
		validate: (data) => Boolean(data?.homepage),
	})
	assert.equal(attempts, 1)
})
