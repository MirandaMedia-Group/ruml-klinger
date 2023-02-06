<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<div
						v-if="categoryInfoData.productCategories.nodes[0].productCategoriesAfc?.featuredimage"
						class="category__image">
						<NuxtPicture
							:src="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.sourceUrl"
							:alt="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.altText"
							:width="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.mediaDetails.width"
							:height="categoryInfoData.productCategories.nodes[0].productCategoriesAfc.featuredimage.mediaDetails.height"
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
				<ProductsBlock :data="categoryProductsData.productCategories.nodes[0].contentNodes.nodes" />
				<div class="pagination">
					<button
						class="button-prev"
						v-if="categoryProductsData.productCategories.nodes[0].contentNodes.pageInfo.hasPreviousPage"
						@click.prevent="handlePrevPage">
						Předchozí
					</button>
					<button
						class="button-next"
						v-if="categoryProductsData.productCategories.nodes[0].contentNodes.pageInfo.hasNextPage"
						@click.prevent="handleNextPage">
						Další
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
	const variables = ref({
		first: 15,
		last: null,
		after: null,
		before: null,
	})

	const handleNextPage = () => {
		variables.value.after = categoryProductsData.value.productCategories.nodes[0].contentNodes.pageInfo.endCursor
		variables.value.first = 15
		variables.value.before = null
		variables.value.last = null
		categoryProductsRefresh()
	}
	const handlePrevPage = () => {
		variables.value.before = categoryProductsData.value.productCategories.nodes[0].contentNodes.pageInfo.startCursor
		variables.value.last = 15
		variables.value.first = null
		variables.value.after = null
		categoryProductsRefresh()
	}

	const categoryInfoQuery = gql`
		query {
			productCategories(where: { slug: "${router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]}" }) {
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
					}
				}
			}

		}
	`
	const { data: categoryInfoData } = await useAsyncQuery(categoryInfoQuery)

	const categoryProductsQuery = gql`
		query ($first: Int, $last: Int, $after: String, $before: String) {
			productCategories(where: { slug: "${router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]}" }) {
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
	const { data: categoryProductsData, refresh: categoryProductsRefresh } = await useAsyncQuery(categoryProductsQuery, variables.value)
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
		.button-prev,
		.button-next {
			display: block;
			padding: em(10) em(20);
			border: 1px solid $color-secondary;
			border-radius: 4px;
			font-weight: 700;
		}
	}
</style>
