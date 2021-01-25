<template>
	<div class="verification-details-container relative">
		<Loader v-if="loader.isShow" :message="loader.message"/>

		<div class="verification-details-content p-4">
			<div class="grid details-grid gap-3 h-full w-full">
				<div class="row-span-2 card p-4">
					<div class="flex mb-4">
						<div class="flex-1">
							<p class="sm-text font-bold">Informasi Personal</p>
						</div>
						<div class="flex-1 text-right">
							<button @click="toggleModals(true, 'editInfo')" class="btn rounded-sm font-bold py-1 px-4 bg-primaryBtn text-white xs-text">Edit</button>
						</div>
					</div>
					
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Jeff Benzos' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ '317500482642819' }}
						</p>
					</div>
					
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Tempat/ Tgl Lahir <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Jakarta/ 29 Agustus 2020' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Jenis Kelamin <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Laki-laki' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Golongan Darah <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'O' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Alamat <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Jl. Raya No. 101' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">RT/RW <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ '004/05' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Kelurahan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Kalibata' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Kecamatan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Pancoran' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Agama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Islam' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Status Pernikahan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Kawin' }}
						</p>
					</div>
					
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Kewarganegaraan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Indonesia' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ '081199988777' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'jeff@afterpay.com' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor NPWP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ '99.999.999.9-999.999' }}
						</p>
					</div>

					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Penghasilan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">
							{{ 'Lebih dari Rp20.000.000' }}
						</p>
					</div>

					<!-- <div class="text-right flex mt-4">
						<div class="flex-1"></div>
						<div class="flex-1">
							<button class="btn w-full rounded-md font-bold py-2 bg-primaryBtn text-white xs-text">Edit</button>
						</div>
					</div>

					<div v-if="isEditInfoShow" class="flex mt-4">
						<div class="flex-1 text-center">
							<button class="btn w-full rounded-md font-bold py-2 bg-closeBtn text-white xs-text">Cancel</button>
						</div>
						<div class="flex-1 text-center">
							<button class="btn w-full rounded-md font-bold py-2 bg-successBtn text-white xs-text">Update</button>
						</div>
					</div> -->

				</div>
				<div class="card p-4">
					<div class="flex mb-3">
						<div class="flex-1">
							<p class="sm-text font-bold mb-3">Total Transaksi</p>
							<p class="xl-text font-bold">{{ '18' }}</p>
						</div>
						<div class="flex-1 text-right">
							<a href="#" @click="toggleModals(true, 'transactions')" class="text-violet xxs-text font-bold">Lihat Detail</a>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Completed</p>
							<p class="xxs-text text-gray-700 mb-3">Finshed 4th payment</p>
							<p class="lg-text">{{ '6' }}</p>
						</div>
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Completed</p>
							<p class="xxs-text text-gray-700 mb-3">Unpaid on track</p>
							<p class="lg-text">{{ '2' }}</p>
						</div>
					</div>

					<div class="flex">
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Completed</p>
							<p class="xxs-text text-gray-700 mb-3">Finshed 4th payment</p>
							<p class="lg-text">{{ '6' }}</p>
						</div>
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Completed</p>
							<p class="xxs-text text-gray-700 mb-3">Unpaid on track</p>
							<p class="lg-text">{{ '2' }}</p>
						</div>
					</div>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Limit</p>

					<div class="flex mb-4">
						<div class="flex-2">
							<label class="xs-text font-bold mb-5 block">Pengajuan Limit baru</label>
							<p class="xl-text text-violet font-bold">{{ '5000000' | currency }}</p>
						</div>
						<div class="flex-1">
							<label class="xs-text font-bold mb-3 block">Waktu Request</label>
							
							<div class="flex items-center mb-2">
								<div class="w-5 mr-2">
									<img :src="'../assets/img/calendar-icon.png'" class="w-full block" alt="">
								</div>
								<div class="flex-1 sm-text">
									{{ new Date( ) | moment("DD MMM YYYY") }}
								</div>
							</div>
							<div class="flex items-center">
								<div class="w-5 mr-2">
									<img :src="'../assets/img/clock-icon.png'" class="w-full block" alt="">
								</div>
								<div class="flex-1 sm-text">
									{{ new Date( ) | moment("HH:MM:SS") }} WIB
								</div>
							</div>
						</div>
					</div>

					<p class="xs-text font-bold mb-4">Riwayat Limit</p>

					<div class="flex xs-text mb-2">
						<label class="text-gray-500 w-32">Limit Sekarang</label>
						<p class="flex-1">
							<span class="mr-2">:</span>
							{{ '2000000' | currency }}
						</p>
					</div>

					<div class="flex xs-text mb-2">
						<label class="text-gray-500 w-32">Outstanding</label>
						<p class="flex-1">
							<span class="mr-2">:</span>
							{{ '500000' | currency }}
						</p>
					</div>

					<div class="flex xs-text mb-2">
						<label class="text-gray-500 w-32">Sisa Limit</label>
						<p class="flex-1">
							<span class="mr-2">:</span>
							{{ '1500000' | currency }}
						</p>
					</div>
				</div>
				<div class="card p-4 flex flex-col">
					<p class="sm-text font-bold mb-4">Data Dokumen</p>

					<div class="flex mb-3 items-center">
						<label for="" class="flex-none font-bold xs-text mr-3">Validasi KTP</label>
						<div class="">
							<div class="rounded-2xl bg-successBtn px-4 py-2 xxs-text text-white">
								<font-awesome-icon 
									:icon="['fas', true ? 'check' : 'times']" 
									class="mr-2" 
								/>
								Found - Match
							</div>
						</div>
					</div>

					<div class="flex flex-1">
						<div class="flex-1 flex flex-col mr-1">
							<p class="sm-text font-bold mb-3">Foto KTP</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<!-- style="background-image: url('https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg');background-size: cover;" -->
								<img 
									:src="'https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
						<div class="flex-1 flex flex-col mx-2">
							<p class="sm-text font-bold mb-3">Selfie KTP</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<img 
									:src="'/assets/img/no-image.png'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
						<div class="flex-1 flex flex-col mx-2">
							<p class="sm-text font-bold mb-3">Foto NPWP</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<img 
									:src="'/assets/img/no-image.png'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
						<div class="flex-1 flex flex-col ml-1">
							<p class="sm-text font-bold mb-3">Slip Gaji</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<img 
									:src="'https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
					</div>

					<!-- <div class="grid grid-cols-4">
						<div v-for="list in 4" :key="list.index" class="">
							<p class="sm-text font-bold mb-3">Foto KTP</p>
							<img :src="'https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg'" class="rounded-lg border" alt="">
						</div>
					</div> -->
				</div>
				<div class="row-span-2 card p-4">
					<p class="sm-text font-bold mb-4">AFPI</p>

					<div class="flex border-b-2 mb-2 pb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Income</p>
							<p class="xs-text">{{ '550000000' | currency }}</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Limit</p>
							<p class="xs-text">{{ '550000000' | currency }}</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total number of loan</p>
							<p class="xs-text">n/a</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total amount of loan</p>
							<p class="xs-text">n/a</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total paid</p>
							<p class="xs-text">n/a</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total outstanding</p>
							<p class="xs-text">n/a</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total default</p>
							<p class="xs-text">n/a</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Current Capacity</p>
							<p class="xs-text">n/a</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Default Rate</p>
							<p class="xs-text">n/a</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total default (6 Months)</p>
							<p class="xs-text">n/a</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Max DPD</p>
							<p class="xs-text">n/a</p>
						</div>
						<div class="flex-1">
							<img :src="'../assets/img/afpi.png'" class="h-2/5 mt-2" alt="">
						</div>
					</div>
				</div>
				<div class="card p-4 max-h-93px 2xl:max-h-none flex flex-col">
					<p class="sm-text font-bold mb-2">Komentar</p>
					<button @click="toggleModals(true, 'comment')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold px-8 flex-1 shadow">Lihat & Komentar disini</button>
				</div>
				<div class="flex max-h-93px 2xl:max-h-none">
					<div class="card flex-2 mr-1.5 p-4  flex flex-col">
						<p class="sm-text font-bold mb-2">Email</p>
						<button @click="toggleModals(true, 'email')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold px-8 flex-1 shadow">Detail</button>
					</div>

					<div class="card flex-4 ml-1.5 relative">
						<p class="sm-text font-bold mb-2 absolute top-4 left-4 z-10">Lokasi</p>

						<GmapMap
							:center="{
								lat: -6.24072456693954,
								lng: 106.804145698369
							}"
							:zoom="10"
							style="height: 100%; border-radius: 12px;overflow: hidden;"
						>
							<GmapMarker
									:position="{
										lat: -6.24072456693954,
										lng: 106.804145698369
									}"
								/>
						</GmapMap>
					</div>
				</div>
			</div>
		</div>

		<div class="btn-options-wrapper flex items-center px-4 h-14 bg-white shadow-lg-reverse absolute w-full bottom-0 left-0">
			<div class="flex-none mr-10">
				<a href="#" @click="$router.go(-1)" class="text-violet xs-text font-bold flex items-center">
					<img :src="'../assets/img/blue-arrow-left.png'" alt="" class="w-5 mr-2">
					Kembali ke list
				</a>
			</div>

			<div v-if="true" class="flex-1 text-right">
				<button @click="toggleModals(true, 'process', 'reject')" class="btn ml-4 px-5 py-2 w-28 text-xs text-white rounded-md font-bold bg-dangerBtn">
					Reject
				</button>
				<button @click="toggleModals(true, 'process', 'approve-w-limit')" class="btn ml-4 px-5 py-2 w-52 text-xs text-white rounded-md font-bold bg-primaryBtn">
					Approve dengan limit lain
				</button>
				<button @click="toggleModals(true, 'process', 'approve')" class="btn ml-4 px-5 py-2 w-52 text-xs text-white rounded-md font-bold bg-successBtn">
					Approve
				</button>
			</div>

			<div v-if="false" class="flex-1 flex items-center">
				<div class="flex-1 flex truncate">
					<label class="flex-none mr-3 mb-0 sm-text">
						<b>
							Alasan :
						</b>
					</label>
					<div class="flex-auto mr-2 truncate sm-text">
						{{ 'Lorem Ipsum' }}
						<!-- {{ userDetails.reason ? userDetails.reason : '---' }} -->
					</div>
				</div>

				<div class="flex-none flex justify-end items-center ml-3">
					<label class="mr-3 mb-0 sm-text">
						<b>
							Di {{ false ? 'Reject' : 'Approve' }} oleh :
						</b>
					</label>
					<div class="mr-2 sm-text">
						{{ 'Lorem Ipsum' }}
						<!-- {{ userDetails.sideDetails && userDetails.sideDetails.name ? userDetails.sideDetails.name : '---' }} -->
					</div>
				</div>
				<div class="flex-none flex justify-end items-center border-l pl-3 ml-3 ">
					<label for="" class="mr-3 font-bold sm-text">
						Waktu di {{ false ? 'Reject' : 'Approve' }} :
					</label>
					<div class="flex mr-2 items-center">
						<div class="img-icon w-5 mr-3">
							<img :src="'../assets/img/calendar-icon.png'" class="w-full block align-middle" alt="">
						</div>
						<div class="flex-1 sm-text">
							{{ new Date( ) | moment("DD MMM YYYY") }}
						</div>
					</div>
					<div class="flex items-center">
						<div class="img-icon w-5 mr-3">
							<img :src="'../assets/img/clock-icon.png'" class="w-full block align-middle" alt="">
						</div>
						<div class="flex-1 sm-text">
							{{ new Date( ) | moment("HH:mm:SS") }} WIB
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Edit Personal Information Modal -->
		<Modal 
			v-model="isEditInfoModalShow" 
			title="Edit Personal Information"
			modal-class="modal-wrapper w-5/10 max-w-none"
		>
			<EditInformationModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Comments Section Modal -->
		<Modal 
			v-model="isCommentModalShow" 
			title="Komentar"
			modal-class="modal-wrapper"
		>
			<CommentsModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>


		<!-- Email Modal -->
		<Modal 
			v-model="isEmailModalShow" 
			title="Email"
			modal-class="modal-wrapper"
		>
		</Modal>


		<!-- Transaction List Modal -->
		<Modal 
			v-model="isTransModalShow" 
			title="List Transaksi"
			modal-class="modal-wrapper max-w-none w-9/10"
		>
			<TransactionsModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>


		<!-- Approve/Reject Confirmation Modal -->
		<Modal 
			v-model="isProcessModalShow" 
			:title="confirmTitle"
			modal-class="modal-wrapper"
		>
			<RequestConfirmModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import UserVerificationDetails from './function.vue'
	export default UserVerificationDetails
</script>