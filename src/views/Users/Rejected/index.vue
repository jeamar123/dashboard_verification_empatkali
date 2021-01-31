<template>
	<div>
		<div v-if="false" class="bg-white p-4 rounded-xl shadow-md fixed right-10 top-14 z-50 w-68">
			<div class="flex">
				<div class="icon mr-4">
					<img :src="'../assets/img/check-green-circle.png'" class="max-w-40px" alt="">
				</div>
				<div class="flex-1">
					<p class="mb-1 text-sm font-bold">User Banned</p>
					<p v-if="true" class="text-sm">Kamu berhasil banned user. </p>
				</div>
			</div>
		</div>

		<div v-if="$route.params.status == 'all'" class="users-status-count-wrapper px-4 pb-4">
			<div class="user-count-div grid grid-cols-4 gap-3">
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'all'}" @click="selectUserStatus('all')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base dot--all"></div>
						<p class="flex-1 font-bold text-sm">All users</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">511.230</p>
				</div>
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'active'}" @click="selectUserStatus('active')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-active"></div>
						<p class="flex-1 font-bold text-sm">Active</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">496.090</p>
				</div>
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'pending'}" @click="selectUserStatus('pending')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-pending"></div>
						<p class="flex-1 font-bold text-sm">Pending</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">100</p>
				</div>
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'incomplete'}" @click="selectUserStatus('incomplete')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-incomplete"></div>
						<p class="flex-1 font-bold text-sm">Incomplete</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">314</p>
				</div>

				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'banned'}" @click="selectUserStatus('banned')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-banned"></div>
						<p class="flex-1 font-bold text-sm">Banned</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">511.230</p>
				</div>
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'freeze'}" @click="selectUserStatus('freeze')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-freeze"></div>
						<p class="flex-1 font-bold text-sm">Freeze</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">496.090</p>
				</div>
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'approved'}" @click="selectUserStatus('approved')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-approved"></div>
						<p class="flex-1 font-bold text-sm">Approved</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">100</p>
				</div>
				<div class="card p-5 cursor-pointer border-2 border-white" :class="{'active' : activeStatus == 'rejected'}" @click="selectUserStatus('rejected')">
					<div class="flex mb-5 items-center">
						<div class="dot-div h-3 w-3 2xl:h-4 2xl:w-4 rounded-full mr-4 text-sm 2xl:text-base bg-v-status-rejected"></div>
						<p class="flex-1 font-bold text-sm">Rejected</p>
					</div>
					<p class="text-xl 2xl:text-2xl ff-light">314</p>
				</div>


			</div>
		</div>

		<div 
			class="users-list-content px-4 pb-4 flex-1"
		>
			<div 
				class="card p-5 h-full"
			>
				<div v-if="$route.params.status == 'all'" class="flex items-center mb-6">
					<p class="font-bold">List of users</p>
					<div 
						class="count-badge rounded-2xl px-4 py-1 inline-block font-bold text-xs ml-3"
						:class="{
							'dot--all' : activeStatus == 'all',
							'bg-v-status-pending text-white' : activeStatus == 'pending',
							'bg-v-status-approved text-white' : activeStatus == 'approved',
							'bg-v-status-rejected text-white' : activeStatus == 'rejected',
							'bg-v-status-active text-white' : activeStatus == 'active',
							'bg-v-status-incomplete text-white' : activeStatus == 'incomplete',
							'bg-v-status-banned text-white' : activeStatus == 'banned',
							'bg-v-status-freeze text-white' : activeStatus == 'freeze',
						}"
					>
						{{ '0' }}
					</div>
				</div>

				<div class="filter-container flex mb-5">
					<form @submit.prevent="submitFilter">
						<div class="input-div with-icon border-r pr-4 mr-4">
							<div class="icon-div absolute left-5 top-3 h-5">
								<svg class="h-full text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
							<input type="text" placeholder="Cari nama, email, nomor hp, NIK" class="min-w-350px" v-model="filter.searchVal">
						</div>
					</form>

					<div class="flex items-center">
						<div class="input-div with-icon w-48">
							<div class="icon-div absolute left-5 top-3 h-5">
								<img :src="'../assets/img/calendar-icon.png'" class="h-full" alt="">
							</div>
							<v-date-picker 
								mode="date"
								v-model="filter.startDate"
								:popover="{
									visibility: 'focus'
								}"
								:masks="dateFormat"
								@input="filterDateChanged"
							>
								<template v-slot="{ inputValue, inputEvents }">
									<input
										class="datepicker-input"
										:value="inputValue"
										v-on="inputEvents"
										readonly
									/>
								</template>
							</v-date-picker>
						</div>

						<span class="font-bold text-black-100 mx-5 text-sm">sampai</span>

						<div class="input-div with-icon w-48">
							<div class="icon-div absolute left-5 top-3 h-5">
								<img :src="'../assets/img/calendar-icon.png'" class="h-full" alt="">
							</div>
							<v-date-picker 
								mode="date"
								v-model="filter.endDate"
								:popover="{
									visibility: 'focus'
								}"
								:masks="dateFormat"
							>
								<template v-slot="{ inputValue, inputEvents }">
									<input
										class="datepicker-input"
										:value="inputValue"
										v-on="inputEvents"
										readonly
									/>
								</template>
							</v-date-picker>
						</div>

						<button class="btn bg-primaryBtn text-white px-10 py-4 font-bold ml-3 rounded-md" @click="submitFilter">Cari</button>
						<button class="btn border-none text-gray-400 font-bold p-2 ml-3" @click="removeFilter">reset filter</button>
					</div>
				</div>

				<table class="w-full text-left">
					<thead>
						<tr>
							<th class="border-b-2 py-3 pr-6 text-sm">Nama</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Nomor HP</th>
							<th class="border-b-2 py-3 pr-6 text-sm">NIK</th>
							<th v-if="$route.params.status != 'all'" class="border-b-2 py-3 pr-6 text-sm">Limit</th>
							<th v-if="$route.params.status != 'all'" class="border-b-2 py-3 pr-6 text-sm">Limit digunakan</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Waktu Daftar</th>
							<th v-if="$route.params.status == 'all'"  class="border-b-2 py-3 pr-6 text-sm">Status</th>
							<th class="border-b-2 py-3 text-sm text-center">Aksi</th>
						</tr>
					</thead>
					<tbody v-if="true">
						<tr v-for="(list, index) in 10" :key="list.index">
							<td class="border-b-2 py-3 pr-6 text-sm">
								<p class="text-sm mb-1 font-bold text-violet">
									{{ 'Jhon Doe' }}
								</p>
								<p class="text-gray-500 text-xs">
									{{ 'jhondoe@empatkali.co.id' }}
								</p>
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								{{ '1234567891011' }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								{{ '3178273819009817' }}
							</td>

							<td v-if="$route.params.status != 'all'" class="border-b-2 py-3 pr-6 text-sm font-bold">
								{{ 4000000 | currency }}
							</td>
							<td v-if="$route.params.status != 'all'" class="border-b-2 py-3 pr-6 text-sm">
								<div class="flex text-sm">
									<span>{{ (5000000 - 300000) | currency }}</span>
								</div>
								<div class="flex text-xs color--blue font-bold">
									<label class="mr-1">Sisa :</label><span>{{ 4000000 | currency }}</span>
								</div>
							</td>


							<td class="border-b-2 py-3 pr-6">
								<div class="text-sm">
									<span>{{ new Date() | moment('DD MMM YYYY') }}</span>
								</div>
								<div class="text-xs text-gray-500">
									<span>{{ new Date() | moment('HH:mm:ss') }} WIB</span>
								</div>
							</td>
							<td v-if="$route.params.status == 'all'" class="border-b-2 py-3 pr-6">
								<div 
									class="count-badge rounded-2xl px-4 py-1 inline-block font-bold text-xs"
									:class="{
										'bg-v-status-pending text-white' : index == 0 || index > 6,
										'bg-v-status-approved text-white' : index == 1,
										'bg-v-status-rejected text-white' : index == 2,
										'bg-v-status-active text-white' : index == 3,
										'bg-v-status-incomplete text-white' : index == 4,
										'bg-v-status-banned text-white' : index == 5,
										'bg-v-status-freeze text-white' : index == 6,
									}"
								>
									{{ 'Pending' }}
								</div>
							</td>
							<td class="border-b-2 py-3 text-sm text-center">
								<a v-if="$route.params.status != 'all'" href="#" @click.prevent="toggleModals(true, 'ban')">
									<img :src="'../assets/img/banned.png'" alt="" class="w-6 mr-5">
								</a>
								<a v-if="$route.params.status != 'all'" href="#" @click.prevent="toggleModals(true, 'transaction')">
									<img :src="'../assets/img/transactions.png'" alt="" class="w-6 mr-5">
								</a>
								<button @click="goToVericationDetails(list)" class="btn border-2 font-bold border-violet font-bold py-2 px-4 rounded-md text-violet text-sm">Lihat Detail</button>
							</td>
						</tr>
					</tbody>
				</table>

				<div v-if="false" class="flex items-center w-full no-data-content " :class="{'isAllUsers' : false}">
					<div class="w-full h-full text-center relative">
						<img :src="'../assets/img/no data results.png'" class="my-4 w-1/4" :class="{'h-6/10' : false}" alt="">
						<p class="text-xl 2xl:text-2xl mt-5 2xl:mt-10">Pencarian kamu tidak ditemukan</p>
					</div>
				</div>

				<div v-if="true" class="flex text-sm py-3">
					<div class="flex-1 flex font-bold">
						<span class="mr-1">Terlihat</span>
						<span class="mr-1">{{ paginationData.resultStart }}-{{ paginationData.resultEnd }}</span> 
						<span class="mr-1">dari</span>
						<span>{{ paginationData.totalResultsRows }}</span>
					</div>
					<div class="flex-1 flex justify-end pr-5">
						<div 
							v-for="(list) in paginationData.totalPages" 
							:key="list.index" 
							class="font-bold px-2 cursor-pointer"
							v-bind:class="{'text-violet' : list != paginationData.currentPage}" 
							@click="selectPage(list)"
						>{{ list }}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Transaction List Modal -->
		<Modal 
			v-model="isTransModalShow" 
			title="List Transaksi"
			modal-class="modal-wrapper max-w-none w-9/10"
		>
			<TransactionsModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Ban User Modal -->
		<Modal 
			v-model="isBanUserModalShow" 
			title="Banned Confirmation"
			modal-class="modal-wrapper"
		>
			<BanUserModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
	@import "../style.scss";
</style>

<script>
	import Rejected from './function.vue'
	export default Rejected
</script>