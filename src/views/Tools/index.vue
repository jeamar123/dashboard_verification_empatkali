<template>
	<div class="tools-container">
		<Header/>

		<div class="tools-content p-4 flex">
			<div class="w-1/4 ">
				<router-link 
					tag="div" 
					exact-active-class="none" 
					class="card cursor-pointer rounded-2xl px-6 py-10 flex items-center justify-center mr-4" 
					:to="{ name: 'UnbanOTP'}"
				>
					<img :src="'../assets/img/settings-box.png'" class="w-14 mr-4 flex-none" alt="">
					<p class="flex-1 font-bold leading-normal">Unbanned<br>OTP User</p>
				</router-link>
			</div>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Tools from './function.vue'
	export default Tools
</script>