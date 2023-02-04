<template>
	<section class="partner-header">
		<NuxtPicture
			:src="singlePartner.partners.nodes[0].partnerAcf.hero.sourceUrl"
			:alt="singlePartner.partners.nodes[0].partnerAcf.hero.altText"
			:width="singlePartner.partners.nodes[0].partnerAcf.hero.mediaDetails.width"
			:height="singlePartner.partners.nodes[0].partnerAcf.hero.mediaDetails.height"
			provider="ipx" />
		<div class="container partner-header__content center">
			<NuxtPicture
				:src="singlePartner.partners.nodes[0].featuredImage.node.sourceUrl"
				:alt="singlePartner.partners.nodes[0].featuredImage.node.altText"
				:width="singlePartner.partners.nodes[0].featuredImage.node.mediaDetails.width"
				:height="singlePartner.partners.nodes[0].featuredImage.node.mediaDetails.height"
				provider="ipx" />
		</div>
	</section>
	<section class="container">
		<div class="narrow center">
			<h1>{{ singlePartner.partners.nodes[0].title }}</h1>
		</div>
		<div class="content-wrapper">
			<div class="content">
				<div
					class="partner__excerpt"
					v-html="singlePartner.partners.nodes[0].excerpt"></div>
				<div
					class="partner__description"
					v-html="singlePartner.partners.nodes[0].partnerAcf.description"></div>
			</div>
			<div class="sidebar">
				<div
					class="sidebar-box"
					v-html="singlePartner.partners.nodes[0].partnerAcf.sidebarBox"></div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const router = useRouter()
	const singlePartnerQuery = gql`
			query {
				partners(where: { name: "${router.currentRoute.value.params.slug}" }) {
					nodes {
						title
						slug
						excerpt
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
						partnerAcf {
							description
							sidebarBox
							hero {
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
		`
	const { data: singlePartner } = await useAsyncQuery(singlePartnerQuery)
</script>
<style lang="scss">
	.partner-header {
		position: relative;
		&__content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 20px 50px;
			width: auto;
			background-color: $color-white;
		}
	}
	.content-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 100px;
		.content {
			flex: 1 1 500px;
		}
		.sidebar {
			flex: 0 1 480px;
		}
	}
	.sidebar-box {
		background-color: $color-white;
		padding: 60px;
		h3 {
			font-size: rem(24);
			color: rgba($color-black, 0.7);
		}
		p:last-child {
			margin-bottom: 0;
		}
	}
	.partner {
		&__excerpt {
			font-size: rem(20);
			line-height: em(36, 20);
			color: rgba($color-black, 0.9);
			margin-bottom: 40px;
		}
	}
	@media (max-width: 767px) {
		.partner-header {
			height: 375px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			&__content {
				padding: 10px 20px;
			}
		}
		.content-wrapper {
			gap: 40px;
		}
	}
</style>
