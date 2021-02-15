<template>
	<div class="users-list-container ">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header :headerOptions="headerOptions"/>

		<div class="users-content overflow-y-auto flex flex-col relative">
			<AllUsers v-if="statusSelected == 'all'" :headerOptions="setHeaderOptions"/>
			<Active v-if="statusSelected == 'active'" :headerOptions="setHeaderOptions"/>
			<Pending v-if="statusSelected == 'pending'" :headerOptions="setHeaderOptions"/>
			<Incomplete v-if="statusSelected == 'incomplete'" :headerOptions="setHeaderOptions"/>
			<Banned v-if="statusSelected == 'banned'" :headerOptions="setHeaderOptions"/>
			<Freeze v-if="statusSelected == 'freeze'" :headerOptions="setHeaderOptions"/>
			<Approved v-if="statusSelected == 'approved'" :headerOptions="setHeaderOptions"/>
			<Rejected v-if="statusSelected == 'rejected'" :headerOptions="setHeaderOptions"/>
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