<template>
	<div class="banner__top container">
		<div
			class="banner"
			:style="`background-image: url(${
				screenWidth >= 768
					? hpBannerTop.page.rumlKlingerHomepage.bannerTop.image.sourceUrl
					: hpBannerTop.page.rumlKlingerHomepage.bannerTop.imageMobile.sourceUrl
			})`">
			<div class="banner__content">
				<h3>{{ hpBannerTop.page.rumlKlingerHomepage.bannerTop.title }}</h3>
				<p>{{ hpBannerTop.page.rumlKlingerHomepage.bannerTop.perex }}</p>
				<a
					class="btn btn-primary"
					:href="hpBannerTop.page.rumlKlingerHomepage.bannerTop.btn.file.mediaItemUrl"
					target="_blank">
					{{ hpBannerTop.page.rumlKlingerHomepage.bannerTop.btn.text }}
					({{ (hpBannerTop.page.rumlKlingerHomepage.bannerTop.btn.file.fileSize / 1000 / 1000).toFixed(2) }} MB)
				</a>
			</div>
		</div>
	</div>
</template>
<script setup>
	const screenWidth = useState('screenWidth')
	const homepageQuery = gql`
		query getBannerTop {
			page(id: "cG9zdDo1OTI=") {
				title
				slug
				rumlKlingerHomepage {
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
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
						imageMobile {
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
	const hpBannerTop = useState('hpBannerTop', () => null)
	if (!hpBannerTop.value) {
		const { data } = await useAsyncQuery(homepageQuery)
		hpBannerTop.value = data.value
	}
	// const { data: hpBannerTop } = await useAsyncData('bannerTop', () => useAsyncQuery(homepageQuery))
</script>
<style lang="scss" scoped>
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
	@media (max-width: 767px) {
		.banner {
			padding: 60px 20px 180px;
		}
	}
</style>
