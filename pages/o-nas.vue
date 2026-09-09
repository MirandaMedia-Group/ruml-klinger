<template>
	<HeroBig v-bind="onas.page.rumlKlingerOnas.hero" :white="true" />
	<TextImageBlock :data="onas.page.rumlKlingerOnas.firstBlock" :has-background="true" :divider="true" />
	<section id="usp" class="container">
		<USPBlock :usp="usp" />
	</section>
	<section id="historie">
		<div class="container">
			<div class="timeline__columns">
				<div class="timeline__info">
					<h2>{{ onas.page.rumlKlingerOnas.timeline.titulek }}</h2>
					<div class="timeline__description" v-html="onas.page.rumlKlingerOnas.timeline.perex"></div>
					<div class="timeline__controls">
						<div ref="swiperPrev" class="arrow-prev">
							<svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</div>
						<div ref="swiperNext" class="arrow-next">
							<svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.5 7.5L17.5 7.5M17.5 7.5L11 14M17.5 7.5L11 0.999999"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round" />
							</svg>
						</div>
					</div>
				</div>
				<div class="timeline__slider-wrapper">
					<Swiper
						:modules="modules"
						:spaceBetween="20"
						:slidesPerView="'auto'"
						:navigation="{
							prevEl: swiperPrev,
							nextEl: swiperNext,
						}"
						@beforeInit="
							(Swiper) => {
								Swiper.params.navigation.prevEl = swiperPrev
								Swiper.params.navigation.nextEl = swiperNext
							}
						">
						<SwiperSlide
							v-for="(history, index) in onas.page.rumlKlingerOnas.timeline.history"
							:key="index"
							class="timeline__slider--item"
							:class="{ first: index === 0 }">
							<div class="timeline-item__content__image">
								<NuxtImg loading="lazy" decoding="async" sizes="xs:260px sm:320px md:450px"
									:src="history.image.sourceUrl"
									:alt="history.image.altText"
									:width="history.image.mediaDetails.width"
									:height="history.image.mediaDetails.height" />
							</div>
							<h3 class="timeline-item__year">
								{{ history.year }}
							</h3>
							<div class="timeline-item__content__text">
								<div v-html="history.perex"></div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	</section>
	<section class="container">
		<div class="narrow center">
			<h2>{{ $t('aboutusPage.ownersTitle') }}</h2>
		</div>
		<div class="owners desktop-767">
			<div v-for="(owner, index) in onas.page.rumlKlingerOnas.owners.person" :key="index" class="owner">
				<div class="owner__image">
					<NuxtPicture sizes="xs:80px sm:80px md:300px" format="webp" decoding="async"
						:src="owner.image.sourceUrl"
						:alt="owner.image.altText"
						:width="owner.image.mediaDetails.width"
						:height="owner.image.mediaDetails.height"
						loading="lazy"
						 />
				</div>
				<div class="owner__name">
					<strong>{{ owner.name }}</strong>
					<div class="owner__position">{{ owner.position }}</div>
				</div>
				<div class="owner__text">
					<div v-html="owner.perex"></div>
				</div>
			</div>
		</div>
		<div class="owners-mobile mobile-767">
			<div v-for="(owner, index) in onas.page.rumlKlingerOnas.owners.person" :key="index" class="owner-mobile">
				<div class="owner-mobile__heading" @click.prevent="toggleOwner">
					<div class="owner-mobile__image">
						<NuxtPicture sizes="xs:80px sm:80px md:300px" format="webp" decoding="async"
							:src="owner.image.sourceUrl"
							:alt="owner.image.altText"
							:width="owner.image.mediaDetails.width"
							:height="owner.image.mediaDetails.height"
							loading="lazy"
							 />
					</div>
					<div class="owner-mobile__name">
						<strong>{{ owner.name }}</strong>
						<div class="owner-mobile__position">{{ owner.position }}</div>
					</div>
				</div>
				<div class="owner-mobile__text">
					<div v-html="owner.perex"></div>
				</div>
			</div>
		</div>
	</section>
	<section class="container" id="nase-spolocnosti">
		<div class="narrow center">
			<h2>{{ $t('ourCompanies') }}</h2>
		</div>
		<div class="companies">
			<div class="company" v-for="(company, index) in onas.page.rumlKlingerOnas.ourCompanies.company" :key="index">
				<div class="company__image">
					<NuxtPicture sizes="xs:100vw sm:50vw md:33vw lg:460px" format="webp" decoding="async"
						:src="company.image.sourceUrl"
						:alt="company.image.altText"
						:width="company.image.mediaDetails.width"
						:height="company.image.mediaDetails.height"
						loading="lazy"
						 />
					<div class="company__logo">
						<NuxtPicture sizes="200px" format="webp" decoding="async" densities="1" quality="90"
							:src="company.logo.sourceUrl"
							:alt="company.logo.altText"
							:width="company.logo.mediaDetails.width"
							:height="company.logo.mediaDetails.height"
							loading="lazy"
							 />
					</div>
				</div>
				<div class="company__info">
					<h3 class="company__title">{{ company.title }}</h3>
					<div class="company__perex">{{ company.perex }}</div>
					<a class="btn btn-primary" :href="company.url" target="_blank">{{ $t('aboutusPage.goToWeb') }}</a>
				</div>
			</div>
		</div>
	</section>
	<section>
		<TextImageBlock
			:data="careerBanner.page.rumlKlingerHomepage.career"
			:align-center="true"
			:reverse="true"
			:btn="{ text: $t('showAllPositions'), url: localePath('/kariera') }" />
	</section>
	<section>
		<div class="container divider top">
			<div class="companies">
				<div class="company">
					<div class="company__image">
						<NuxtPicture sizes="xs:100vw sm:50vw md:33vw lg:460px" format="webp" decoding="async"
							v-if="pfData.page?.featuredImage"
							:src="pfData.page?.featuredImage?.node?.sourceUrl"
							:alt="pfData.page.featuredImage.node.altText"
							:width="pfData.page.featuredImage.node.mediaDetails.width"
							:height="pfData.page.featuredImage.node.mediaDetails.height"
							loading="lazy"
							 />
					</div>
					<div class="company__info">
						<h3 class="company__title">{{ pfData.page.title }}</h3>
						<div v-if="pfData.page.pfCustom.description" class="company__perex" v-html="pfData.page.pfCustom.description"></div>
						<nuxt-link external no-prefetch :to="localePath('/pf')" class="btn btn-primary">{{ $t('discoverAll') }}</nuxt-link>
					</div>
				</div>
				<div class="company">
					<div class="company__image">
						<NuxtPicture sizes="xs:100vw sm:50vw md:33vw lg:460px" format="webp" decoding="async"
							v-if="calendarData.page?.featuredImage"
							:src="calendarData.page?.featuredImage?.node?.sourceUrl"
							:alt="calendarData.page.featuredImage.node.altText"
							:width="calendarData.page.featuredImage.node.mediaDetails.width"
							:height="calendarData.page.featuredImage.node.mediaDetails.height"
							loading="lazy"
							 />
					</div>
					<div class="company__info">
						<h3 class="company__title">{{ calendarData.page.title }}</h3>
						<div
							v-if="calendarData.page.pfCustom.description"
							class="company__perex"
							v-html="calendarData.page.pfCustom.description"></div>
						<nuxt-link external no-prefetch :to="localePath('/kalendare')" class="btn btn-primary">{{ $t('discoverAll') }}</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	import { Navigation } from 'swiper'
	import { Swiper, SwiperSlide } from 'swiper/vue'
	import 'swiper/css'
	const modules = [Navigation]
	const swiperPrev = ref(null)
	const swiperNext = ref(null)
	const toggleOwner = (event) => event.target.classList.toggle('active')
	const { locale, t } = useI18n()
	const localePath = useCmsLocalePath()
	const localeIDs = {
		aboutus: {
			cs: 'cG9zdDo2MDI=',
			en: 'cG9zdDozODQy',
		},
		homepage: {
			cs: 'cG9zdDo1OTI=',
			en: 'cG9zdDozODM3',
		},
		pf: {
			cs: 'cG9zdDo0MzEw',
			en: 'cG9zdDo0MzEy',
		},
		kalendar: {
			cs: 'cG9zdDo0MzE0',
			en: 'cG9zdDo0MzE2',
		},
	}
	useHead({
		title: t('seo.aboutus.title'),
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: t('seo.aboutus.description'),
			},
		],
	})
	const USPBlockIDs = {
		aboutus: {
			cs: 'cG9zdDo2MDI=',
			en: 'cG9zdDozODQy',
		},
	}
const contentQuery = `query KlingerPagesONasVue($onas_localeID: ID!, $careerBanner_localeID: ID!, $pfData_localeID: ID!, $calendarData_localeID: ID!, $usp_localeID: ID!) {
  onas_page: page(id: $onas_localeID) {
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
  careerBanner_page: page(id: $careerBanner_localeID) {
    title
    slug
    rumlKlingerHomepage {
      career {
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
  pfData_page: page(id: $pfData_localeID) {
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
  calendarData_page: page(id: $calendarData_localeID) {
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
const { data: combinedData } = await useRequiredAsyncQuery(contentQuery, { ...Object.fromEntries(Object.entries({ localeID: localeIDs.aboutus[locale.value] }).map(([key,value])=>["onas_"+key,value])), ...Object.fromEntries(Object.entries({ localeID: localeIDs.homepage[locale.value] }).map(([key,value])=>["careerBanner_"+key,value])), ...Object.fromEntries(Object.entries({ localeID: localeIDs.pf[locale.value] }).map(([key,value])=>["pfData_"+key,value])), ...Object.fromEntries(Object.entries({ localeID: localeIDs.kalendar[locale.value] }).map(([key,value])=>["calendarData_"+key,value])), ...Object.fromEntries(Object.entries({ localeID: USPBlockIDs.aboutus[locale.value] }).map(([key,value])=>["usp_"+key,value])) })
const onas = computed(() => ({ page: combinedData.value.onas_page }))
const careerBanner = computed(() => ({ page: combinedData.value.careerBanner_page }))
const pfData = computed(() => ({ page: combinedData.value.pfData_page }))
const calendarData = computed(() => ({ page: combinedData.value.calendarData_page }))
const usp = computed(() => ({ page: combinedData.value.usp_page }))














</script>
<style lang="scss">
	#historie {
		background: url(/timeline-bg.jpg) repeat-y center center;
		padding: 170px 0;
		overflow: hidden;
		h2,
		h3,
		p,
		a {
			color: $color-white;
		}
		.timeline {
			&__columns {
				display: flex;
				gap: 20px;
			}
			&__info {
				padding: 60px;
				flex: 1 1 210px;
				h2 {
					&::after {
						margin-left: 0;
					}
				}
			}
			&__description {
				font-size: rem(20);
				line-height: em(36, 20);
				p {
					color: $color-inactive;
				}
			}
			&__slider-wrapper {
				flex: 1 1 480px;
				width: 60%;
				position: relative;
			}
			&__slider--item {
				img {
					max-width: 100%;
					width: auto;
				}
			}
			&__controls {
				display: flex;
				gap: 10px;
				justify-content: flex-end;
				.arrow-prev,
				.arrow-next {
					width: 44px;
					height: 44px;
					border: 1px solid $color-white;
					display: flex;
					align-items: center;
					justify-content: center;
					svg {
						display: block;
						line-height: 0;
					}
				}
				.arrow-prev {
					transform: rotate(180deg);
				}
			}
		}
		.swiper-slide {
			width: auto;
			max-width: 240px;
			&:first-of-type,
			&:nth-of-type(2) {
				max-width: 520px;
			}
		}
	}
	.owners {
		display: flex;
		flex-wrap: wrap;
		gap: 36px;
		.owner {
			flex: 1 1 420px;
			position: relative;
			&__image {
				img {
					display: block;
				}
			}
			&__name {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 2;
				background-color: rgba($color-primary, 0.8);
				padding: 20px;
				color: $color-white;
				strong {
					font-size: rem(32);
				}
			}
			&__position {
				font-weight: 300;
			}
			&__text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: absolute;
				color: $color-white;
				bottom: 0;
				left: 0;
				right: 0;
				top: 100%;
				overflow: hidden;
				transition: all 0.15s ease-in-out;
				z-index: 1;
				background-color: rgba($color-primary, 0.8);
				padding: 0 70px;
				font-size: clamp(rem(14), 1.4vw, rem(20));
				line-height: em(36, 20);
			}
			&:hover,
			&:focus {
				.owner__text {
					top: 0;
					padding: 40px 70px 90px;
				}
			}
		}
	}
	.company {
		flex: 1 1 300px;
		&:nth-of-type(1),
		&:nth-of-type(2) {
			flex: 1 1 550px;
		}
		&__image {
			position: relative;
			img {
				display: block;
			}
		}
		&__logo {
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: $color-white;
			padding: 15px 30px;
		}
		&__info {
			border-top: 2px solid $color-secondary;
			padding: 30px;
			background-color: $color-white;
		}
		&__title {
			font-size: rem(28);
			margin-bottom: 20px;
		}
		&__perex {
			margin-bottom: 15px;
			min-height: 84px;
		}
	}
	.owner-mobile {
		&:not(:last-of-type) {
			border-bottom: 1px solid $color-inactive;

			margin-bottom: 20px;
		}
		&__heading {
			display: flex;
			gap: 10px;
			align-items: center;
			&:not(.active) {
				&::after {
					transform: rotate(45deg);
				}
				& + .owner-mobile__text {
					max-height: 0;
					padding: 0 20px;
				}
			}
			&::after {
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				border: 2px solid $color-black;
				border-style: none solid solid none;
				transform: rotate(-135deg);
				transition: all 0.15s ease-in-out;
				margin-left: auto;
			}
		}
		&__image {
			flex: 0 0 70px;
		}
		&__name {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		&__text {

			transition: all 0.15s ease-in-out;
			overflow: hidden;
			background-color: rgba($color-primary, 0.1);
			padding: 20px;
			margin-top: 20px;
		}
	}
	@media (max-width: 1280px) {
		#historie {
			.timeline {
				&__info {
					flex-basis: 400px;
				}
			}
		}
	}
	@media (max-width: 1080px) {
		.timeline__columns {
			flex-direction: column;
		}
		#historie {
			.timeline__slider-wrapper {
				width: auto;
			}
		}
	}
	@media (max-width: 1080px) {
		.owners {
			.owner {
				&__text {
					padding: 0 20px;
				}
				&:hover,
				&:focus {
					.owner__text {
						padding: 40px 20px 90px;
					}
				}
			}
		}
	}
	@media (max-width: 767px) {
		.company__info {
			padding: 30px 20px;
		}
		#historie {
			padding: 50px 0;
			.timeline__info {
				padding: 0;
			}
			.timeline__description p {
				font-size: 1rem;
			}
			.swiper-slide:first-of-type,
			.swiper-slide:nth-of-type(2) {
				max-width: calc(100vw - 100px);
			}
		}
	}
</style>
