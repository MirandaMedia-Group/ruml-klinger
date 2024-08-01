<template>
	<PageHeader>
		<h1>{{ $t('partners') }}</h1>
	</PageHeader>
	<section class="container">
		<div class="partners-grid">
			<div class="partner" v-for="(partner, index) in allPartners.partners.nodes" :key="index">
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
				<div class="partner__excerpt" v-html="partner.excerpt"></div>
				<div class="buttons-wrapper align-center justify-start">
					<NuxtLink :to="localePath(`/katalog-produktu/vyrobce/${partner.slug}`)" class="btn btn-primary">
						{{ $t('showProducts') }}
					</NuxtLink>
					<NuxtLink :to="localePath(`/partneri/${partner.slug}`)">{{ $t('moreAboutPartner') }}</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const localePath = useLocalePath()
	const { locale, t } = useI18n()
	const language = useState('language')
	const allPartnersQuery = gql`
		query getPartnersKlinger($language: LanguageCodeFilterEnum) {
			partners(where: { orderby: { field: TITLE, order: ASC }, language: $language }) {
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
	const { data: allPartners } = await useAsyncQuery(allPartnersQuery, { language: locale.value.toUpperCase() })
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
				padding: 20px;
				.partner__excerpt {
					font-size: 1rem;
				}
				.buttons-wrapper {
					justify-content: center;
				}
			}
		}
	}
</style>
