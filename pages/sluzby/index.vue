<template>
	<section
		class="page-image-header"
		:style="`background-image: url('/sluzby-bg.jpg')`">
		<div class="container page-image-header__content center">
			<h1>Služby</h1>
			<p>
				Využijte našich zkušeností z nejrůznějších průmyslových provozů pro zvýšení spolehlivosti, účinnosti nebo i životnosti
				vašich zařízení.
			</p>
		</div>
	</section>
	<section>
		<div class="container">
			<div
				v-for="(service, index) in servicesData?.pages.nodes"
				:key="index"
				class="service columns col-2">
				<div class="service__image column">
					<NuxtPicture
						:src="service.featuredImage.node.sourceUrl"
						:alt="service.featuredImage.node.altText"
						:width="service.featuredImage.node.mediaDetails.width"
						:height="service.featuredImage.node.mediaDetails.height"
						provider="ipx"
						:imgAttrs="{ style: 'height: 100%; object-fit: cover;' }" />
				</div>
				<div class="service__content column">
					<h2 class="service__title">{{ service.title }}</h2>
					<p class="service__description">{{ service.rumlKlingerSluzby.shortDescription }}</p>
					<div class="buttons-wrapper justify-start">
						<a
							class="btn btn-primary"
							href="mailto:ruml@ruml-group.cz">
							ruml@ruml-group.cz
						</a>
						<BtnSecondary :href="`/sluzby/${service.slug}`">Detail služby</BtnSecondary>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section>
		<BannerTop />
	</section>
</template>
<script setup>
	const servicesQuery = gql`
		query {
			pages(where: { parent: "cG9zdDo1OTg=" }) {
				nodes {
					title
					slug
					featuredImage {
						node {
							sourceUrl
							altText
							mediaDetails {
								height
								width
							}
						}
					}
					rumlKlingerSluzby {
						shortDescription
					}
				}
			}
		}
	`
	const { data: servicesData } = await useAsyncQuery(servicesQuery)
</script>
<style lang="scss" scoped>
	.page-image-header {
		padding: 160px 0;
		color: $color-white;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		h1 {
			color: inherit;
		}
		.container {
			max-width: 760px;
		}
		h1 {
			margin-bottom: em(10, 42);
			&::after {
				margin-top: em(10, 42);
			}
		}
		p {
			font-size: rem(20);
			line-height: em(36, 20);
			margin-bottom: 0;
		}
	}
	.service {
		margin-bottom: 40px;
		&__image {
			picture,
			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&__content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			h2 {
				font-size: rem(32);
				color: $color-primary-light;
				&::after {
					margin-left: 0;
				}
			}
		}
		&__description {
			min-height: unset;
		}
	}
	@media (max-width: 767px) {
		.page-image-header {
			padding: 60px 0;
			p {
				font-size: 1rem;
			}
		}
		.service {
			margin-left: -20px;
			margin-right: -20px;
			margin-bottom: 0;
			&__image {
				aspect-ratio: 1;
			}
			h2 {
				font-size: rem(24);
			}
		}
	}
</style>
