<template>
	<PostHeader
		:image="service.pages.nodes[0].featuredImage.node"
		:title="service.pages.nodes[0].title"
		:excerpt="service.pages.nodes[0].rumlKlingerSluzby.shortDescription" />
	<div class="narrow container">
		<div v-html="service.pages.nodes[0].content"></div>
	</div>
</template>
<script setup>
	useHead({
		bodyAttrs: {
			class: 'wp-content',
		},
	})
	const router = useRouter()
	const variables = ref({ name: router.currentRoute.value.params.slug })
	const serviceQuery = gql`
		query getService($name: String!) {
			pages(where: { name: $name }) {
				nodes {
					title
					slug
					content
					featuredImage {
						node {
							sourceUrl
							altText
							mediaDetails {
								width
								height
							}
						}
					}
					rumlKlingerSluzby {
						shortDescription
					}
				}
			}
		}
	`
	// const service = useState('singleService', () => null)
	const { data: service } = await useAsyncQuery(serviceQuery, variables.value)
	// service.value = data.value
</script>
<style lang="scss"></style>
