<template>
	<div>
		<NuxtLayout name="with-sidebar">
			<template #main>
				<h1>{{ $route.params.slug }}</h1>
			</template>
			<template #sidebar>
				<CategorySidebar />
			</template>
		</NuxtLayout>
	</div>
</template>
<script setup></script>
<style lang="scss"></style>
