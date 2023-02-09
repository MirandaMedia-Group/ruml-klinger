<template>
	<PageHeader>
		<h1>Výsledky vyhledávání</h1>
		<p>
			Pro výraz: <strong>{{ variables.search }}</strong>
		</p>
	</PageHeader>
	<section
		v-if="searchServices.pages.nodes.length"
		class="container">
		<div class="narrow center">
			<h2>Služby</h2>
		</div>
		<ul class="search-results">
			<li
				v-for="(item, index) in searchServices.pages.nodes"
				:key="index">
				<NuxtLink :to="`/${item.parent.node.slug}/${item.slug}`"> {{ item.title }}</NuxtLink>
			</li>
		</ul>
	</section>
	<section
		v-if="searchPartners.partners.nodes.length"
		class="container">
		<div class="narrow center">
			<h2>Partneři</h2>
		</div>
		<div class="partners-grid">
			<div
				class="partner"
				v-for="(partner, index) in searchPartners.partners.nodes"
				:key="index">
				<div class="partner__image">
					<NuxtPicture
						:src="partner.featuredImage.node.sourceUrl"
						:alt="partner.featuredImage.node.altText"
						:width="partner.featuredImage.node.mediaDetails.width"
						:height="partner.featuredImage.node.mediaDetails.height"
						loading="lazy"
						provider="ipx" />
				</div>
				<h2 class="partner__title">{{ partner.title }}</h2>
				<div
					class="partner__excerpt"
					v-html="partner.excerpt"></div>
				<div class="buttons-wrapper align-center justify-start">
					<NuxtLink
						:to="`/katalog-produktu/`"
						class="btn btn-primary">
						Zobrazit produkty
					</NuxtLink>
					<NuxtLink :to="`/partneri/${partner.slug}`">Více o partnerovi</NuxtLink>
				</div>
			</div>
		</div>
	</section>
	<section
		v-if="searchProducts.products.nodes?.length"
		class="container">
		<div class="narrow center">
			<h2>Produkty</h2>
		</div>
		<ProductsBlock :data="searchProducts.products.nodes" />
	</section>
</template>
<script setup>
	const router = useRouter()
	const variables = ref({
		search: router.currentRoute.value.query.search,
	})

	const searchProductsQuery = gql`
		query searchProducts($search: String!) {
			products(where: { search: $search }) {
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
					}
				}
			}
		}
	`
	const { data: searchProducts } = await useAsyncQuery(searchProductsQuery, variables.value)

	const searchServicesQuery = gql`
		query searchServices($search: String!) {
			pages(where: { search: $search, parent: "cG9zdDo1OTg=" }) {
				nodes {
					slug
					title
					parent {
						node {
							slug
						}
					}
				}
			}
		}
	`
	const { data: searchServices } = await useAsyncQuery(searchServicesQuery, variables.value)

	const searchPartnersQuery = gql`
		query searchPartners($search: String!) {
			partners(where: { search: $search }) {
				nodes {
					featuredImage {
						node {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
					}
					slug
					title
					excerpt
				}
			}
		}
	`
	const { data: searchPartners } = await useAsyncQuery(searchPartnersQuery, variables.value)
</script>
<style lang="scss">
	ul.search-results {
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			line-height: em(26);
			padding-left: 16px;
			position: relative;
			a {
				color: $color-primary-light;
			}
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6px;
				height: 6px;
				background-color: $color-secondary;
				border-radius: 50%;
			}
		}
	}
</style>
