<template>
	<div class="categories">
		<h2>Kategorie</h2>
		<CategoriesBox />
	</div>
</template>
<script setup></script>
<style lang="scss" scoped>
	.categories {
		border-top: 2px solid $color-secondary;
		background-color: $color-white;
		padding: 30px;
		h2 {
			font-size: rem(24);
			margin: 0 0 em(20, 24);
			color: #213eab;
			&::after {
				display: none;
			}
		}
	}
</style>
