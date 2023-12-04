<template>
	<PostHeader :image="pfData.page.featuredImage.node" :title="pfData.page.title" :excerpt="pfData.page.pfCustom.description" />
	<div class="narrow container">
		<div v-if="pfData.page.content" v-html="pfData.page.content"></div>
	</div>
</template>
<script setup>
	const router = useRouter()
	const { locale, t } = useI18n()
	const localeIDs = {
		kalendar: {
			cs: 'cG9zdDo0MzE0',
			en: 'cG9zdDo0MzE2',
		},
	}
	const pfQuery = gql`
		query getKlingerCalendar($localeID: ID!) {
			page(id: $localeID) {
				title
				slug
				content
				featuredImage {
					node {
						altText
						sourceUrl
						mediaDetails {
							height
							width
						}
					}
				}
				pfCustom {
					description
				}
			}
		}
	`
	const { data: pfData } = await useAsyncQuery(pfQuery, { localeID: localeIDs.kalendar[locale.value] })
	useHead({
		bodyAttrs: {
			class: 'wp-content',
		},
		title: 'RUML Klinger s.r.o - ' + pfData.value.page.title,
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: pfData.value.page.pfCustom.description,
			},
		],
	})
</script>
