<template>
	<div class="home-container">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header/>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Home from './function.vue'
	export default Home
</script>