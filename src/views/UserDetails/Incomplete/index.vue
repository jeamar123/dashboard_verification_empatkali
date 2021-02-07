<template>
	<div class="h-full">
		<div class="verification-details-content p-4">
			<div class="grid details-grid incomplete-status gap-3 h-full w-full">
				<div class="card px-4 py-6 flex items-center text-xl ff-thin font-bold">
					Step 1
				</div>
				<div class="card px-4 py-6 flex items-center text-xl ff-thin font-bold">
					Step 2
				</div>
				<div class="card px-4 py-6 flex items-center text-xl ff-thin font-bold">
					Step 3
				</div>
				<div class="card p-4 relative">
					<div class="corner-status absolute right-0 top-0 bg-v-status-incomplete px-6 py-1 text-white font-bold xs-text rounded-tr-xl rounded-bl-xl">
						Incomplete
					</div>
					<p class="sm-text font-bold mb-4">Data Pribadi</p>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ 'Jeff Benzos' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '081998678276' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ 'jeff@empatkali.co.id' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Pekerjaan</p>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Industri <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Jenis Pekerjaan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Pendidikan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Penghasilan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Metode Pembayaran - Kartu Debit/ Kredit</p>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Tipe <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor Kartu <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
				</div>
				<div class="card p-4 flex">
					<div class="flex-1">
						<p class="sm-text font-bold mb-4">Foto KTP</p>
					</div>
					<div class="flex-1">
						<p class="sm-text font-bold mb-4">Foto selfie dengan KTP</p>
					</div>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Kontak Darurat</p>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '3203012503770011' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor HP Kontak Darurat <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ 'Jakarta/ 20 November 1990' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Hubungan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ 'Laki-laki' }}</p>
					</div>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Metode Pembayaran - Pembayaran Instan</p>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Tipe <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Saldo <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
				</div>
				<div class="card col-span-2 relative">
					<p class="sm-text font-bold mb-2 absolute top-3 left-4 z-10">Lokasi saat daftar</p>
					<GmapMap
						:center="{
							lat: -6.24072456693954,
							lng: 106.804145698369
						}"
						:zoom="10"
						:options="{
							fullscreenControl: false,
							disableDefaultUI: false
						}"
						style="height: 100%; border-radius: 12px;overflow: hidden;"
					>
					</GmapMap>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Data Pendukung</p>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Status Kontrak <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Log Email <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Call <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ '-' }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="btn-options-wrapper flex items-center px-4 h-14 bg-white shadow-lg-reverse absolute w-full bottom-0 left-0">
			<div class="flex-none mr-10">
				<a href="#" @click="$router.go(-1)" class="text-violet xs-text font-bold flex items-center">
					<img :src="'../../assets/img/blue-arrow-left.png'" alt="" class="w-5 mr-2">
					Kembali ke list
				</a>
			</div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
	@import "../style.scss";
</style>

<script>
	import Incomplete from './function.vue'
	export default Incomplete
</script>