<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="">
					<div class="">
						<h1>
							{{ $t('manufacturerProducts') }} <strong>{{ manufacturerDetail.partners.nodes[0].title }}</strong>
						</h1>
					</div>
				</div>
				<div id="products" ref="productsAnchor">
					<div v-if="pending">
						<LoadingCircle />
					</div>
					<ProductsBlock
						v-else
						:data="
							manufacturerProducts.products.nodes.filter(
								(product) => product.productAcf.manufacturer?.[0].slug === router.currentRoute.value.params.slug
							)
						" />
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
	const router = useRouter()
	const productsAnchor = ref(null)
	const screenWidth = useState('screenWidth')
	const manufacturerProductsQuery = gql`
		query getProductByManufaturer {
			products(first: 1000, where: { orderby: { field: MENU_ORDER, order: DESC } }) {
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
						manufacturer {
							... on Partner {
								id
								slug
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
	const { data: manufacturerProducts, refresh, pending } = await useAsyncQuery(manufacturerProductsQuery)

	const manufaturerDetailQuery = gql`
		query getManufacturerDetail($slug: String!) {
			partners(where: { name: $slug }) {
				nodes {
					id
					title
				}
			}
		}
	`
	const { data: manufacturerDetail } = await useAsyncQuery(manufaturerDetailQuery, {
		slug: router.currentRoute.value.params.slug,
	})
</script>
<style lang="scss"></style>
