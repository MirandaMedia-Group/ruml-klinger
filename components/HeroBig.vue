<template>
	<section class="hero">
		<NuxtPicture :src="backgroundImage.sourceUrl" />
		<div class="container">
			<div class="content">
				<div class="subheading">{{ props.subheading }}</div>
				<h1>{{ props.title }}</h1>
				<p class="excerpt">
					{{ props.excerpt }}
				</p>
				<div class="buttons-vertical">
					<NuxtLink
						v-if="btnPrimary.btnType === 'internal'"
						:to="btnPrimary.btnUrlInternal"
						class="btn btn-primary">
						{{ btnPrimary.btnText }}
					</NuxtLink>
					<a
						class="btn btn-secondary"
						:href="btnSecondary.btnUrl">
						{{ btnSecondary.btnText }}
					</a>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const props = defineProps(['title', 'subheading', 'excerpt', 'btnPrimary', 'btnSecondary', 'backgroundImage'])
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
