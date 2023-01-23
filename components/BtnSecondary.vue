<template>
	<NuxtLink
		v-if="props.type === 'internal'"
		:to="props.href"
		class="btn btn-secondary">
		<svg
			width="19"
			height="15"
			viewBox="0 0 19 15"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
		<slot></slot>
	</NuxtLink>
	<a
		v-else
		class="btn btn-secondary"
		:href="props.href">
		<svg
			width="19"
			height="15"
			viewBox="0 0 19 15"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
		<slot></slot>
	</a>
</template>
<script setup>
	const props = defineProps(['href', 'text', 'type'])
</script>
<style lang="scss" scoped>
	.btn-secondary {
		background-color: transparent;
		color: $color-black;
		border: 1px solid $color-secondary;
		padding-right: em(60);
		svg {
			margin-right: em(13.5);
			line-height: 0;
			transition: all 0.15s ease-in-out;
			stroke: $color-secondary;
		}
		&:hover,
		&:focus {
			padding-left: em(30);
			padding-right: em(30);
			svg {
				margin-right: em(33.5);
			}
		}
	}
</style>
