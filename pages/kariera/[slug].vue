<template>
	<div>
		<section class="detail-header">
			<div class="container">
				<div class="detail-header__columns">
					<div class="column detail-header__image">
						<NuxtPicture
							:src="careerDetail.careers.nodes[0].featuredImage.node.sourceUrl"
							:alt="careerDetail.careers.nodes[0].featuredImage.node.altText"
							:width="careerDetail.careers.nodes[0].featuredImage.node.mediaDetails.width"
							:height="careerDetail.careers.nodes[0].featuredImage.node.mediaDetails.height"
							provider="ipx" />
					</div>
					<div class="column detail-header__info">
						<div class="detail-header__company">
							<NuxtPicture
								:src="companyLogos[careerDetail.careers.nodes[0].careerAcf.company]"
								:alt="careerDetail.careers.nodes[0].careerAcf.company" />
						</div>
						<h1>{{ careerDetail.careers.nodes[0].title }}</h1>
						<div
							class="detail-header__excerpt"
							v-html="careerDetail.careers.nodes[0].excerpt"></div>
					</div>
				</div>
			</div>
		</section>
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

	const careerDetail = useState('careerDetail', () => null)
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

<style lang="scss">
	.detail-header {
		background: url(/page-header-bg.jpg) top center no-repeat;
		margin-bottom: 160px;
		&__columns {
			position: relative;
			bottom: -80px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			background-color: $color-white;
		}
		&__image,
		&__info {
			flex: 1 1 420px;
		}
		&__image {
			img {
				display: block;
			}
		}
		&__info {
			padding: 50px;
		}
		&__company {
			img {
				width: auto;
			}
		}
		&__excerpt {
			font-size: rem(20);
			color: rgba($color-font, 0.6);
		}
	}
</style>
