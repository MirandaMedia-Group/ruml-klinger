<template>
	<div class="content-wrapper container">
		<main id="content">
			<slot name="main"></slot>
		</main>
		<aside id="sidebar">
			<slot name="sidebar"></slot>
		</aside>
	</div>
</template>
<script setup></script>
<style lang="scss">
	.content-wrapper {
		display: flex;
		align-items: flex-start;
		gap: 60px;
		margin-top: 50px;
		margin-bottom: 100px;
		#content {
			flex: 1 1 640px;
		}
		#sidebar {
			flex: 0 0 480px;
		}
	}
	@media (max-width: 767px) {
		.content-wrapper {
			margin-bottom: 50px;
			gap: 40px;
		}
	}
</style>
