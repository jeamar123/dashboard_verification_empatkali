<template>
	<div class="change-limit-container">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header :changeLimitOptions="changeLimitOptions" />

		<div class="change-limit-content-container overflow-y-auto px-4 pb-4 ">
			<div class="card p-5 min-h-500px">
				<div class="filter-container flex mb-5">
					<div class="input-div with-icon border-r pr-4 mr-4">
						<div class="icon-div absolute left-5 top-3 h-5">
							<svg class="h-full text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<input type="text" placeholder="Cari nama, nomor hp" class="min-w-250px">
					</div>

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
							>
								<template v-slot="{ inputValue, inputEvents }">
									<input
										class="datepicker-input"
										:value="inputValue"
										v-on="inputEvents"
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
								v-model="filter.startDate"
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
									/>
								</template>
							</v-date-picker>
						</div>

						<button class="btn border-none text-gray-400 font-bold p-2 ml-6">reset filter</button>
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
					<tbody>
						<tr v-for="(list) in usersArr.data" :key="list.index">
							<td class="border-b-2 py-3 pr-6 text-sm">
								<p class="text-sm mb-1 font-bold text-violet">Jeff Benzos</p>
								<p class="text-gray-500 text-xs">jeff@afterpay.com</p>
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								08119998877
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								{{ '2000000' | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm">
								<div class="flex mb-1 text-xs">
									<label class="text-gray-500 w-24">Outstanding</label>
									<span>{{ '500000' | currency }}</span>
								</div>
								<div class="flex text-xs">
									<label class="text-gray-500 w-24">Sisa Limit</label>
									<span>{{ '1500000' | currency }}</span>
								</div>
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm font-bold">
								{{ '5000000' | currency }}
							</td>
							<td class="border-b-2 py-3 pr-6 text-sm text-center">
								<button @click="goToVericationDetails(list)" class="btn border border-violet py-2 px-4 rounded-md text-violet text-sm">Lihat Detail</button>
							</td>
						</tr>
					</tbody>
				</table>

				<div class="flex text-sm py-3">
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