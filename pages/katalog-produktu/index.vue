<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<!-- <div class="category__image"></div> -->
					<div class="category__info">
						<h1>Produkty</h1>
					</div>
				</div>
				<div v-if="screenWidth <= 900">
					<CategoriesBox />
				</div>
				<ProductsBlock :data="allProductsData.products.nodes" />
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
		variables.value.after = allProductsData.value.products.pageInfo.endCursor
		variables.value.first = 15
		variables.value.before = null
		variables.value.last = null
		allProductRefresh()
	}
	const handlePrevPage = () => {
		variables.value.before = allProductsData.value.products.pageInfo.startCursor
		variables.value.last = 15
		variables.value.first = null
		variables.value.after = null
		allProductRefresh()
	}
	const screenWidth = useState('screenWidth')
	const allProductsQuery = gql`
		query ($first: Int, $last: Int, $after: String, $before: String) {
			products(first: $first, last: $last, after: $after, before: $before) {
				nodes {
					slug
					title
					productAcf {
						shortDescription
						gallery {
							sourceUrl
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
	const { data: allProductsData, refresh: allProductRefresh } = await useAsyncQuery(allProductsQuery, variables.value)
</script>
