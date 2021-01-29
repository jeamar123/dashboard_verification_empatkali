<template>
	<div class="change-limit-container">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header :headerOptions="changeLimitOptions" />



		<div class="change-limit-content-container overflow-y-auto px-4 pb-4 relative">
			<div v-if="false" class="bg-white p-4 rounded-xl shadow-md fixed right-10 top-14 z-50 w-107">
				<div class="flex">
					<div class="icon mr-4">
						<img :src="'../assets/img/check-green-circle.png'" class="max-w-40px" alt="">
					</div>
					<div class="flex-1">
						<p class="mb-1 text-sm font-bold">Change Limit Approved</p>
						<p v-if="true" class="text-sm">Kamu berhasil menyetujui request {{ 'Jeff Benzos' }}.<br>User sudah memiliki limit baru.</p>
        		<p v-if="false" class="text-sm">>Kamu berhasil tidak menyetujui request {{ 'Jeff Benzos' }}.</p>
					</div>
				</div>
			</div>

			<div class="card p-5 h-full">
				<div class="filter-container flex mb-5">
					<form @submit.prevent="submitFilter">
						<div class="input-div with-icon border-r pr-4 mr-4">
							<div class="icon-div absolute left-5 top-3 h-5">
								<svg class="h-full text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
							<input type="text" placeholder="Cari nama, nomor hp" class="min-w-250px" v-model="filter.searchVal">
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

						<button class="btn border-none text-gray-400 font-bold p-2 ml-6" @click="removeFilter">reset filter</button>
					</div>
				</div>

				<table class="w-full text-left">
					<thead>
						<tr>
							<th class="border-b-2 py-3 pr-6 text-sm">Nama</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Nomor HP</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Limit</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Detail Limit</th>
							<th class="border-b-2 py-3 pr-6 text-sm">Pengajuan Limit</th>
							<th class="border-b-2 py-3 pr-6 text-sm text-center">Aksi</th>
						</tr>
					</thead>
					<tbody v-if="true">
						<tr v-for="list in 10" :key="list.index">
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
								{{ 5000000 | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								<div class="flex mb-1 text-xs">
									<label class="text-gray-500 w-24">Outstanding</label>
									<span>{{ (5000000 - 300000) | currency }}</span>
								</div>
								<div class="flex text-xs">
									<label class="text-gray-500 w-24">Sisa Limit</label>
									<span>{{ 4000000 | currency }}</span>
								</div>
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm font-bold">
								{{ 9000000 | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm text-center">
								<button @click="goToVericationDetails({})" class="btn border-2 font-bold border-violet py-2 px-4 rounded-md text-violet text-sm">Lihat Detail</button>
							</td>
						</tr>
						<!-- <tr v-for="(list) in usersArr.data" :key="list.index">
							<td class="border-b-2 py-3 pr-6 text-sm">
								<p class="text-sm mb-1 font-bold text-violet">
									{{ list.user.detail.name }}
								</p>
								<p class="text-gray-500 text-xs">
									{{ list.user.detail.email }}
								</p>
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								{{ list.user.mobileNumber }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								{{ list.user.credit | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								<div class="flex mb-1 text-xs">
									<label class="text-gray-500 w-24">Outstanding</label>
									<span>{{ (list.user.credit - list.user.remainingCredit) | currency }}</span>
								</div>
								<div class="flex text-xs">
									<label class="text-gray-500 w-24">Sisa Limit</label>
									<span>{{ list.user.remainingCredit | currency }}</span>
								</div>
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm font-bold">
								{{ list.creditNew | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm text-center">
								<button @click="goToVericationDetails(list)" class="btn border border-violet py-2 px-4 rounded-md text-violet text-sm">Lihat Detail</button>
							</td>
						</tr> -->
					</tbody>
				</table>

				<div v-if="false" class="flex items-center w-full no-data-content">
					<div class="w-full text-center">
						<img :src="'../assets/img/no data results.png'" class="my-4 w-1/4" alt="">
						<p class="text-xl 2xl:text-2xl mt-10">Pencarian kamu tidak ditemukan</p>
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
		
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import ChangeLimit from './function.vue'
	export default ChangeLimit
</script>