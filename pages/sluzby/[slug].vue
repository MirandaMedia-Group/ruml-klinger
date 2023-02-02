<template>
	<PostHeader
		:image="service.pages.nodes[0].featuredImage.node"
		:title="service.pages.nodes[0].title"
		:excerpt="service.pages.nodes[0].rumlKlingerSluzby.shortDescription" />
</template>
<script setup>
	const router = useRouter()
	const service = ref(null)

	const serviceQuery = gql`
		query {
			pages(where: { name: "${router.currentRoute.value.params.slug}" }) {
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
	const { data: serviceResponse } = await useAsyncQuery(serviceQuery)
	service.value = serviceResponse.value
</script>
<style lang="scss"></style>
