<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<div class="category__image"></div>
					<div class="category__info">
						<h1>{{ categoryInfo.productCategories.nodes[0].name }}</h1>
						<p>{{ categoryInfo.productCategories.nodes[0].description }}</p>
					</div>
				</div>
				<ProductsBlock :data="categoryProducts.productCategories.nodes[0].contentNodes.nodes" />
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
	const router = useRouter()
	const categoryInfo = ref(null)
	const categoryProducts = ref(null)

	const categoryInfoQuery = gql`
		query {
			productCategories(where: { slug: "${router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]}" }) {
				nodes {
					name
					slug
					description
				}
			}

		}
	`
	const { data: categoryInfoData } = await useAsyncQuery(categoryInfoQuery)
	categoryInfo.value = categoryInfoData

	const categoryProductsQuery = gql`
		query {
			productCategories(where: { slug: "${router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]}" }) {
				nodes {
					contentNodes(first: 30) {
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
					}
				}
			}
		}
	`
	const { data: categoryProductsData } = await useAsyncQuery(categoryProductsQuery)
	categoryProducts.value = categoryProductsData
</script>
<style lang="scss">
	.category__header {
		margin-bottom: 30px;
	}
	.category__info {
		background-color: $color-white;
		padding: 50px;
		p:last-child {
			margin-bottom: 0;
		}
	}
</style>
