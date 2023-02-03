<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<div class="category__image"></div>
					<div class="category__info">
						<h1>Produkty</h1>
					</div>
				</div>
				<div v-if="screenWidth <= 900">
					<CategoriesBox />
				</div>
				<ProductsBlock :data="allProductsData.products.nodes" />
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
	const allProductsQuery = gql`
		query {
			products(first: 30) {
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
			}
		}
	`
	const { data: allProductsData } = await useAsyncQuery(allProductsQuery)
</script>
