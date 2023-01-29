<template>
	<PageHeader>
		<h1>Reference</h1>
		<p>
			<b>Zaměřujeme se na dodávku kvalitních průmyslových výrobků a technologií od renomovaných výrobců.</b> Našim zákazníkům dodáváme
			i služby spojené s plánováním, dodávkou a montáží. Provádíme energetické audity průmyslových rozvodů včetně návrhu a provedení
			jejich zaizolování. Provádíme monitoring odvaděčů kondenzátu.
		</p>
	</PageHeader>
	<section class="container">
		<AnchorsBlock>
			<nav>
				<ul>
					<li
						v-for="(category, index) in referenceCategories?.referenceCategories.nodes"
						:key="index">
						<a :href="`#${category.slug}`">{{ category.name }}</a>
					</li>
				</ul>
			</nav>
		</AnchorsBlock>
		<div
			class="reference-category"
			v-for="(category, index) in referenceCategories?.referenceCategories.nodes"
			:id="category.slug"
			:key="index">
			<div class="reference-category__header">
				<NuxtPicture
					:src="category.referenceCategoryAcf.image.sourceUrl"
					:alt="category.referenceCategoryAcf.image.altText"
					:width="category.referenceCategoryAcf.image.mediaDetails.width"
					:height="category.referenceCategoryAcf.image.mediaDetails.height"
					provider="ipx" />
				<h2>{{ category.name }}</h2>
			</div>

			<ReferencesList
				:references="references?.references.nodes"
				:category="category" />
		</div>
	</section>
</template>
<script setup>
	const referenceCategories = useState('referenceCategories')
	const references = useState('references')
	const activeReferenceBlock = useState('activeReferenceBlock')

	const getReferenceCategories = async () => {
		const referenceCategoriesQuery = gql`
			{
				referenceCategories {
					nodes {
						id
						name
						link
						uri
						slug
						referenceCategoryAcf {
							image {
								sourceUrl
								altText
								mediaDetails {
									height
									width
								}
							}
						}
					}
				}
			}
		`
		const { data } = await useAsyncQuery(referenceCategoriesQuery)
		referenceCategories.value = data
		activeReferenceBlock.value = referenceCategories.value.referenceCategories.nodes[0].id
	}
	if (!referenceCategories.value) {
		getReferenceCategories()
	}
	const getReferences = async () => {
		const referencesQuery = gql`
			{
				references {
					nodes {
						id
						title
						slug
						featuredImage {
							node {
								sourceUrl
								altText
								mediaDetails {
									height
									width
								}
							}
						}
						referenceCategories {
							nodes {
								name
								id
							}
						}
					}
				}
			}
		`
		const { data } = await useAsyncQuery(referencesQuery)
		references.value = data
	}
	if (!references.value) {
		getReferences()
	}
</script>
<style lang="scss">
	.reference-category {
		&__header {
			position: relative;
			margin-bottom: 60px;
			h2 {
				position: absolute;
				bottom: 0;
				left: 0;
				font-size: rem(32);
				padding: em(20, 32);
				margin: 0;
				background-color: $color-bg-light;
				&::after {
					display: none;
				}
			}
		}
	}
</style>
