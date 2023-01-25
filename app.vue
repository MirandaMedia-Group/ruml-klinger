<template>
	<MainHeader />
	<main id="content">
		<NuxtPage />
	</main>
	<MainFooter />
</template>
<style lang="scss">
	html {
		font-size: 16px;
	}
	body {
		font-family: 'Montserrat', sans-serif;
		font-size: clamp(14px, 1rem, 18px);
		background-color: $color-bg-light;
	}
	p {
		line-height: em(28);
		margin-top: 0;
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
		font-size: rem(32);
		line-height: em(42, 32);
	}
	section {
		margin-bottom: 100px;
	}
	.container {
		@include container(1440px);
	}
	.narrow {
		max-width: 920px;
		margin-left: auto;
		margin-right: auto;
		p {
			font-size: rem(20);
		}
	}
	.center {
		text-align: center;
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
	.columns {
		display: flex;
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
</style>
