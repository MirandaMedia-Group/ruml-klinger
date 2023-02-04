<template>
	<section class="page-header">
		<div class="container">
			<div class="page-header__content">
				<slot></slot>
			</div>
		</div>
	</section>
</template>
<style lang="scss">
	.page-header {
		background: url('/page-header-bg.jpg') no-repeat center;
		background-size: cover;
		margin-bottom: 120px;
		&__content {
			padding: 100px 80px;
			background-image: url('/page-header-logo.png');
			background-repeat: no-repeat;
			background-position: center bottom;
			background-color: $color-white;
			position: relative;
			bottom: -80px;
			text-align: center;
			h1 {
				&::after {
					margin-left: auto;
					margin-right: auto;
				}
			}
			p {
				font-size: rem(20);
				color: rgba($color-black, 0.6);
				margin-bottom: 0;
			}
			& > strong {
				display: block;
				color: $color-secondary;
				margin-top: 20px;
			}
		}
	}
	@media (max-width: 767px) {
		.page-header {
			background: $color-white;
			margin-bottom: 50px;
			&__content {
				position: initial;
				padding: 60px 0;
				background-size: 50%;
				p {
					font-size: 1rem;
				}
			}
		}
	}
</style>
