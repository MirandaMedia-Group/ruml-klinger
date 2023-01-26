<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<h1>Produkty</h1>
			</template>
			<template #sidebar>
				<h2>sidebaaar</h2>
			</template>
		</NuxtLayout>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: 'false',
	})
</script>
<style lang="scss"></style>
