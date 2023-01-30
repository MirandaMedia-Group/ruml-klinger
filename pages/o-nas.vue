<template>
	<HeroBig
		v-bind="onas.page.rumlKlingerOnas.hero"
		:white="true" />
	<TextImageBlock
		:data="onas.page.rumlKlingerOnas.firstBlock"
		:has-background="true"
		:divider="true" />
	<section
		id="usp"
		class="container">
		<div class="narrow center">
			<h2>{{ onas.page.rumlKlingerOnas.secondBlock.title }}</h2>
			<div v-html="onas.page.rumlKlingerOnas.secondBlock.perex"></div>
		</div>
		<div class="usp-wrapper">
			<div
				v-for="(usp, index) in onas.page.rumlKlingerOnas.secondBlock.usp"
				:key="index"
				class="usp">
				<strong>{{ usp.value }}</strong>
				<span>{{ usp.text }}</span>
			</div>
		</div>
	</section>
</template>
<script setup>
	const onas = useState('onas', () => null)
	const onasQuery = gql`
		query {
			page(id: "cG9zdDo2MDI=") {
				id
				slug
				title
				rumlKlingerOnas {
					hero {
						title
						perex
						image {
							altText
							sourceUrl
							mediaDetails {
								width
								height
							}
						}
					}
					firstBlock {
						title
						perex
						text
						image {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
						certificates {
							name
							file {
								fileSize
								mediaItemUrl
								slug
								title
								mimeType
							}
						}
					}
					secondBlock {
						title
						perex
						usp {
							text
							value
						}
					}
					timeline {
						titulek
						perex
						history {
							year
							perex
							image {
								altText
								sourceUrl
								mediaDetails {
									height
									width
								}
							}
						}
					}
					owners {
						person {
							name
							position
							perex
							image {
								altText
								sourceUrl
								mediaDetails {
									height
									width
								}
							}
						}
					}
					ourCompanies {
						company {
							title
							perex
							url
							image {
								altText
								sourceUrl
								mediaDetails {
									height
									width
								}
							}
							logo {
								altText
								sourceUrl
								mediaDetails {
									height
									width
								}
							}
						}
					}
				}
			}
		}
	`
	const { data: onasData } = await useAsyncQuery(onasQuery)
	onas.value = onasData.value
	console.log(onas.value)
</script>
<style lang="scss">
	.usp-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 20px;
	}
	.usp {
		margin-top: 100px;
		padding: 60px 30px;
		background-color: $color-white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 20px;
		strong {
			color: $color-secondary;
			font-size: rem(62);
			&::after {
				content: '';
				display: block;
				height: 2px;
				width: 60px;
				margin-left: auto;
				margin-right: auto;
				background-color: $color-secondary;
				margin-top: 20px;
			}
		}
		span {
			font-weight: 700;
			text-transform: uppercase;
			font-size: rem(24);
		}
	}
</style>
