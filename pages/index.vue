<template>
	<HeroBig
		v-for="(item, index) in carouselData.carouselyHP.nodes"
		:key="index"
		:title="item.title"
		v-bind="item.carouselHP_acf" />
</template>
<script setup>
	const carouselQuery = gql`
		query {
			carouselyHP {
				nodes {
					id
					title
					carouselHP_acf {
						subheading
						excerpt
						btnPrimary {
							btnType
							btnText
							btnUrlInternal
							btnUrlExternal
						}
						btnSecondary {
							btnText
							btnUrl
						}
						backgroundImage {
							sourceUrl
						}
					}
				}
			}
		}
	`
	const { data: carouselData } = await useAsyncQuery(carouselQuery)
	console.log(carouselData.value.carouselyHP.nodes)
</script>
<style lang="scss"></style>
