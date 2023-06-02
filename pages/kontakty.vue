<template>
	<HeroBig
		v-bind="kontakty.page.rumlKlingerKontakty.hero"
		:white="true"
		:center="true"
		:contactBox="true"
		:nowrap="true" />
	<section class="container overflow-hidden">
		<div class="billing-info">
			<div class="column">
				<h2>Identifikační údaje</h2>
				<div class="billing-info__table">
					<div class="tr">
						<div class="th">IČO</div>
						<div class="td">{{ kontakty.page.rumlKlingerKontakty.billingAddress.ico }}</div>
					</div>
					<div class="tr">
						<div class="th">DIČ</div>
						<div class="td">{{ kontakty.page.rumlKlingerKontakty.billingAddress.dic }}</div>
					</div>
					<div class="tr">
						<div class="th">Sídlo</div>
						<div
							class="td"
							v-html="kontakty.page.rumlKlingerKontakty.billingAddress.address"></div>
					</div>
					<div class="tr">
						<div class="th">Datová schránka</div>
						<div class="td">{{ kontakty.page.rumlKlingerKontakty.billingAddress.datovaSchranka }}</div>
					</div>
					<div class="tr">
						<a
							:href="kontakty.page.rumlKlingerKontakty.billingAddress.obchodniRejstrik"
							target="_blank">
							Výpis z obchodního rejstříku
						</a>
					</div>
				</div>
			</div>
			<div class="column">
				<h2>Bankovní spojení</h2>
				<div
					v-for="(item, index) in kontakty.page.rumlKlingerKontakty.spojeni"
					:key="index">
					<div class="billing-info__table">
						<div class="tr">
							<strong>{{ item.title }}</strong>
						</div>
						<div
							v-if="item.accountNumber"
							class="tr">
							<div class="th">Číslo účtu:</div>
							<div class="td">{{ item.accountNumber }}</div>
						</div>
						<div
							v-if="item.iban"
							class="tr">
							<div class="th">IBAN:</div>
							<div class="td">{{ item.iban }}</div>
						</div>
						<div
							v-if="item.swift"
							class="tr">
							<div class="th">SWIFT:</div>
							<div class="td">{{ item.swift }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="column">
				<div
					v-if="certificates.page.rumlKlingerOnas.firstBlock.certificates"
					class="certificates">
					<h2>Certifikáty</h2>
					<FilesTable :data="certificates.page.rumlKlingerOnas.firstBlock.certificates" />
				</div>
			</div>
		</div>
	</section>
	<section class="container">
		<div class="pobocky">
			<div
				v-for="(item, index) in kontakty.page.rumlKlingerKontakty.pobocky"
				:key="index"
				class="pobocka">
				<div
					v-if="item.image"
					class="pobocka__image">
					<NuxtPicture
						:src="item.image.sourceUrl"
						:alt="item.image.altText"
						:width="item.image.mediaDetails.width"
						:height="item.image.mediaDetails.height"
						loading="lazy"
						provider="ipx"
						:img-attrs="{ style: 'display: block; height: 100%; object-fit: cover;' }" />
				</div>
				<div class="pobocka__content">
					<h2 class="pobocka__title">{{ item.title }}</h2>
					<div
						v-if="item.address"
						class="pobocka__address"
						v-html="item.address"></div>
					<div class="billing-info__table">
						<div
							class="tr"
							v-if="item.openingHours">
							<div class="th">Otevřeno:</div>
							<div class="td">
								{{ item.openingHours }}
							</div>
						</div>
						<div
							class="tr"
							v-if="item.phone">
							<div class="th">Telefon:</div>
							<div class="td">
								<a :href="`tel:${item.phone.replaceAll(' ', '')}`">{{ item.phone }}</a>
							</div>
						</div>
						<div
							class="tr"
							v-if="item.email">
							<div class="th">Email:</div>
							<div class="td">
								<a :href="`mailto:${item.email}`">{{ item.email }}</a>
							</div>
						</div>
						<div
							class="tr"
							v-if="item.gpsLat && item.gpsLng">
							<div class="th">GPS:</div>
							<div class="td">{{ item.gpsLat }}N, {{ item.gpsLng }}E</div>
						</div>
					</div>
				</div>
				<div
					v-if="item.gpsLat && item.gpsLng"
					class="pobocka__map">
					<iframe
						width="100%"
						height="305"
						frameborder="0"
						style="border: 0"
						referrerpolicy="no-referrer-when-downgrade"
						:src="`https://www.google.com/maps/embed/v1/place?key=${config.public.googleMapsAPI}&q=${item.gpsLat}N,${item.gpsLng}E&zoom=7`"
						allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</section>
	<section class="container">
		<h2
			v-if="screenWidth > 767"
			class="center">
			Kontakty na naše specialisty
		</h2>
		<AnchorsBlock
			v-if="screenWidth > 767"
			:style="{ marginTop: `${screenWidth > 767 ? 100 : 50}px` }">
			<ul>
				<li
					v-for="(item, index) in kontakty.page.rumlKlingerKontakty.contactGroup"
					:key="index">
					<a :href="`#${slugify(item.groupTitle)}`">{{ item.groupTitle }}</a>
				</li>
			</ul>
		</AnchorsBlock>
		<div
			v-for="(item, index) in kontakty.page.rumlKlingerKontakty.contactGroup"
			:key="index"
			:id="slugify(item.groupTitle)"
			class="contacts__block center"
			:class="{ divider: index !== kontakty.page.rumlKlingerKontakty.contactGroup.length - 1 }">
			<h3
				class="contacts__title"
				@click.prevent="toggleContacts">
				{{ item.groupTitle }}
			</h3>
			<div class="contacts__group">
				<div
					v-for="(person, index) in item.person"
					:key="index"
					class="person">
					<div class="person__image">
						<NuxtPicture
							v-if="person.image"
							:src="person.image.sourceUrl"
							:alt="person.image.altText"
							:width="person.image.mediaDetails.width"
							:height="person.image.mediaDetails.height"
							loading="lazy"
							provider="ipx" />
						<NuxtPicture
							v-else
							src="/kontaktni_osoby/placeholder.jpg"
							width="150"
							height="150"
							loading="lazy"
							alt="" />
					</div>
					<div class="person__name">{{ person.name }}</div>
					<div class="person__position">{{ person.position }}</div>
					<a
						v-if="person.phone"
						:href="`tel:${person.phone.replaceAll(' ', '')}`">
						{{ person.phone }}
					</a>
					<a :href="`mailto:${person.email}`">{{ person.email }}</a>
				</div>
			</div>
		</div>
	</section>
	<ContactForm />
</template>
<script setup>
	const config = useRuntimeConfig()
	const slugify = (str) =>
		str
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '')
	const screenWidth = useState('screenWidth')
	const toggleContacts = (e) => e.target.parentElement.classList.toggle('active')
	const kontaktyQuery = gql`
		query getKontaktyKlinger {
			page(id: "cG9zdDo2MDQ=") {
				slug
				rumlKlingerKontakty {
					hero {
						email
						phone
						title
						image {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
					}
					billingAddress {
						ico
						dic
						address
						datovaSchranka
						obchodniRejstrik
					}
					spojeni {
						title
						accountNumber
						iban
						swift
					}
					pobocky {
						title
						address
						phone
						email
						gpsLat
						gpsLng
						openingHours
						image {
							altText
							sourceUrl
							mediaDetails {
								height
								width
							}
						}
					}
					contactGroup {
						groupTitle
						person {
							name
							position
							phone
							email
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
		}
	`
	// const kontakty = useState('kontakty', () => null)
	// if (!kontakty.value) {
	// 	const { data } = await useAsyncQuery(kontaktyQuery)
	// 	kontakty.value = data.value
	// }
	const { data: kontakty } = await useAsyncQuery(kontaktyQuery)

	const certificatesQuery = gql`
		query getCertificatesKlinger {
			page(id: "cG9zdDo2MDI=") {
				rumlKlingerOnas {
					firstBlock {
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
				}
			}
		}
	`
	// const certificates = useState('certificates', () => null)
	// if (!certificates.value) {
	// 	const { data } = await useAsyncQuery(certificatesQuery)
	// 	certificates.value = data.value
	// }
	const { data: certificates } = await useAsyncQuery(certificatesQuery)
</script>
<style lang="scss">
	.billing-info {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
		gap: 20px;
		margin-left: calc(-2rem - 1px);
		margin-right: calc(-2rem - 1px);
		h2 {
			font-size: rem(24);
			&::after {
				display: none;
			}
		}
		&__table {
			display: flex;
			flex-direction: column;
			gap: 10px;
			line-height: em(28);
			&:not(:last-child) {
				margin-bottom: 20px;
			}
			.tr {
				display: flex;
				gap: 10px;
				.th {
					font-weight: 700;
					flex: 1;
				}
				.td {
					flex: 2;
				}
			}
		}
		.column {
			&:not(:last-child) {
				border-right: 1px solid $color-inactive;
			}
			padding: 0 20px;
		}
	}
	.pobocky {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		.pobocka {
			flex: 1 1 560px;
			max-width: 710px;
			background-color: $color-white;
			&__image {
				width: 100%;
				height: 300px;
				overflow: hidden;
			}
			&__content {
				padding: 50px;
			}
			&__title {
				color: $color-black;
				font-size: rem(28);
				&::after {
					display: none;
				}
			}
			border-top: 2px solid;
			&:nth-of-type(1) {
				border-color: $color-primary-light;
			}
			&:nth-of-type(2) {
				border-color: $color-secondary;
			}
			&:nth-of-type(3) {
				border-color: $color-primary;
			}
			&__address {
				font-weight: 300;
			}
		}
	}
	.contacts {
		&__group {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 10px;
		}
		&__block {
			padding-bottom: 100px;
			margin-bottom: 100px;
		}
		&__title {
			font-size: rem(24);
			margin-bottom: em(40, 24);
		}
	}
	.person {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0 1 280px;
		&__image {
			margin-bottom: 20px;
			img {
				display: block;
				border-radius: 50%;
				width: auto;
				max-width: 150px;
			}
		}
		&__name {
			font-size: rem(24);
			font-weight: 700;
			margin-bottom: 0;
		}
		&__position {
			font-size: rem(12);
			color: $color-font-light;
			margin-bottom: 10px;
		}
		a {
			color: $color-primary-light;
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}
	}
	@media (max-width: 767px) {
		.billing-info {
			margin-left: -21px;
			margin-right: -21px;
			h2 {
				font-size: rem(22);
			}
		}
		.pobocky {
			.pobocka__content {
				padding: 50px 20px;
			}
		}
		.contacts__block {
			padding-bottom: 0;
			margin-bottom: 0;
			&::after,
			&::before {
				display: none;
			}
			&:not(.active) {
				.contacts__group {
					max-height: 0;
					margin-bottom: 0;
					overflow: hidden;
				}
				.contacts__title {
					margin-bottom: 0;
				}
			}
		}
		.contacts__group {
			// overflow: auto;
			gap: 40px;
			margin-bottom: 20px;
			max-height: 1000px;
			height: 100%;
			transition: all 0.15s ease-in-out;
		}
		.contacts__title {
			font-size: 1rem;
			text-align: left;
			margin-bottom: em(20, 16);
			color: $color-black;
			padding: em(10) em(20);
			border-bottom: 1px solid $color-inactive;
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;
			gap: 20px;
			&::after {
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				border: 2px solid $color-black;
				border-style: none solid solid none;
				transform: rotate(45deg);
				transition: all 0.15s ease-in-out;
			}
		}
		.person {
			flex: auto;
			text-align: left;
			display: grid;
			column-gap: 20px;
			grid-template-columns: 60px auto;
			& > * {
				grid-column-start: 2;
			}
			&__image {
				grid-column-start: 1;
				grid-row-end: span 4;
				align-self: start;
				margin-bottom: 0;
				picture,
				img {
					width: 100%;
				}
			}
			&__name {
				font-size: rem(20);
			}
		}
	}
</style>
