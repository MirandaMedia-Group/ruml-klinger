<template>
	<HeroBig v-bind="hpHero" />
	<section class="categories container">
		<div class="narrow center">
			<h2>{{ hpCategories.title }}</h2>
			<p>{{ hpCategories.perex }}</p>
			<div class="categories__switcher">
				<strong>Zobrazit kategorie podle:</strong>
				<div class="switcher__control"><button class="active">Zboží</button>|<button>Výrobci</button></div>
			</div>
		</div>
		<div class="categories-grid">
			<NuxtLink
				v-for="category in hpCategories.categories"
				:key="category.title"
				:to="category.url"
				class="category">
				<div class="category__image">
					<NuxtPicture
						:src="category.image.sourceUrl"
						:alt="category.image.altText"
						provider="ipx" />
				</div>
				<div class="category__content">
					<h3>{{ category.title }}</h3>
				</div>
			</NuxtLink>
		</div>
	</section>
	<section class="banner__top container">
		<div
			class="banner"
			:style="`background-image: url(${hpBannerTop.image.sourceUrl})`">
			<div class="banner__content">
				<h3>{{ hpBannerTop.title }}</h3>
				<p>{{ hpBannerTop.perex }}</p>
				<a
					class="btn btn-primary"
					:href="hpBannerTop.btn.file.mediaItemUrl"
					target="_blank">
					{{ hpBannerTop.btn.text }}
					({{ (hpBannerTop.btn.file.fileSize / 1000 / 1000).toFixed(2) }} MB)
				</a>
			</div>
		</div>
	</section>
	<section class="services container">
		<div class="narrow center">
			<h2>{{ homepageData.page.rumlKlingerHomepage.servicesBlock.title }}</h2>
			<p>{{ homepageData.page.rumlKlingerHomepage.servicesBlock.perex }}</p>
		</div>
		<div class="services-wrap">
			<div
				class="service"
				v-for="(item, index) in servicesData.pages.nodes"
				:key="index">
				<div class="service__image">
					<NuxtPicture
						:src="item.featuredImage?.node.sourceUrl"
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
		<div class="video__carousel">
			<div class="video__info">
				<div class="video__description">
					<h2>{{ hpVideos[activeVideo].title }}</h2>
					<p>{{ hpVideos[activeVideo].description }}</p>
				</div>
				<div class="carousel__controls">
					<div class="carousel__dots">
						<button
							v-for="(item, index) in hpVideos"
							:key="index"
							:class="{ active: index === activeVideo }"
							class="carousel__dot"
							@click="activeVideo = index"></button>
					</div>
					<div class="carousel__arrows">
						<button
							class="arrow arrow-left"
							@click="activeVideo = activeVideo === 0 ? hpVideos.length - 1 : activeVideo - 1">
							<svg
								width="19"
								height="15"
								viewBox="0 0 19 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</button>
						<button
							class="arrow arrow-right"
							@click="activeVideo = activeVideo === hpVideos.length - 1 ? 0 : activeVideo + 1">
							<svg
								width="19"
								height="15"
								viewBox="0 0 19 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="video__content">
				<video
					v-if="hpVideos[activeVideo].file"
					:src="hpVideos[activeVideo].file"></video>
				<iframe
					v-else-if="hpVideos[activeVideo].video"
					width="960"
					height="550"
					:src="youtubeVideoUrl(hpVideos[activeVideo].video)"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</div>
		</div>
	</section>
	<section class="partners">
		<div class="container center">
			<h2>Partneři</h2>
			<div class="partners-list">
				<div
					class="partner"
					v-for="(item, index) in partnersData.partners.nodes"
					:key="index">
					<NuxtImg :src="item.featuredImage.node.sourceUrl" />
				</div>
			</div>
			<BtnSecondary href="/partneri"> Další partneři </BtnSecondary>
		</div>
	</section>
	<section class="about-us">
		<div class="container">
			<div class="columns col-2 align-center">
				<div class="column about-us__text">
					<h2>{{ aboutUs.title }}</h2>
					<div
						class="about-us__perex"
						v-html="aboutUs.perex"></div>
					<div
						class="about-us__description"
						v-html="aboutUs.text"></div>
					<BtnSecondary href="/o-nas">Více o společnosti</BtnSecondary>
				</div>
				<div class="column about-us__image">
					<NuxtPicture
						:src="aboutUs.image.sourceUrl"
						provider="ipx" />
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	// GLOBAL DATA
	const homepageData = useState('homepageData', () => null)
	const servicesData = useState('servicesData', () => null)
	const partnersData = useState('partnersData', () => null)

	// DATA SEGMENTATION
	const hpHero = ref(null)
	const hpCategories = ref(null)
	const hpBannerTop = ref(null)
	const hpVideos = ref(null)
	const activeVideo = ref(0)
	const aboutUs = ref(null)

	// COMPUTED
	const youtubeVideoUrl = (videoURL) => videoURL.replace('watch?v=', 'embed/')

	const getHomepageData = async () => {
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
								link
								mediaItemUrl
								mediaType
								sizes
								sourceUrl
								srcSet
								title
								uri
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
								sourceUrl
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
								sourceUrl
							}
						}
					}
				}
			}
		`
		const { data } = await useAsyncQuery(homepageQuery)
		homepageData.value = data
		hpHero.value = homepageData.value.page.rumlKlingerHomepage.hero
		hpCategories.value = homepageData.value.page.rumlKlingerHomepage.categoriesBlock
		hpBannerTop.value = homepageData.value.page.rumlKlingerHomepage.bannerTop
		hpVideos.value = homepageData.value.page.rumlKlingerHomepage.videoCarousel.video
		aboutUs.value = homepageData.value.page.rumlKlingerHomepage.aboutUs
	}
	if (homepageData.value === null) {
		console.log('nemam data')
		getHomepageData()
	} else {
		hpHero.value = homepageData.value.page.rumlKlingerHomepage.hero
		hpCategories.value = homepageData.value.page.rumlKlingerHomepage.categoriesBlock
		hpBannerTop.value = homepageData.value.page.rumlKlingerHomepage.bannerTop
		hpVideos.value = homepageData.value.page.rumlKlingerHomepage.videoCarousel.video
		aboutUs.value = homepageData.value.page.rumlKlingerHomepage.aboutUs
	}

	const getServicesData = async () => {
		const servicesQuery = gql`
			query {
				pages(where: { parent: "cG9zdDo1OTg=" }) {
					nodes {
						title
						slug
						featuredImage {
							node {
								sourceUrl
							}
						}
						rumlKlingerSluzby {
							shortDescription
						}
					}
				}
			}
		`
		const { data } = await useAsyncQuery(servicesQuery)
		servicesData.value = data
	}
	if (servicesData.value === null) {
		getServicesData()
	}

	const getPartnersData = async () => {
		const partnersQuery = gql`
			query {
				partners(first: 5) {
					nodes {
						id
						title
						featuredImage {
							node {
								sourceUrl
							}
						}
					}
				}
			}
		`
		const { data } = await useAsyncQuery(partnersQuery)
		partnersData.value = data
	}
	if (partnersData.value === null) {
		getPartnersData()
	}
	console.log(partnersData.value)
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

	.video__carousel {
		display: flex;
		gap: 30px;
		.video__info {
			flex: 450;
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
		.video__content {
			flex: 960;
		}
	}
	.video__description {
		margin-top: auto;
		margin-bottom: auto;
		h2 {
			&::after {
				margin-left: 0;
			}
		}
		p {
			font-size: rem(20);
			color: rgba($color-font, 0.9);
		}
	}
	.video__content {
		iframe,
		video {
			display: block;
		}
	}
	.carousel__controls {
		display: flex;
		align-items: center;
		gap: 20px;
		justify-content: space-between;
	}
	.carousel__dots {
		display: flex;
		gap: 20px;
	}
	.carousel__dot {
		display: block;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: $color-inactive;
		&.active {
			background-color: $color-secondary;
		}
	}
	.carousel__arrows {
		display: flex;
		gap: 10px;
		.arrow {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 44px;
			height: 44px;
			border: 1px solid $color-font-light;
			cursor: pointer;
			svg {
				stroke: $color-black;
			}
			&:hover,
			&:focus {
				border-color: $color-secondary;
				svg {
					stroke: $color-secondary;
				}
			}
		}
		.arrow-left {
			svg {
				transform: rotate(180deg);
			}
		}
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
	.about-us {
		.columns {
			gap: 80px;
		}
		h2::after {
			margin-left: 0;
		}
	}
	.about-us__perex {
		font-size: rem(20);
		color: rgba($color-font, 0.9);
	}
	.about-us__description {
		color: rgba($color-font, 0.9);
		font-weight: 300;
	}
</style>
