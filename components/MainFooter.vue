<template>
	<footer>
		<div class="footer-top">
			<div class="container">
				<h2>Kontaktujte nás</h2>
				<a
					class="project-mail"
					href="mailto:ruml@ruml-group.cz">
					ruml@ruml-group.cz
				</a>
				<NuxtLink
					class="btn btn-primary"
					to="/kontakty">
					Naši specialisté
				</NuxtLink>
			</div>
		</div>
		<div class="footer-middle">
			<div class="container">
				<div class="footer-block">
					<h3 @click.prevent="toggleMenu">Menu<span class="trigger"></span></h3>
					<nav>
						<ul>
							<li>
								<nuxt-link to="/o-nas#nase-spolecnosti">Naše společnosti</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/o-nas">O nás</nuxt-link>
							</li>
							<!-- <li>
								<nuxt-link to="/financni-vysledky">Finanční výsledky</nuxt-link>
							</li> -->
							<li>
								<nuxt-link to="/o-nas#historie">Historie</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/kontakty">Kontakty</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/kariera">Kariéra</nuxt-link>
							</li>
						</ul>
					</nav>
				</div>
				<div class="footer-block">
					<h3 @click.prevent="toggleMenu">Společnosti<span class="trigger"></span></h3>
					<nav>
						<ul>
							<li>
								<a
									href="https://wwww.ruml-group.cz"
									target="_blank">
									RUML s.r.o.
								</a>
							</li>
							<li>
								<a
									href="https://www.ruml-service.cz"
									target="_blank">
									RUML Service s.r.o.
								</a>
							</li>
							<li>
								<a
									href="https://www.ruml-industry.cz"
									target="_blank">
									RUML Industry s.r.o.
								</a>
							</li>
							<li>
								<a
									href="https://www.ruml-emes.sk"
									target="_blank">
									RUML Emes s.r.o.
								</a>
							</li>
							<li>
								<a
									href="https://www.ruml-tesneni.cz"
									target="_blank">
									RUML Těsnění s.r.o.
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="footer-block">
					<h3 @click.prevent="toggleMenu">Kontakty<span class="trigger"></span></h3>
					<div>
						<p>
							Nad Doly 1625/3 <br />
							Praha 4 - Modřany <br />
							PSČ 143 00 <br />
							Česká republika
						</p>
						<p>
							<a
								href="https://goo.gl/maps/FiEKdmbvxHKZXB7k9"
								target="_blank">
								Zobrazit na mapě
							</a>
						</p>
						<p>
							<b>IČ:</b> 480 286 14 <br />
							<b>DIČ:</b> CZ480 286 14
						</p>
					</div>
				</div>
				<div class="footer-block site-logo">
					<NuxtPicture
						class="logo"
						src="/logo-white.png"
						width="316"
						height="94"
						alt="RUML Klinger s.r.o." />
					<a
						href="https://www.linkedin.com/company/ruml-s-r-o/"
						target="_blank"
						class="social-link">
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.5522 0.000293112H1.33497C0.614988 -0.0147066 0.0149997 0.547782 0 1.27527C0 1.28277 0 1.29777 0 1.30527V16.7025C0 17.4224 0.584988 17.9999 1.30497 17.9999C1.31247 17.9999 1.32747 17.9999 1.33497 17.9999H16.5522C17.2796 18.0074 17.8721 17.4224 17.8871 16.695V1.30527C17.8646 0.577781 17.2722 0.00779296 16.5522 0.000293112ZM5.42239 15.0375H2.70745V6.93765H5.42239V15.0375ZM4.04992 5.82018C3.28493 5.88767 2.60245 5.31769 2.53495 4.5527C2.52745 4.5077 2.52745 4.4552 2.52745 4.4102C2.52745 3.63022 3.16494 2.99273 3.95242 3.00023C3.98242 3.00023 4.01992 3.00023 4.04992 3.00023C4.8299 2.94773 5.50489 3.53272 5.56489 4.31271C5.56489 4.34271 5.56489 4.3727 5.56489 4.4102C5.59489 5.16019 5.0174 5.79768 4.26741 5.82768C4.19242 5.82768 4.12492 5.82768 4.04992 5.82018ZM15.1497 15.0375H12.4347V10.7026C12.4347 9.6151 12.0373 8.85761 11.0623 8.85761C10.4398 8.85761 9.8923 9.24761 9.6898 9.83259C9.62231 10.0426 9.59981 10.2601 9.61481 10.4851V15H6.89986C6.89986 15 6.93736 7.62764 6.89986 6.87015H9.60731V8.02513C10.1098 7.17015 11.0398 6.66016 12.0298 6.69016C13.7997 6.69016 15.1422 7.84513 15.1422 10.3426L15.1497 15.0375Z"
								fill="#91A4EE" />
							<path
								d="M16.5522 0.000293112H1.33497C0.614988 -0.0147066 0.0149997 0.547782 0 1.27527C0 1.28277 0 1.29777 0 1.30527V16.7025C0 17.4224 0.584988 17.9999 1.30497 17.9999C1.31247 17.9999 1.32747 17.9999 1.33497 17.9999H16.5522C17.2796 18.0074 17.8721 17.4224 17.8871 16.695V1.30527C17.8646 0.577781 17.2722 0.00779296 16.5522 0.000293112ZM5.42239 15.0375H2.70745V6.93765H5.42239V15.0375ZM4.04992 5.82018C3.28493 5.88767 2.60245 5.31769 2.53495 4.5527C2.52745 4.5077 2.52745 4.4552 2.52745 4.4102C2.52745 3.63022 3.16494 2.99273 3.95242 3.00023C3.98242 3.00023 4.01992 3.00023 4.04992 3.00023C4.8299 2.94773 5.50489 3.53272 5.56489 4.31271C5.56489 4.34271 5.56489 4.3727 5.56489 4.4102C5.59489 5.16019 5.0174 5.79768 4.26741 5.82768C4.19242 5.82768 4.12492 5.82768 4.04992 5.82018ZM15.1497 15.0375H12.4347V10.7026C12.4347 9.6151 12.0373 8.85761 11.0623 8.85761C10.4398 8.85761 9.8923 9.24761 9.6898 9.83259C9.62231 10.0426 9.59981 10.2601 9.61481 10.4851V15H6.89986C6.89986 15 6.93736 7.62764 6.89986 6.87015H9.60731V8.02513C10.1098 7.17015 11.0398 6.66016 12.0298 6.69016C13.7997 6.69016 15.1422 7.84513 15.1422 10.3426L15.1497 15.0375Z"
								fill="black"
								fill-opacity="0.2" />
						</svg>
						Ruml Group LinkedIn
					</a>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container">
				<div class="copyright">
					Copyright © {{ actualYear }}
					<a
						href="https://www.ruml-group.cz"
						target="_blank">
						Ruml-group.cz
					</a>
					| Všechna práva vyhrazena.
				</div>
				<div class="signature">
					<svg
						width="24"
						height="20"
						viewBox="0 0 24 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 0H2.42491V2.32526H0V0ZM0 2.87336H2.42491V5.19862H0V2.87336ZM0 5.73841H2.42491V8.06367H0V5.73841ZM0 8.60346H2.42491V10.9287H0V8.60346ZM0 11.4768H2.42491V13.8021H0V11.4768ZM0 14.3419H2.42491V16.6671H0V14.3419ZM0 17.2152H2.42491V19.5405H0V17.2152ZM3.08097 0H5.50588V2.32526H3.08097V0ZM3.08097 2.87336H5.50588V5.19862H3.08097V2.87336ZM3.08097 5.73841H5.50588V8.06367H3.08097V5.73841ZM3.08097 8.60346H5.50588V10.9287H3.08097V8.60346ZM3.08097 11.4768H5.50588V13.8021H3.08097V11.4768ZM3.08097 14.3419H5.50588V16.6671H3.08097V14.3419ZM3.08097 17.2152H5.50588V19.5405H3.08097V17.2152ZM6.17024 2.87336H8.59516V5.19862H6.17024V2.87336ZM6.17024 5.73841H8.59516V8.06367H6.17024V5.73841ZM6.17024 8.60346H8.59516V10.9287H6.17024V8.60346ZM6.17024 11.4768H8.59516V13.8021H6.17024V11.4768ZM9.25121 5.73841H11.6761V8.06367H9.25121V5.73841ZM9.25121 8.60346H11.6761V10.9287H9.25121V8.60346ZM9.25121 11.4768H11.6761V13.8021H9.25121V11.4768ZM9.25121 14.3419H11.6761V16.6671H9.25121V14.3419ZM12.3322 5.73841H14.7571V8.06367H12.3322V5.73841ZM12.3322 8.60346H14.7571V10.9287H12.3322V8.60346ZM12.3322 11.4768H14.7571V13.8021H12.3322V11.4768ZM12.3322 14.3419H14.7571V16.6671H12.3322V14.3419ZM15.4132 2.87336H17.8381V5.19862H15.4132V2.87336ZM15.4132 5.73841H17.8381V8.06367H15.4132V5.73841ZM15.4132 8.60346H17.8381V10.9287H15.4132V8.60346ZM15.4132 11.4768H17.8381V13.8021H15.4132V11.4768ZM18.4941 0H20.919V2.32526H18.4941V0ZM18.4941 2.87336H20.919V5.19862H18.4941V2.87336ZM18.4941 5.73841H20.919V8.06367H18.4941V5.73841ZM18.4941 8.60346H20.919V10.9287H18.4941V8.60346ZM18.4941 11.4768H20.919V13.8021H18.4941V11.4768ZM18.4941 14.3419H20.919V16.6671H18.4941V14.3419ZM18.4941 17.2152H20.919V19.5405H18.4941V17.2152ZM21.5751 0H24V2.32526H21.5751V0ZM21.5751 2.87336H24V5.19862H21.5751V2.87336ZM21.5751 5.73841H24V8.06367H21.5751V5.73841ZM21.5751 8.60346H24V10.9287H21.5751V8.60346ZM21.5751 11.4768H24V13.8021H21.5751V11.4768ZM21.5751 14.3419H24V16.6671H21.5751V14.3419ZM21.5751 17.2152H24V19.5405H21.5751V17.2152Z"
							fill="#F5F4F4" />
					</svg>
					<a
						href="https://www.mirandamedia.cz"
						target="_blank">
						MirandaMedia Group s.r.o.
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>
<script setup>
	const actualYear = computed(() => new Date().getFullYear())
	const toggleMenu = (e) => {
		e.target.classList.toggle('active')
	}
</script>
<style lang="scss" scoped>
	footer {
		h2,
		h3,
		a,
		p {
			color: $color-white;
		}
	}
	.footer-top {
		background-color: #324074;
		padding: 50px 0;
		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: 40px;
		}
		h2 {
			margin: 0;
			&::after {
				display: none;
			}
		}
	}
	.footer-middle {
		padding: 100px 0;
		background-color: $color-primary;
		.container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 40px;
		}
		.footer-block {
			flex-grow: 1;
		}
		h3 {
			.trigger {
				display: none;
			}
			font-size: rem(16);
			margin-top: 0;
			margin-bottom: em(10);
			text-transform: uppercase;
			&::after {
				content: '';
				display: block;
				height: 2px;
				width: 40px;
				background-color: $color-secondary;
				margin-top: em(10);
			}
		}
		ul {
			padding: 0 0 0 10px;
			margin: 0;
			list-style: none;
			li {
				a {
					display: inline-block;
					position: relative;
					line-height: em(28);
					text-decoration: none;
					padding: em(10) em(10) em(10) em(15);
					font-weight: 300;
					&::before {
						position: absolute;
						left: 0;
						top: 1.3em;
						content: '';
						display: block;
						width: 5px;
						height: 5px;
						border: 1px solid #91a4ee;
					}
				}
			}
		}
		p {
			padding-left: 10px;
			font-weight: 300;
			b {
				font-weight: 700;
			}
		}
		.site-logo {
			text-align: center;
			.logo {
				max-width: 315px;
				display: block;
				margin-bottom: 50px;
				margin-left: auto;
				margin-right: auto;
			}
		}
		.social-link {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			text-decoration: none;
			font-weight: 300;
			color: #91a4ee;
		}
	}
	.footer-bottom {
		background-color: #15214f;
		padding: 20px 0;
		color: $color-white;
		font-size: rem(12);
		.container {
			display: flex;
			gap: 20px;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
		}
		.copyright {
			a {
				color: $color-secondary;
				text-decoration: none;
			}
		}
		.signature {
			display: flex;
			align-items: center;
			gap: 10px;
			a {
				text-decoration: none;
			}
		}
	}
	@media (max-width: 1130px) {
		.footer-top .container {
			justify-content: center;
		}
	}
	@media (max-width: 540px) {
		.footer-middle {
			padding: 70px 0;
			.container {
				flex-direction: column;
				gap: 20px;
			}
			h3 {
				position: relative;
				cursor: pointer;
				.trigger {
					content: '';
					display: block;
					width: 8px;
					height: 8px;
					border: 2px solid $color-secondary;
					border-style: none solid solid none;
					transform: rotate(45deg);
					position: absolute;
					top: 0.1em;
					right: 0;
					transition: all 0.15s ease-in-out;
				}
				&.active {
					.trigger {
						transform: rotate(-135deg);
					}
				}
				&:not(.active) {
					& + nav,
					& + div {
						display: none;
					}
				}
			}
			.site-logo .logo {
				max-width: 157px;
				margin-bottom: 20px;
			}
		}
		.footer-bottom {
			.container {
				text-align: center;
				justify-content: center;
			}
		}
	}
</style>
