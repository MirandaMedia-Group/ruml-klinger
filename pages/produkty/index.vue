<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<h1>Produkty</h1>
			</template>
			<template #sidebar>
				<CategorySidebar />
			</template>
		</NuxtLayout>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: 'false',
	})

	const activeCategory = useState('activeCategory', () => null)
</script>
<style lang="scss"></style>
