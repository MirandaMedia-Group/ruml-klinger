// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	nitro: {
		routeRules: {
			'/': { static: true },
			'/o-nas': { static: true },
			'/kontakty': { static: true },
			'/sluzby': { static: true },
			'/sluzby/**': { swr: 3600 },
			'/reference': { static: true },
			'/reference/**': { swr: 3600 },
			'/partneri': { static: true },
			'/partneri/**': { swr: 3600 },
			'/kariera': { static: true },
			'/kariera/**': { swr: 3600 },
			'/katalog-produktu': { static: true },
			'/katalog-produktu/**': { swr: 3600 },
		},
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
	modules: ['@nuxt/image-edge', '@nuxtjs/apollo', 'nuxt-swiper'],
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
	},
})
