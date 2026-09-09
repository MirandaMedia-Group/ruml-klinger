import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium, request } from 'playwright'

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3105'
const origin = new URL(baseURL).origin
const signature = 'necessarygoogle-analytics'
const output = 'output/playwright/cookie-consent-cache'
const results = []
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const api = await request.newContext({ baseURL })
const stateCookies = (marker, enabled = 'necessary', expired = false) => [
	...(marker === undefined ? [] : [{ name: 'ncc_c', value: marker }]),
	...(enabled === undefined ? [] : [{ name: 'ncc_e', value: enabled }]),
].map((cookie) => ({ ...cookie, domain: new URL(origin).hostname, path: '/', expires: Math.floor(Date.now() / 1000) + (expired ? -60 : 3600) }))

const scenarios = [
	{ name: 'new', saved: false, cookies: [] },
	{ name: 'accepted', saved: true, analytics: true, cookies: stateCookies(signature, 'necessary~google-analytics') },
	{ name: 'declined', saved: true, cookies: stateCookies(signature) },
	{ name: 'stale-definition', saved: false, cookies: stateCookies('old-definition', 'necessary~google-analytics') },
	{ name: 'ids-without-choice', saved: false, cookies: stateCookies(undefined, 'necessary~google-analytics') },
	{ name: 'revoked', saved: false, cookies: stateCookies('0') },
	{ name: 'malformed', saved: false, cookies: stateCookies('%XX') },
	{ name: 'expired', saved: false, cookies: stateCookies(signature, 'necessary~google-analytics', true) },
]

async function setupPage(context) {
	await context.route('**/*', route => {
  const request = route.request()
  if (request.resourceType() === 'image' || request.resourceType() === 'media' || /google-analytics|analytics.google|google.com/.test(new URL(request.url()).hostname)) return route.abort()
  return route.continue()
 })
 const page = await context.newPage()
	const errors = []
	const analyticsRequests = []
	page.on('pageerror', (error) => errors.push(error.message))
	page.on('console', (message) => {
		if (/hydration.*mismatch/i.test(message.text())) errors.push(message.text())
	})
	// Ověříme pokus o načtení, ale nevytváříme skutečná analytická měření.
	await context.route('https://www.googletagmanager.com/**', async (route) => {
		analyticsRequests.push(route.request().url())
		await route.fulfill({ contentType: 'application/javascript', body: '' })
	})
	await page.addInitScript(() => {
		if (window.top !== window) return
		window.__cookieProbe = { shown: false }
		const sample = () => {
			const bar = document.querySelector('.cookieControl__Bar')
			if (bar && bar.getBoundingClientRect().height > 0 && getComputedStyle(bar).visibility !== 'hidden') window.__cookieProbe.shown = true
			requestAnimationFrame(sample)
		}
		requestAnimationFrame(sample)
	})
	return { page, errors, analyticsRequests }
}

async function beforeHydration(page, navigate, saved, label) {
	let release
	const gate = new Promise((resolve) => { release = resolve })
	const hold = async (route) => { await gate; await route.continue() }
	await page.route('**/_nuxt/*.js', hold)
	try {
		await navigate()
		await page.locator('footer').waitFor({ state: 'attached' })
		assert.equal(await page.locator('.cookieControl').count(), 0, `${label}: cookie UI nesmí být v SSR`)
		await page.screenshot({ path: `${output}/${label}-before-hydration.png` })
	} finally {
		release()
	}
	await page.waitForFunction(() => {
		const nuxt = document.querySelector('#__nuxt')?.__vue_app__?.$nuxt
		return nuxt?.isHydrating === false && !nuxt.payload.error
	})
	await page.locator(saved ? '.cookieControl__ControlButton' : '.cookieControl__Bar').waitFor({ state: 'visible' })
	await page.waitForTimeout(100)
	assert.equal(await page.locator('.cookieControl__Bar').isVisible(), !saved, label)
	if (!saved) assert.equal(await page.locator('.cookieControl__Bar').evaluate((bar) => getComputedStyle(bar).backgroundColor), 'rgb(255, 255, 255)')
	if (saved) assert.equal(await page.evaluate(() => window.__cookieProbe.shown), false, `${label}: lišta problikla`)
	await page.unroute('**/_nuxt/*.js', hold)
}

try {
	for (const [path, mobile] of (process.env.COOKIE_SCENARIO === 'navigation' ? [] : [['/', false], ['/en', true]])) {
		const label = mobile ? 'en-mobile' : 'cs-desktop'
		const anonymousResponse = await api.get(path)
		const savedResponse = await api.get(path, { headers: { Cookie: `ncc_c=${signature}; ncc_e=necessary~google-analytics` } })
		assert.ok(anonymousResponse.ok() && savedResponse.ok())
		assert.equal(savedResponse.headers()['set-cookie'], undefined, 'SSR nesmí zapisovat osobní volbu')
		const [anonymousHTML, savedHTML] = await Promise.all([anonymousResponse.text(), savedResponse.text()])
		for (const html of [anonymousHTML, savedHTML]) {
			assert.ok(!/<aside\b[^>]*class="[^"]*cookieControl/.test(html), 'Osobní cookie UI uniklo do SSR')
			assert.ok(!html.includes('data-klinger-cookie-choice'), 'Vlastní head script už není potřeba')
		}
		for (const scenario of scenarios) {
			const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 } })
			try {
				await context.addCookies(scenario.cookies)
				const { page, errors, analyticsRequests } = await setupPage(context)
				// Totéž HTML získané s uloženou volbou přehráváme všem návštěvníkům.
				await page.route(new URL(path, origin).href, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: savedHTML }))
				await beforeHydration(page, () => page.goto(new URL(path, origin).href, { waitUntil: 'commit' }), scenario.saved, `${label}-${scenario.name}`)
				assert.equal(analyticsRequests.length, scenario.analytics ? 1 : 0, `${scenario.name}: analytika`)
				if (scenario.saved) {
					await page.locator('.cookieControl__ControlButton').click()
					const modal = page.locator('.cookieControl__ModalContent')
					await modal.waitFor({ state: 'visible' })
					assert.equal(await modal.locator('input[type=checkbox]').last().isChecked(), Boolean(scenario.analytics))
					await modal.locator('.cookieControl__ModalClose').click()
					await modal.waitFor({ state: 'hidden' })
				}
				assert.deepEqual(errors, [], scenario.name)
				results.push({ label, scenario: scenario.name, passed: true })
				console.log(`PASS ${label} ${scenario.name}: před/po hydrataci, sdílené HTML, analytika`)
			} finally { await context.close() }
		}
	}
 // Skutečná revokace již přijaté analytiky.
 if (process.env.COOKIE_SCENARIO !== 'navigation') {
  const context=await browser.newContext()
  try {
   await context.addCookies([...stateCookies(signature,'necessary~google-analytics'),{name:'_ga',value:'fixture',domain:new URL(origin).hostname,path:'/'}])
   const {page,analyticsRequests,errors}=await setupPage(context)
   await page.goto(origin)
   await page.locator('.cookieControl__ControlButton').click()
   const modal=page.locator('.cookieControl__ModalContent')
   await modal.locator('label[for="Google Analytics"]').click()
   assert.equal(await modal.locator('input[type=checkbox]').last().isChecked(),false)
   await modal.getByRole('button',{name:'Uložit',exact:true}).click()
   await page.waitForTimeout(100)
   assert.equal(analyticsRequests.length,1)
   assert.ok(!(await context.cookies()).some(cookie=>cookie.name==='_ga'))
   assert.equal(await page.evaluate(()=>window.dataLayer.filter(entry=>entry[0]==='consent'&&entry[1]==='update').at(-1)[2].analytics_storage),'denied')
   assert.deepEqual(errors,[]);results.push({scenario:'actual-revocation',passed:true});console.log('PASS actual revocation: denied, cookie removal, single GTM loader')
  } finally {await context.close()}
 }
	// Skutečné uložení oběma tlačítky a dokumentový přechod přes navigaci.
	for (const [choice, analytics] of [['Přijmout', true], ['Zamítnout', false]]) {
		const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
		try {
			const { page, errors } = await setupPage(context)
			await page.goto(origin, { waitUntil: 'domcontentloaded' })
			await page.locator('.cookieControl__Bar').getByRole('button', { name: choice, exact: true }).click()
			await page.locator('.cookieControl__Bar').waitFor({ state: 'hidden' })
			const cookies = (await context.cookies()).filter((cookie) => cookie.name.startsWith('ncc_'))
			assert.equal(cookies.find((cookie) => cookie.name === 'ncc_c')?.value, signature)
			assert.equal(cookies.find((cookie) => cookie.name === 'ncc_e')?.value.includes('google-analytics'), analytics)
			await beforeHydration(page, async () => {
				await Promise.all([
					page.waitForURL(`${origin}/o-nas`, { waitUntil: 'commit' }),
					page.locator('header a[href="/o-nas"]').first().click({ noWaitAfter: true }),
				])
			}, true, `navigation-${analytics ? 'accept' : 'decline'}`)
			assert.deepEqual((await context.cookies()).filter((cookie) => cookie.name.startsWith('ncc_')), cookies, 'Navigace nesmí přepsat volbu ani expiraci')
			assert.deepEqual(errors, [])
			results.push({ scenario: `navigation-${choice}`, passed: true })
			console.log(`PASS ${choice}: uložená volba a navigace bez probliknutí nebo mismatch`)
		} finally { await context.close() }
	}
} finally {
	await api.dispose()
	await browser.close()
	await writeFile(`${output}/results.json`, JSON.stringify({ baseURL, results }, null, 2))
}
