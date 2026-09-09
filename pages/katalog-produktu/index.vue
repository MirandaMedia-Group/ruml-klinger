<template>
	<div>
		<div class="container">
			<Breadcrumbs />
		</div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<div class="">
					<!-- <div class="category__image"></div> -->
					<div class="">
						<h1>{{ $t('products') }}</h1>
					</div>
				</div>
				<SubcategoriesList />
				<!-- <div
					id="products"
					ref="productsAnchor">
					<div v-if="pending">
						<LoadingCircle />
					</div>
					<ProductsBlock
						v-else
						:data="allProductsData.products.nodes" />
				</div>
				<div class="pagination">
					<button
						class="button-prev"
						v-if="allProductsData.products.pageInfo.hasPreviousPage"
						@click.prevent="handlePrevPage">
						<span class="arrow"></span>
					</button>
					<button
						class="button-next"
						v-if="allProductsData.products.pageInfo.hasNextPage"
						@click.prevent="handleNextPage">
						<span class="arrow"></span>
					</button>
				</div> -->
			</template>
			<template #sidebar>
				<CategorySidebar />
			</template>
		</NuxtLayout>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: false,
	})






















	const productsAnchor = ref(null)



























</script>
<style lang="scss">
	#products {
		scroll-padding-top: 200px;
	}
	.pagination {
		display: flex;
		align-items: stretch;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 30px;
		padding-top: 30px;
		border-top: 1px solid $color-inactive;
		.button-prev,
		.button-next {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 44px;
			height: 44px;
			border: 1px solid $color-secondary;
			border-radius: 4px;
			font-weight: 700;
			padding: 0;
			.arrow {
				display: block;
				width: 12px;
				height: 12px;
				border: 2px solid $color-black;
				border-style: none solid solid none;
				transform: rotate(-45deg);
				position: relative;
				left: -3px;
			}
		}
		.button-prev {
			.arrow {
				transform: rotate(135deg);
				left: unset;
				right: -3px;
			}
		}
	}
</style>
