<template>
	<div class="loading-wrap">
		<div class="loader"></div>
	</div>
</template>
<style lang="scss" scoped>
	.loading-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-height: 400px;
	}
	.loader {
		border: 16px solid $color-bg;
		border-radius: 50%;
		border-top: 16px solid $color-secondary;
		width: 120px;
		height: 120px;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
