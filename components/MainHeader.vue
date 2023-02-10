<template>
	<header>
		<div class="container">
			<div class="site-logo">
				<nuxt-link to="/">
					<NuxtImg
						src="/site-logo.png"
						width="184"
						height="55"
						alt="RUML Klinger s.r.o." />
				</nuxt-link>
			</div>

			<a
				class="contact-mail"
				href="mailto:ruml@ruml-group.cz">
				ruml@ruml-group.cz
			</a>
			<div class="navigation-wrapper">
				<div
					class="hamburger"
					@click.prevent="navigationVisible = !navigationVisible">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<nav
					id="navigation"
					:class="{ visible: navigationVisible }">
					<ul>
						<li class="has-submenu">
							<nuxt-link to="/katalog-produktu">Produkty <span class="arrow"></span></nuxt-link>
							<div class="megamenu">
								<div class="container">
									<ul class="menu__level-2">
										<li
											v-for="(level1, index1) in categoriesData.productCategories.nodes"
											:key="index1">
											<NuxtLink :to="`/katalog-produktu/${level1.slug}`">
												{{ level1.name }}
											</NuxtLink>
											<ul class="menu__level-3">
												<li
													v-for="(level2, index2) in level1?.children?.nodes"
													:key="index2">
													<NuxtLink :to="`/katalog-produktu/${level1.slug}/${level2.slug}`">{{
														level2.name
													}}</NuxtLink>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</li>
						<li>
							<nuxt-link to="/sluzby">Služby</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/o-nas">O nás</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/reference">Reference</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/partneri">Partneři</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/kariera">Kariéra</nuxt-link>
						</li>
					</ul>
				</nav>
				<span class="separator">|</span>
				<button
					class="search"
					name="Vyhledat"
					@click.prevent="toggleSearch">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
							fill="#D70C38" />
					</svg>
				</button>
				<div class="search-field">
					<div class="container">
						<form @submit="handleSearch">
							<input
								type="text"
								name="search"
								id="search"
								placeholder="Vyhledat"
								v-model="searchField" />
							<button type="submit">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
										fill="#D70C38" />
								</svg>
							</button>
						</form>
					</div>
				</div>
				<div class="language">CZ</div>
			</div>
		</div>
	</header>
</template>
<script setup>
	const navigationVisible = useState('navigationVisible', () => false)
	const productCategoriesQuery = gql`
		query getCategories {
			productCategories(where: { parent: 0 }) {
				nodes {
					name
					slug
					children {
						nodes {
							name
							slug
							children {
								nodes {
									name
									slug
								}
							}
						}
					}
				}
			}
		}
	`
	const categoriesData = useState('categories', () => null)
	if (!categoriesData.value) {
		const { data } = await useAsyncQuery(productCategoriesQuery)
		categoriesData.value = data.value
	}

	const toggleSearch = () => {
		document.body.classList.toggle('search-visible')
	}
	const searchField = ref(null)
	const handleSearch = (e) => {
		e.preventDefault()
		if (searchField.value) {
			document.body.classList.remove('search-visible')
			navigateTo(`/vyhledavani?search=${searchField.value}`)
		}
	}
</script>
<style lang="scss" scoped>
	header {
		background-color: $color-white;
		position: relative;
	}
	.site-logo {
		img {
			display: block;
		}
	}
	.contact-mail {
		display: flex;
		align-items: center;
		gap: 13px;
		color: $color-font-light;
		text-decoration: none;
		font-size: rem(12);
		font-weight: 700;
		&::before {
			content: url(/icon/mail.svg);
			line-height: 0;
		}
	}
	.container {
		display: flex;
		align-items: center;
		gap: 34px;
	}
	.navigation-wrapper {
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	#navigation {
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
		}
		a {
			display: inline-block;
			font-size: rem(14);
			padding: em(40, 14) em(20, 14);
			text-decoration: none;
			text-transform: uppercase;
			color: $color-primary;
			font-weight: 700;
		}
		.has-submenu {
			& > a {
				display: flex;
				align-items: center;
				gap: 5px;
			}
			.arrow {
				display: block;
				width: 8px;
				height: 8px;
				margin-left: 5px;
				transition: all 0.3s ease-in-out;
				position: relative;
				top: -2px;
				&::before {
					content: '';
					display: block;
					width: 100%;
					height: 100%;
					border: 2px solid $color-primary;
					border-style: none solid solid none;
					transform: rotate(45deg);
				}
			}
			&:hover,
			&:focus {
				.arrow {
					transform: rotate(180deg);
					top: 2px;
				}
				.megamenu {
					max-height: 800px;
					padding: 45px 0;
				}
			}
		}
		.megamenu {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			z-index: 3;
			background-color: #e8ebf5;
			padding: 0;
			max-height: 0;
			overflow: hidden;
			transition: all 0.3s ease-in-out;
		}
		.menu__level-2 {
			display: block;
			columns: 6;
			& > li {
				display: flex;
				flex-direction: column;
				break-inside: avoid-column;
				margin-bottom: 20px;
				& > a {
					flex-basis: 100px;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					padding: 10px 20px;
					background-color: $color-primary;
					color: $color-white;
					margin-bottom: 5px;
				}
			}
			a {
				text-transform: none;
				font-size: 1rem;
			}
		}
		.menu__level-3 {
			flex-direction: column;
			& > li {
				padding-left: 16px;
				position: relative;
				&::before {
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					left: 0;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background-color: $color-secondary;
					transform: translateY(-50%);
				}
				& > a {
					font-weight: 400;
					font-size: rem(14);
					line-height: em(28, 14);
					padding: em(5, 14) 0;
					&:hover,
					&:focus {
						font-weight: 700;
					}
				}
			}
		}
	}
	.separator {
		font-size: rem(24);
		line-height: 1em;
		color: $color-font-light;
		margin: 0 20px;
	}
	.search {
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: rem(10);
		svg {
			display: block;
		}
	}
	.language {
		font-size: rem(14);
		padding: em(10, 14) em(20, 14);
		font-weight: 700;
		color: $color-primary;
	}
	.hamburger {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $color-inactive;
		border-radius: 50%;
		gap: 4px;
		width: 44px;
		height: 44px;
		cursor: pointer;
		span {
			width: 16px;
			height: 2px;
			display: block;
			background-color: $color-black;
		}
	}
	.search-visible .search-field {
		max-height: 70px;
	}
	.search-field {
		max-height: 0;
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 100%;
		z-index: 2;
		transition: all 0.15s ease-in-out;
		.container {
			display: flex;
			justify-content: flex-end;
		}
		form {
			background-color: #e8ebf5;
			display: flex;
			padding: 10px 30px;
			input {
				border-radius: 4px 0 0 4px;
				border-right: none;
			}
			button {
				background-color: $color-primary;
				padding: 0 10px;
				border-radius: 0 4px 4px 0;
			}
		}
	}
	@media (min-width: 1150px) {
		.hamburger {
			display: none;
		}
	}
	@media (max-width: 1350px) {
		.contact-mail {
			display: none;
		}
	}
	@media (max-width: 1149px) {
		header {
			position: relative;
			padding: 20px 0;
		}
		#navigation {
			position: absolute;
			top: 100%;
			right: 0;
			z-index: 2;
			width: 100%;
			max-width: 0;
			background-color: $color-white;
			padding: 20px 0;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
			transition: all 0.15s ease-in-out;
			overflow: hidden;
			ul {
				flex-direction: column;
			}
			&.visible {
				max-width: 480px;
			}
			a {
				width: 100%;
				padding: em(10) em(20);
			}
			.has-submenu {
				.arrow {
					display: none;
				}
			}
		}
	}
	@media (max-width: 540px) {
		.site-logo {
			max-width: 121px;
		}
		.language {
			order: 1;
			padding: 0.625rem;
		}
		.search {
			order: 2;
		}
		.hamburger {
			order: 3;
			margin-left: 0.625rem;
		}
		.separator {
			display: none;
		}
	}
</style>
