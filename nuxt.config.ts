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
	modules: ['@nuxt/image-edge', '@nuxtjs/apollo', '@dargmuesli/nuxt-cookie-control', 'nuxt-simple-sitemap', '@nuxtjs/i18n', 'nuxt-gtag'],

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
	gtag: {
		id: 'GTM-PVPZKVF',
		initCommands: [
			[
				'consent',
				'default',
				{
					ad_storage: 'denied',
					ad_user_data: 'denied',
					ad_personalization: 'denied',
					analytics_storage: 'denied',
					wait_for_update: 500,
				},
			],
		],
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
