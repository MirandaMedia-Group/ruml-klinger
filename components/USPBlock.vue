<template>
	<div class="narrow center">
		<h2>{{ usp.page.rumlKlingerOnas.secondBlock.title }}</h2>
		<div v-html="usp.page.rumlKlingerOnas.secondBlock.perex"></div>
	</div>
	<div class="usp-wrapper">
		<div
			v-for="(usp, index) in usp.data.page.rumlKlingerOnas.secondBlock.usp"
			:key="index"
			class="usp">
			<strong>{{ usp.value }}</strong>
			<span>{{ usp.text }}</span>
		</div>
	</div>
</template>
<script setup>
	const uspQuery = gql`
		query getUSP {
			page(id: "cG9zdDo2MDI=") {
				id
				slug
				title
				rumlKlingerOnas {
					secondBlock {
						title
						perex
						usp {
							text
							value
						}
					}
				}
			}
		}
	`
	const { data: usp } = await useAsyncData('usp', () => useAsyncQuery(uspQuery))
</script>
