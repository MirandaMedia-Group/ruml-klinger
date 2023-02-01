<template>
	<div class="product">
		<NuxtLink :to="`/katalog-produktu/product/${props.slug}`">
			<div class="product__image">
				<NuxtPicture
					v-if="props.productAcf.gallery"
					:src="props.productAcf.gallery?.[0].sourceUrl"
					provider="ipx" />
			</div>
			<div class="product__info">
				<h2>{{ props.title }}</h2>
				<div v-html="props.excerpt"></div>
				<svg
					width="19"
					height="15"
					viewBox="0 0 19 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
						stroke="#D70C38"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</div>
		</NuxtLink>
	</div>
</template>
<script setup>
	const props = defineProps(['slug', 'title', 'excerpt', 'productAcf'])
	console.log(props.slug)
</script>
<style lang="scss" scoped>
	.product {
		a {
			text-decoration: none;
			&:hover,
			&:focus {
				.product__image {
					img {
						transform: scale(1.05);
					}
				}
				.product__info {
					svg {
						margin-left: 20px;
					}
				}
			}
		}
		.product__image {
			overflow: hidden;

			img {
				display: block;
				transition: all 0.15s ease-in-out;
			}
		}
		.product__info {
			background-color: $color-white;
			padding: 30px 20px;
			h2 {
				font-size: rem(28);
				line-height: em(31, 28);
				margin-bottom: em(20, 28);
				color: $color-primary-light;
				&::after {
					display: none;
				}
			}
			svg {
				transition: all 0.15s ease-in-out;
			}
		}
	}
</style>
