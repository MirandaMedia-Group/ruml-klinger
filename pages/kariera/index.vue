<template>
	<PageHeader>
		<h1>{{ $t('careerPage.title') }}</h1>
		<p>{{ $t('careerPage.perex') }}</p>
		<strong v-if="careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length">
			{{ $t('careerPage.stillGot') }}
			{{
				careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length === 1
					? $t('careerPage.positionPrefix1')
					: careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length >= 2 &&
					  careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length <= 4
					? $t('careerPage.positionPrefix2')
					: $t('careerPage.positionPrefix3')
			}}
			{{ careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length }}
			{{
				careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length === 1
					? $t('careerPage.positionCount1')
					: careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length >= 2 &&
					  careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger').length <= 4
					? $t('careerPage.positionCount2')
					: $t('careerPage.positionCount3')
			}}
		</strong>
		<strong v-else>{{ $t('careerPage.positionCount0') }}</strong>
		<p style="margin-top: 20px">
			{{ $t('careerPage.otherCompanies') }}
			<a href="https://www.ruml-group.cz/kariera" target="_blank">{{ $t('careerPage.here') }}</a>
		</p>
	</PageHeader>
	<section class="container">
		<div class="career-list">
			<div
				class="career"
				v-for="(post, index) in careerList.careers.nodes.filter((post) => post.careerAcf.company === 'klinger')"
				:key="index">
				<div class="career__image">
					<NuxtPicture
						:src="post.featuredImage.node.sourceUrl"
						:alt="post.featuredImage.node.altText"
						:width="post.featuredImage.node.mediaDetails.width"
						:height="post.featuredImage.node.mediaDetails.height"
						loading="lazy"

						:img-attrs="{ style: 'display:block; width: 100%; height: 100%; object-fit: cover;' }" />
				</div>
				<div class="career__content">
					<div class="career__company">
						<NuxtPicture
							:src="companyLogos[post.careerAcf.company]"
							:alt="post.careerAcf.company"
							width="139"
							height="68"
							loading="lazy" />
					</div>
					<h2 class="career__title">{{ post.title }}</h2>
					<div class="career__website">
						{{ companyURLs[post.careerAcf.company] }}
					</div>
					<div class="career__excerpt" v-html="post.excerpt"></div>
					<NuxtLink external no-prefetch :to="localePath(`/kariera/${post.slug}`)" class="btn btn-primary">{{
						$t('careerPage.showPosition')
					}}</NuxtLink>
				</div>
			</div>
		</div>
	</section>
	<TextImageBlock
		:data="aboutUsBanner.page.rumlKlingerHomepage.aboutUs"
		:hasBackground="true"
		:btn="{ text: $t('moreAboutCompany'), url: localePath('/o-nas') }"
		:alignCenter="true" />
	<section class="container">
		<USPBlock :usp="usp" />
	</section>
</template>

<script setup>
 const localePath = useCmsLocalePath()
	const companyLogos = ref({
		klinger: '/loga/ruml-group.png',
		service: '/loga/ruml-service.png',
		emes: '/loga/ruml-emes.png',
		industry: '/loga/ruml-industry.png',
		tesneni: '/loga/ruml-tesneni.png',
		group: '/loga/ruml-group.png',
	})
	const companyURLs = ref({
		klinger: 'www.ruml-klinger.cz',
		service: 'www.ruml-service.cz',
		emes: 'www.ruml-emes.cz',
		industry: 'www.ruml-industry.cz',
		tesneni: 'www.ruml-tesneni.cz',
		group: 'www.ruml-group.cz',
	})
	const { locale, t } = useI18n()
	const localeIDs = {
		homepage: {
			cs: 'cG9zdDo1OTI=',
			en: 'cG9zdDozODM3',
		},
	}
	useHead({
		title: t('seo.career.title'),
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: t('seo.career.description'),
			},
		],
	})

	const USPBlockIDs = {
		aboutus: {
			cs: 'cG9zdDo2MDI=',
			en: 'cG9zdDozODQy',
		},
	}
const contentQuery = `query KlingerPagesKarieraIndexVue($careerList_language: LanguageCodeFilterEnum!, $aboutUsBanner_localeID: ID!, $usp_localeID: ID!, $_cursor_careerList_careers: String) {
  careerList_careers: careers(
    where: {language: $careerList_language}
    first: 100
    after: $_cursor_careerList_careers
  ) {
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
      careerAcf {
        company
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  aboutUsBanner_page: page(id: $aboutUsBanner_localeID) {
    title
    slug
    rumlKlingerHomepage {
      aboutUs {
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
      }
    }
  }
  usp_page: page(id: $usp_localeID) {
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
}`
const { data: combinedData } = await useRequiredAsyncQuery(contentQuery, { ...Object.fromEntries(Object.entries({ language: locale.value.toUpperCase() }).map(([key,value])=>["careerList_"+key,value])), ...Object.fromEntries(Object.entries({ localeID: localeIDs.homepage[locale.value] }).map(([key,value])=>["aboutUsBanner_"+key,value])), ...Object.fromEntries(Object.entries({ localeID: USPBlockIDs.aboutus[locale.value] }).map(([key,value])=>["usp_"+key,value])) })
const careerList = computed(() => ({ careers: combinedData.value.careerList_careers }))
const aboutUsBanner = computed(() => ({ page: combinedData.value.aboutUsBanner_page }))
const usp = computed(() => ({ page: combinedData.value.usp_page }))









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
				height: 100%;
			}
		}
		&__company {
			margin-bottom: 20px;
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
				margin-bottom: 0;
				&::after {
					display: none;
				}
			}
		}
		&__website {
			color: $color-font-light;
			margin-bottom: 20px;
		}
	}
	@media (max-width: 767px) {
		.career {
			&__content {
				padding: 20px;
			}
			&__content h2 {
				font-size: rem(24);
			}
		}
	}
</style>
