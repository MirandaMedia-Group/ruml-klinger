<template>
	<ClientOnly>
		<SiteMessage />
	</ClientOnly>
	<LazyNuxtLoadingIndicator color="#d70c38" />
	<CookieControl class="no-margin" :locale="locale" />
	<MainHeader />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<MainFooter />
</template>
<script setup>
	import { useLocaleHead } from '#imports'
	const { cookiesEnabled, cookiesEnabledIds, isConsentGiven, isModalActive, moduleOptions } = useCookieControl()
	const gtm = useGtm()
	const { locale } = useI18n()
	const head = useLocaleHead({
		addDirAttribute: true,
		identifierAttribute: 'id',
		addSeoAttributes: true,
	})
	useHead({
		htmlAttrs: {
			lang: head.value.htmlAttrs.lang,
			dir: head.value.htmlAttrs.dir,
		},
		title: 'RUML s.r.o.',
		meta: [
			{
				name: 'google-site-verification',
				content: '751U2lbOwvrVU2Mi-WwfobyR-PXTfeaqxqGhVeXLdMs',
			},
		],
	})
	const screenWidth = useState('screenWidth', () => {
		return 1024
	})
	const language = useState('language', () => 'CS')
	onMounted(() => {
		screenWidth.value = window.innerWidth
		window.addEventListener('resize', () => {
			screenWidth.value = window.innerWidth
		})
	})
	onBeforeUnmount(() => {
		window.removeEventListener('resize', () => {
			screenWidth.value = window.innerWidth
		})
	})

	const navigationVisible = useState('navigationVisible')
	const router = useRouter()
	router.beforeEach((to, from, next) => {
		document.body.classList.remove('search-visible')
		navigationVisible.value = false
		next()
	})
	watch(
		() => cookiesEnabledIds.value,
		(current, previous) => {
			if (!previous?.includes('google-analytics') && current?.includes('google-analytics')) {
				gtm.enable(true)
			}
			if (previous?.includes('google-analytics') && !current?.includes('google-analytics')) {
				gtm.enable(false)
			}
		},
		{ deep: true }
	)
</script>
<style lang="scss">
	html {
		font-size: 16px;
		scroll-behavior: smooth;
	}
	body {
		font-family: 'Montserrat', sans-serif;
		font-size: clamp(14px, 1rem, 18px);
		background-color: $color-bg-light;
		font-synthesis: none;
	}
	p {
		line-height: em(28);
		margin-top: 0;
	}
	a {
		transition: all 0.15s ease-in-out;
	}
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	img {
		width: 100%;
		height: auto;
	}
	button {
		background-color: transparent;
		border: 0;
		padding: 0;
		color: inherit;
		cursor: pointer;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Gotham', sans-serif;
		color: $color-primary;
	}
	h1 {
		font-size: rem(42);
		margin: 0 0 em(30, 42);
		line-height: em(60, 42);
		position: relative;
		&::after {
			content: '';
			display: block;
			height: 2px;
			width: 60px;
			background-color: $color-secondary;
			margin-top: em(30, 42);
		}
	}
	h2 {
		font-size: rem(36);
		position: relative;
		line-height: em(48, 36);
		margin: 0 0 em(20, 36);
		&::after {
			content: '';
			display: block;
			height: 2px;
			width: 60px;
			margin-left: auto;
			margin-right: auto;
			background-color: $color-secondary;
			margin-top: em(20, 36);
		}
	}
	h3 {
		margin-top: 0;
		font-size: rem(32);
		line-height: em(42, 32);
	}
	section:not(.cookieControl),
	.wp-block-columns,
	.wp-block-group,
	.wp-block-embed {
		margin-bottom: 100px;
	}
	.container {
		@include container(1440px);
	}
	body:not(.wp-content) {
		.narrow {
			p {
				font-size: rem(20);
			}
		}
	}
	.narrow {
		max-width: 920px;
		margin-left: auto;
		margin-right: auto;
	}
	.buttons-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: 30px;
		justify-content: center;
	}
	.buttons-vertical {
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
		margin-top: 30px;
	}
	.center,
	.has-text-align-center {
		text-align: center;
		h1 {
			&::after {
				margin-left: auto;
				margin-right: auto;
			}
		}
	}
	.align-center {
		align-items: center;
	}
	.justify-start {
		justify-content: flex-start;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: 4px;
		padding: em(15) em(20);
		font-weight: 700;
		transition: all 0.15s ease-in-out;
		&.btn-primary {
			background-color: $color-secondary;
			color: $color-white;
			border: 1px solid $color-secondary;
			padding-right: em(60);
			&::before {
				content: url(/icon/arrow-white.svg);
				margin-right: em(13.5);
				line-height: 0;
				transition: all 0.15s ease-in-out;
			}
			&:hover,
			&:focus {
				padding-left: em(30);
				padding-right: em(30);
				background-color: $color-secondary-hover;
				&::before {
					margin-right: em(33.5);
				}
			}
		}
		&.btn-tertiary {
			background-color: $color-secondary;
			color: $color-white;
			&:hover,
			&:focus {
				background-color: $color-secondary-hover;
			}
		}
	}
	.columns {
		display: flex;
		flex-wrap: wrap;
		&.col-2 {
			.column {
				flex: 1 1 420px;
			}
		}
		&.align-center {
			align-items: center;
		}
	}
	.project-mail {
		display: flex;
		align-items: center;
		gap: 20px;
		text-decoration: none;
		font-weight: 700;
		font-size: rem(24);
		&::before {
			content: url(/icon/mail.svg);
			line-height: 0;
		}
	}
	.divider {
		position: relative;
		padding-bottom: 50px;
		&::before {
			content: '';
			position: absolute;
			bottom: 0;
			display: block;
			// width: 100%;
			left: 2rem;
			right: 2rem;
			height: 1px;
			background-color: $color-inactive;
			@media (max-width: 767px) {
				left: 20px;
				right: 20px;
			}
		}
		&::after {
			padding: 8px;
			background-color: $color-bg-light;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 50%);
			content: url(/icon/ruml-logo-mini.svg);
			display: block;
			line-height: 0;
		}
		&.top {
			padding-bottom: 0;
			padding-top: 100px;
			&::before,
			&::after {
				bottom: unset;
				top: 0;
			}
			&::after {
				transform: translate(-50%, -50%);
			}
		}
	}
	.wp-content #content {
		color: $color-font;
		h2,
		h3,
		h4,
		h5,
		h6 {
			color: $color-black;
			margin: em(40, 32) 0;
			&::after {
				display: none;
			}
		}
		h2 {
			font-size: rem(32);
		}
		h3 {
			font-size: rem(26);
		}
		h4 {
			font-size: rem(20);
		}
		ul {
			list-style: none;
			padding: 0;
			margin: em(20) 0;
			li {
				position: relative;
				padding-left: 34px;
				line-height: em(28);
				&::before {
					content: '';
					position: absolute;
					left: 0;
					display: block;
					line-height: 0;
					top: 0.1em;
				}
				&:not(:last-child) {
					margin-bottom: em(15);
				}
			}
		}
		ul.check {
			li {
				&::before {
					content: url(/icon/li-check.svg);
				}
			}
		}
		ul.dot {
			li {
				&::before {
					content: '';
					width: 10px;
					height: 10px;
					margin: 7px;
					border-radius: 50%;
					background-color: $color-black;
				}
			}
		}
		ul.plus {
			li {
				&::before {
					content: url(/icon/li-plus.svg);
				}
			}
		}
	}
	.form-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.form-group {
		flex: 1 1 240px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 20px;
		text-align: left;
		label {
			font-weight: 700;
		}
	}
	input[type='text'],
	input[type='email'],
	input[type='tel'],
	textarea {
		border: 1px solid $color-inactive;
		border-radius: 4px;
		padding: em(10) em(20);
		font-size: 1rem;
		color: rgba($color-black, 0.6);
		background-color: #f5f4f4;
		&:focus {
			border-color: $color-secondary;
		}
	}
	.white {
		input[type='text'],
		input[type='email'],
		input[type='tel'],
		textarea {
			background-color: $color-white;
		}
	}
	.overflow-hidden {
		overflow: hidden;
	}
	input[type='file'] {
		width: 100%;
	}
	.wp-block-columns {
		display: flex;
		flex-wrap: wrap;
	}
	.wp-block-group {
		background-color: $color-white;
		padding: 50px;
		& > h2,
		& > h3,
		& > h4,
		& > h5,
		& > h6 {
			em {
				color: $color-secondary;
				font-style: normal;
			}
			&:first-child {
				margin-top: 0 !important;
			}
		}
	}
	.wp-block-embed {
		margin: 0 0 100px;
		width: 100%;
		width: 100%;
		iframe {
			width: 100%;
			display: block;
		}
	}
	.wp-block-gallery {
		margin: 0 -140px 100px;
		columns: 3;
		column-gap: 20px;
		figure {
			margin: 0 0 20px;
			img {
				display: block;
			}
			display: block;
		}
	}
	@media (max-width: 1240px) {
		.wp-block-gallery {
			margin: 0 0 100px;
		}
	}
	@media (max-width: 767px) {
		section:not(.cookieControl),
		.wp-block-columns,
		.wp-block-group,
		.wp-block-embed {
			margin-bottom: 50px;
		}
		h1 {
			font-size: rem(30);
		}
		h2 {
			font-size: rem(26);
		}
		.narrow {
			p {
				font-size: rem(16);
			}
		}
		.divider {
			&.top {
				padding-top: 50px;
			}
		}
		.wp-block-columns {
			flex-direction: column;
			.wp-block-column {
				flex: 1 1 auto !important;
			}
		}
		.wp-block-group {
			padding: 30px;
		}
		.wp-block-gallery {
			columns: unset;
		}
	}
</style>
