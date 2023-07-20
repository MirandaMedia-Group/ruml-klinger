<template>
	<HeroBig v-bind="homepageData.page.rumlKlingerHomepage.hero" />
	<section class="categories container">
		<div class="narrow center">
			<h2>{{ homepageData.page.rumlKlingerHomepage.categoriesBlock.title }}</h2>
			<p>{{ homepageData.page.rumlKlingerHomepage.categoriesBlock.perex }}</p>
			<!-- <div class="categories__switcher">
				<strong>Zobrazit kategorie podle:</strong>
				<div class="switcher__control"><button class="active">Zboží</button>|<button>Výrobci</button></div>
			</div> -->
		</div>
		<div class="categories-grid">
			<NuxtLink
				v-for="category in homepageData.page.rumlKlingerHomepage.categoriesBlock.categories"
				:key="category.title"
				:to="localePath(category.url)"
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
			<div class="service" v-for="(item, index) in homepageData.pages.nodes" :key="index">
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
					<NuxtLink :to="localePath(`/sluzby/${item.slug}`)" class="btn btn-primary">{{ $t('showService') }}</NuxtLink>
				</div>
			</div>
		</div>
	</section>

	<section class="container">
		<VideoCarousel :data="homepageData.page.rumlKlingerHomepage.videoCarousel.video" />
	</section>

	<section class="partners">
		<div class="container center">
			<h2>{{ $t('partners') }}</h2>
			<div class="partners-list">
				<div class="partner" v-for="(item, index) in homepageData.partners.nodes" :key="index">
					<NuxtPicture
						:src="item.featuredImage.node.sourceUrl"
						:alt="item.featuredImage.node.altText"
						:width="item.featuredImage.node.mediaDetails.width"
						:height="item.featuredImage.node.mediaDetails.height"
						loading="lazy"
						provider="ipx" />
				</div>
			</div>
			<BtnSecondary :href="localePath('/partneri')">{{ $t('allPartners') }}</BtnSecondary>
		</div>
	</section>
	<TextImageBlock
		:data="homepageData.page.rumlKlingerHomepage.aboutUs"
		:hasBackground="true"
		:btn="{ text: $t('moreAboutCompany'), url: localePath('/o-nas') }"
		:alignCenter="true" />
	<section class="references container">
		<div class="narrow center">
			<h2>{{ $t('references') }}</h2>
		</div>
		<div v-if="screenWidth > 900">
			<div class="references__categories">
				<nav>
					<ul>
						<li
							class="references__category--item"
							v-for="(item, index) in sortByOrder(referenceCategories.referenceCategories.nodes)"
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
				v-for="item in sortByOrder(referenceCategories.referenceCategories.nodes)"
				:key="item.id"
				:class="{ active: item.id === activeReferenceBlock }"
				class="references__block">
				<ReferencesList :references="references.references.nodes" :limit="6" :category="item" />
			</div>
		</div>
		<div v-else>
			<div
				class="mobile-references__wrapper"
				v-for="(item, index) in sortByOrder(referenceCategories.referenceCategories.nodes)"
				:class="{ active: item.id === activeReferenceBlock }"
				:key="index">
				<button @click.prevent="activeReferenceBlock = item.id">
					{{ item.name }}
				</button>
				<div class="mobile-references__block">
					<ReferencesList :references="references.references.nodes" :limit="6" :category="item" />
				</div>
			</div>
		</div>
		<div class="buttons-wrapper buttons-center">
			<BtnSecondary :href="localePath('/reference')">{{ $t('allReferences') }}</BtnSecondary>
		</div>
	</section>
	<TextImageBlock
		:data="homepageData.page.rumlKlingerHomepage.career"
		:reverse="true"
		:btn="{ text: $t('showAllPositions'), url: localePath('/kariera') }"
		:alignCenter="true" />
</template>

<script setup>
	const { locale, t } = useI18n()
	const localePath = useLocalePath()
	useHead({
		title: t('seo.homepage.title'),
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: t('seo.homepage.description'),
			},
		],
	})
	const screenWidth = useState('screenWidth')
	const sortByOrder = (object) => {
		const help = object.slice(0)
		help.sort((a, b) => {
			return (
				(a.referenceCategoryAcf.order === null ? 1000 : a.referenceCategoryAcf.order) -
				(b.referenceCategoryAcf.order === null ? 1001 : b.referenceCategoryAcf.order)
			)
		})
		return help
	}

	// STATES
	const activeReferenceBlock = useState('activeReferenceBlock', () => null)
	const language = useState('language')
	const localeIDs = {
		homepage: {
			cs: 'cG9zdDo1OTI=',
			en: 'cG9zdDozODM3',
		},
		services: {
			cs: 'cG9zdDo1OTg=',
			en: 'cG9zdDozODQ3',
		},
	}

	const homepageQuery = gql`
		query getHomepageKlinger($localeID: ID!, $parentID: ID!, $language: LanguageCodeFilterEnum!) {
			page(id: $localeID) {
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
						heroType
						video {
							altText
							mediaDetails {
								height
								width
							}
							mediaItemUrl
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
			pages(where: { parent: $parentID, orderby: { field: DATE, order: ASC } }, first: 2) {
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
			partners(first: 5, where: { language: $language }) {
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
	const { data: homepageData } = await useAsyncQuery(homepageQuery, {
		localeID: localeIDs.homepage[locale.value],
		parentID: localeIDs.services[locale.value],
		language: locale.value.toUpperCase(),
	})

	const referenceCategoriesQuery = gql`
		query getReferenceCategoriesKlinger($language: LanguageCodeFilterEnum!) {
			referenceCategories(where: { language: $language }) {
				nodes {
					id
					name
					link
					uri
					slug
					referenceCategoryAcf {
						order
						image {
							sourceUrl
							altText
							mediaDetails {
								height
								width
							}
						}
						technologies
					}
				}
			}
		}
	`
	const { data: referenceCategories } = await useAsyncQuery(referenceCategoriesQuery, { language: locale.value.toUpperCase() })
	activeReferenceBlock.value = referenceCategories.value.referenceCategories.nodes[0].id

	const referencesQuery = gql`
		query getReferences($language: LanguageCodeFilterEnum!) {
			references(first: 200, where: { language: $language }) {
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
	const { data: references } = await useAsyncQuery(referencesQuery, { language: locale.value.toUpperCase() })
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
		text-decoration: none;
		.category__image {
			position: relative;
			&::after {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				content: '';
				background: linear-gradient(360deg, rgba(0, 0, 0, 0.6) 11.28%, rgba(0, 0, 0, 0) 50%);
			}
		}
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

	.services-wrap {
		display: grid;
		grid-template-columns: repeat(2, minmax(1px, 1fr));
		gap: 30px;
		margin-top: 30px;
	}
	.service {
		display: flex;
		flex-direction: column;
	}
	.service__image {
		img {
			display: block;
		}
	}
	.service__content {
		background-color: $color-white;
		padding: 30px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		h3 {
			margin-top: 0;
			margin-bottom: em(15, 28);
			font-size: rem(28);
		}
		.btn {
			margin-top: auto;
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
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		gap: 20px;
		margin-bottom: 50px;
		.partner {
			max-width: 200px;
		}
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
					padding: em(10) clamp(10px, 3vw, 70px);
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
	.mobile-references {
		&__wrapper {
			button {
				width: 100%;
				border: 1px solid $color-bg;
				padding: em(10) em(20);
				text-align: left;
				font-weight: 700;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 10px;
				margin-bottom: 20px;
				&::after {
					content: '';
					display: block;
					width: 8px;
					height: 8px;
					border: 2px solid $color-black;
					border-style: none solid solid none;
					transform: rotate(45deg);
					transition: all 0.15s ease-in-out;
				}
			}
			&:not(.active) {
				.mobile-references__block {
					display: none;
				}
			}
			&.active {
				button {
					color: $color-secondary;
					&::after {
						transform: rotate(-135deg);
					}
				}
			}
		}
	}
	@media (max-width: 1150px) {
		.categories-grid {
			columns: 2;
		}
	}
	@media (max-width: 991px) {
		.categories-grid h3 {
			font-size: rem(22);
		}
	}
	@media (max-width: 820px) {
		.services-wrap {
			grid-template-columns: minmax(1px, 1fr);
		}
	}
	@media (max-width: 767px) {
		.service__content {
			padding: 30px 20px;
			h3 {
				font-size: rem(22);
			}
		}
		.partners {
			padding: 50px 0;
		}
	}
	@media (max-width: 650px) {
		.categories-grid {
			columns: unset;
		}
		.category {
			.category__image {
				position: absolute;
				width: 100%;
				height: 100%;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				&::after {
					background: rgba(0, 0, 0, 0.6);
				}
			}
			.category__content {
				position: initial;
			}
		}
	}
</style>
