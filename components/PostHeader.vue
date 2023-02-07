<template>
	<section class="detail-header">
		<div class="container">
			<div class="detail-header__columns">
				<div
					v-if="props.image"
					class="column detail-header__image">
					<NuxtPicture
						:src="props.image.sourceUrl"
						:alt="props.image.altText"
						:width="props.image.mediaDetails.width"
						:height="props.image.mediaDetails.height"
						loading="lazy"
						provider="ipx" />
				</div>
				<div class="column detail-header__info">
					<div
						v-if="props.company"
						class="detail-header__company">
						<NuxtPicture
							:src="companyLogos[props.logo]"
							:alt="props.logo" />
					</div>
					<h1>{{ props.title }}</h1>
					<div
						class="detail-header__excerpt"
						v-html="props.excerpt"></div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const props = defineProps(['image', 'logo', 'title', 'excerpt'])

	const companyLogos = ref({
		klinger: '/loga/ruml-group.png',
		service: '/loga/ruml-service.png',
		emes: '/loga/ruml-emes.png',
		industry: '/loga/ruml-industry.png',
		tesneni: '/loga/ruml-tesneni.png',
		group: '/loga/ruml-group.png',
	})
	const companyURLs = ref({
		klinger: 'www.ruml-klinger.cz',
		service: 'www.ruml-service.cz',
		emes: 'www.ruml-emes.cz',
		industry: 'www.ruml-industry.cz',
		tesneni: 'www.ruml-tesneni.cz',
		group: 'www.ruml-group.cz',
	})
</script>
<style lang="scss">
	.detail-header {
		background: url(/page-header-bg.jpg) top center no-repeat;
		margin-bottom: 160px;
		&__columns {
			position: relative;
			bottom: -80px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			background-color: $color-white;
		}
		&__image,
		&__info {
			flex: 1 1 420px;
		}
		&__image {
			align-self: stretch;
			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&__info {
			padding: 80px 50px;
		}
		&__company {
			img {
				width: auto;
			}
		}
		&__excerpt {
			font-size: rem(20);
			color: rgba($color-font, 0.6);
		}
	}
	@media (max-width: 767px) {
		.detail-header {
			background: none;
			margin-bottom: 50px;
			.container {
				padding: 0;
			}
			&__columns {
				position: initial;
			}
			&__info {
				padding: 20px;
			}
			&__excerpt {
				font-size: rem(16);
			}
		}
	}
</style>
