<template>
	<div>
		<div v-if="isFreezeStatusAlertShow" class="bg-white p-4 rounded-xl shadow-md fixed right-10 top-14 z-50 w-68">
			<div class="flex">
				<div class="icon mr-4">
					<img :src="'../assets/img/check-green-circle.png'" class="max-w-40px" alt="">
				</div>
				<div class="flex-1">
					<p class="mb-1 text-sm font-bold">User Unfreeze</p>
					<p class="text-sm">Kamu berhasil unfreeze user. </p>
				</div>
				<div class="w-1 relative">
					<a href="#" @click.prevent="closeAlert" class="relative -top-3" >
						<font-awesome-icon icon="times" class="mr-2" size="sm" />
					</a>
				</div>
			</div>
		</div>

		<div class="users-list-content px-4 pb-4 flex-1">
			<div class="card p-5 h-full">

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
										placeholder="Start Date"
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
										placeholder="End Date"
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
							<th class="border-b-2 py-3 pr-6 text-sm">Limit</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Limit digunakan</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Waktu Daftar</th>
							<th class="border-b-2 py-3 text-sm text-center w-52">Aksi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list) in usersArr.data" :key="list.index">
							<td class="border-b-2 py-3 pr-6 text-xs 2xl:text-sm">
								<p class="text-xs 2xl:text-sm mb-1 font-bold text-violet">
									{{ list.detail ? list.detail.name : '---' }}
								</p>
								<p class="text-gray-500 text-xxs 2xl:text-xs">
									{{ list.detail ? list.detail.email : '---' }}
								</p>
							</td>
							<td class="border-b-2 py-3 pr-6 text-xs 2xl:text-sm">
								{{ list.mobileNumber ? list.mobileNumber : '---' }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-xs 2xl:text-sm">
								{{ list.ktp && list.ktp.number ? list.ktp.number : '---' }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-xs 2xl:text-sm font-bold">
								{{ list.credit | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-xs 2xl:text-sm">
								<div class="flex mb-1 text-xs 2xl:text-sm">
									<span>{{ (list.credit - list.remainingCredit) | currency }}</span>
								</div>
								<div class="flex text-xxs 2xl:text-xs color--blue font-bold">
									<label class="mr-1">Sisa :</label><span>{{ list.remainingCredit | currency }}</span>
								</div>
							</td>
							<td class="border-b-2 py-3 pr-6">
								<div class="text-xs 2xl:text-sm">
									<span>{{ list.createdAt | moment('DD MMM YYYY') }}</span>
								</div>
								<div class="text-xxs 2xl:text-xs text-gray-500">
									<span>{{ list.createdAt | moment('HH:mm:ss') }} WIB</span>
								</div>
							</td>
							<td class="border-b-2 py-3 text-xs 2xl:text-sm text-center">
								<div class="mr-5 inline-block">
									<a href="#" @click.prevent="toggleModals(true, 'transaction', list)" class="relative has-tooltip">
										<img :src="'../assets/img/transactions.png'" alt="" class="w-6">

										<div class="custom-tooltip trans">
											<div class="text-white bg-gray-700 rounded-md py-1 px-3 font-bold relative z-20">Transaction</div>
											<div class="top-2 h-3 w-3 bg-gray-700 transform rotate-45 relative -top-2 inline-block z-10"></div>
										</div>
									</a>
								</div>
								<div class="mr-5 inline-block">
									<a href="#" @click.prevent="toggleModals(true, 'freeze', list)" class="relative has-tooltip">
										<img :src="'../assets/img/freeze.png'" alt="" class="w-6">

										<div class="custom-tooltip unfreeze">
											<div class="text-white bg-gray-700 rounded-md py-1 px-3 font-bold relative z-20 whitespace-nowrap">Unfreeze User</div>
											<div class="h-3 w-3 bg-gray-700 transform rotate-45 relative -top-2 inline-block z-10"></div>
										</div>
									</a>
								</div>
								<button @click="goToUserDetails(list)" class="btn border-2 font-bold border-violet font-bold py-2 px-4 rounded-md text-violet text-sm">Lihat Detail</button>
							</td>
						</tr>
					</tbody>
				</table>

				<div v-if="usersArr.data && usersArr.data.length == 0" class="flex items-center w-full no-data-content ">
					<div class="w-full h-full text-center relative">
						<img :src="'../assets/img/no data results.png'" class="my-4 w-1/4" :class="{'h-6/10' : false}" alt="">
						<p class="text-xl 2xl:text-2xl mt-5 2xl:mt-10">Pencarian kamu tidak ditemukan</p>
					</div>
				</div>

				<div v-if="usersArr.data && usersArr.data.length > 0" class="flex text-sm py-3">
					<div class="flex-1 flex font-bold">
						<span class="mr-1">Terlihat</span>
						<span class="mr-1">{{ paginationData.resultStart }}-{{ paginationData.resultEnd }}</span> 
						<span class="mr-1">dari</span>
						<span>{{ paginationData.totalResultsRows }}</span>
					</div>
					<div class="flex-1 flex justify-end pr-5">
						<div v-if="paginationData.currentPage > 1" @click="changePage('prev')" class="cursor-pointer">
							<svg class="w-5 text-violet" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
						</div>
						<div 
							v-if="paginationData.currentPage > paginationCount"
							class="font-bold px-1 h-5 cursor-pointer text-violet"
							@click="selectPage(1)"
						>1</div>
						<div 
							v-if="paginationData.currentPage > paginationCount"
							class="font-bold text-lg h-5 leading-none tracking-widest text-violet"
						>...</div>

						<div 
							v-for="list in paginateTotalPages" 
							:key="list.index" 
							class="font-bold px-1 mx-1 h-5 cursor-pointer"
							v-bind:class="{
								'text-violet' : list != paginationData.currentPage,
							}" 
							@click="selectPage(list)"
						>{{ list }}</div>

						<div 
							v-if="paginationData.totalPages > 10 && (paginationData.totalPages - paginationData.currentPage >= paginationData.totalPages % paginationCount)"
							class="font-bold text-lg h-5 leading-none tracking-widest text-violet"
						>...</div>
						<div 
							v-if="paginationData.totalPages > 10 && (paginationData.totalPages - paginationData.currentPage >= paginationData.totalPages % paginationCount)"
							class="font-bold px-1 h-5 cursor-pointer text-violet"
							@click="selectPage(paginationData.totalPages)"
						>{{ paginationData.totalPages }}</div>
						<div v-if="paginationData.currentPage < paginationData.totalPages" @click="changePage('next')" class="cursor-pointer">
							<svg class="w-5 text-violet" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
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
			<TransactionsModal :user="selectedUser" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Freeze User Modal -->
		<Modal 
			v-model="isFreezeUserModalShow" 
			title="Unfreeze Confirmation"
			modal-class="modal-wrapper"
		>
			<FreezeUserModal :user="selectedUser" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
	@import "../style.scss";
</style>

<script>
	import Freeze from './function.vue'
	export default Freeze
</script>