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
						<NuxtLink external no-prefetch :to="localePath(`/sluzby/${item.slug}`)"> {{ item.title }}</NuxtLink>
					</li>
				</ul>
			</section>
			<section v-if="searchCategories.productCategories.nodes.length" class="container">
				<div class="narrow center">
					<h2>{{ $t('categories') }}</h2>
				</div>
				<ul class="search-results">
					<li v-for="(item, index) in searchCategories.productCategories.nodes" :key="index">
						<NuxtLink external no-prefetch :to="localePath(categoryUrl(item.slug))">{{
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
								 />
						</div>
						<h2 class="partner__title">{{ partner.title }}</h2>
						<div class="partner__excerpt" v-html="partner.excerpt"></div>
						<div class="buttons-wrapper align-center justify-start">
							<NuxtLink external no-prefetch :to="localePath(`/katalog-produktu/vyrobce/${partner.slug}`)" class="btn btn-primary">{{
								$t('showProducts')
							}}</NuxtLink>
							<NuxtLink external no-prefetch :to="localePath(`/partneri/${partner.slug}`)">{{ $t('moreAboutPartner') }}</NuxtLink>
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
 import { categoryPath } from "~/utils/catalogue-paths"
	const localePath = useCmsLocalePath()
	const router = useRouter()
 const { data: categoryList } = await useProductCategories()
 const selected = new Set(categoryList.value.productCategories.nodes.filter(item => item.productCategoriesAfc?.target?.includes('klinger')).map(item => item.slug))
 const categoryUrl = slug => categoryPath(categoryList.value.productCategories.nodes, slug)

	const language = useState('language')
	const { locale, t } = useI18n()
	const variables = ref({
		search: String(router.currentRoute.value.query.search || ''),
		language: locale.value.toUpperCase(),
	})
	const localeIDs = {
		services: {
			cs: 'cG9zdDo1OTg=',
			en: 'cG9zdDozODQ3',
		},
	}

	const searchQuery = `query KlingerSearch($search: String!, $language: LanguageCodeFilterEnum!, $_cursor_products: String, $localeID: ID!, $_cursor_pages: String, $_cursor_partners: String, $_cursor_productCategories: String) {
  rawProducts_products: products(
    where: {search: $search, language: $language}
    first: 100
    after: $_cursor_products
  ) {
    nodes {
      id
      productCategories(first: 100) {
        nodes {
          slug
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
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
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  searchServices_pages: pages(
    where: {search: $search, parent: $localeID, language: $language}
    first: 100
    after: $_cursor_pages
  ) {
    nodes {
      slug
      title
      parent {
        node {
          slug
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  searchPartners_partners: partners(
    where: {search: $search, language: $language}
    first: 100
    after: $_cursor_partners
  ) {
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
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  rawCategories_productCategories: productCategories(
    where: {search: $search, language: $language}
    first: 100
    after: $_cursor_productCategories
  ) {
    nodes {
      name
      slug
      parent {
        node {
          slug
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`
const { data: searchData, pending } = await useRequiredAsyncQuery(searchQuery, { ...variables.value, localeID: localeIDs.services[locale.value] })
const pendingProducts = pending
const rawProducts = computed(() => ({ products: searchData.value.rawProducts_products }))
const pendingServices = pending
const searchServices = computed(() => ({ pages: searchData.value.searchServices_pages }))
const pendingPartners = pending
const searchPartners = computed(() => ({ partners: searchData.value.searchPartners_partners }))
const pendingCategories = pending
const rawCategories = computed(() => ({ productCategories: searchData.value.rawCategories_productCategories }))












 const searchProducts = computed(() => ({ products: { nodes: rawProducts.value.products.nodes.filter(p => p.productCategories.nodes.some(c => selected.has(c.slug))) } }))
 const searchCategories = computed(() => ({ productCategories: { nodes: rawCategories.value.productCategories.nodes.filter(c => selected.has(c.slug)) } }))
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
