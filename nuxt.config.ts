// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// ssr: true,
	// routeRules: {
	// 	'/': { static: true },
	// 	'/o-nas': { static: true },
	// 	'/kontakty': { static: true },
	// 	'/reference': { static: true },
	// 	'/sluzby': { static: true },
	// 	'/sluzby/**': { swr: 3600 },
	// 	'/partneri': { swr: 3600 },
	// 	'/partneri/**': { swr: 3600 },
	// 	'/kariera': { swr: 3600 },
	// 	'/kariera/**': { swr: 3600 },
	// 	'/katalog-produktu': { swr: 3600 },
	// 	'/katalog-produktu/**': { swr: 3600 },
	// },
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
