<template>
	<div class="categories">
		<h2>Kategorie</h2>
		<nav>
			<ul class="menu__level-1">
				<li
					v-for="(level1, index1) in categories?.productCategories.nodes"
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
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script setup>
	const categories = useState('categories', () => null)

	const productCategoriesQuery = gql`
		query {
			productCategories(where: { parent: 0 }) {
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
	`
	const { data: categoriesData } = await useAsyncQuery(productCategoriesQuery)
	categories.value = categoriesData

	const toggleExpanded = (e) => e.target.closest('.has-children').classList.toggle('expanded')
</script>

<style lang="scss" scoped>
	.categories {
		border-top: 2px solid $color-secondary;
		background-color: $color-white;
		padding: 30px;
		h2 {
			font-size: rem(24);
			margin: 0 0 em(20, 24);
			color: #213eab;
			&::after {
				display: none;
			}
		}
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}
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
	.menu__level-2 {
		max-height: 0;
		overflow: hidden;
		transition: all 0.15s ease-in-out;
		& > li {
			& > a {
				position: relative;
				padding: em(10);
				padding-left: 30px;
				color: #213eab;
				&::before {
					content: '';
					display: block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: #213eab;
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
</style>
