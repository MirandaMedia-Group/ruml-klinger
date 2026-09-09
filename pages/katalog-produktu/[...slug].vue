<template>
	<div>
		<div class="container">
			<Breadcrumbs :sublinks="breadcrumbsSublinks" />
		</div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<div
						v-if="categoryInfo.productCategoriesAfc?.featuredimage?.sourceUrl"
						class="category__image">
						<NuxtPicture sizes="xs:100vw sm:100vw md:300px" format="webp" decoding="async"
							:src="categoryInfo.productCategoriesAfc.featuredimage.sourceUrl"
							:alt="categoryInfo.productCategoriesAfc.featuredimage.altText"
							:width="categoryInfo.productCategoriesAfc.featuredimage.mediaDetails?.width"
							:height="categoryInfo.productCategoriesAfc.featuredimage.mediaDetails?.height"
							loading="lazy"

							:img-attrs="{ style: 'display: block; height: 100%; object-fit: cover;' }" />
					</div>
					<div class="category__info">
						<h1>{{ categoryInfo.name }}</h1>
						<p>{{ categoryInfo.description }}</p>
					</div>
				</div>
				<div class="mobile-900">
					<CategoriesBox />
				</div>
				<div class="desktop-900">
					<SubcategoriesList />
				</div>
				<div id="products" ref="productsAnchor">
					<div v-if="pending">
						<LoadingCircle />
					</div>
					<div
						class="center"
						v-else-if="!categoryProducts?.nodes?.length">
						<p><strong>Tato kategorie neobsahuje žádné produkty.</strong></p>
					</div>
					<ProductsBlock
						v-else
						:data="categoryProducts.nodes"
						:banner="categoryInfo.productCategoriesAfc?.banner?.[0]" />
				</div>
				<div class="pagination">
					<!-- <button
						class="load-more"
						v-if="categoryProductsData.productCategories.nodes[0].contentNodes.pageInfo.hasNextPage"
						@click.prevent="loadMoreProducts">
						Načíst další
					</button> -->
					<button
						class="button-prev" :disabled="pending" :aria-label="locale === 'en' ? 'Previous page' : 'Předchozí stránka'"
						v-if="categoryProducts?.pageInfo?.hasPreviousPage"
						@click.prevent="handlePrevPage">
						<span class="arrow"></span>
					</button>
					<button
						class="button-next" :disabled="pending" :aria-label="locale === 'en' ? 'Next page' : 'Další stránka'"
						v-if="categoryProducts?.pageInfo?.hasNextPage"
						@click.prevent="handleNextPage">
						<span class="arrow"></span>
					</button>
				</div>
			</template>
			<template #sidebar>
				<CategorySidebar />
			</template>
		</NuxtLayout>
	</div>
</template>
<script setup>
 import { categoryPath } from "~/utils/catalogue-paths"
	const { locale } = useI18n()
	definePageMeta({
		layout: false,
	})
	const router = useRouter()
	const productsCount = useState('productsCount', () => 15)
	const routerSlug = ref(router.currentRoute.value.params.slug)
	routerSlug.value = router.currentRoute.value.params.slug.filter((slug) => slug !== '')
	const slugVariable = ref({
		slug: routerSlug.value[routerSlug.value.length - 1] ? [routerSlug.value[routerSlug.value.length - 1]] : [],
	})
	const variables = ref({
		first: 15,
		last: null,
		after: null,
		before: null,
		slug: routerSlug.value[routerSlug.value.length - 1] ? [routerSlug.value[routerSlug.value.length - 1]] : [],
	})
	const productsAnchor = ref(null)
	const handleNextPage = () => {
		const pageInfo = categoryProductsData.value?.productCategories?.nodes?.[0]?.contentNodes?.pageInfo
		if (!pageInfo?.hasNextPage) return

		productsCount.value = 15
		setTimeout(() => productsAnchor.value?.scrollIntoView(), 10)
		variables.value = { ...variables.value, after: pageInfo.endCursor, first: 15, before: null, last: null }
	}
	const handlePrevPage = () => {
		const pageInfo = categoryProductsData.value?.productCategories?.nodes?.[0]?.contentNodes?.pageInfo
		if (!pageInfo?.hasPreviousPage) return

		productsCount.value = 15
		setTimeout(() => productsAnchor.value?.scrollIntoView(), 10)
		variables.value = { ...variables.value, before: pageInfo.startCursor, last: 15, first: null, after: null }
	}









	const categoryInfoQuery = `query getCategoryInfo($slug: [String]) {
  productCategories(where: {slug: $slug}, first: 1) {
    nodes {
      name
      slug
      description
      productCategoriesAfc {
        featuredimage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        banner {
          ... on CategoryBanner {
            id
            title
            slug
            excerpt
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
            categoryBanners {
              btnUrl
              btnText
            }
          }
        }
      }
      parent {
        node {
          name
          slug
          parent {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
}`
	const { data: categoryInfoData } = await useRequiredAsyncQuery(categoryInfoQuery, slugVariable.value)
	const categoryInfo = computed(() => categoryInfoData.value?.productCategories?.nodes?.[0] ?? null)

	if (!categoryInfo.value) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Kategorie nebyla nalezena',
		})
	}

 const { data: categories } = await useProductCategories()
 const categoryNodes = categories.value.productCategories.nodes
 const category = categoryNodes.find(item => item.slug === categoryInfo.value.slug && item.productCategoriesAfc?.target?.includes('klinger'))
 if (!category || categoryPath(categoryNodes,category.slug) !== '/katalog-produktu/'+routerSlug.value.join('/')) throw createError({statusCode:404,statusMessage:'Not found'})
 const parts = categoryPath(categoryNodes,category.slug).replace('/katalog-produktu/','').split('/')
 const breadcrumbsSublinks = parts.map((slug,index) => ({name:categoryNodes.find(item=>item.slug===slug).name,url:'/katalog-produktu/'+parts.slice(0,index+1).join('/')}))

	const categoryProductsQuery = `query getProducts($first: Int, $last: Int, $after: String, $before: String, $slug: [String]) {
  productCategories(where: {slug: $slug}, first: 1) {
    nodes {
      contentNodes(
        first: $first
        last: $last
        after: $after
        before: $before
        where: {orderby: {field: MENU_ORDER, order: DESC}}
      ) {
        nodes {
          ... on Product {
            id
            excerpt
            title
            slug
            productAcf {
              shortDescription
              gallery {
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
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
}`

	const { data: categoryProductsData, refresh, pending } = await useRequiredAsyncQuery(categoryProductsQuery, () => variables.value)
	const categoryProducts = computed(() => categoryProductsData.value?.productCategories?.nodes?.[0]?.contentNodes ?? null)
</script>
<style lang="scss">
	.category__header {
		margin-bottom: 30px;
		display: flex;
		flex-wrap: wrap;
	}
	.category__image {
		flex: 1 1 70px;
	}
	.category__info {
		flex: 1 1 520px;
		background-color: $color-white;
		padding: 50px;
		p:last-child {
			margin-bottom: 0;
		}
	}
	@media (max-width: 767px) {
		.category__header {
			margin-bottom: 20px;
		}
		.category__info {
			padding: 20px;
		}
	}
	.pagination {
		display: flex;
		align-items: stretch;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 30px;
		padding-top: 30px;
		border-top: 1px solid $color-inactive;
		.load-more {
			margin-right: auto;
		}
		.button-prev,
		.button-next {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			height: 44px;
			border: 1px solid $color-secondary;
			border-radius: 4px;
			font-weight: 700;
			padding: 0;
			.arrow {
				display: block;
				width: 12px;
				height: 12px;
				border: 2px solid $color-black;
				border-style: none solid solid none;
				transform: rotate(-45deg);
				position: relative;
				left: -3px;
			}
		}
		.button-prev {
			.arrow {
				transform: rotate(135deg);
				left: unset;
				right: -3px;
			}
		}
	}
</style>
