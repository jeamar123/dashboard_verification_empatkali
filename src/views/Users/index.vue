<template>
	<div class="users-list-container ">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header :headerOptions="headerOptions"/>

		<div class="users-content overflow-y-auto flex flex-col relative">
			<AllUsers v-if="statusSelected == 'all'"/>
			<Active v-if="statusSelected == 'active'"/>
			<Pending v-if="statusSelected == 'pending'"/>
			<Incomplete v-if="statusSelected == 'incomplete'"/>
			<Banned v-if="statusSelected == 'banned'"/>
			<Freeze v-if="statusSelected == 'freeze'"/>
			<Approved v-if="statusSelected == 'approved'"/>
			<Rejected v-if="statusSelected == 'rejected'"/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Users from './function.vue'
	export default Users
</script>