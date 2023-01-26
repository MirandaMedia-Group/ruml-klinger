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
<style lang="scss">
	.content-wrapper {
		display: flex;
		align-items: flex-start;
		gap: 30px;
		#content {
			flex: 1 1 640px;
		}
		#sidebar {
			flex: 0 0 320px;
		}
	}
</style>
