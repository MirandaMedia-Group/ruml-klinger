<template>
	<section class="page-header">
		<div class="container">
			<div class="page-header__content">
				<h1>Partneři</h1>
			</div>
		</div>
	</section>
	<section class="container">
		<div class="partners-grid">
			<div
				class="partner"
				v-for="(partner, index) in allPartners?.partners.nodes"
				:key="index">
				<div class="partner__image">
					<NuxtPicture
						:src="partner.featuredImage.node.sourceUrl"
						:alt="partner.featuredImage.node.altText"
						:width="partner.featuredImage.node.mediaDetails.width"
						:height="partner.featuredImage.node.mediaDetails.height"
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
</template>
<script setup>
	const allPartners = useState('allPartners', () => null)
	const allPartnersQuery = gql`
		{
			partners {
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
	const { data: allPartnersData } = await useAsyncQuery(allPartnersQuery)
	allPartners.value = allPartnersData.value
	console.log(allPartners.value)
</script>
<style lang="scss">
	.page-header {
		background: url('/page-header-bg.jpg') no-repeat center;
		background-size: cover;
		margin-bottom: 120px;
		&__content {
			padding-top: 100px;
			padding-bottom: 100px;
			background-image: url('/page-header-logo.png');
			background-repeat: no-repeat;
			background-position: center bottom;
			background-color: $color-white;
			position: relative;
			bottom: -80px;
			text-align: center;
			h1 {
				margin-bottom: 0;
				&::after {
					margin-left: auto;
					margin-right: auto;
				}
			}
		}
	}
	.partners-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
		gap: 40px;
	}
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
</style>
