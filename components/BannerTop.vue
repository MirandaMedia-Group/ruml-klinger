<template>
	<div class="banner__top container">
		<div
			class="banner"
			:style="`background-image: url(${hpBannerTop.page.rumlKlingerHomepage.bannerTop.image.sourceUrl})`">
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
	const hpBannerTop = useState('hpBannerTop', () => null)
	const homepageQuery = gql`
		query {
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
					}
				}
			}
		}
	`
	const { data: homepageResponse } = await useAsyncQuery(homepageQuery)
	hpBannerTop.value = homepageResponse.value
</script>
