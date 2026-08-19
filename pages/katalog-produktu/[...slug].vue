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
						<NuxtPicture
							:src="categoryInfo.productCategoriesAfc.featuredimage.sourceUrl"
							:alt="categoryInfo.productCategoriesAfc.featuredimage.altText"
							:width="categoryInfo.productCategoriesAfc.featuredimage.mediaDetails?.width"
							:height="categoryInfo.productCategoriesAfc.featuredimage.mediaDetails?.height"
							loading="lazy"
							provider="ipx"
							:img-attrs="{ style: 'display: block; height: 100%; object-fit: cover;' }" />
					</div>
					<div class="category__info">
						<h1>{{ categoryInfo.name }}</h1>
						<p>{{ categoryInfo.description }}</p>
					</div>
				</div>
				<div v-if="screenWidth <= 900">
					<CategoriesBox />
				</div>
				<div v-else>
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
						class="button-prev"
						v-if="categoryProducts?.pageInfo?.hasPreviousPage"
						@click.prevent="handlePrevPage">
						<span class="arrow"></span>
					</button>
					<button
						class="button-next"
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
	const { locale } = useI18n()
	definePageMeta({
		layout: false,
	})
	const screenWidth = useState('screenWidth')
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
		variables.value.after = pageInfo.endCursor
		variables.value.first = productsCount.value
		variables.value.before = null
		variables.value.last = null
		refresh()
	}
	const handlePrevPage = () => {
		const pageInfo = categoryProductsData.value?.productCategories?.nodes?.[0]?.contentNodes?.pageInfo
		if (!pageInfo?.hasPreviousPage) return

		productsCount.value = 15
		setTimeout(() => productsAnchor.value?.scrollIntoView(), 10)
		variables.value.before = pageInfo.startCursor
		variables.value.last = productsCount.value
		variables.value.first = null
		variables.value.after = null
		refresh()
	}
	// const loadMoreProducts = () => {
	// 	productsCount.value += 15
	// 	variables.value.first = productsCount.value
	// 	variables.value.after = categoryProductsData.value.productCategories.nodes[0].contentNodes.pageInfo.startCursor
	// 	variables.value.before = null
	// 	variables.value.last = null
	// 	refresh()
	// }

	const categoryInfoQuery = gql`
		query getCategoryInfo($slug: [String]) {
			productCategories(where: { slug: $slug }) {
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
		}
	`
	const { data: categoryInfoData } = await useAsyncQuery(categoryInfoQuery, slugVariable.value)
	const categoryInfo = computed(() => categoryInfoData.value?.productCategories?.nodes?.[0] ?? null)

	if (!categoryInfo.value) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Kategorie nebyla nalezena',
		})
	}

	const breadcrumbsSublinks = ref(
		categoryInfo.value.parent?.node.parent
			? [
					{
						url: `/katalog-produktu/${categoryInfo.value.parent.node.parent.node.slug}`,
						name: categoryInfo.value.parent.node.parent.node.name,
					},
					{
						url: `/katalog-produktu/${categoryInfo.value.parent.node.parent.node.slug}/${categoryInfo.value.parent?.node.slug}`,
						name: categoryInfo.value.parent?.node.name,
					},
					{
						url: `/katalog-produktu/${categoryInfo.value.parent.node.parent.node.slug}/${categoryInfo.value.parent?.node.slug}/${categoryInfo.value.slug}`,
						name: categoryInfo.value.name,
					},
			  ]
			: categoryInfo.value.parent
			? [
					{
						url: `/katalog-produktu/${categoryInfo.value.parent?.node.slug}/`,
						name: categoryInfo.value.parent?.node.name,
					},
					{
						url: `/katalog-produktu/${categoryInfo.value.parent?.node.slug}/${categoryInfo.value.slug}`,
						name: categoryInfo.value.name,
					},
			  ]
			: [
					{
						url: `/katalog-produktu/${categoryInfo.value.slug}`,
						name: categoryInfo.value.name,
					},
			  ]
	)
	const categoryProductsQuery = gql`
		query getProducts($first: Int, $last: Int, $after: String, $before: String, $slug: [String]) {
			productCategories(where: { slug: $slug }) {
				nodes {
					contentNodes(
						first: $first
						last: $last
						after: $after
						before: $before
						where: { orderby: { field: MENU_ORDER, order: DESC } }
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
		}
	`

	const { data: categoryProductsData, refresh, pending } = await useAsyncQuery(categoryProductsQuery, variables.value)
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
