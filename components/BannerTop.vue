<template>
	<div class="banner__top container">
		<div
			class="banner"
			:style="{ '--banner-desktop': `url(${image(hpBannerTop.page.rumlKlingerHomepage.bannerTop.image.sourceUrl, { width: 1440, format: 'webp', quality: 80 })})`, '--banner-mobile': `url(${image(hpBannerTop.page.rumlKlingerHomepage.bannerTop.imageMobile.sourceUrl, { width: 780, format: 'webp', quality: 80 })})` }">
			<div class="banner__content">
				<h3>{{ hpBannerTop.page.rumlKlingerHomepage.bannerTop.title }}</h3>
				<p>{{ hpBannerTop.page.rumlKlingerHomepage.bannerTop.perex }}</p>
				<a class="btn btn-primary" :href="hpBannerTop.page.rumlKlingerHomepage.bannerTop.btn.file.mediaItemUrl" target="_blank">
					{{ hpBannerTop.page.rumlKlingerHomepage.bannerTop.btn.text }}
					({{ (hpBannerTop.page.rumlKlingerHomepage.bannerTop.btn.file.fileSize / 1000 / 1000).toFixed(2) }} MB)
				</a>
			</div>
		</div>
	</div>
</template>
<script setup>
const image = useImage()
const props = defineProps(['data'])
const hpBannerTop = computed(() => props.data)
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

.banner { background-image: var(--banner-desktop); }
@media(max-width:767px) { .banner { background-image: var(--banner-mobile); } }
</style>
