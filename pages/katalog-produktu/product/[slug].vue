<template>
	<div class="container">
		<div v-if="pending">
			<LoadingCircle />
		</div>
		<div v-else>
			<Breadcrumbs :sublinks="breadcrumbsSublinks" />
			<section class="product-top">
				<div class="product__info">
					<h1>{{ singleProduct.products.nodes[0].title }}</h1>
					<div v-html="singleProduct.products.nodes[0].productAcf.shortDescription"></div>
					<div class="product__base-parameters">
						<h2>{{ singleProduct.products.nodes[0].productAcf.baseParameters.heading }}</h2>
						<div class="product__base-parameters-list">
							<div v-for="(item, index) in singleProduct.products.nodes[0].productAcf.baseParameters.values" :key="index">
								<div class="product__base-parameters-list-item">
									<div class="product__base-parameters-list-item-name">
										<b>{{ item.name }}:</b>
									</div>
									<div class="product__base-parameters-list-item-value">
										{{ item.value }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="product__gallery">
					<div class="swiper-container">
						<Swiper :slides-per-view="1.1" :space-between="20" :modules="modules" navigation pagination>
							<SwiperSlide v-for="(item, index) in singleProduct.products.nodes[0].productAcf.gallery" :key="index">
								<NuxtPicture
									:src="item.sourceUrl"
									:alt="item.altText"
									:width="item.mediaDetails?.width"
									:height="item.mediaDetails?.height"
									loading="lazy"
									provider="ipx" />
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</section>
			<section>
				<AnchorsBlock>
					<nav>
						<ul>
							<li v-if="singleProduct.products.nodes[0].content">
								<a href="#description">{{ $t('productDetail.detailInfo') }}</a>
							</li>
							<li v-if="singleProduct.products.nodes[0].productAcf.tabulkaParametru">
								<a href="#parameters">{{ $t('productDetail.typicalValues') }}</a>
							</li>
							<li v-if="singleProduct.products.nodes[0].productAcf.productFiles?.length">
								<a href="#product-files">{{ $t('productDetail.fileDownloads') }}</a>
							</li>
							<li v-if="singleProduct.products.nodes[0].productAcf.productVideos">
								<a href="#product-videos">{{ $t('productDetail.videoShowreel') }}</a>
							</li>
							<li v-if="singleProduct.products.nodes[0].productAcf.additionalProducts?.length">
								<a href="#additional-products">{{ $t('productDetail.relatedProducts') }}</a>
							</li>
							<li>
								<a href="#formular">{{ $t('productDetail.inquiryForm') }}</a>
							</li>
						</ul>
					</nav>
				</AnchorsBlock>
			</section>
			<section id="description" class="divider" v-if="singleProduct.products.nodes[0].content">
				<div class="product__content" v-html="singleProduct.products.nodes[0].content"></div>
			</section>
			<section
				id="parameters"
				class="narrow"
				v-if="
					singleProduct.products.nodes[0].productAcf.tabulkaParametru ||
					singleProduct.products.nodes[0].productAcf.productParameters?.values ||
					singleProduct.products.nodes[0].productAcf.customTable.table
				">
				<div v-if="singleProduct.products.nodes[0].productAcf.customTable.table">
					<h3 v-if="singleProduct.products.nodes[0].productAcf.customTable.heading">
						{{ singleProduct.products.nodes[0].productAcf.customTable.heading }}
					</h3>
					<table>
						<tbody>
							<tr>
								<th
									v-for="(item, index) in singleProduct.products.nodes[0].productAcf.customTable.table.header"
									:key="index">
									{{ item }}
								</th>
							</tr>
							<tr v-for="(tr, index) in singleProduct.products.nodes[0].productAcf.customTable.table.body" :key="index">
								<td v-for="(td, index) in tr" :key="index" v-html="td"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div v-if="singleProduct.products.nodes[0].productAcf.productParameters?.values">
					<h3 v-if="singleProduct.products.nodes[0].productAcf.productParameters.heading">
						{{ singleProduct.products.nodes[0].productAcf.productParameters.heading }}
					</h3>
					<table>
						<tbody>
							<tr v-for="(item, index) in singleProduct.products.nodes[0].productAcf.productParameters.values" :key="index">
								<td>{{ item.label }}</td>
								<td>{{ item.name }}</td>
								<td>{{ item.unit }}</td>
								<td>{{ item.value }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					v-else-if="singleProduct.products.nodes[0].productAcf.tabulkaParametru"
					class="product__parameters"
					v-html="singleProduct.products.nodes[0].productAcf.tabulkaParametru"></div>
			</section>
			<section id="product-videos" class="full-width" v-if="singleProduct.products.nodes[0].productAcf.productVideos?.length">
				<div class="container">
					<VideoCarousel :data="singleProduct.products.nodes[0].productAcf.productVideos" :white="true" />
				</div>
			</section>
			<section id="product-files" class="narrow" v-if="singleProduct.products.nodes[0].productAcf.productFiles?.length">
				<h2>{{ $t('productDetail.fileDownloads') }}</h2>
				<FilesTable :data="singleProduct.products.nodes[0].productAcf.productFiles" />
			</section>
			<section
				id="additional-products"
				class="divider top"
				v-if="singleProduct.products.nodes[0].productAcf.additionalProducts?.length">
				<div class="center">
					<h2>{{ $t('productDetail.relatedProducts') }}</h2>
				</div>
				<div class="products-grid">
					<ProductsBlock :data="singleProduct.products.nodes[0].productAcf.additionalProducts" />
				</div>
			</section>
		</div>
	</div>
	<ContactForm />
</template>
<script setup>
	import { Navigation, Pagination } from 'swiper'
	import { Swiper, SwiperSlide } from 'swiper/vue'
	import 'swiper/css'
	const modules = [Navigation, Pagination]
	const router = useRouter()
	const variables = ref({
		slug: router.currentRoute.value.params.slug,
	})
	const singleProductQuery = gql`
		query getProduct($slug: String!) {
			products(where: { name: $slug }) {
				nodes {
					title
					slug
					content
					productAcf {
						additionalProducts {
							... on Product {
								slug
								title
								productAcf {
									shortDescription
									gallery {
										sourceUrl
									}
								}
							}
						}
						baseParameters {
							heading
							values {
								name
								value
							}
						}
						productFiles {
							name
							file {
								fileSize
								mediaItemUrl
								slug
								title
								mimeType
							}
						}
						productParameters {
							heading
							values {
								label
								name
								unit
								value
							}
						}
						productVideos {
							description
							title
							video
						}
						shortDescription
						tabulkaParametru
						gallery {
							sourceUrl
							mediaDetails {
								height
								width
							}
							altText
						}
						customTable {
							heading
							table {
								body
								header
								headerEnabled
							}
						}
					}
					productCategories {
						nodes {
							name
							slug
							parent {
								node {
									name
									slug
									parent {
										node {
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
	// const singleProduct = useState('product', () => null)
	const { data: singleProduct, pending } = await useAsyncQuery(singleProductQuery, variables.value)
	// singleProduct.value = data.value
	const breadcrumbsSublinks = ref(
		singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.parent
			? [
					{
						url: `/katalog-produktu/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent.node.parent.node.slug}`,
						name: singleProduct.value.products.nodes[0].productCategories.nodes[0].parent.node.parent.node.name,
					},
					{
						url: `/katalog-produktu/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent.node.parent.node.slug}/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.slug}`,
						name: singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.name,
					},
					{
						url: `/katalog-produktu/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent.node.parent.node.slug}/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.slug}/${singleProduct.value.products.nodes[0].productCategories.nodes[0].slug}`,
						name: singleProduct.value.products.nodes[0].productCategories.nodes[0].name,
					},
					{
						url: `/katalog-produktu/product/${singleProduct.value.products.nodes[0].slug}`,
						name: singleProduct.value.products.nodes[0].title,
					},
			  ]
			: singleProduct.value.products.nodes[0].productCategories.nodes[0].parent
			? [
					{
						url: `/katalog-produktu/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.slug}/`,
						name: singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.name,
					},
					{
						url: `/katalog-produktu/${singleProduct.value.products.nodes[0].productCategories.nodes[0].parent?.node.slug}/${singleProduct.value.products.nodes[0].productCategories.nodes[0].slug}`,
						name: singleProduct.value.products.nodes[0].productCategories.nodes[0].name,
					},
					{
						url: `/katalog-produktu/product/${singleProduct.value.products.nodes[0].slug}`,
						name: singleProduct.value.products.nodes[0].title,
					},
			  ]
			: [
					{
						url: `/katalog-produktu/${singleProduct.value.products.nodes[0].productCategories.nodes[0].slug}`,
						name: singleProduct.value.products.nodes[0].productCategories.nodes[0].name,
					},
					{
						url: `/katalog-produktu/product/${singleProduct.value.products.nodes[0].slug}`,
						name: singleProduct.value.products.nodes[0].title,
					},
			  ]
	)
</script>
<style lang="scss">
	.full-width {
		position: relative;
		width: 100vw;
		left: 50%;
		transform: translateX(-50%);
	}
	.product-top {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 60px;
		margin-top: 50px;
		& > div {
			flex: 1 1 460px;
		}
	}
	.product__info {
		h2 {
			font-size: rem(20);
			&::after {
				display: none;
			}
		}
	}
	.swiper-container {
		overflow: hidden;
		display: grid;
		min-width: 0;
		width: 100%;
	}
	.swiper {
		margin: 0;
		padding-bottom: 60px;
		.swiper-pagination {
			position: absolute;
			left: unset;
			right: 0;
			bottom: 8px;
			width: auto;
			display: flex;
			gap: 20px;
		}
		.swiper-pagination-bullet {
			display: block;
			border-radius: 50%;
			width: 24px;
			height: 24px;
			background-color: $color-inactive;
			opacity: 1;
		}
		.swiper-pagination-bullet-active {
			background-color: $color-secondary;
		}
		.swiper-button-next,
		.swiper-button-prev {
			position: absolute;
			bottom: 0;
			top: unset;
			width: 44px;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #999798;
			&::after {
				content: url(/icon/arrow-black.svg);
				line-height: 0;
			}
			&.swiper-button-disabled {
				opacity: 0.4;
			}
		}
		.swiper-button-prev {
			left: 0;
			transform: rotate(180deg);
		}
		.swiper-button-next {
			right: unset;
			left: 54px;
		}
	}
	.product__base-parameters-list-item {
		display: flex;
		flex-wrap: wrap;
		gap: 0px;
		line-height: em(28);
		.product__base-parameters-list-item-name {
			flex: 1 1 150px;
		}
		.product__base-parameters-list-item-value {
			flex: 1 1 150px;
		}
	}

	#parameters {
		caption {
			text-align: left;
			font-size: rem(28);
			color: $color-primary;
			margin-bottom: em(40, 28);
		}
		table {
			font-size: rem(16) !important;
			line-height: em(28, 16) !important;
			border-collapse: collapse;
			display: block;
			float: none;
			caption,
			tbody {
				display: block;
			}
			tbody {
				border-top: 1px solid $color-secondary;
			}
			p {
				margin: 0;
				font-size: inherit;
				line-height: inherit;
			}
			tr {
				padding: em(10);
				display: flex;
				align-items: center;
				gap: 15px;
				&:nth-of-type(odd) {
					background-color: $color-white;
				}
				&:nth-of-type(even) {
					background-color: $color-bg-light;
				}
				th {
					text-align: left;
				}
				td,
				th {
					flex: 2;
				}
				td:first-of-type,
				th:first-of-type {
					flex: 4;
					font-weight: 700;
				}
				// td:nth-of-type(2),
				// th:nth-of-type(2) {
				// 	flex: 2;
				// }
				// td:nth-of-type(3),
				// th:nth-of-type(3) {
				// 	text-align: right;
				// }
				// td:nth-of-type(3),
				// td:nth-of-type(4),
				// th:nth-of-type(3),
				// th:nth-of-type(4) {
				// 	flex: 1;
				// }
				td:nth-last-of-type(2),
				th:nth-last-of-type(2) {
					flex: 1;
					text-align: right;
				}
				td:last-of-type,
				th:last-of-type {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
	#product-videos {
		background-color: $color-primary;
		padding: 100px 0;
	}
	#product-files {
		h2 {
			font-size: rem(28);
			margin-bottom: em(40, 28);
			&::after {
				display: none;
			}
		}
	}
	@media (max-width: 1058px) {
		.product-top {
			flex-direction: column-reverse;
			& > div {
				flex-basis: auto;
			}
			.product__gallery {
				width: 100%;
			}
		}
	}
	@media (max-width: 767px) {
		.product-top {
			gap: 50px;
			.swiper-pagination {
				display: none;
			}
			.swiper {
				.swiper-button-prev {
					left: unset;
					right: 54px;
				}
				.swiper-button-next {
					left: unset;
					right: 0;
				}
			}
		}
		#parameters {
			caption {
				font-size: rem(22);
			}
		}
		#product-videos {
			padding: 50px 0;
		}
		#product-files {
			h2 {
				text-align: center;
				font-size: rem(22);
			}
		}
	}
	@media (max-width: 680px) {
		#parameters {
			table {
				tr {
					flex-wrap: wrap;
					td:first-of-type,
					th:first-of-type {
						flex-basis: 100%;
					}
				}
			}
		}
	}
</style>
