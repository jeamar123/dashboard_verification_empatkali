<template>
	<div class="unban-container">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header/>

		<div class="unban-content p-4 flex">
			<div class="card p-4">
				<h3 class="font-bold text-lg">Unbanned User OTP</h3>

				<div class="input-div my-6 w-72">
					<label for="" class="text-sm text-gray-600">Phone Number</label>
					<input
						:class="{'border-dangerMsg': errMsg != ''}"
					 type="number" 
					 v-model="phoneNumber" 
					 @input="validatePhoneNumber(phoneNumber)" min="0">
					<p class="text-dangerMsg my-2 text-sm">{{ errMsg }}</p>
				</div>				

				<button 
					@click="unbanOtpUser(phoneNumber)"
					class="btn px-6 py-3 mt-4 bg-primaryBtn text-white rounded-md text-sm" 
					:class="{'opacity-50': errMsg != ''}" 
					:disabled="errMsg != ''">Submit</button>
			</div>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import UnbanOTP from './function.vue'
	export default UnbanOTP
</script>