<template>
	<div class="settings-container">
		<Header/>

		<div class="settings-content p-4 flex">
			<router-link 
				tag="div" 
				exact-active-class="none" 
				class="card flex-1 cursor-pointer rounded-2xl px-6 py-10 flex items-center justify-center mr-4" 
				:to="{ name: 'Email Template'}"
			>
				<img :src="'../assets/img/settings-box.png'" class="w-14 mr-4 flex-none" alt="">
				<p class="flex-1 font-bold leading-normal">Email<br>Template</p>
			</router-link>
			<router-link 
				tag="div" 
				exact-active-class="none" 
				class="card flex-1 cursor-pointer rounded-2xl px-6 py-10 flex items-center justify-center mr-4" 
				:to="{ name: 'Fee'}"
			>
				<img :src="'../assets/img/settings-box.png'" class="w-14 mr-4 flex-none" alt="">
				<p class="flex-1 font-bold leading-normal">Transaction<br>Fee</p>
			</router-link>
			<router-link 
				tag="div" 
				exact-active-class="none" 
				class="card flex-1 cursor-pointer rounded-2xl px-6 py-10 flex items-center justify-center mr-4" 
				:to="{ name: 'User Management'}"
			>
				<img :src="'../assets/img/settings-box.png'" class="w-14 mr-4 flex-none" alt="">
				<p class="flex-1 font-bold leading-normal">User<br>Management</p>
			</router-link>
			<router-link 
				tag="div" 
				exact-active-class="none" 
				class="card flex-1 cursor-pointer rounded-2xl px-6 py-10 flex items-center justify-center mr-4" 
				:to="{ name: 'Salary'}"
			>
				<img :src="'../assets/img/settings-box.png'" class="w-14 mr-4 flex-none" alt="">
				<p class="flex-1 font-bold leading-normal">Salary<br>Range</p>
			</router-link>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Settings from './function.vue'
	export default Settings
</script>