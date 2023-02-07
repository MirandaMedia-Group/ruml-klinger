<template>
	<div>
		<PostHeader
			:image="careerDetail.data.careers.nodes[0].featuredImage.node"
			:logo="careerDetail.data.careers.nodes[0].careerAcf.company"
			:title="careerDetail.data.careers.nodes[0].title"
			:excerpt="careerDetail.data.careers.nodes[0].excerpt" />
		<NuxtLayout name="with-sidebar-detail">
			<template #main>
				<div v-html="careerDetail.data.careers.nodes[0].content"></div>
			</template>
			<template #sidebar>
				<CareerForm />
			</template>
		</NuxtLayout>
	</div>
</template>
<script setup>
	useHead({
		bodyAttrs: {
			class: 'wp-content',
		},
	})
	definePageMeta({
		layout: false,
	})

	const router = useRouter()
	const variables = ref({
		slug: router.currentRoute.value.params.slug,
	})

	const careerDetailQuery = gql`
		query getCareerDetail($slug: String) {
			careers(where: { name: $slug }) {
				nodes {
					title
					slug
					excerpt
					content
					featuredImage {
						node {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
					}
					careerAcf {
						company
					}
				}
			}
		}
	`
	const { data: careerDetail } = await useAsyncData('careerDetail', () => useAsyncQuery(careerDetailQuery, variables.value))
</script>
