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
								:height="item.mediaDetails.height"
								provider="ipx" />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
		<section>
			<div class="anchors">
				<nav>
					<ul>
						<li v-if="singleProduct.products.nodes[0].content">
							<a href="#description">Detailní info</a>
						</li>
						<li v-if="singleProduct.products.nodes[0].productAcf.tabulkaParametru">
							<a href="#parameters">Typické hodnoty</a>
						</li>
						<li v-if="singleProduct.products.nodes[0].productAcf.productFiles?.length">
							<a href="#product-files">Dokumenty ke stažení</a>
						</li>
						<li v-if="singleProduct.products.nodes[0].productAcf.productVideos">
							<a href="#product-videos">Video představení</a>
						</li>
						<li v-if="singleProduct.products.nodes[0].productAcf.additionalProducts?.length">
							<a href="#additional-products">Podobné produkty</a>
						</li>
						<li>
							<a href="#kontakt">Poptávkový formulář</a>
						</li>
					</ul>
				</nav>
			</div>
		</section>
		<section
			id="description"
			class="divider"
			v-if="singleProduct.products.nodes[0].content">
			<div
				class="product__content"
				v-html="singleProduct.products.nodes[0].content"></div>
		</section>
		<section
			id="parameters"
			class="narrow"
			v-if="singleProduct.products.nodes[0].productAcf.tabulkaParametru">
			<div
				class="product__parameters"
				v-html="singleProduct.products.nodes[0].productAcf.tabulkaParametru"></div>
		</section>
		<section
			id="product-videos"
			class="full-width"
			v-if="singleProduct.products.nodes[0].productAcf.productVideos?.length">
			<div class="container">
				<VideoCarousel
					:data="singleProduct.products.nodes[0].productAcf.productVideos"
					:white="true" />
			</div>
		</section>
		<section
			id="product-files"
			class="narrow"
			v-if="singleProduct.products.nodes[0].productAcf.productFiles?.length">
			<h2>Dokumenty ke stažení</h2>
			<div class="product-files__table">
				<div
					v-for="(file, index) in singleProduct.products.nodes[0].productAcf.productFiles"
					class="single-file"
					:key="index">
					<div class="file__name">
						<a
							:href="file.file.mediaItemUrl"
							target="_blank"
							download="">
							{{ file.file.title }}
						</a>
					</div>
					<div class="file__size">{{ file.file.fileSize / 1000 }} kB</div>
					<div class="file__type">
						<a
							:href="file.file.mediaItemUrl"
							target="_blank"
							download="">
							<svg
								v-if="file.file.mimeType === 'application/pdf'"
								width="32"
								height="32"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M30 18V16H24V26H26V22H29V20H26V18H30ZM19 26H15V16H19C19.7954 16.0008 20.558 16.3171 21.1204 16.8796C21.6829 17.442 21.9992 18.2046 22 19V23C21.9992 23.7954 21.6829 24.558 21.1204 25.1204C20.558 25.6829 19.7954 25.9992 19 26ZM17 24H19C19.2651 23.9997 19.5193 23.8943 19.7068 23.7068C19.8943 23.5193 19.9997 23.2651 20 23V19C19.9997 18.7349 19.8943 18.4807 19.7068 18.2932C19.5193 18.1057 19.2651 18.0003 19 18H17V24ZM11 16H6V26H8V23H11C11.5302 22.9992 12.0384 22.7882 12.4133 22.4133C12.7882 22.0384 12.9992 21.5302 13 21V18C12.9995 17.4697 12.7886 16.9613 12.4136 16.5864C12.0387 16.2114 11.5303 16.0005 11 16V16ZM8 21V18H11L11.001 21H8Z"
									fill="#D70C38" />
								<path
									d="M22 14V10C22.0035 9.86858 21.9785 9.73795 21.9268 9.61711C21.875 9.49627 21.7976 9.38809 21.7 9.3L14.7 2.3C14.612 2.20235 14.5038 2.12495 14.3829 2.07316C14.2621 2.02137 14.1314 1.99641 14 2H4C3.47005 2.00159 2.96227 2.21281 2.58753 2.58754C2.2128 2.96227 2.00158 3.47006 2 4V28C2 28.5304 2.21071 29.0391 2.58579 29.4142C2.96086 29.7893 3.46957 30 4 30H20V28H4V4H12V10C12.0016 10.53 12.2128 11.0377 12.5875 11.4125C12.9623 11.7872 13.4701 11.9984 14 12H20V14H22ZM14 10V4.4L19.6 10H14Z"
									fill="#D70C38" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
		<section
			id="additional-products"
			class="divider top"
			v-if="singleProduct.products.nodes[0].productAcf.additionalProducts?.length">
			<div class="center">
				<h2>Podobné produkty</h2>
			</div>
			<div class="products-grid">
				<ProductsBlock :data="singleProduct.products.nodes[0].productAcf.additionalProducts" />
			</div>
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
					}
				}
			}
		}
	`
	const { data: singleProductData } = await useAsyncQuery(singleProductQuery)
	singleProduct.value = singleProductData
	console.log(singleProduct.value.products.nodes[0].productAcf.productVideos)
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
	.divider {
		position: relative;
		padding-bottom: 50px;
		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			display: block;
			width: 100%;
			height: 1px;
			background-color: $color-inactive;
		}
		&::after {
			padding: 8px;
			background-color: $color-bg-light;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 50%);
			content: url(/icon/ruml-logo-mini.svg);
			display: block;
			line-height: 0;
		}
		&.top {
			padding-bottom: 0;
			padding-top: 100px;
			&::before,
			&::after {
				bottom: unset;
				top: 0;
			}
			&::after {
				transform: translate(-50%, -50%);
			}
		}
	}
	.anchors {
		border-bottom: 1px solid $color-inactive;
		margin-bottom: 100px;
		nav {
			margin-bottom: -1px;
			ul {
				display: flex;
				list-style: none;
				margin: 0;
				padding: 0;
			}
			a {
				display: inline-block;
				padding: em(10) em(20);
				text-decoration: none;
				color: $color-font;
				border: 1px solid $color-inactive;
				margin-right: -1px;
				background-color: #f5f4f4;
				&.active,
				&:hover,
				&:focus {
					border-bottom: 1px solid $color-bg-light;
					background-color: $color-bg-light;
					color: $color-secondary;
					font-weight: 700;
				}
			}
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
				gap: 20px;
				&:nth-of-type(odd) {
					background-color: $color-white;
				}
				&:nth-of-type(even) {
					background-color: $color-bg-light;
				}
				td:first-of-type {
					flex: 4;
					font-weight: 700;
				}
				td:nth-of-type(2) {
					flex: 2;
				}
				td:nth-of-type(3) {
					text-align: right;
				}
				td:nth-of-type(3),
				td:nth-of-type(4) {
					flex: 1;
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
	.product-files__table {
		border-top: 1px solid $color-secondary;
	}
	.single-file {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: em(10);
		&:nth-of-type(odd) {
			background-color: $color-white;
		}
		&:nth-of-type(even) {
			background-color: $color-bg;
		}
		.file__name {
			margin-right: auto;
		}
	}
</style>
