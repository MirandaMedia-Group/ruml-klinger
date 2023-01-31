<template>
	<HeroBig
		v-bind="kontakty.page.rumlKlingerKontakty.hero"
		:white="true" />
	<section class="container">
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
						<a :href="kontakty.page.rumlKlingerKontakty.billingAddress.obchodniRejstrik">Výpis z obchodního rejstříku</a>
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
		</div>
	</section>
	<section class="container">
		<div class="pobocky">
			<div
				v-for="(item, index) in kontakty.page.rumlKlingerKontakty.pobocky"
				:key="index"
				class="pobocka">
				<div class="pobocka__content">
					<h2 class="pobocka__title">{{ item.title }}</h2>
					<div
						v-if="item.address"
						class="pobocka__address"
						v-html="item.address"></div>
					<div class="billing-info__table">
						<div
							class="tr"
							v-if="item.phone">
							<div class="th">Telefon:</div>
							<div class="td">
								<a :href="`tel:00${item.phone}`">+420 {{ item.phone }}</a>
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
						height="205"
						frameborder="0"
						style="border: 0"
						referrerpolicy="no-referrer-when-downgrade"
						:src="`https://www.google.com/maps/embed/v1/place?key=${''}&q=${item.gpsLat}N,${item.gpsLng}E`"
						allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</section>
	<section class="container">
		<h2 class="center">Kontakty na naše specialisty</h2>
		<AnchorsBlock :style="{ marginTop: '100px' }">
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
			<h3 class="contacts__title">{{ item.groupTitle }}</h3>
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
							:height="person.image.mediaDetails.height" />
						<NuxtPicture
							v-else
							src="/kontaktni_osoby/placeholder.jpg"
							width="150"
							height="150"
							alt="" />
					</div>
					<div class="person__name">{{ person.name }}</div>
					<div class="person__position">{{ person.position }}</div>
					<a :href="`tel:00${person.phone}`">{{ person.phone }}</a>
					<a :href="`mailto:${person.email}`">{{ person.email }}</a>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const slugify = (str) =>
		str
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '')
	const kontakty = useState('kontakty', () => null)
	const kontaktyQuery = gql`
		query {
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
	const { data: kontaktyResponse } = await useAsyncQuery(kontaktyQuery)
	kontakty.value = kontaktyResponse.value
	console.log(kontakty.value)
</script>
<style lang="scss">
	.billing-info {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
		margin-left: -21px;
		margin-right: -21px;
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
		.pobocka {
			flex: 1 1 560px;
			max-width: 710px;
			background-color: $color-white;
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
</style>
