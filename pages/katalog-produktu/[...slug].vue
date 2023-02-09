<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<div
						v-if="categoryInfoData.productCategories.nodes[0].productCategoriesAfc?.featuredimage?.sourceUrl"
						class="category__image">
						<NuxtPicture
							:src="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.sourceUrl"
							:alt="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.altText"
							:width="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.mediaDetails.width"
							:height="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.mediaDetails.height"
							loading="lazy"
							provider="ipx"
							:img-attrs="{ style: 'display: block; height: 100%; object-fit: cover;' }" />
					</div>
					<div class="category__info">
						<h1>{{ categoryInfoData.productCategories.nodes[0].name }}</h1>
						<p>{{ categoryInfoData.productCategories.nodes[0].description }}</p>
					</div>
				</div>
				<div v-if="screenWidth <= 900">
					<CategoriesBox />
				</div>
				<div
					id="products"
					ref="productsAnchor">
					<div v-if="pending">
						<LoadingCircle />
					</div>
					<div
						class="center"
						v-else-if="!categoryProductsData.productCategories.nodes[0].contentNodes.nodes.length">
						<p><strong>Tato kategorie neobsahuje žádné produkty ...</strong></p>
					</div>
					<ProductsBlock
						v-else
						:data="categoryProductsData.productCategories.nodes[0].contentNodes.nodes"
						:banner="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.banner?.[0]" />
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
						v-if="categoryProductsData.productCategories.nodes[0].contentNodes.pageInfo.hasPreviousPage"
						@click.prevent="handlePrevPage">
						<span class="arrow"></span>
					</button>
					<button
						class="button-next"
						v-if="categoryProductsData.productCategories.nodes[0].contentNodes.pageInfo.hasNextPage"
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
	definePageMeta({
		layout: false,
	})
	const screenWidth = useState('screenWidth')
	const router = useRouter()
	const productsCount = useState('productsCount', () => 15)
	const routerSlug = ref(router.currentRoute.value.params.slug)
	routerSlug.value = router.currentRoute.value.params.slug.filter((slug) => slug !== '')
	const slugVariable = ref({
		slug: routerSlug.value[routerSlug.value - 1] ? [routerSlug.value[routerSlug.value - 1]] : [],
	})
	const variables = ref({
		first: 15,
		last: null,
		after: null,
		before: null,
		slug: routerSlug.value[routerSlug.value - 1] ? [routerSlug.value[routerSlug.value - 1]] : [],
	})
	const productsAnchor = ref(null)
	const handleNextPage = () => {
		productsCount.value = 15
		setTimeout(() => productsAnchor.value.scrollIntoView(), 10)
		console.log(variables.value)
		variables.value.after = categoryProductsData.value.productCategories.nodes[0].contentNodes.pageInfo.endCursor
		variables.value.first = productsCount.value
		variables.value.before = null
		variables.value.last = null
		refresh()
	}
	const handlePrevPage = () => {
		productsCount.value = 15
		setTimeout(() => productsAnchor.value.scrollIntoView(), 10)
		variables.value.before = categoryProductsData.value.productCategories.nodes[0].contentNodes.pageInfo.startCursor
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
				}
			}
		}
	`
	const categoryInfoData = useState('categoryInfoData', () => null)
	const { data } = await useAsyncQuery(categoryInfoQuery, slugVariable.value)
	categoryInfoData.value = data.value

	const categoryProductsQuery = gql`
		query getProducts($first: Int, $last: Int, $after: String, $before: String, $slug: [String]) {
			productCategories(where: { slug: $slug }) {
				nodes {
					contentNodes(first: $first, last: $last, after: $after, before: $before) {
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
