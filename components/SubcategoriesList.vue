<template>
	<div class="subcategories" v-if="subcategoriesData">
		<ul v-if="subcategoriesData.productCategories.nodes.length == 1">
			<li
				v-for="(item, index) in sortByOrder(
					subcategoriesData.productCategories.nodes[0].children.nodes.filter((category) =>
						category.productCategoriesAfc.target?.includes('klinger')
					)
				)"
				:key="index"
				:style="{ backgroundImage: item.menuImage?.sourceUrl }">
				<NuxtLink :to="localePath(`/katalog-produktu/${routerSlug ? routerSlug + '/' : ''}${item.slug}`)">{{ item.name }}</NuxtLink>
			</li>
		</ul>
		<ul v-else class="subcategories">
			<li
				v-for="(item, index) in sortByOrder(
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
				<NuxtLink :to="localePath(`/katalog-produktu/${routerSlug ? routerSlug + '/' : ''}${item.slug}`)">{{ item.name }}</NuxtLink>
			</li>
		</ul>
	</div>
</template>
<script setup>
	const localePath = useLocalePath()
	const { locale } = useI18n()
	const router = useRouter()
	const language = useState('language')
	const sortByOrder = (object) => {
		const help = object.slice(0)
		help.sort((a, b) => {
			return (
				(a.productCategoriesAfc.order === null ? 1000 : a.productCategoriesAfc.order) -
				(b.productCategoriesAfc.order === null ? 1001 : b.productCategoriesAfc.order)
			)
		})
		return help
	}
	const routerSlug = ref(router.currentRoute.value.params.slug)
	routerSlug.value = router.currentRoute.value.params.slug?.length
		? router.currentRoute.value.params.slug.filter((slug) => slug !== '')
		: 0
	const slugVariable = ref({
		slug: routerSlug.value[routerSlug.value.length - 1] ? [routerSlug.value[routerSlug.value.length - 1]] : 0,
	})
	const productSubcategoriesQuery =
		routerSlug.value !== 0
			? gql`
					query getSubcategoriesKlinger($slug: [String], $language: LanguageCodeFilterEnum!) {
						productCategories(first: 100, where: { slug: $slug, language: $language }) {
							nodes {
								name
								slug
								productCategoriesAfc {
									order
									target
									menuImage {
										altText
										sourceUrl
										mediaDetails {
											height
											width
										}
									}
								}
								children {
									nodes {
										name
										slug
										productCategoriesAfc {
											order
											target
											menuImage {
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
						}
					}
			  `
			: gql`
					query getSubcategoriesKlinger($language: LanguageCodeFilterEnum!) {
						productCategories(first: 100, where: { parent: 0, language: $language }) {
							nodes {
								name
								slug
								productCategoriesAfc {
									order
									target
									menuImage {
										altText
										sourceUrl
										mediaDetails {
											height
											width
										}
									}
								}
								children {
									nodes {
										name
										slug
										productCategoriesAfc {
											order
											target
											menuImage {
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
						}
					}
			  `
	const { data: subcategoriesData } = await useAsyncQuery(
		productSubcategoriesQuery,
		routerSlug.value !== 0 ? { ...slugVariable.value, language: locale.value.toUpperCase() } : { language: locale.value.toUpperCase() }
	)
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
