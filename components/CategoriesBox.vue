<template>
	<nav v-if="screenWidth > 900">
		<ul class="menu__level-1">
			<li
				v-for="(level1, index1) in categoriesData.productCategories.nodes"
				:class="{ 'has-children': level1?.children.nodes.length, expanded: $route.fullPath.indexOf(level1.slug) >= 0 }"
				:key="index1">
				<NuxtLink
					:to="`/katalog-produktu/${level1.slug}`"
					:class="{ 'router-link-active': $route.fullPath.indexOf(level1.slug) >= 0 }">
					{{ level1.name }}
					<span
						v-if="level1?.children.nodes.length"
						class="expand"
						@click.prevent="toggleExpanded">
					</span>
				</NuxtLink>
				<ul class="menu__level-2">
					<li
						v-for="(level2, index2) in level1?.children?.nodes"
						:key="index2">
						<NuxtLink :to="`/katalog-produktu/${level1.slug}/${level2.slug}`">{{ level2.name }}</NuxtLink>
						<ul
							v-if="level2?.children?.nodes?.length"
							class="menu__level-3">
							<li
								v-for="(level3, index3) in level2.children.nodes"
								:key="index3">
								<NuxtLink :to="`/katalog-produktu/${level1.slug}/${level2.slug}/${level3.slug}`">{{
									level3.name
								}}</NuxtLink>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<nav
		v-else
		class="mobile-categories"
		v-if="
			(router.currentRoute.value.params?.slug &&
				categoriesData.productCategories.nodes.filter(
					(node) => node.slug === router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]
				)[0]?.children.nodes?.length) ||
			!router.currentRoute.value.params?.slug
		">
		<button @click.prevent="toggleCategories">Kategorie</button>
		<ul
			v-if="
				router.currentRoute.value.params?.slug &&
				categoriesData.productCategories.nodes.filter(
					(node) => node.slug === router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]
				)[0]?.children.nodes?.length
			">
			<li
				v-for="(item, index) in categoriesData.productCategories.nodes.filter(
					(node) => node.slug === router.currentRoute.value.params.slug[router.currentRoute.value.params.slug.length - 1]
				)[0]?.children.nodes"
				:key="index">
				<nuxt-link :to="`${router.currentRoute.value.fullPath}/${item.slug}`">{{ item.name }}</nuxt-link>
			</li>
		</ul>
		<ul v-else-if="!router.currentRoute.value.params?.slug">
			<li
				v-for="(item, index) in categoriesData.productCategories.nodes"
				:key="index">
				<nuxt-link :to="`/katalog-produktu/${item.slug}`">{{ item.name }}</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script setup>
	const screenWidth = useState('screenWidth')
	const router = useRouter()
	const language = useState('language')
	const productCategoriesQuery = gql`
		query getCategories($language: LanguageCodeFilterEnum!) {
			productCategories(where: { parent: 0, language: $language }) {
				nodes {
					name
					slug
					productCategoriesAfc {
						menuImage {
							sourceUrl
						}
					}
					children {
						nodes {
							name
							slug
							children {
								nodes {
									name
									slug
									children {
										nodes {
											name
											slug
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`
	const categoriesData = useState('categories', () => null)
	if (!categoriesData.value) {
		const { data } = await useAsyncQuery(productCategoriesQuery, { language: language.value })
		categoriesData.value = data.value
	}
	const toggleExpanded = (e) => e.target.closest('.has-children').classList.toggle('expanded')
	const toggleCategories = (e) => e.target.parentElement.classList.toggle('expanded')
</script>
<style lang="scss" scoped>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.menu__level-1 {
		a {
			display: block;
			text-decoration: none;
			font-weight: 300;
			line-height: em(28);
			&.router-link-active {
				font-weight: 700;
				color: $color-font;
				&::before {
					background-color: $color-secondary;
				}
			}
		}
		& > li {
			border-top: 1px solid $color-bg;
			& > a {
				padding: em(10);
				color: $color-font;
				flex-grow: 1;
				&:hover,
				&:focus {
					font-weight: 700;
				}
			}
		}
	}
	.has-children {
		& > a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			& > .expand {
				padding: 8px;
				line-height: 1em;
				&::after {
					content: '+';
				}
			}
		}
		&.expanded {
			& > a > .expand {
				&::after {
					content: '-';
				}
			}
			.menu__level-2 {
				max-height: 1000px;
			}
		}
	}
	.menu__level-2,
	.menu__level-3 {
		max-height: 0;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
		& > li {
			& > a {
				position: relative;
				padding: em(10);
				padding-left: 30px;
				color: $color-primary-light;
				&::before {
					content: '';
					display: block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: $color-primary-light;
					position: absolute;
					top: 50%;
					left: 10px;
					transform: translateY(-50%);
				}
				&:hover,
				&:focus {
					color: $color-font;
					&::before {
						background-color: $color-secondary;
					}
				}
			}
		}
	}
	.menu__level-3 {
		max-height: unset;
		overflow: unset;
		& > li {
			& > a {
				padding-left: 50px;
				&::before {
					left: 30px;
					background-color: transparent;
					border: 1px solid $color-primary-light;
				}
			}
		}
	}
	.mobile-categories {
		border: 1px solid $color-bg;
		margin-bottom: 20px;
		button,
		a {
			display: block;
			width: 100%;
			padding: em(10) em(20);
		}
		button {
			font-weight: 700;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;
			&::after {
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				border: 2px solid $color-black;
				border-style: none solid solid none;
				transform: rotate(45deg);
				transition: all 0.15s ease-in-out;
			}
		}
		a {
			color: $color-font;
		}
		ul {
			max-height: 0;
			overflow: hidden;
			transition: all 0.15s ease-in-out;
		}
		&.expanded {
			ul {
				max-height: 1000px;
			}
			button {
				&::after {
					transform: rotate(-135deg);
				}
			}
		}
	}
</style>
