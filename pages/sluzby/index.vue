<template>
	<section class="page-image-header" :style="`background-image: url('/sluzby-bg.jpg')`">
		<div class="container page-image-header__content center">
			<h1>{{ $t('servicesPage.title') }}</h1>
			<p>
				{{ $t('servicesPage.perex') }}
			</p>
		</div>
	</section>
	<section class="services-page">
		<div class="container">
			<div v-for="(service, index) in servicesData.pages.nodes" :key="index" class="service columns col-2">
				<div class="service__image column">
					<NuxtPicture
						:src="service.featuredImage.node.sourceUrl"
						:alt="service.featuredImage.node.altText"
						:width="service.featuredImage.node.mediaDetails.width"
						:height="service.featuredImage.node.mediaDetails.height"
						loading="lazy"
						provider="ipx"
						:imgAttrs="{ style: 'height: 100%; object-fit: cover;' }" />
				</div>
				<div class="service__content column">
					<h2 class="service__title">{{ service.title }}</h2>
					<p class="service__description">{{ service.rumlKlingerSluzby.shortDescription }}</p>
					<div class="buttons-wrapper justify-start">
						<a class="btn btn-primary" href="mailto:ruml@ruml-group.cz"> ruml@ruml-group.cz </a>
						<BtnSecondary :href="localePath(`/sluzby/${service.slug}`)">{{ $t('serviceDetail') }}</BtnSecondary>
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
	const { locale, t } = useI18n()
	const localePath = useLocalePath()
	useHead({
		title: t('seo.services.title'),
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: t('seo.services.description'),
			},
		],
	})
	const localeIDs = {
		services: {
			cs: 'cG9zdDo1OTg=',
			en: 'cG9zdDozODQ3',
		},
	}

	const route = useRoute()

	const servicesQuery = gql`
		query getAllServicesKlinger($localeID: ID!) {
			pages(where: { parent: $localeID, orderby: { field: DATE, order: ASC } }) {
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
	const { data: servicesData } = await useAsyncQuery(servicesQuery, { localeID: localeIDs.services[locale.value] })
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
	.services-page {
		.service {
			margin-bottom: 40px;
			flex-direction: row;
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
	}
	@media (max-width: 767px) {
		.page-image-header {
			padding: 60px 0;
			p {
				font-size: 1rem;
			}
		}
		.services-page {
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
	}
</style>
