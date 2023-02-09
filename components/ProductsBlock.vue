<template>
	<div class="products-block">
		<div
			v-if="props.banner"
			class="category-banner">
			<div class="category-banner__content">
				<h3>{{ props.banner.title }}</h3>
				<div v-html="props.banner.excerpt"></div>
				<a
					v-if="props.banner.link"
					:href="props.banner.link"
					class="button">
					{{ props.banner.linkText }}
				</a>
			</div>
			<div class="category-banner__image">
				<NuxtPicture
					:src="props.banner.featuredImage.node.sourceUrl"
					:alt="props.banner.featuredImage.node.altText"
					:width="props.banner.featuredImage.node.mediaDetails.width"
					:height="props.banner.featuredImage.node.mediaDetails.height"
					loading="lazy"
					provider="ipx"
					:img-attrs="{ style: 'display:block; width: 100%; height: 100%; object-fit: cover;' }" />
				<NuxtLink
					v-if="!props.banner.categoryBanners.btnUrl.includes('https')"
					:to="props.banner.categoryBanners.btnUrl"
					class="category-banner__button btn btn-primary">
					{{ props.banner.categoryBanners.btnText }}
				</NuxtLink>
				<a
					v-else
					:to="props.banner.categoryBanners.btnUrl"
					class="category-banner__button btn btn-primary"
					target="_blank">
					{{ props.banner.categoryBanners.btnText }}
				</a>
			</div>
		</div>
		<SingleProduct
			v-for="(item, index) in props.data"
			:key="index"
			v-bind="item" />
	</div>
</template>
<script setup>
	const props = defineProps(['data', 'banner'])
</script>
<style lang="scss" scoped>
	.products-block {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 30px;
	}
	.category-banner {
		grid-row: 2/3;
		grid-column: 1/4;
		display: flex;
		flex-wrap: wrap;
		&__content {
			flex: 1 1 400px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 50px;
			background: url(/category-banner-bg.jpg) no-repeat center center;
			background-size: cover;
			h3 {
				color: $color-secondary;
			}
		}
		&__image {
			flex: 1 1 245px;
			position: relative;
		}
		&__button {
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 0 4px 0 0;
			font-size: rem(14);
		}
	}
	@media (max-width: 1418px) {
		.category-banner {
			grid-column: 1/3;
		}
	}
	@media (max-width: 1088px) {
		.category-banner {
			grid-column: 1/2;
		}
	}
	@media (max-width: 900px) {
		.category-banner {
			grid-column: 1/3;
			&__content {
				padding: 30px;
				h3 {
					font-size: rem(24);
				}
			}
		}
	}
	@media (max-width: 767px) {
		.products-block {
			grid-template-columns: repeat(2, minmax(1px, 1fr));
			gap: 15px;
		}
	}
</style>
