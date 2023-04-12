<template>
	<PageHeader>
		<h1>Partneři</h1>
	</PageHeader>
	<section class="container">
		<div class="partners-grid">
			<div
				class="partner"
				v-for="(partner, index) in allPartners.partners.nodes"
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
						:to="`/katalog-produktu/vyrobce/${partner.slug}`"
						class="btn btn-primary">
						Zobrazit produkty
					</NuxtLink>
					<NuxtLink :to="`/partneri/${partner.slug}`">Více o partnerovi</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const allPartnersQuery = gql`
		query getPartners {
			partners(where: { orderby: { field: TITLE, order: ASC } }) {
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
	const allPartners = useState('allPartners', () => null)
	if (!allPartners.value) {
		const { data } = await useAsyncQuery(allPartnersQuery)
		allPartners.value = data.value
	}
</script>
<style lang="scss">
	.partners-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
		gap: 40px;
		.partner {
			background-color: $color-white;
			padding: 50px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			&__image {
				img {
					display: block;
					max-height: 100px;
					width: auto;
				}
			}
			&__title {
				margin: 0;
				color: $color-black;
				&::after {
					display: none;
				}
			}
			&__excerpt {
				font-weight: 300;
				p:last-child {
					margin-bottom: 0;
				}
			}
			.buttons-wrapper {
				margin-top: auto;
				a:not(.btn) {
					color: $color-primary-light;
				}
			}
		}
	}
	@media (max-width: 767px) {
		.partners-grid {
			grid-template-columns: minmax(1px, 1fr);
		}
		.partners-grid {
			gap: 20px;
			.partner {
				.partner__excerpt {
					font-size: 1rem;
				}
				padding: 20px;
				.buttons-wrapper {
					justify-content: center;
				}
			}
		}
	}
</style>
