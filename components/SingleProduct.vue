<template>
	<div class="product">
		<NuxtLink :to="localePath(`/katalog-produktu/product/${props.slug}`)">
			<div class="product__image">
				<NuxtPicture
					v-if="props.productAcf?.gallery?.[0]?.sourceUrl"
					:src="props.productAcf.gallery?.[0].sourceUrl"
					:alt="props.productAcf.gallery?.[0].altText"
					:width="props.productAcf.gallery?.[0].mediaDetails?.width"
					:height="props.productAcf.gallery?.[0].mediaDetails?.height"
					:img-attrs="{ style: 'max-width: 100%; max-height: 340px; object-fit: contain;' }"
					loading="lazy"
					provider="ipx" />
			</div>
			<div class="product__info">
				<h2>{{ props.title }}</h2>
				<div v-html="props.excerpt"></div>
				<div class="button-detail">
					<span>Detail</span>
					<svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
							stroke="#D70C38"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
<script setup>
	const localePath = useLocalePath()
	const props = defineProps(['slug', 'title', 'excerpt', 'productAcf'])
</script>
<style lang="scss" scoped>
	.product {
		a {
			text-decoration: none;
			color: rgba($color-black, 0.6);
			display: flex;
			flex-direction: column;
			height: 100%;
			&:hover,
			&:focus {
				.product__image {
					img {
						transform: scale(1.05);
					}
				}
				.button-detail {
					span {
						transform: none;
					}
					svg {
						left: calc(100% - 30px);
					}
				}
			}
		}
		.product__image {
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $color-white;
			aspect-ratio: 1/1;
			img {
				display: block;
				transition: all 0.15s ease-in-out;
			}
		}
		.product__info {
			background-color: $color-white;
			padding: 30px 20px;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			h2 {
				font-size: rem(28);
				line-height: em(31, 28);
				margin-bottom: em(20, 28);
				color: $color-primary-light;
				&::after {
					display: none;
				}
			}
		}
		.button-detail {
			margin-top: auto;
			display: flex;
			align-items: center;
			overflow: hidden;
			position: relative;
			align-self: flex-start;
			padding-right: 40px;
			span {
				font-weight: 700;
				color: $color-black;
				text-transform: uppercase;
				transition: all 0.15s ease-in-out;
				transform: translateX(-101%);
			}
			svg {
				position: absolute;
				left: 0;
				right: 0;
				line-height: 0;
				display: block;
				transition: all 0.15s ease-in-out;
			}
		}
	}
	@media (max-width: 767px) {
		.product .product__info {
			font-size: rem(12);
			h2 {
				font-size: rem(22);
			}
		}
	}
</style>
