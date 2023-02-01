<template>
	<div>
		<PostHeader
			:image="careerDetail.careers.nodes[0].featuredImage.node"
			:logo="careerDetail.careers.nodes[0].careerAcf.company"
			:title="careerDetail.careers.nodes[0].title"
			:excerpt="careerDetail.careers.nodes[0].excerpt" />
		<NuxtLayout name="with-sidebar-detail">
			<template #main>
				<div v-html="careerDetail.careers.nodes[0].content"></div>
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

	const careerDetail = ref(null)
	const router = useRouter()

	const companyLogos = ref({
		klinger: '/loga/ruml-group.png',
		service: '/loga/ruml-service.png',
		emes: '/loga/ruml-emes.png',
		industry: '/loga/ruml-industry.png',
		tesneni: '/loga/ruml-tesneni.png',
		group: '/loga/ruml-group.png',
	})
	const companyURLs = ref({
		klinger: 'www.ruml-klinger.cz',
		service: 'www.ruml-service.cz',
		emes: 'www.ruml-emes.cz',
		industry: 'www.ruml-industry.cz',
		tesneni: 'www.ruml-tesneni.cz',
		group: 'www.ruml-group.cz',
	})

	const careerDetailQuery = gql`
		query {
			careers(where: { name: "${router.currentRoute.value.params.slug}" }) {
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
	const { data: careerDetailResponse } = await useAsyncQuery(careerDetailQuery)
	careerDetail.value = careerDetailResponse.value
</script>
