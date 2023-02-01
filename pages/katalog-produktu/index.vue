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
				<ProductsBlock :data="allProducts?.products.nodes" />
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
	const allProducts = useState('allProducts', () => null)
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
	allProducts.value = allProductsData
</script>
<style lang="scss"></style>
