// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
				httpEndpoint: 'https://wp-miranda-1.axfone.eu/graphql',
			},
		},
	},
	nitro: {
		prerender: {
			routes: ['/', '/o-nas', '/kontakty', '/sluzby', '/reference', '/partneri', '/kariera'],
		},
	},
	routeRules: {
		'/': { static: true },
		'/o-nas': { static: true },
		'/kontakty': { static: true },
		'/sluzby': { static: true },
		'/reference': { static: true },
		'/partneri': { static: true },
		'/kariera': { static: true },
		'/kariera/**': { swr: true },
		'/katalog-produktu/**': { swr: true },
	},
})
