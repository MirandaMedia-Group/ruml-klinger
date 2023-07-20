// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// ssr: true,
	routeRules: {
		'/': { isr: 3600 },
		'/o-nas': { isr: 3600 },
		'/kontakty': { isr: 3600 },
		'/reference': { isr: 3600 },
		'/sluzby': { isr: 3600 },
		'/sluzby/**': { isr: 3600 },
		'/partneri': { isr: 3600 },
		'/partneri/**': { isr: 3600 },
		'/kariera': { isr: 3600 },
		'/kariera/**': { isr: 3600 },
		'/katalog-produktu': { isr: 3600 },
		'/katalog-produktu/**': { isr: 3600 },
		'/cs': { redirect: '/' },
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
                        @import "@/assets/_variables.scss";
                        @import "@/assets/_mixins.scss";    
                    `,
				},
			},
		},
	},
	css: ['@/assets/normalize.css', '@/assets/global.css'],
	modules: [
		'@nuxt/image-edge',
		'@nuxtjs/apollo',
		'@zadigetvoltaire/nuxt-gtm',
		'@dargmuesli/nuxt-cookie-control',
		'nuxt-simple-sitemap',
		'@nuxtjs/i18n',
	],
	image: {
		provider: 'netlify',
		domains: [],
		ipx: {},
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint: 'https://ruml-api.mirandamedia.cz/graphql',
			},
		},
		defaultOptions: {
			query: {
				fetchPolicy: 'no-cache',
			},
		},
	},
	runtimeConfig: {
		public: {
			googleMapsAPI: process.env.GOOGLE_MAPS_API,
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.ruml-klinger.cz',
		},
	},
	gtm: {
		id: 'GTM-PVPZKVF',
		defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
		compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
		// nonce: '2726c7f26c', // Will add `nonce` to the script tag
		enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
		debug: true, // Whether or not display console logs debugs (optional)
		loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
		enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
		trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
	},
	cookieControl: {
		barPosition: 'bottom-full',
		closeModalOnClickOutside: true,
		colors: {
			barBackground: '#fff',
			barButtonBackground: '#232f5d',
			barButtonColor: '#fff',
			barButtonHoverBackground: '#213eab',
			barTextColor: '#232f5d',
			checkboxActiveBackground: '#232f5d',
			checkboxActiveCircleBackground: '#fff',
			checkboxDisabledBackground: '#ddd',
			checkboxDisabledCircleBackground: '#fff',
			checkboxInactiveBackground: '#000',
			checkboxInactiveCircleBackground: '#fff',
			controlButtonBackground: '#232f5d',
			controlButtonHoverBackground: '#213eab',
			controlButtonIconColor: '#fff',
			controlButtonIconHoverColor: '#fff',
			focusRingColor: '#808080',
			modalBackground: '#fff',
			modalButtonBackground: '#232f5d',
			modalButtonColor: '#fff',
			modalButtonHoverBackground: '#213eab',
			modalButtonHoverColor: '#fff',
			modalOverlay: '#000',
			modalOverlayOpacity: 0.8,
			modalTextColor: '#000',
			modalUnsavedColor: '#fff',
		},
		cookies: {
			necessary: [
				{
					description: {
						cs: 'Tento web používá cookies, které jsou nezbytné pro jeho správné fungování.',
						en: 'This website uses cookies that are necessary for its proper functioning.',
					},
					id: 'necessary',
					name: {
						cs: 'Nezbytné',
						en: 'Necessary',
					},
				},
			],
			optional: [
				{
					description: {
						cs: 'Používáme Google Analytics k měření návštěvnosti webu.',
						en: 'We use Google Analytics to measure website traffic.',
					},
					id: 'google-analytics',
					name: {
						cs: 'Google Analytics',
						en: 'Google Analytics',
					},
					src: 'https://www.googletagmanager.com/gtag/js?id=GTM-PVPZKVF',
					targetCookieIds: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
				},
			],
		},
		cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 30,
		cookieNameIsConsentGiven: 'ncc_c',
		cookieNameCookiesEnabledIds: 'ncc_e',
		locales: ['cs', 'en'],
	},
	i18n: {
		locales: [
			{
				code: 'cs',
				iso: 'cs-CZ',
				name: 'CZ',
			},
			{
				code: 'en',
				iso: 'en-US',
				name: 'EN',
			},
		],
		baseUrl: 'https://www.ruml-klinger.cz',
		defaultLocale: 'cs',
		vueI18n: './i18n.config.ts',
	},
})
