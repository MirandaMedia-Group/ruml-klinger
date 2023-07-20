<template>
	<div class="narrow center">
		<h2>{{ usp.page.rumlKlingerOnas.secondBlock.title }}</h2>
		<div v-html="usp.page.rumlKlingerOnas.secondBlock.perex"></div>
	</div>
	<div class="usp-wrapper">
		<div v-for="(usp, index) in usp.page.rumlKlingerOnas.secondBlock.usp" :key="index" class="usp">
			<strong>{{ usp.value }}</strong>
			<span>{{ usp.text }}</span>
		</div>
	</div>
</template>
<script setup>
	const { locale, t } = useI18n()
	const localeIDs = {
		aboutus: {
			cs: 'cG9zdDo2MDI=',
			en: 'cG9zdDozODQy',
		},
	}
	const uspQuery = gql`
		query getUSPKlinger($localeID: ID!) {
			page(id: $localeID) {
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
	const { data: usp } = await useAsyncQuery(uspQuery, { localeID: localeIDs.aboutus[locale.value] })
</script>
