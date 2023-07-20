<template>
	<PageHeader>
		<h1>{{ $t('searchResultsPage.searchResults') }}</h1>
		<p>
			{{ $t('searchResultsPage.forTerm') }}: <strong>{{ variables.search }}</strong>
		</p>
	</PageHeader>
	<div v-if="pendingPartners || pendingProducts || pendingServices || pendingCategories">
		<LoadingCircle />
	</div>
	<div v-else>
		<section
			v-if="
				!searchServices.pages.nodes.length &&
				!searchPartners.partners.nodes.length &&
				!searchProducts.products.nodes?.length &&
				!searchCategories.productCategories.nodes.length
			">
			<div class="container narrow center">
				<p>
					{{ $t('searchResultsPage.notFound') }}: <strong>{{ variables.search }}</strong>
				</p>
			</div>
		</section>
		<div v-else>
			<section v-if="searchServices.pages.nodes.length" class="container">
				<div class="narrow center">
					<h2>{{ $t('services') }}</h2>
				</div>
				<ul class="search-results">
					<li v-for="(item, index) in searchServices.pages.nodes" :key="index">
						<NuxtLink :to="localePath(`/${item.parent.node.slug}`) + `/` + item.slug"> {{ item.title }}</NuxtLink>
					</li>
				</ul>
			</section>
			<section v-if="searchCategories.productCategories.nodes.length" class="container">
				<div class="narrow center">
					<h2>{{ $t('categories') }}</h2>
				</div>
				<ul class="search-results">
					<li v-for="(item, index) in searchCategories.productCategories.nodes" :key="index">
						<NuxtLink :to="localePath(`/katalog-produktu/${item.parent ? item.parent.node.slug + '/' : ''}${item.slug}`)">{{
							item.name
						}}</NuxtLink>
					</li>
				</ul>
			</section>
			<section v-if="searchPartners.partners.nodes.length" class="container">
				<div class="narrow center">
					<h2>{{ $t('partners') }}</h2>
				</div>
				<div class="partners-grid">
					<div class="partner" v-for="(partner, index) in searchPartners.partners.nodes" :key="index">
						<div class="partner__image">
							<NuxtPicture
								:src="partner.featuredImage.node.sourceUrl"
								:alt="partner.featuredImage.node.altText"
								:width="partner.featuredImage.node.mediaDetails.width"
								:height="partner.featuredImage.node.mediaDetails.height"
								loading="lazy"
								provider="ipx" />
						</div>
						<h2 class="partner__title">{{ partner.title }}</h2>
						<div class="partner__excerpt" v-html="partner.excerpt"></div>
						<div class="buttons-wrapper align-center justify-start">
							<NuxtLink :to="localePath(`/katalog-produktu/vyrobce/${partner.slug}`)" class="btn btn-primary">{{
								$t('showProducts')
							}}</NuxtLink>
							<NuxtLink :to="localePath(`/partneri/${partner.slug}`)">{{ $t('moreAboutPartner') }}</NuxtLink>
						</div>
					</div>
				</div>
			</section>
			<section v-if="searchProducts.products.nodes?.length" class="container">
				<div class="narrow center">
					<h2>{{ $t('products') }}</h2>
				</div>
				<ProductsBlock :data="searchProducts.products.nodes" />
			</section>
		</div>
	</div>
</template>
<script setup>
	const localePath = useLocalePath()
	const router = useRouter()
	const language = useState('language')
	const { locale, t } = useI18n()
	const variables = ref({
		search: router.currentRoute.value.query.search,
		language: locale.value.toUpperCase(),
	})
	const localeIDs = {
		services: {
			cs: 'cG9zdDo1OTg=',
			en: 'cG9zdDozODQ3',
		},
	}
	watch(router.currentRoute, (route) => {
		variables.value.search = route.query.search
		refreshPartners()
		refreshProducts()
		refreshServices()
		refreshCategories()
	})

	const searchProductsQuery = gql`
		query searchProducts($search: String!, $language: LanguageCodeFilterEnum!) {
			products(where: { search: $search, language: $language }) {
				nodes {
					slug
					title
					excerpt
					productAcf {
						shortDescription
						gallery {
							sourceUrl
							mediaDetails {
								width
								height
							}
						}
					}
				}
			}
		}
	`
	const {
		data: searchProducts,
		refresh: refreshProducts,
		pending: pendingProducts,
	} = await useAsyncQuery(searchProductsQuery, variables.value)

	const searchServicesQuery = gql`
		query searchServices($search: String!, $language: LanguageCodeFilterEnum!, $localeID: ID!) {
			pages(where: { search: $search, parent: $localeID, language: $language }) {
				nodes {
					slug
					title
					parent {
						node {
							slug
						}
					}
				}
			}
		}
	`
	const {
		data: searchServices,
		refresh: refreshServices,
		pending: pendingServices,
	} = await useAsyncQuery(searchServicesQuery, { ...variables.value, localeID: localeIDs.services[locale.value] })
	console.log(searchServices.value)

	const searchPartnersQuery = gql`
		query searchPartners($search: String!, $language: LanguageCodeFilterEnum!) {
			partners(where: { search: $search, language: $language }) {
				nodes {
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
					slug
					title
					excerpt
				}
			}
		}
	`
	const {
		data: searchPartners,
		refresh: refreshPartners,
		pending: pendingPartners,
	} = await useAsyncQuery(searchPartnersQuery, variables.value)

	const productCategoriesQuery = gql`
		query searchCategories($search: String!, $language: LanguageCodeFilterEnum!) {
			productCategories(where: { search: $search, language: $language }) {
				nodes {
					name
					slug
					parent {
						node {
							slug
						}
					}
				}
			}
		}
	`
	const {
		data: searchCategories,
		pending: pendingCategories,
		refresh: refreshCategories,
	} = await useAsyncQuery(productCategoriesQuery, variables.value)
</script>
<style lang="scss">
	ul.search-results {
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			line-height: em(26);
			padding-left: 16px;
			position: relative;
			a {
				color: $color-primary-light;
			}
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6px;
				height: 6px;
				background-color: $color-secondary;
				border-radius: 50%;
			}
		}
	}
</style>
