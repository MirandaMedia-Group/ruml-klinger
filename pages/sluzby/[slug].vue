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
	const { data: service } = await useAsyncQuery(serviceQuery, variables.value)
	useHead({
		bodyAttrs: {
			class: 'wp-content',
		},
		title: 'RUML Klinger s.r.o - ' + service.value.pages.nodes[0].title,
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: service.value.pages.nodes[0].rumlKlingerSluzby.shortDescription,
			},
		],
	})
</script>
<style lang="scss"></style>
