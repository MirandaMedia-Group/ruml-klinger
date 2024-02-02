<template>
	<div v-if="siteMessageData?.siteMessage">
		<div
			class="site-message"
			:style="{
				backgroundColor: siteMessageData.siteMessage.siteMessageAcf.bgColor,
				color: siteMessageData.siteMessage.siteMessageAcf.textColor,
			}">
			<div class="container">
				<div v-html="siteMessageData.siteMessage.siteMessageAcf.text"></div>
			</div>
		</div>
	</div>
</template>
<script setup>
	const { locale } = useI18n()
	const localeIDs = {
		message: {
			cs: 'cG9zdDo0NDk1',
			en: 'cG9zdDo0NDk2',
		},
	}
	const siteMessageQuery = gql`
		query getGroupMessage($localeID: ID!) {
			siteMessage(id: $localeID) {
				siteMessageAcf {
					bgColor
					text
					textColor
				}
			}
		}
	`

	const { data: siteMessageData } = await useAsyncQuery(siteMessageQuery, { localeID: localeIDs.message[locale.value] })
</script>
<style lang="scss" scoped>
	.site-message {
		padding: 4px 0;
		text-align: center;
		:deep(p) {
			margin: 0;
		}
		:deep(a) {
			color: inherit;
			text-decoration: underline;
		}
	}
</style>
