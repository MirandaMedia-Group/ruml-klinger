<template>
	<div v-if="onasPending"></div>
	<div v-else>
		<HeroBig
			v-bind="onas.data.page.rumlKlingerOnas.hero"
			:white="true" />
		<TextImageBlock
			:data="onas.data.page.rumlKlingerOnas.firstBlock"
			:has-background="true"
			:divider="true" />
		<section
			id="usp"
			class="container">
			<USPBlock />
		</section>
		<section id="historie">
			<div class="container">
				<div class="timeline__columns">
					<div class="timeline__info">
						<h2>{{ onas.data.page.rumlKlingerOnas.timeline.titulek }}</h2>
						<div
							class="timeline__description"
							v-html="onas.data.page.rumlKlingerOnas.timeline.perex"></div>
					</div>
					<div class="timeline__slider-wrapper">
						<div
							v-for="(history, index) in onas.data.page.rumlKlingerOnas.timeline.history"
							:key="index">
							<div class="timeline__slider--item">
								<div class="timeline-item__content__image">
									<img
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="container">
			<div class="narrow center">
				<h2>Vedení společnosti</h2>
			</div>
			<div
				class="owners"
				v-if="screenWidth > 767">
				<div
					v-for="(owner, index) in onas.data.page.rumlKlingerOnas.owners.person"
					:key="index"
					class="owner">
					<div class="owner__image">
						<NuxtPicture
							:src="owner.image.sourceUrl"
							:alt="owner.image.altText"
							:width="owner.image.mediaDetails.width"
							:height="owner.image.mediaDetails.height"
							provider="ipx" />
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
			<div
				v-else
				class="owners-mobile">
				<div
					v-for="(owner, index) in onas.data.page.rumlKlingerOnas.owners.person"
					:key="index"
					class="owner-mobile">
					<div
						class="owner-mobile__heading"
						@click.prevent="toggleOwner">
						<div class="owner-mobile__image">
							<NuxtPicture
								:src="owner.image.sourceUrl"
								:alt="owner.image.altText"
								:width="owner.image.mediaDetails.width"
								:height="owner.image.mediaDetails.height"
								provider="ipx" />
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
		<section
			class="container"
			id="nase-spolocnosti">
			<div class="narrow center">
				<h2>Naše společnosti</h2>
			</div>
			<div class="companies">
				<div
					class="company"
					v-for="(company, index) in onas.data.page.rumlKlingerOnas.ourCompanies.company"
					:key="index">
					<div class="company__image">
						<NuxtPicture
							:src="company.image.sourceUrl"
							:alt="company.image.altText"
							:width="company.image.mediaDetails.width"
							:height="company.image.mediaDetails.height"
							provider="ipx" />
						<div class="company__logo">
							<NuxtPicture
								:src="company.logo.sourceUrl"
								:alt="company.logo.altText"
								:width="company.logo.mediaDetails.width"
								:height="company.logo.mediaDetails.height"
								provider="ipx" />
						</div>
					</div>
					<div class="company__info">
						<h3 class="company__title">{{ company.title }}</h3>
						<div class="company__perex">{{ company.perex }}</div>
						<a
							class="btn btn-primary"
							:href="company.url"
							target="_blank">
							Přejít na web
						</a>
					</div>
				</div>
			</div>
		</section>
		<TextImageBlock
			v-if="!careerPending"
			:data="careerBanner.data.page.rumlKlingerHomepage.career"
			:align-center="true"
			:reverse="true"
			:btn="{ text: 'Zobrazit pozice', url: '/kariera' }" />
	</div>
</template>
<script setup>
	const screenWidth = useState('screenWidth')
	const toggleOwner = (event) => event.target.classList.toggle('active')
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
	const { data: onas, pending: onasPending } = await useAsyncData('onas', () => useAsyncQuery(onasQuery))

	const careerBannerQuery = gql`
		query {
			page(id: "cG9zdDo1OTI=") {
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
		}
	`
	const { data: careerBanner, pending: careerPending } = await useAsyncData('careerBanner', () => useAsyncQuery(careerBannerQuery))
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
	#historie {
		background: url(/timeline-bg.jpg) repeat-y center center;
		padding: 170px 0;
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
				overflow: hidden;
				display: flex;
				gap: 20px;
				.timeline__slider--item {
					width: 240px;
					&:nth-of-type(1) {
						width: 520px;
					}
				}
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
	.companies {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
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
			// padding-bottom: 20px;
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
			max-height: 500px;
			transition: all 0.15s ease-in-out;
			overflow: hidden;
			background-color: rgba($color-primary, 0.1);
			padding: 20px;
			margin-top: 20px;
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
		.usp-wrapper {
			gap: 10px;
		}
		.usp {
			margin-top: 0px;
			align-items: flex-start;
			padding: 20px;
			gap: 0;
			strong {
				font-size: rem(30);
				&::after {
					display: none;
				}
			}
			span {
				font-size: rem(20);
			}
		}
		.company__info {
			padding: 30px 20px;
		}
	}
</style>
