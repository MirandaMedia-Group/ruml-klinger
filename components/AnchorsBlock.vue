<template>
	<div class="anchors">
		<nav>
			<slot></slot>
		</nav>
	</div>
</template>
<style lang="scss">
	.anchors {
		border-bottom: 1px solid $color-inactive;
		margin-bottom: 100px;
		nav {
			margin-bottom: -1px;
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
			ul {
				display: flex;
				list-style: none;
				margin: 0;
				padding: 0;
			}
			a {
				display: inline-block;
				padding: em(10) em(20);
				text-decoration: none;
				color: $color-font;
				border: 1px solid $color-inactive;
				margin-right: -1px;
				background-color: #f5f4f4;
				&.active,
				&:hover,
				&:focus {
					border-bottom: 1px solid $color-bg-light;
					background-color: $color-bg-light;
					color: $color-secondary;
					font-weight: 700;
				}
			}
		}
	}
	@media (max-width: 767px) {
		.anchors {
			margin-bottom: 50px;
		}
	}
</style>
