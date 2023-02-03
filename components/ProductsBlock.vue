<template>
	<div class="products-block">
		<SingleProduct
			v-for="(item, index) in props.data"
			:key="index"
			v-bind="item" />
	</div>
</template>
<script setup>
	const props = defineProps(['data'])
</script>
<style lang="scss" scoped>
	.products-block {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 30px;
	}
	@media (max-width: 767px) {
		.products-block {
			grid-template-columns: repeat(2, minmax(1px, 1fr));
			gap: 15px;
		}
	}
</style>
