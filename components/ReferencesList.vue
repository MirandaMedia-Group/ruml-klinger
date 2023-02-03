<template>
	<div class="references__list">
		<div
			class="reference"
			v-for="reference in props.references.filter((reference) => reference.referenceCategories.nodes[0].id === props.category.id)"
			:key="reference.slug">
			<div class="reference__image">
				<NuxtPicture
					:src="reference.featuredImage.node.sourceUrl"
					:alt="reference.featuredImage.node.altText"
					:width="reference.featuredImage.node.mediaDetails.width"
					:height="reference.featuredImage.node.mediaDetails.height"
					loading="lazy"
					provider="ipx" />
			</div>
			<div class="reference__title">
				{{ reference.title }}
			</div>
		</div>
	</div>
</template>
<script setup>
	const props = defineProps(['references', 'category'])
</script>
<style lang="scss" scoped>
	.references__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
		margin-bottom: 60px;
		.reference {
			text-decoration: none;
			color: $color-font;
			&:hover,
			&:focus {
				.reference__image {
					filter: grayscale(0);
				}
			}
		}
		.reference__image {
			background-color: $color-white;
			padding: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			aspect-ratio: 1;
			filter: grayscale(1);
			transition: all 0.15s ease-in-out;
			margin-bottom: 5px;
		}
		.reference__title {
			font-weight: 700;
			text-align: center;
			line-height: em(28);
		}
	}
	@media (max-width: 900px) {
		.references__list {
			margin-bottom: 20px;
		}
	}
	@media (max-width: 540px) {
		.references__list {
			grid-template-columns: repeat(2, minmax(1px, 1fr));
		}
	}
</style>
