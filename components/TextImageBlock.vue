<template>
	<section :class="{ 'has-background': props.hasBackground }">
		<div
			class="container"
			:class="{ divider: props.divider }">
			<div
				class="columns col-2"
				:class="{ reverse: props.reverse, 'align-center': props.alignCenter }">
				<div class="column about-us__text">
					<h2>{{ props.data.title }}</h2>
					<div
						v-if="props.data.perex"
						class="about-us__perex"
						v-html="props.data.perex"></div>
					<div
						v-if="props.data.text"
						class="about-us__description"
						v-html="props.data.text"></div>
					<BtnSecondary
						v-if="props.btn"
						:href="props.btn.url">
						{{ props.btn.text }}
					</BtnSecondary>
				</div>
				<div class="column">
					<div class="about-us__image">
						<NuxtPicture
							:src="props.data.image.sourceUrl"
							:width="props.data.image.mediaDetails.width"
							:height="props.data.image.mediaDetails.height"
							:alt="props.data.image.altText"
							loading="lazy"
							provider="ipx" />
					</div>
					<div
						v-if="props.data.certificates"
						class="certificates">
						<h3>Certifikáty</h3>
						<FilesTable :data="props.data.certificates" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const props = defineProps(['data', 'reverse', 'hasBackground', 'btn', 'alignCenter', 'divider'])
</script>
<style lang="scss" scoped>
	.has-background {
		background: url(/ruml-big.svg) left top no-repeat;
		margin: -100px 0 0;
		padding: 100px 0;
	}
	.columns {
		gap: 80px;
		&.reverse {
			flex-direction: row-reverse;
		}
	}
	h3 {
		font-size: rem(28);
	}
	h2::after {
		margin-left: 0;
	}
	.about-us__perex {
		font-size: rem(20);
		color: rgba($color-font, 0.9);
	}
	.about-us__description {
		color: rgba($color-font, 0.9);
		font-weight: 300;
	}
	.certificates {
		margin-top: 20px;
	}
</style>
