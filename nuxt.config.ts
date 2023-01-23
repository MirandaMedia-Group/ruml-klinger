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
	modules: ['@nuxt/image-edge', '@nuxtjs/apollo'],
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
})
