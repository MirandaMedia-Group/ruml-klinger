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
	modules: ['@nuxt/image-edge', '@nuxtjs/apollo'],
	image: {
		provider: 'netlify',
		domains: ['cdn.myshoptet.com', 'pet-center-stage.axfone.eu', 'pet-center-prod.axfone.eu'],
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
		},
	},
})
