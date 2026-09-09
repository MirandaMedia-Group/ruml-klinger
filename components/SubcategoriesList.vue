<template>
	<div class="subcategories" v-if="subcategoriesData">
		<ul v-if="routerSlug && subcategoriesData.productCategories.nodes.length == 1">
			<li
				v-for="(item, index) in sortProductCategories(
					subcategoriesData.productCategories.nodes[0].children.nodes.filter((category) =>
						category.productCategoriesAfc.target?.includes('klinger')
					)
				)"
				:key="index"
				:style="{ backgroundImage: item.menuImage?.sourceUrl }">
				<NuxtLink external no-prefetch :to="localePath(`/katalog-produktu/${routerSlug ? routerSlug + '/' : ''}${item.slug}`)">{{ item.name }}</NuxtLink>
			</li>
		</ul>
		<ul v-else class="subcategories">
			<li
				v-for="(item, index) in sortProductCategories(
					subcategoriesData.productCategories.nodes.filter((category) =>
						category.productCategoriesAfc.target?.includes('klinger')
					)
				)"
				:key="index"
				:style="{
					backgroundImage: `url(${
						item.productCategoriesAfc.menuImage?.sourceUrl ? item.productCategoriesAfc.menuImage?.sourceUrl : ''
					})`,
				}">
				<NuxtLink external no-prefetch :to="localePath(`/katalog-produktu/${routerSlug ? routerSlug + '/' : ''}${item.slug}`)">{{ item.name }}</NuxtLink>
			</li>
		</ul>
	</div>
</template>
<script setup>
 import { sortProductCategories } from '~/utils/product-category-order'
	const localePath = useCmsLocalePath()
	const router = useRouter()
	const { locale } = useI18n()

 const routerSlug = (useRoute().params.slug || []).filter(Boolean).join('/')
 const { data: categoryList } = await useProductCategories()
 const tree = useCategoryTree(categoryList)
 const subcategoriesData = computed(() => {
  const slug = routerSlug.split('/').at(-1)
  if (!slug) return tree.value
  const find = nodes => { for (const node of nodes) { if (node.slug === slug) return node; const child = find(node.children.nodes); if (child) return child } }
  const category = find(tree.value.productCategories.nodes)
  return { productCategories: { nodes: category ? [category] : [] } }
 })
</script>
<style lang="scss" scoped>
	.subcategories {
		ul {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
			gap: 30px;
			list-style: none;
			margin: 0;
			padding: 0;
			margin-bottom: 30px;
			li {
				background-color: $color-primary;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				position: relative;
				&::before {
					content: '';
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.3);
				}
				a {
					padding: em(10) em(20);
					display: flex;
					align-items: center;
					justify-content: center;
					min-height: 100px;
					text-decoration: none;
					color: $color-white;
					font-weight: 700;
					text-align: center;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					position: relative;
				}
			}
		}
	}
</style>
