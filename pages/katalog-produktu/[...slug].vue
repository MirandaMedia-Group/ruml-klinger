<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="category__header">
					<div class="category__image"></div>
					<div class="category__info">
						<h1>{{ categoryInfoData.productCategories.nodes[0].name }}</h1>
						<p>{{ categoryInfoData.productCategories.nodes[0].description }}</p>
					</div>
				</div>
				<div v-if="screenWidth <= 900">
					<CategoriesBox />
				</div>
				<ProductsBlock :data="categoryProductsData.productCategories.nodes[0].contentNodes.nodes" />
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
	@media (max-width: 767px) {
		.category__header {
			margin-bottom: 20px;
		}
		.category__info {
			padding: 20px;
		}
	}
</style>
