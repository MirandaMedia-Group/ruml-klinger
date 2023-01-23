<template>
	<HeroBig v-bind="homepageData.page.rumlKlingerHomepage.hero" />
	<section class="categories container">
		<div class="narrow center">
			<h2>{{ homepageData.page.rumlKlingerHomepage.categoriesBlock.title }}</h2>
			<p>{{ homepageData.page.rumlKlingerHomepage.categoriesBlock.perex }}</p>
			<div class="categories__switcher">
				<strong>Zobrazit kategorie podle:</strong>
				<div class="switcher__control"><button class="active">Zboží</button>|<button>Výrobci</button></div>
			</div>
		</div>
		<div class="categories-grid">
			<NuxtLink
				v-for="category in homepageData.page.rumlKlingerHomepage.categoriesBlock.categories"
				:key="category.title"
				:to="category.url"
				class="category">
				<div class="category__image">
					<img
						:src="category.image.sourceUrl"
						:alt="category.image.altText" />
				</div>
				<div class="category__content">
					<h3>{{ category.title }}</h3>
				</div>
			</NuxtLink>
		</div>
	</section>
	<section class="banner__top container">
		<div
			class="banner"
			:style="`background-image: url(${homepageData.page.rumlKlingerHomepage.bannerTop.image.sourceUrl})`">
			<div class="banner__content">
				<h3>{{ homepageData.page.rumlKlingerHomepage.bannerTop.title }}</h3>
				<p>{{ homepageData.page.rumlKlingerHomepage.bannerTop.perex }}</p>
				<a
					class="btn btn-primary"
					:href="homepageData.page.rumlKlingerHomepage.bannerTop.btn.file.mediaItemUrl"
					target="_blank">
					{{ homepageData.page.rumlKlingerHomepage.bannerTop.btn.text }}
					({{ (homepageData.page.rumlKlingerHomepage.bannerTop.btn.file.fileSize / 1000 / 1000).toFixed(2) }} MB)
				</a>
			</div>
		</div>
	</section>
</template>
<script setup>
	const homepageQuery = gql`
		query {
			page(id: "cG9zdDo1OTI=") {
				title
				slug
				rumlKlingerHomepage {
					hero {
						btnPrimary {
							text
							type
							urlExternal
							urlInternal
						}
						btnSecondary {
							text
							type
							urlExternal
							urlInternal
						}
						image {
							altText
							link
							mediaItemUrl
							mediaType
							sizes
							sourceUrl
							srcSet
							title
							uri
						}
						perex
						title
					}
					categoriesBlock {
						title
						perex
						categories {
							url
							title
							image {
								sourceUrl
								altText
							}
						}
					}
					bannerTop {
						title
						perex
						btn {
							text
							file {
								fileSize
								mediaItemUrl
							}
						}
						image {
							sourceUrl
						}
					}
				}
			}
		}
	`
	const { data: homepageData, error: homepageError } = await useAsyncQuery(homepageQuery)
</script>
<style lang="scss">
	.categories__switcher {
		margin-top: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 30px;
		margin-bottom: 40px;
		button {
			padding: rem(10);
			font-size: rem(18);
			&.active {
				color: $color-secondary;
				font-weight: 700;
				font-size: rem(24);
			}
		}
	}
	.switcher__control {
		display: flex;
		align-items: center;
	}
	.categories-grid {
		columns: 3;
		column-gap: 15px;
		img {
			display: block;
		}
	}
	.category {
		display: block;
		position: relative;
		margin-bottom: 15px;
		.category__content {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: 24px 30px;
			h3 {
				width: 100%;
				color: $color-white;
				margin: 0;
				transition: all 0.15s ease-in-out;
				position: relative;
				&::before {
					content: url('/icon/arrow-red.svg');
					display: block;
					line-height: 0;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%) scale(0);
					opacity: 0;
					transition: all 0.15s ease-in-out;
				}
			}
		}
		&:hover,
		&:focus {
			.category__content {
				h3 {
					padding-left: 50px;
					&::before {
						transform: translateY(-50%) scale(1);
						opacity: 1;
					}
				}
			}
		}
	}
	.banner {
		padding: 60px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		h3 {
			font-size: rem(28);
			margin-bottom: em(20, 28);
			margin-top: 0;
		}
		.banner__content {
			max-width: 736px;
		}
	}
</style>
