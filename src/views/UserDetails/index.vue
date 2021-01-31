<template>
	<div class="verification-details-container relative">
		<Loader v-if="loader.isShow" :message="loader.message"/>

		<Active v-if="$route.params.status == 'active'"/>
		<Pending v-if="$route.params.status == 'pending'"/>
		<Incomplete v-if="$route.params.status == 'incomplete'"/>
		<Banned v-if="$route.params.status == 'banned'"/>
		<Freeze v-if="$route.params.status == 'freeze'"/>
		<Approved v-if="$route.params.status == 'approved'"/>
		<Rejected v-if="$route.params.status == 'rejected'"/>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import UserDetails from './function.vue'
	export default UserDetails
</script>