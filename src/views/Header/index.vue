<template>
	<div>
		<div v-if="$route.name == 'User Limit Details' || $route.name == 'User Details'" class="header-container flex border-b items-center px-4 shadow-sm bg-navColor">
			<div class="logo-wrapper h-full flex items-center py-4 mr-2">
				<img :src="'../../assets/img/EmpatKali_Logo.png'" alt="" class="h-full">
				<!-- <span class="logo-text text-2xl font-black text-black">DevNotes</span> -->
			</div>
			<div class="flex-1">
				<p class="text-sm"><span class="font-bold">Verification</span> Dashboard</p>
			</div>
			<div class="flex flex-1 text-right items-center">
				<div class="flex-1">
					<p class="text-sm font-bold">Hi, Scarlett</p>
				</div>
				<div class="flex-none ml-5 user-img relative user-header-toggle">
					<div @click="isShowUserProfileMenu = isShowUserProfileMenu ? false : true" class="flex items-center cursor-pointer">
						<div class="img-container flex-1 mr-3">
							<img :src="'../../assets/img/sample-user-img.png'" class="h-8 rounded" alt="">
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
					<div v-if="isShowUserProfileMenu" class="user-drop-container absolute right-0 top-10 z-50">
						<div class="bg-white shadow-md border middle rounded-2xl w-40 p-4">
							<div @click="toggleProfileModal(true)" class="flex items-center border-b-2 mb-3 pb-3 cursor-pointer">
								<div class="img-container mr-3">
									<img :src="'../../assets/img/edit.png'" class="w-4" alt="">
								</div>
								<p class="text-sm">Ubah Profil</p>
							</div>
							<div @click.prevent="logout()" class="flex items-center cursor-pointer">
								<div class="img-container mr-3">
									<img :src="'../../assets/img/logout.png'" class="w-4" alt="">
								</div>
								<p class="text-sm">Logout</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="header-container flex items-center px-4">
			<div class="flex-2">
				<p v-if="headerContentName == 'default' || headerContentName == ''" class="text-md font-bold">
					{{ $route.name }}
				</p>

				<div v-if="headerContentName != 'default' && headerContentName != ''" class="flex items-center">
					<div class="flex-none mr-8">
						<p class="text-md font-bold inline-block capitalize">
							{{ headerContentName != 'All users' && headerContentName != 'All request' && headerContentName != 'settings' ? $route.name + ' - ' + headerContentName : headerContentName }}
						</p>

						<div 
							v-if="($route.name == 'Change Limit' && headerContentName != 'All request') || ($route.name == 'Users' && headerContentName != 'All users')" 
							class="count-badge rounded-2xl px-4 py-2 inline-block text-white font-bold text-xs ml-3"
							:class="{
								'bg-v-status-pending' : headerContentName == 'pending',
								'bg-v-status-approved' : headerContentName == 'approved',
								'bg-v-status-rejected' : headerContentName == 'rejected',
								'bg-v-status-active' : headerContentName == 'active',
								'bg-v-status-incomplete' : headerContentName == 'incomplete',
								'bg-v-status-banned' : headerContentName == 'banned',
								'bg-v-status-freeze' : headerContentName == 'freeze',
							}"
						>
							{{ headerOptions.resultCount }}
						</div>
					</div>

					<div class="flex flex-1">
						<div class="flex items-center flex-none mr-4">
							<div class="w-5 mr-4">
								<img :src="'../assets/img/calendar-icon.png'" class="w-full inline-block" alt="">
							</div>
							<div class="flex-1 text-sm">
								{{ dateToday | moment('DD MMM YYYY') }}
							</div>
						</div>
						<div class="flex items-center flex-none mr-4">
							<div class="w-6 mr-4">
								<img :src="'../assets/img/clock-icon.png'" class="w-full inline-block" alt="">
							</div>
							<div class="flex-1 text-sm">
								{{ dateToday | moment("HH:MM:SS") }} WIB
							</div>
						</div>
					</div>
				</div>

				
			</div>
			<div class="flex flex-1 text-right items-center">
				<div class="flex-1">
					<p class="text-sm font-bold">Hi, Scarlett</p>
				</div>
				<div class="flex-none ml-5 user-img relative user-header-toggle">
					<div @click="isShowUserProfileMenu = isShowUserProfileMenu ? false : true" class="flex items-center cursor-pointer">
						<div class="img-container flex-1 mr-3">
							<img :src="'../../assets/img/sample-user-img.png'" class="h-8 rounded" alt="">
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
					<div v-if="isShowUserProfileMenu" class="user-drop-container absolute right-0 top-10 z-50">
						<div class="bg-white shadow-md border middle rounded-2xl w-40 p-4">
							<div @click="toggleProfileModal(true)" class="flex items-center border-b-2 mb-3 pb-3 cursor-pointer">
								<div class="img-container mr-3">
									<img :src="'../../assets/img/edit.png'" class="w-4" alt="">
								</div>
								<p class="text-sm">Ubah Profil</p>
							</div>
							<div @click.prevent="logout()" class="flex items-center cursor-pointer">
								<div class="img-container mr-3">
									<img :src="'../../assets/img/logout.png'" class="w-4" alt="">
								</div>
								<p class="text-sm">Logout</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<Modal 
			v-model="isShowUpdateProfileModal" 
			title=" "
			modal-class="modal-wrapper w-3/10 mt-20"
		>
			<UpdateProfileModal :closeModal="toggleProfileModal" :toggleLoader="toggleLoader"/>
		</Modal>
		<!-- <UpdateProfileModal /> -->
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Header from './function.vue'
	export default Header
</script>