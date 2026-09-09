const GTM_SCRIPT_ID = 'klinger-google-tag-manager'
const ANALYTICS_COOKIE = /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/

const getDataLayer = () => {
	window.dataLayer = window.dataLayer || []
	return window.dataLayer
}

const updateConsent = (analyticsStorage: 'denied' | 'granted') => {
	const dataLayer = getDataLayer()
	dataLayer.push(['consent', 'update', { analytics_storage: analyticsStorage }])
}

const removeAnalyticsCookies = () => {
	const hostParts = window.location.hostname.split('.')
	const domains = ['', window.location.hostname, `.${window.location.hostname}`, `.${hostParts.slice(-2).join('.')}`]

	const segments = window.location.pathname.split('/').filter(Boolean)
	const paths = ['/', ...segments.flatMap((_, index) => { const path = '/' + segments.slice(0, index + 1).join('/'); return [path, path + '/'] })]
	for (const cookie of document.cookie.split(';')) {
		const name = cookie.split('=')[0]?.trim()
		if (!name || !ANALYTICS_COOKIE.test(name)) continue

		for (const domain of domains) {
			const domainPart = domain ? `; domain=${domain}` : ''
			for (const path of paths) document.cookie = `${name}=; Max-Age=0; path=${path}${domainPart}; SameSite=Lax`
		}
	}
}

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()
	const { cookiesEnabledIds, isConsentGiven } = useCookieControl()
	const gtmId = config.public.gtmId
	let analyticsEnabled = false

	getDataLayer().push([
		'consent',
		'default',
		{
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied',
			analytics_storage: 'denied',
			functionality_storage: 'granted',
			security_storage: 'granted',
		},
	])

	const loadGoogleTagManager = () => {
		if (!gtmId || document.getElementById(GTM_SCRIPT_ID)) return

		getDataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' })
		const script = document.createElement('script')
		script.id = GTM_SCRIPT_ID
		script.async = true
		script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
		document.head.appendChild(script)
	}

	watch(
		[isConsentGiven, cookiesEnabledIds],
		([isGiven, enabledIds]: [boolean | undefined, string[] | undefined]) => {
			// Staré ncc_e bez platného markeru volby nestačí k povolení analytiky.
			analyticsEnabled = isGiven === true && (enabledIds || []).includes('google-analytics')
			updateConsent(analyticsEnabled ? 'granted' : 'denied')

			if (analyticsEnabled) {
				loadGoogleTagManager()
			} else {
				removeAnalyticsCookies()
			}
		},
		{ immediate: true, deep: true }
	)

})

declare global {
	interface Window {
		dataLayer: unknown[]
	}
}
