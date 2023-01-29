<template>
	<PageHeader>
		<h1>Staňte se jedním z nás</h1>
		<p>Ve firmách RUML Group poskytujeme našim zaměstněncům/kolegům prostor pro jejich maximální uplatnění a rozvoj.</p>
		<strong>Právě máme volných {{ careerList?.careers.nodes.length }} pozic</strong>
	</PageHeader>
	<section class="container">
		<div class="career-list">
			<div
				class="career"
				v-for="(post, index) in careerList?.careers.nodes"
				:key="index">
				<div class="career__image">
					<NuxtPicture
						:src="post.featuredImage.node.sourceUrl"
						:alt="post.featuredImage.node.altText"
						:width="post.featuredImage.node.mediaDetails.width"
						:height="post.featuredImage.node.mediaDetails.height"
						provider="ipx" />
				</div>
				<div class="career__content">
					<h2 class="career__title">{{ post.title }}</h2>
					<div
						class="career__excerpt"
						v-html="post.excerpt"></div>

					<NuxtLink
						:to="`/kariera/${post.slug}`"
						class="btn btn-primary">
						Zobrazit pozici
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	const careerList = useState('careerList', () => null)

	const careerListQuery = gql`
		query {
			careers {
				nodes {
					excerpt
					featuredImage {
						node {
							altText
							mediaDetails {
								height
								width
							}
							sourceUrl
						}
					}
					slug
					title
				}
			}
		}
	`
	const { data: careerListData } = await useAsyncQuery(careerListQuery)
	careerList.value = careerListData.value
	console.log(careerList.value)
</script>

<style lang="scss" scoped>
	.career {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 40px;
		&__image {
			flex: 1 1 140px;
			img,
			picture {
				display: block;
			}
		}
		&__content {
			flex: 1 1 600px;
			padding: 50px;
			background-color: $color-white;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			h2 {
				font-size: rem(32);
				&::after {
					display: none;
				}
			}
		}
	}
</style>
