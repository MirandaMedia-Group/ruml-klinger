<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="">
					<!-- <div class="category__image"></div> -->
					<div class="category__info">
						<h1>Produkty</h1>
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
					<ProductsBlock
						v-else
						:data="allProductsData.products.nodes" />
				</div>
				<div class="pagination">
					<button
						class="button-prev"
						v-if="allProductsData.products.pageInfo.hasPreviousPage"
						@click.prevent="handlePrevPage">
						Předchozí
					</button>
					<button
						class="button-next"
						v-if="allProductsData.products.pageInfo.hasNextPage"
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
	const variables = ref({
		first: 15,
		last: null,
		after: null,
		before: null,
	})
	const handleNextPage = () => {
		setTimeout(() => productsAnchor.value.scrollIntoView(), 10)
		variables.value.after = allProductsData.value.products.pageInfo.endCursor
		variables.value.first = 15
		variables.value.before = null
		variables.value.last = null
		refresh()
	}
	const handlePrevPage = () => {
		setTimeout(() => productsAnchor.value.scrollIntoView(), 10)
		variables.value.before = allProductsData.value.products.pageInfo.startCursor
		variables.value.last = 15
		variables.value.first = null
		variables.value.after = null
		refresh()
	}
	const productsAnchor = ref(null)
	const screenWidth = useState('screenWidth')
	const allProductsQuery = gql`
		query getRootCategory($first: Int, $last: Int, $after: String, $before: String) {
			products(first: $first, last: $last, after: $after, before: $before) {
				nodes {
					slug
					title
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
					endCursor
					hasNextPage
					hasPreviousPage
					startCursor
				}
			}
		}
	`
	const { data: allProductsData, refresh, pending } = await useAsyncQuery(allProductsQuery, variables.value)
</script>
<style lang="scss">
	#products {
		scroll-padding-top: 200px;
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
