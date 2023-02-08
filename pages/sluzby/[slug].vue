<template>
	<PostHeader
		:image="service.pages.nodes[0].featuredImage.node"
		:title="service.pages.nodes[0].title"
		:excerpt="service.pages.nodes[0].rumlKlingerSluzby.shortDescription" />
</template>
<script setup>
	const router = useRouter()
	const variables = ref({ name: router.currentRoute.value.params.slug })
	const serviceQuery = gql`
		query getService($name: String!) {
			pages(where: { name: $name }) {
				nodes {
					title
					slug
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
	const service = useState('singleService', () => null)
	const { data } = await useAsyncQuery(serviceQuery, variables.value)
	service.value = data.value
</script>
<style lang="scss"></style>
