<template>
	<PageHeader>
		<h1>Staňte se jedním z nás</h1>
		<p>Ve firmách RUML Group poskytujeme našim zaměstněncům/kolegům prostor pro jejich maximální uplatnění a rozvoj.</p>
		<strong>
			Právě máme
			{{
				careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length === 1
					? 'volnou'
					: careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length >= 2 ||
					  careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length <= 4
					? 'volné'
					: 'volných'
			}}
			{{ careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length }}
			{{
				careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length === 1
					? 'pozici'
					: careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length >= 2 ||
					  careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length <= 4
					? 'pozice'
					: 'pozic'
			}}
		</strong>
	</PageHeader>
	<section class="container">
		<div class="career-list">
			<div
				class="career"
				v-for="(post, index) in careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger')"
				:key="index">
				<div class="career__image">
					<NuxtPicture
						:src="post.featuredImage.node.sourceUrl"
						:alt="post.featuredImage.node.altText"
						:width="post.featuredImage.node.mediaDetails.width"
						:height="post.featuredImage.node.mediaDetails.height"
						loading="lazy"
						provider="ipx"
						:img-attrs="{ style: 'display:block;' }" />
				</div>
				<div class="career__content">
					<div class="career__company">
						<NuxtPicture
							:src="companyLogos[post.careerAcf.company]"
							:alt="post.careerAcf.company"
							width="139"
							height="68"
							loading="lazy" />
					</div>
					<h2 class="career__title">{{ post.title }}</h2>
					<div class="career__website">
						{{ companyURLs[post.careerAcf.company] }}
					</div>
					<div
						class="career__excerpt"
						v-html="post.excerpt"></div>

					<NuxtLink
						:to="`/kariera/${post.slug}`"
						class="btn btn-primary">
						Zobrazit pozici
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
	<TextImageBlock
		:data="aboutUsBanner.page.rumlKlingerHomepage.aboutUs"
		:hasBackground="true"
		:btn="{ text: 'Více o společnosti', url: '/o-nas' }"
		:alignCenter="true" />
	<section class="container">
		<USPBlock />
	</section>
</template>

<script setup>
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

	const careerListQuery = gql`
		query getCareerList {
			careers {
				nodes {
					excerpt
					featuredImage {
						node {
							altText
							mediaDetails {
								height
								width
							}
							sourceUrl
						}
					}
					slug
					title
					careerAcf {
						company
					}
				}
			}
		}
	`
	const careerList = useState('careerList', () => null)
	if (!careerList.value) {
		const { data } = await useAsyncQuery(careerListQuery)
		careerList.value = data.value
	}

	const aboutUsBannerQuery = gql`
		query getOnasBanner {
			page(id: "cG9zdDo1OTI=") {
				title
				slug
				rumlKlingerHomepage {
					aboutUs {
						title
						perex
						text
						image {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
					}
				}
			}
		}
	`
	const aboutUsBanner = useState('aboutUsBanner', () => null)
	if (!aboutUsBanner.value) {
		const { data } = await useAsyncQuery(aboutUsBannerQuery)
		aboutUsBanner.value = data.value
	}
</script>

<style lang="scss" scoped>
	.career {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 40px;
		&__image {
			flex: 1 1 140px;
			img,
			picture {
				display: block;
			}
		}
		&__company {
			margin-bottom: 20px;
		}
		&__content {
			flex: 1 1 600px;
			padding: 50px;
			background-color: $color-white;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			h2 {
				font-size: rem(32);
				margin-bottom: 0;
				&::after {
					display: none;
				}
			}
		}
		&__website {
			color: $color-font-light;
			margin-bottom: 20px;
		}
	}
	@media (max-width: 767px) {
		.career {
			&__content {
				padding: 20px;
			}
			&__content h2 {
				font-size: rem(24);
			}
		}
	}
</style>
