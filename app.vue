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
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Gotham', sans-serif;
		color: $color-primary;
		margin: 0 0 em(30, 42);
		line-height: em(60, 42);
	}
	h1 {
		font-size: rem(42);
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
	.container {
		@include container(1440px);
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
			padding-right: em(50);
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
				background-color: darken($color-secondary, 5%);
				&::before {
					margin-right: em(23.5);
				}
			}
		}
		&.btn-secondary {
			background-color: transparent;
			color: $color-black;
			border: 1px solid $color-secondary;
		}
	}
	.buttons-vertical {
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
		margin-top: 30px;
	}
</style>
