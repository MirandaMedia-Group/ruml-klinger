<template>
	<NuxtLayout>
		<HeroBig
			v-if="hpHero"
			v-bind="hpHero" />
		<section class="categories container">
			<div class="narrow center">
				<h2>{{ hpCategories?.title }}</h2>
				<p>{{ hpCategories?.perex }}</p>
				<!-- <div class="categories__switcher">
					<strong>Zobrazit kategorie podle:</strong>
					<div class="switcher__control"><button class="active">Zboží</button>|<button>Výrobci</button></div>
				</div> -->
			</div>
			<div class="categories-grid">
				<NuxtLink
					v-for="category in hpCategories?.categories"
					:key="category.title"
					:to="category.url"
					class="category">
					<div class="category__image">
						<NuxtPicture
							:src="category.image.sourceUrl"
							:alt="category.image.altText"
							:width="category.image.mediaDetails.width"
							:height="category.image.mediaDetails.height"
							loading="lazy"
							provider="ipx" />
					</div>
					<div class="category__content">
						<h3>{{ category.title }}</h3>
					</div>
				</NuxtLink>
			</div>
		</section>
		<section>
			<BannerTop />
		</section>
		<section class="services container">
			<div class="narrow center">
				<h2>{{ homepageData.page.rumlKlingerHomepage.servicesBlock.title }}</h2>
				<p>{{ homepageData.page.rumlKlingerHomepage.servicesBlock.perex }}</p>
			</div>
			<div class="services-wrap">
				<div
					class="service"
					v-for="(item, index) in servicesData?.pages.nodes"
					:key="index">
					<div class="service__image">
						<NuxtPicture
							:src="item.featuredImage?.node.sourceUrl"
							:width="item.featuredImage?.node.mediaDetails.width"
							:height="item.featuredImage?.node.mediaDetails.height"
							:alt="item.featuredImage?.node.altText"
							loading="lazy"
							provider="ipx" />
					</div>
					<div class="service__content">
						<h3>{{ item.title }}</h3>
						<p class="service__description">{{ item.rumlKlingerSluzby.shortDescription }}</p>
						<NuxtLink
							:to="`/sluzby/${item.slug}`"
							class="btn btn-primary">
							Zobrazit službu
						</NuxtLink>
					</div>
				</div>
			</div>
		</section>

		<section class="container">
			<VideoCarousel
				v-if="hpVideos"
				:data="hpVideos" />
		</section>
		<section class="partners">
			<div class="container center">
				<h2>Partneři</h2>
				<div class="partners-list">
					<div
						class="partner"
						v-for="(item, index) in partnersData?.partners.nodes"
						:key="index">
						<NuxtPicture
							:src="item.featuredImage.node.sourceUrl"
							:alt="item.featuredImage.node.altText"
							:width="item.featuredImage.node.mediaDetails.width"
							:height="item.featuredImage.node.mediaDetails.height"
							loading="lazy"
							provider="ipx" />
					</div>
				</div>
				<BtnSecondary href="/partneri"> Další partneři </BtnSecondary>
			</div>
		</section>
		<TextImageBlock
			v-if="aboutUs"
			:data="aboutUs"
			:hasBackground="true"
			:btn="{ text: 'Více o společnosti', url: '/o-nas' }"
			:alignCenter="true" />
		<section class="references container">
			<div class="narrow center">
				<h2>Reference</h2>
			</div>
			<div class="references__categories">
				<nav>
					<ul>
						<li
							class="references__category--item"
							v-for="(item, index) in referenceCategories?.referenceCategories.nodes"
							:class="{ active: item.id === activeReferenceBlock }"
							:key="index">
							<button @click.prevent="activeReferenceBlock = item.id">
								{{ item.name }}
							</button>
						</li>
					</ul>
				</nav>
			</div>
			<div
				v-for="item in referenceCategories?.referenceCategories.nodes"
				:key="item.id"
				:class="{ active: item.id === activeReferenceBlock }"
				class="references__block">
				<ReferencesList
					:references="references?.references.nodes"
					:category="item" />
			</div>
			<div class="buttons-wrapper buttons-center">
				<BtnSecondary href="/reference">Všechny reference</BtnSecondary>
			</div>
		</section>
		<TextImageBlock
			v-if="career"
			:data="career"
			:reverse="true"
			:btn="{ text: 'Zobrazit pozice', url: '/kariera' }"
			:alignCenter="true" />
	</NuxtLayout>
</template>

<script setup>
	useHead({
		title: 'RUML Klinger - Domovská stránka',
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: 'Domovská stránka společnosti RUML Klinger',
			},
		],
	})

	// GLOBAL DATA
	const homepageData = useState('homepageData', () => null)
	const servicesData = useState('servicesData', () => null)
	const partnersData = useState('partnersData', () => null)
	const referenceCategories = useState('referenceCategories', () => null)
	const references = useState('references', () => null)

	// DATA SEGMENTATION
	const hpHero = useState('hpHero', () => null)
	const hpCategories = useState('hpCategories', () => null)
	const hpVideos = useState('hpVideos', () => null)
	const aboutUs = useState('aboutUs', () => null)
	const activeReferenceBlock = useState('activeReferenceBlock', () => null)
	const career = useState('career', () => null)

	// const getHomepageData = async () => {
	const homepageQuery = gql`
		query {
			page(id: "cG9zdDo1OTI=") {
				title
				slug
				rumlKlingerHomepage {
					hero {
						btnPrimary {
							text
							type
							urlExternal
							urlInternal
						}
						btnSecondary {
							text
							type
							urlExternal
							urlInternal
						}
						image {
							altText
							sourceUrl
							title
							mediaDetails {
								height
								width
							}
						}
						perex
						title
					}
					categoriesBlock {
						title
						perex
						categories {
							url
							title
							image {
								sourceUrl
								altText
								mediaDetails {
									height
									width
								}
							}
						}
					}
					bannerTop {
						title
						perex
						btn {
							text
							file {
								fileSize
								mediaItemUrl
							}
						}
						image {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
					}
					servicesBlock {
						title
						perex
					}
					videoCarousel {
						video {
							title
							description
							type
							video
							file {
								mediaItemUrl
								sourceUrl
								title
							}
						}
					}
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
					career {
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
	const { data: homepageResponse } = await useAsyncQuery(homepageQuery)
	homepageData.value = homepageResponse.value
	hpHero.value = homepageData.value.page.rumlKlingerHomepage.hero
	hpCategories.value = homepageData.value.page.rumlKlingerHomepage.categoriesBlock
	hpVideos.value = homepageData.value.page.rumlKlingerHomepage.videoCarousel.video
	aboutUs.value = homepageData.value.page.rumlKlingerHomepage.aboutUs
	career.value = homepageData.value.page.rumlKlingerHomepage.career
	// }
	// if (!homepageData.value) {
	// 	getHomepageData()
	// }

	// const getServicesData = async () => {
	const servicesQuery = gql`
		query {
			pages(where: { parent: "cG9zdDo1OTg=" }) {
				nodes {
					title
					slug
					featuredImage {
						node {
							sourceUrl
							altText
							mediaDetails {
								height
								width
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
	const { data: servicesResponse } = await useAsyncQuery(servicesQuery)
	servicesData.value = servicesResponse.value
	// }
	// if (!servicesData.value) {
	// 	getServicesData()
	// }

	// const getPartnersData = async () => {
	const partnersQuery = gql`
		query {
			partners(first: 5) {
				nodes {
					id
					title
					featuredImage {
						node {
							sourceUrl
							altText
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
	const { data: partnersResponse } = await useAsyncQuery(partnersQuery)
	partnersData.value = partnersResponse.value
	// }
	// if (!partnersData.value) {
	// 	getPartnersData()
	// }

	// const getReferenceCategories = async () => {
	const referenceCategoriesQuery = gql`
		{
			referenceCategories {
				nodes {
					id
					name
					link
					uri
					slug
					referenceCategoryAcf {
						image {
							sourceUrl
							altText
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
	const { data: referenceCategoriesResponse } = await useAsyncQuery(referenceCategoriesQuery)
	referenceCategories.value = referenceCategoriesResponse.value
	activeReferenceBlock.value = referenceCategories.value.referenceCategories.nodes[0].id
	// }
	// if (!referenceCategories.value) {
	// 	getReferenceCategories()
	// }
	// const getReferences = async () => {
	const referencesQuery = gql`
		{
			references {
				nodes {
					id
					title
					slug
					featuredImage {
						node {
							sourceUrl
							altText
							mediaDetails {
								height
								width
							}
						}
					}
					referenceCategories {
						nodes {
							name
							id
						}
					}
				}
			}
		}
	`
	const { data: referencesResponse } = await useAsyncQuery(referencesQuery)
	references.value = referencesResponse.value
	// }
	// if (!references.value) {
	// 	getReferences()
	// }
</script>
<style lang="scss">
	.categories__switcher {
		margin-top: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 30px;
		margin-bottom: 40px;
		button {
			padding: rem(10);
			font-size: rem(18);
			&.active {
				color: $color-secondary;
				font-weight: 700;
				font-size: rem(24);
			}
		}
	}
	.switcher__control {
		display: flex;
		align-items: center;
	}
	.categories-grid {
		columns: 3;
		column-gap: 15px;
		img {
			display: block;
		}
	}
	.category {
		display: block;
		position: relative;
		margin-bottom: 15px;
		.category__content {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: 24px 30px;
			h3 {
				width: 100%;
				color: $color-white;
				margin: 0;
				transition: all 0.15s ease-in-out;
				position: relative;
				&::before {
					content: url('/icon/arrow-red.svg');
					display: block;
					line-height: 0;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%) scale(0);
					opacity: 0;
					transition: all 0.15s ease-in-out;
				}
			}
		}
		&:hover,
		&:focus {
			.category__content {
				h3 {
					padding-left: 50px;
					&::before {
						transform: translateY(-50%) scale(1);
						opacity: 1;
					}
				}
			}
		}
	}
	.banner {
		padding: 60px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		h3 {
			font-size: rem(28);
			margin-bottom: em(20, 28);
			margin-top: 0;
		}
		.banner__content {
			max-width: 736px;
		}
	}
	.services-wrap {
		display: grid;
		grid-template-columns: repeat(2, minmax(1px, 1fr));
		gap: 30px;
		margin-top: 30px;
	}
	.service__content {
		background-color: $color-white;
		padding: 30px;
		h3 {
			margin-top: 0;
			margin-bottom: em(15, 28);
			font-size: rem(28);
		}
	}
	.service__description {
		min-height: 84px;
	}
	.partners {
		padding: 100px 0;
		background-color: $color-bg;
		background-image: url(/partners-bg.jpg);
		background-blend-mode: luminosity, normal;
	}
	.partners-list {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		margin-bottom: 50px;
		img {
			mix-blend-mode: luminosity;
			opacity: 0.25;
		}
	}
	.references__categories {
		width: 100%;
		background-color: $color-bg;
		padding: 20px 20px 0;
		margin-bottom: 20px;
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			font-family: 'Gotham', sans-serif;
			li {
				flex: 1;
				button {
					height: 100%;
					width: 100%;
					font-weight: 700;
					text-align: center;
					padding: em(10) em(70);
					line-height: em(24);
					transition: all 0.15s ease-in-out;
					cursor: pointer;
				}
				&.active button,
				button:hover,
				button:focus {
					color: $color-secondary;
					background-color: $color-bg-light;
				}
			}
		}
	}
	.references__block {
		&:not(.active) {
			display: none;
		}
	}
</style>
