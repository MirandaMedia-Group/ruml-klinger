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
					<img
						:src="category.image.sourceUrl"
						:alt="category.image.altText" />
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
					<img :src="item.featuredImage?.node.sourceUrl" />
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
			<div class="video__description">
				<h2>{{ hpVideos[activeVideo].title }}</h2>
				<p>{{ hpVideos[activeVideo].description }}</p>
			</div>
			<div class="video__content">
				<video
					v-if="hpVideos[activeVideo].file"
					:src="hpVideos[activeVideo].file"></video>
				<iframe
					v-else-if="hpVideos[activeVideo].video"
					width="560"
					height="315"
					:src="hpVideos[0].video.replace('watch?v=', 'embed/')"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</div>
		</div>
	</section>
</template>
<script setup>
	// GLOBAL DATA
	const homepageData = useState('homepageData', () => null)
	const servicesData = useState('servicesData', () => null)

	// DATA SEGMENTATION
	const hpHero = ref(null)
	const hpCategories = ref(null)
	const hpBannerTop = ref(null)
	const hpVideos = ref(null)
	const activeVideo = ref(0)

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
	}
	if (homepageData.value === null) {
		console.log('nemam data')
		getHomepageData()
	} else {
		hpHero.value = homepageData.value.page.rumlKlingerHomepage.hero
		hpCategories.value = homepageData.value.page.rumlKlingerHomepage.categoriesBlock
		hpBannerTop.value = homepageData.value.page.rumlKlingerHomepage.bannerTop
		hpVideos.value = homepageData.value.page.rumlKlingerHomepage.videoCarousel.video
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
</style>
