<template>
	<div class="users-list-container">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header :headerOptions="headerOptions"/>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Users from './function.vue'
	export default Users
</script>