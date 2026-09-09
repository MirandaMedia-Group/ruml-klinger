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
								(product) => product.productAcf.manufacturer?.some(item => item.slug === router.currentRoute.value.params.slug) && product.productCategories.nodes.some(item => selected.has(item.slug))
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
 const { locale } = useI18n()
 const { data: categories } = await useProductCategories()
 const selected = new Set(categories.value.productCategories.nodes.filter(item => item.productCategoriesAfc?.target?.includes('klinger')).map(item => item.slug))
	const productsAnchor = ref(null)
	const manufacturerProductsQuery = `query getProductByManufaturer($language: LanguageCodeFilterEnum!, $_cursor_products: String) {
  products(
    where: {language: $language, orderby: {field: MENU_ORDER, order: DESC}}
    first: 100
    after: $_cursor_products
  ) {
    nodes {
      id
      productCategories(first:100) { nodes { slug } pageInfo { hasNextPage endCursor } }
      slug
      title
      excerpt
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
      hasNextPage
      endCursor
    }
  }
}`
	const { data: manufacturerProducts, refresh, pending } = await useRequiredAsyncQuery(manufacturerProductsQuery, { language: locale.value.toUpperCase() })

	const manufaturerDetailQuery = `query getManufacturerDetail($slug: String!) {
  partners(where: {name: $slug}, first: 1) {
    nodes {
      id
      title
    }
  }
}`
	const { data: manufacturerDetail } = await useRequiredAsyncQuery(manufaturerDetailQuery, {
		slug: router.currentRoute.value.params.slug,
	})
 if (!manufacturerDetail.value.partners.nodes.length) throw createError({statusCode:404,statusMessage:'Not found'})
</script>
<style lang="scss"></style>
