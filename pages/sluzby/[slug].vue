<template>
	<PostHeader
		:image="service.data.pages.nodes[0].featuredImage.node"
		:title="service.data.pages.nodes[0].title"
		:excerpt="service.data.pages.nodes[0].rumlKlingerSluzby.shortDescription" />
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
	const { data: service } = await useAsyncData('service', () => useAsyncQuery(serviceQuery, variables.value))
</script>
<style lang="scss"></style>
