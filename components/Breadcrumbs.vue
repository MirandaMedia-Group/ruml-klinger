<template>
	<nav class="breadcrumbs">
		<ul>
			<li>
				<NuxtLink :to="localePath('/')">Home</NuxtLink>
			</li>
			<li>
				<NuxtLink :to="localePath('/katalog-produktu')">{{ $t('products') }}</NuxtLink>
			</li>
			<li v-for="(item, index) in props.sublinks" :key="index">
				<NuxtLink :to="localePath(item.url)">{{ item.name }}</NuxtLink>
			</li>
		</ul>
	</nav>
</template>
<script setup>
	const localePath = useLocalePath()
	const props = defineProps(['sublinks'])
</script>
<style lang="scss" scoped>
	.breadcrumbs {
		padding: 20px 0;
		margin-bottom: -50px;
		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			display: flex;
			a,
			span {
				line-height: em(22);
				display: inline-block;
				text-decoration: none;
				color: rgba($color-font, 0.6);
			}
			li:not(:last-child) {
				a,
				span {
					&::after {
						content: '/';
						display: inline-block;
						font-size: 1rem;
						line-height: em(22);
						margin: 0 em(10);
						color: rgba($color-font, 0.6);
					}
				}
			}
			a {
				&:hover,
				&:focus {
					color: $color-primary;
					text-decoration: underline;
				}
			}
		}
	}
	@media (max-width: 767px) {
		.breadcrumbs {
			display: none;
		}
	}
</style>
