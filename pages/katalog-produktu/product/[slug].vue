<template>
	<div class="container">
		<section class="product-top">
			<div class="product__info">
				<h1>{{ singleProduct.products.nodes[0].title }}</h1>
				<div v-html="singleProduct.products.nodes[0].productAcf.shortDescription"></div>
				<div class="product__base-parameters">
					<h2>{{ singleProduct.products.nodes[0].productAcf.baseParameters.heading }}</h2>
					<div class="product__base-parameters-list">
						<div
							v-for="(item, index) in singleProduct.products.nodes[0].productAcf.baseParameters.values"
							:key="index">
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
					<Swiper
						:slides-per-view="1.1"
						:space-between="20"
						:modules="[SwiperPagination, SwiperNavigation]"
						navigation
						pagination>
						<SwiperSlide
							v-for="(item, index) in singleProduct.products.nodes[0].productAcf.gallery"
							:key="index">
							<NuxtPicture
								:src="item.sourceUrl"
								:alt="item.altText"
								:width="item.mediaDetails.width"
								:height="item.mediaDetails.height" />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
		<section>
			<div
				class="product__parameters"
				v-html="singleProduct.products.nodes[0].productAcf.tabulkaParametru"></div>
		</section>
	</div>
</template>
<script setup>
	const router = useRouter()
	const swiperPagination = ref(null)
	const singleProduct = useState('singleProduct', () => null)
	const singleProductQuery = gql`
		query {
			products(where: { name: "${router.currentRoute.value.params.slug}" }) {
				nodes {
					title
					productAcf {
						additionalProducts {
							... on Product {
								id
								productAcf {
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
							heading
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
					}
				}
			}
		}
	`
	const { data: singleProductData } = await useAsyncQuery(singleProductQuery)
	singleProduct.value = singleProductData
	console.log(singleProduct.value)
</script>
<style lang="scss">
	.product-top {
		display: flex;
		align-items: flex-start;
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
			left: unset;
			right: 0;
			bottom: 8px;
			width: auto;
		}
		.swiper-pagination-bullet {
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
		gap: 20px;
		line-height: em(28);
		.product__base-parameters-list-item-name {
			flex: 1;
		}
		.product__base-parameters-list-item-value {
			flex: 4;
		}
	}
</style>
