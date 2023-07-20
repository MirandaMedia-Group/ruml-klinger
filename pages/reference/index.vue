<template>
	<PageHeader>
		<h1>{{ $t('referencesPage.title') }}</h1>
		<p v-html="$t('referencesPage.perex')"></p>
	</PageHeader>
	<section class="container">
		<AnchorsBlock>
			<nav>
				<ul>
					<li v-for="(category, index) in sortByOrder(referenceCategories.referenceCategories.nodes)" :key="index">
						<a :href="`#${category.slug}`">{{ category.name }}</a>
					</li>
				</ul>
			</nav>
		</AnchorsBlock>
		<div
			class="reference-category"
			v-for="(category, index) in sortByOrder(referenceCategories.referenceCategories.nodes)"
			:id="category.slug"
			:key="index">
			<div class="reference-category__header">
				<NuxtPicture
					:src="category.referenceCategoryAcf.image.sourceUrl"
					:alt="category.referenceCategoryAcf.image.altText"
					:width="category.referenceCategoryAcf.image.mediaDetails.width"
					:height="category.referenceCategoryAcf.image.mediaDetails.height"
					loading="lazy"
					provider="ipx" />
				<h2>{{ category.name }}</h2>
			</div>
			<ReferencesList :references="references.references.nodes" :category="category" />
			<div v-if="category.referenceCategoryAcf.technologies" class="technologies center">
				<h3>{{ $t('referencesPage.usedTechnologies') }}</h3>
				<div v-html="category.referenceCategoryAcf.technologies"></div>
				<div class="buttons-wrapper">
					<NuxtLink :to="localePath(`/kontakty`) + `#formular`" class="btn btn-tertiary">{{
						$t('referencesPage.servicesInquiry')
					}}</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const { locale, t } = useI18n()
	const localePath = useLocalePath()
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
	const language = useState('language')
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

	const referencesQuery = gql`
		query getReferencesKlinger($language: LanguageCodeFilterEnum!) {
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
	.reference-category {
		&__header {
			position: relative;
			margin-bottom: 60px;
			h2 {
				position: absolute;
				bottom: 0;
				left: 0;
				font-size: rem(32);
				padding: em(20, 32);
				margin: 0;
				background-color: $color-bg-light;
				&::after {
					display: none;
				}
			}
		}
	}
	.technologies {
		background-color: rgba(214, 217, 227, 0.5);
		padding: 50px;
		text-align: left;
		margin-bottom: 80px;
		h3 {
			text-align: center;
			font-size: rem(16);
			margin-bottom: em(25, 16);
		}
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
			column-gap: 20px;
			li {
				font-size: rem(12);
				line-height: em(18, 12);
				position: relative;
				padding: em(5, 12) em(10, 12);
				padding-left: 18px;
				&::before {
					content: '';
					display: block;
					width: 9px;
					height: 9px;
					background-color: $color-secondary;
					position: absolute;
					left: 0;
					top: 0.7em;
				}
			}
		}
	}
	@media (max-width: 767px) {
		.reference-category {
			&__header {
				height: 240px;
				margin-bottom: 20px;
				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}
			h2 {
				font-size: rem(24);
			}
		}
		.technologies {
			padding: 20px;
			ul {
				grid-template-columns: minmax(1px, 1fr);
			}
		}
	}
</style>
