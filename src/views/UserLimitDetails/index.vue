<template>
	<div class="verification-details-container relative">
		<Loader v-if="loader.isShow" :message="loader.message"/>

		<div class="verification-details-content p-4">
			<div class="grid details-grid gap-3 h-full w-full">
				<div class="row-span-2 card p-4">
					<div class="flex mb-4">
						<div class="flex-1 flex items-center">
							<p class="sm-text font-bold mr-5">Informasi Personal</p>
							<InsideSpinner v-if="!limitDetails.hasOwnProperty('sideDetails')" :options="{width: '15px', height: '15px',}" />
						</div>
						<div class="flex-1 text-right">
							<button @click="toggleModals(true, 'editInfo')" class="btn rounded-sm font-bold py-1 px-4 text-violet xs-text">Edit</button>
						</div>
					</div>
					
					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.name : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.idNumber : '---' }}
						</p>
					</div>
					
					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Tempat/ Tgl Lahir <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.birthPlaceBirthday : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Jenis Kelamin <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.gender : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Golongan Darah <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.bloodType : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Alamat <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.address : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">RT/RW <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.rtrw : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Kelurahan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.village : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Kecamatan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.district : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Agama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.religion : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Status Pernikahan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.maritalStatus : '---' }}
						</p>
					</div>
					
					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Kewarganegaraan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.sideDetails ? limitDetails.sideDetails.nationality : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.otherDetails ? limitDetails.otherDetails.mobileNumber : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.otherDetails ? limitDetails.otherDetails.detail.email : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Nomor NPWP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ limitDetails.otherDetails ? limitDetails.otherDetails.npwp : '---' }}
						</p>
					</div>

					<div class="flex xs-text mb-2.5">
						<label class="text-gray-500 flex-3 relative">Penghasilan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-5">
							{{ '---' }}
						</p>
					</div>

				</div>
				<div class="card p-4">
					<div class="flex mb-3">
						<div class="flex-1">
							<p class="sm-text font-bold mb-3 flex items-center">
								<span class="mr-3">Total Transaksi</span>
								<InsideSpinner v-if="!limitDetails.hasOwnProperty('transactionDetails')" :options="{width: '15px', height: '15px',}" />
							</p>
							<p class="xl-text font-bold">{{ limitDetails.transactionDetails ? (limitDetails.transactionDetails.total) : '---' }}</p>
						</div>
						<div class="flex-1 text-right">
							<a href="#" @click.prevent="toggleModals(true, 'transactions')" class="text-violet xxs-text font-bold">Lihat Detail</a>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Completed</p>
							<p class="xxs-text text-gray-700 mb-3">Finshed 4th payment</p>
							<p class="lg-text">{{ limitDetails.transactionDetails ? limitDetails.transactionDetails.completed : '---' }}</p>
						</div>
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Ongoing</p>
							<p class="xxs-text text-gray-700 mb-3">Unpaid on track</p>
							<p class="lg-text">{{ limitDetails.transactionDetails ? limitDetails.transactionDetails.ongoing : '---' }}</p>
						</div>
					</div>

					<div class="flex">
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Late Payment</p>
							<p class="xxs-text text-gray-700 mb-3">Late but paid</p>
							<p class="lg-text">{{ limitDetails.transactionDetails ? limitDetails.transactionDetails.latePayment : '---' }}</p>
						</div>
						<div class="flex-1">
							<p class="sm-text font-bold mb-1">Overdue</p>
							<p class="xxs-text text-gray-700 mb-3">Late but not paid</p>
							<p class="lg-text">{{ limitDetails.transactionDetails ? limitDetails.transactionDetails.overdue : '---' }}</p>
						</div>
					</div>
				</div>
				<div class="card p-4">
					<p class="sm-text font-bold mb-4">Limit</p>

					<div class="flex mb-4">
						<div class="flex-2">
							<label class="xs-text font-bold mb-5 block">Pengajuan Limit baru</label>
							<p class="xl-text text-violet font-bold">{{ limitDetails.creditNew | currency }}</p>
						</div>
						<div class="flex-1">
							<label class="xs-text font-bold mb-3 block">Waktu Request</label>
							
							<div class="flex items-center mb-2">
								<div class="w-5 mr-2">
									<img :src="'../assets/img/calendar-icon.png'" class="w-full block" alt="">
								</div>
								<div class="flex-1 sm-text">
									{{ limitDetails.createdAt | moment("DD MMM YYYY") }}
								</div>
							</div>
							<div class="flex items-center">
								<div class="w-5 mr-2">
									<img :src="'../assets/img/clock-icon.png'" class="w-full block" alt="">
								</div>
								<div class="flex-1 sm-text">
									{{ limitDetails.createdAt | moment("HH:MM:SS") }} WIB
								</div>
							</div>
						</div>
					</div>

					<p class="xs-text font-bold mb-4">Riwayat Limit</p>

					<div class="flex xs-text mb-2">
						<label class="text-gray-500 w-32">Limit Sekarang</label>
						<p class="flex-1">
							<span class="mr-2">:</span>
							{{ limitDetails.user ? limitDetails.user.credit : '---' | currency }}
						</p>
					</div>

					<div class="flex xs-text mb-2">
						<label class="text-gray-500 w-32">Outstanding</label>
						<p class="flex-1">
							<span class="mr-2">:</span>
							{{ limitDetails.user ? (limitDetails.user.credit - limitDetails.user.remainingCredit) : '---' | currency }}
						</p>
					</div>

					<div class="flex xs-text mb-2">
						<label class="text-gray-500 w-32">Sisa Limit</label>
						<p class="flex-1">
							<span class="mr-2">:</span>
							{{ limitDetails.user ? limitDetails.user.remainingCredit : '---' | currency }}
						</p>
					</div>
				</div>
				<div class="card p-4 flex flex-col">
					<p class="sm-text font-bold mb-4 flex items-center">
						<span class="mr-3">Data Dokumen</span>
						<InsideSpinner v-if="!limitDetails.hasOwnProperty('imageDocs')" :options="{width: '15px', height: '15px',}" />
					</p>

					<div class="flex mb-3 items-center">
						<label for="" class="flex-none font-bold xs-text mr-3">Validasi KTP</label>
						<div class="">
							<div 
								class="rounded-2xl bg-successBtn px-4 py-2 xxs-text text-white"
								:class="{
									'bg-successBtn' : limitDetails.imageDocs && limitDetails.imageDocs.ktp.image != null,
									'bg-dangerBtn' : limitDetails.imageDocs && limitDetails.imageDocs.ktp.image == null,
								}"
							>
								<font-awesome-icon 
									:icon="['fas', limitDetails.imageDocs && limitDetails.imageDocs.ktp.image != null ? 'check' : 'times']" 
									class="mr-2" 
								/>
								{{ limitDetails.imageDocs && limitDetails.imageDocs.ktp.image != null ? 'Found - Match' : 'No Record' }}
								
							</div>
						</div>
					</div>

					<div class="flex flex-1">
						<div class="flex-1 flex flex-col mr-1">
							<p class="sm-text font-bold mb-3">Foto KTP</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<!-- style="background-image: url('https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg');background-size: cover;" -->
								<img 
									:src="limitDetails.imageDocs && limitDetails.imageDocs.ktp.image || '/assets/img/no-image.png'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
						<div class="flex-1 flex flex-col mx-2">
							<p class="sm-text font-bold mb-3">Selfie KTP</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<img 
									:src="limitDetails.otherDetails && limitDetails.otherDetails.selfie || '/assets/img/no-image.png'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
						<div class="flex-1 flex flex-col mx-2">
							<p class="sm-text font-bold mb-3">Foto NPWP</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<img 
									:src="limitDetails.imageDocs && limitDetails.imageDocs.npwpImage || '/assets/img/no-image.png'" 
									class="rounded-lg absolute" alt=""
								>
							</div>
						</div>
						<div class="flex-1 flex flex-col ml-1">
							<p class="sm-text font-bold mb-3">Slip Gaji</p>
							<div v-viewer="{}" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
								<img 
									:src="limitDetails.imageDocs && limitDetails.imageDocs.slip.image || '/assets/img/no-image.png'" 
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
					<p class="sm-text font-bold mb-4 flex items-center">
						<span class="mr-3">AFPI</span>
						<InsideSpinner v-if="!responseAFPI.hasOwnProperty('income')" :options="{width: '15px', height: '15px',}" />
					</p>

					<div class="flex border-b-2 mb-2 pb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Income</p>
							<p class="xs-text">{{ (responseAFPI.income ? (responseAFPI.income) : 0) | currency }}</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Limit</p>
							<p class="xs-text">{{ limitDetails.user ? limitDetails.user.remainingCredit : '---' | currency }}</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total number of loan</p>
							<p class="xs-text">{{ (responseAFPI.numloan ? (responseAFPI.numloan) : 0) }}</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total amount of loan</p>
							<p class="xs-text">{{ (responseAFPI.totloan ? responseAFPI.totloan : 0) | currency }}</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total paid</p>
							<p class="xs-text">{{ (responseAFPI.totpaid ? responseAFPI.totpaid : 0) | currency }}</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total outstanding</p>
							<p class="xs-text">{{ (responseAFPI.totout ? responseAFPI.totout : 0) | currency }}</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total default</p>
							<p class="xs-text">{{ (responseAFPI.totdefault ? responseAFPI.totdefault : 0 ) | currency }}</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Current Capacity</p>
							<p class="xs-text">{{ ( responseAFPI.totout ? ((responseAFPI.totout / responseAFPI.income) * 100) : 0 ).toFixed(2) + '%' }}</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Default Rate</p>
							<p class="xs-text">{{ responseAFPI.defrate ? parseFloat(responseAFPI.defrate).toFixed(2) : 0 + '%' }}</p>
						</div>
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Total default (6 Months)</p>
							<p class="xs-text">{{ '---' }}</p>
						</div>
					</div>

					<div class="flex mb-2">
						<div class="flex-1">
							<p class="text-gray-600 xs-text mb-1">Max DPD</p>
							<p class="xs-text">{{ '---' }}</p>
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
								lat: parseFloat(limitDetails.otherDetails && limitDetails.otherDetails.registrationLoc ? limitDetails.otherDetails.registrationLoc.coordinates[1] : 0),
								lng: parseFloat(limitDetails.otherDetails && limitDetails.otherDetails.registrationLoc ? limitDetails.otherDetails.registrationLoc.coordinates[0] : 0)
							}"
							:zoom="10"
							style="height: 100%; border-radius: 12px;overflow: hidden;"
						>
							<GmapMarker
									:position="{
										lat: parseFloat(limitDetails.otherDetails && limitDetails.otherDetails.registrationLoc ? limitDetails.otherDetails.registrationLoc.coordinates[1] : 0),
										lng: parseFloat(limitDetails.otherDetails && limitDetails.otherDetails.registrationLoc ? limitDetails.otherDetails.registrationLoc.coordinates[0] : 0)
									}"
								/>
						</GmapMap>
					</div>
				</div>
			</div>
		</div>

		<div class="btn-options-wrapper flex items-center px-4 h-14 bg-white shadow-lg-reverse absolute w-full bottom-0 left-0">
			<div class="flex-none mr-10">
				<a href="#" @click.prevent="$router.go(-1)" class="text-violet xs-text font-bold flex items-center">
					<img :src="'../assets/img/blue-arrow-left.png'" alt="" class="w-5 mr-2">
					Kembali ke list
				</a>
			</div>

			<!-- v-if="limitDetails.status == 0"  -->
			<div v-if="limitDetails.status == 0" class="flex-1 text-right">
				<button @click="toggleModals(true, 'process', 'reject')" class="btn ml-4 px-5 py-2 w-28 2xl:w-36 xs-text text-white rounded-md font-bold bg-dangerBtn">
					Reject
				</button>
				<button @click="toggleModals(true, 'process', 'approve-w-limit')" class="btn ml-4 px-5 py-2 w-52 2xl:w-64 xs-text text-white rounded-md font-bold bg-primaryBtn">
					Approve dengan limit lain
				</button>
				<button @click="toggleModals(true, 'process', 'approve')" class="btn ml-4 px-5 py-2 w-52 2xl:w-64 xs-text text-white rounded-md font-bold bg-successBtn">
					Approve
				</button>
			</div>
			<!-- v-if="limitDetails.status != 0"  -->
			<div v-if="limitDetails.status != 0" class="flex-1 flex items-center">
				<div class="flex-1 flex truncate">
					<label class="flex-none mr-3 mb-0 sm-text">
						<b>
							Alasan :
						</b>
					</label>
					<div class="flex-auto mr-2 truncate sm-text">
						{{ limitDetails.reason ? limitDetails.reason : '---' }}
					</div>
				</div>

				<div class="flex-none flex justify-end items-center ml-3">
					<label class="mr-3 mb-0 sm-text">
						<b>
							Di {{ limitDetails.status == 4 ? 'Reject' : 'Approve' }} oleh :
						</b>
					</label>
					<div class="mr-2 sm-text">
						{{ limitDetails.admin ? limitDetails.admin : '---' }}
					</div>
				</div>
				<div class="flex-none flex justify-end items-center border-l pl-3 ml-3 ">
					<label for="" class="mr-3 font-bold sm-text">
						Waktu di {{ limitDetails.status == 4 ? 'Reject' : 'Approve' }} :
					</label>
					<div class="flex mr-2 items-center">
						<div class="img-icon w-5 mr-3">
							<img :src="'../assets/img/calendar-icon.png'" class="w-full block align-middle" alt="">
						</div>
						<div class="flex-1 sm-text">
							{{ limitDetails.updatedAt | moment("DD MMM YYYY") }}
						</div>
					</div>
					<div class="flex items-center">
						<div class="img-icon w-5 mr-3">
							<img :src="'../assets/img/clock-icon.png'" class="w-full block align-middle" alt="">
						</div>
						<div class="flex-1 sm-text">
							{{ limitDetails.updatedAt | moment("HH:mm:SS") }} WIB
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
			<EditInformationModal :user="limitDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Comments Section Modal -->
		<Modal 
			v-model="isCommentModalShow" 
			title="Komentar"
			modal-class="modal-wrapper"
		>
			<CommentsModal :user="limitDetails" :admin="adminData" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>


		<!-- Email Modal -->
		<Modal 
			v-model="isEmailModalShow" 
			title="Email"
			modal-class="modal-wrapper"
		>
			<EmailModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>


		<!-- Transaction List Modal -->
		<Modal 
			v-model="isTransModalShow" 
			title="List Transaksi"
			modal-class="modal-wrapper max-w-none w-9/10"
		>
			<TransactionsModal :user="limitDetails.user" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>


		<!-- Approve/Reject Confirmation Modal -->
		<Modal 
			v-model="isProcessModalShow" 
			:title="confirmTitle"
			modal-class="modal-wrapper"
		>
			<RequestConfirmModal :limitDetails="limitDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import UserLimitDetails from './function.vue'
	export default UserLimitDetails
</script>