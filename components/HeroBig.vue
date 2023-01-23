<template>
	<section class="hero">
		<NuxtPicture
			:src="image.sourceUrl"
			provider="ipx" />
		<div class="container">
			<div class="content">
				<h1>{{ props.title }}</h1>
				<div
					class="excerpt"
					v-html="props.perex"></div>
				<div class="buttons-vertical">
					<NuxtLink
						v-if="btnPrimary.type === 'internal'"
						:to="btnPrimary.urlInternal"
						class="btn btn-primary">
						{{ btnPrimary.text }}
					</NuxtLink>
					<a
						v-else-if="btnPrimary.type === 'external'"
						:href="btnPrimary.urlExternal"
						class="btn btn-primary"
						target="_blank">
						{{ btnPrimary.text }}
					</a>
					<BtnSecondary
						:type="btnSecondary.type"
						:href="btnSecondary.type === 'internal' ? btnSecondary.urlInternal : btnSecondary.urlExternal">
						{{ btnSecondary.text }}
					</BtnSecondary>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const props = defineProps(['title', 'perex', 'btnPrimary', 'btnSecondary', 'image'])
</script>
<style lang="scss" scoped>
	.hero {
		position: relative;
	}
	.container {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 100%;
		display: flex;
		align-items: center;
	}
	.content {
		max-width: 600px;
	}
	.subheading {
		color: $color-secondary;
		font-weight: 700;
		text-transform: uppercase;
		font-size: rem(24);
		line-height: em(27, 24);
		margin-bottom: em(30, 24);
	}
	.excerpt {
		font-size: rem(20);
		line-height: em(36, 20);
		margin: 0;
	}
</style>
