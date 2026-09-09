const apiBaseUrl = (process.env.NUXT_PUBLIC_API_BASE_URL || 'https://ruml-api.mirandamedia.cz').replace(/\/+$/, '')
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://www.ruml-klinger.cz').replace(/\/+$/, '')
const graphqlEndpoint = process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT || `${apiBaseUrl}/graphql`
const cmsImageOriginPattern = new URL(apiBaseUrl).origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	experimental: { payloadExtraction: true },
	nitro: { compatibilityDate: '2024-05-07', netlify: { images: { remote_images: [`^${cmsImageOriginPattern}/wp-content/uploads/.*$`] } } },
	routeRules: {
  "/": {
    "isr": 3000
  },
  "/o-nas": {
    "isr": 3000
  },
  "/kontakty": {
    "isr": 3000
  },
  "/reference": {
    "isr": 3000
  },
  "/sluzby": {
    "isr": 3000
  },
  "/sluzby/**": {
    "isr": 3000
  },
  "/partneri": {
    "isr": 3000
  },
  "/partneri/**": {
    "isr": 3000
  },
  "/kariera": {
    "isr": 3000
  },
  "/kariera/**": {
    "isr": 3000
  },
  "/katalog-produktu": {
    "isr": 3000
  },
  "/katalog-produktu/**": {
    "isr": 3000
  },
  "/pf": {
    "isr": 3000
  },
  "/kalendare": {
    "isr": 3000
  },
  "/en": {
    "isr": 3000
  },
  "/en/o-nas": {
    "isr": 3000
  },
  "/en/kontakty": {
    "isr": 3000
  },
  "/en/reference": {
    "isr": 3000
  },
  "/en/sluzby": {
    "isr": 3000
  },
  "/en/sluzby/**": {
    "isr": 3000
  },
  "/en/partneri": {
    "isr": 3000
  },
  "/en/partneri/**": {
    "isr": 3000
  },
  "/en/kariera": {
    "isr": 3000
  },
  "/en/kariera/**": {
    "isr": 3000
  },
  "/en/katalog-produktu": {
    "isr": 3000
  },
  "/en/katalog-produktu/**": {
    "isr": 3000
  },
  "/en/pf": {
    "isr": 3000
  },
  "/en/kalendare": {
    "isr": 3000
  },
  "/vyhledavani": {
    "isr": false,
    "cache": false
  },
  "/en/vyhledavani": {
    "isr": false,
    "cache": false
  },
  "/cs": {
    "redirect": "/"
  }
},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "@/assets/variables" as *;
						@use "@/assets/mixins" as *;
					`,
				},
			},
		},
	},

	css: ['@/assets/normalize.css', '@/assets/global.css', '@/assets/cookie-control.css', '@/assets/shared-sections.scss'],
	modules: ['@nuxt/image', '@dargmuesli/nuxt-cookie-control', '@nuxtjs/sitemap', '@nuxtjs/i18n'],

	image: { provider: process.env.NETLIFY === 'true' ? 'netlifyImageCdn' : 'ipx', domains: [new URL(apiBaseUrl).hostname], quality: 80 },
	site: { url: siteUrl },
	sitemap: { sources: ['/api/sitemap'], exclude: ['/vyhledavani', '/en/vyhledavani'] },
	runtimeConfig: {
  indexable: process.env.NETLIFY !== 'true' || process.env.CONTEXT === 'production',
  public: { apiBaseUrl, graphqlEndpoint, siteUrl,
   contactFormId: process.env.NUXT_PUBLIC_CONTACT_FORM_ID || '866',
   careerFormId: process.env.NUXT_PUBLIC_CAREER_FORM_ID || '865',
   googleMapsAPI: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API || '',
   gtmId: process.env.NUXT_PUBLIC_GTM_ID || 'GTM-PVPZKVF',
  },
 },

	cookieControl: {
		barPosition: 'bottom-full',
		closeModalOnClickOutside: true,
		colors: false,
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
		restructureDir: '.',
		experimental: { nitroContextDetection: false },
		locales: [
			{
				code: 'cs',
				language: 'cs-CZ',
				name: 'CZ',
			},
			{
				code: 'en',
				language: 'en-US',
				name: 'EN',
			},
		],
		baseUrl: siteUrl,
		defaultLocale: 'cs',
		vueI18n: './i18n.config.ts',
		detectBrowserLanguage: false,
	},

	compatibilityDate: '2024-09-04',
})
