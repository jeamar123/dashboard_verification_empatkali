<template>
	<div class="h-full">

		<div class="verification-details-content p-4">
			<div class="grid details-grid gap-3 h-full w-full">
				<div class="card p-4 relative">
					<div class="corner-status absolute right-0 top-0 bg-v-status-rejected px-6 py-1 text-white font-bold xs-text rounded-tr-xl rounded-bl-xl">
						Rejected
					</div>
					<div class="flex mb-3 flex items-center">
						<p class="sm-text font-bold mr-3">Data Pribadi</p>
						<InsideSpinner v-if="!userDetails.hasOwnProperty('detail')" :options="{width: '15px', height: '15px',}"  />
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">{{ userDetails.detail ? userDetails.detail.name : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.mobileNumber ? userDetails.mobileNumber : '---' }}</p>
					</div>
					<div class="flex items-center xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
						<div class="flex-4 flex items-center">
							<p>{{ userDetails.detail ? userDetails.detail.email : '---' }}</p>
							<img v-if="userDetails.emailVerified" :src="'../../assets/img/secure.png'" class="w-4 ml-3" alt="">
						</div>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.nik ? userDetails.nik : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Usia <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{  new Date() | moment('diff', userDetails.detail ? ( userDetails.detail.birthdate ) : new Date() , 'years') }} tahun</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Pekerjaan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.detail ? userDetails.detail.pekerjaan : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Industri <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.detail ? userDetails.detail.industri : '---' }}</p>
					</div>
					<div class="flex xs-text">
						<label class="text-gray-500 flex-3 relative">Penghasilan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.detail ? userDetails.detail.penghasilan : '---' }}</p>
					</div>
				</div>
				<div class="card p-4 relative">
					<div class="corner-status absolute right-0 top-0 bdg-status--blacklist px-6 py-1 text-white font-bold xs-text rounded-tr-xl rounded-bl-xl">
						Blacklist <img @click="toggleModals(true, 'blacklist')" :src="'../../assets/img/info-white.png'" class="h-3 ml-2 cursor-pointer relative" alt="" style="top: -1px;">
					</div>
					<div class="flex mb-3">
						<p class="sm-text font-bold mr-3">Di cek oleh sistem</p>
						<InsideSpinner v-if="!userDetails.hasOwnProperty('npwp')" :options="{width: '15px', height: '15px',}"  />
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">NPWP <span class="absolute top-0 right-3 font-bold">:</span></label>
						<p class="font-bold flex-1">{{ userDetails.npwp ? userDetails.npwp : '---' }}</p>
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">Input NIK sama dengan NIK OCR <span class="absolute top-0 right-3 font-bold">:</span></label>
						<div class="flex-1">
							<div 
								class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
								:class="{
									'bdg-status--success' : true,
									'bdg-status--warning' : false,
									'bdg-status--danger' : false,
								}"
							>
								{{ 'No' }}
							</div>
						</div>
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">Terdaftar sebagai Kontak Darurat user lain <span class="absolute top-0 right-3 font-bold">:</span></label>
						<div class="flex-1">
							<div 
								class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
								:class="{
									'bdg-status--success' : false,
									'bdg-status--warning' : false,
									'bdg-status--danger' : true,
								}"
							>
								{{ userDetails.isUsedAsEmergencyContact && userDetails.isUsedAsEmergencyContact.length > 0 ? 'Yes' : 'No' }}
							</div>
							<img :src="'../../assets/img/info-circle-violet.png'" class="w-4 ml-3 cursor-pointer" @click="toggleModals(true, 'emergencyContact')" alt="">
						</div>
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">User Tele ID <span class="absolute top-0 right-3 font-bold">:</span></label>
						<p class="flex-1">{{ 'Busy Line' }}</p>
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">Nomor HP sama dengan Kontak Darurat <span class="absolute top-0 right-3 font-bold">:</span></label>
						<div class="flex-1">
							<div 
								class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
								:class="{
									'bdg-status--success' : true,
									'bdg-status--warning' : false,
									'bdg-status--danger' : false,
								}"
							>
								{{ userDetails.emergencyContact && userDetails.mobileNumber == userDetails.emergencyContact.mobileNumber ? 'Yes' : 'No' }}
							</div>
						</div>
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">Total Pinjaman 3 bulan terakhir <span class="absolute top-0 right-3 font-bold">:</span></label>
						<div class="flex-1">
							<div 
								class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
								:class="{
									'bdg-status--success' : false,
									'bdg-status--warning' : true,
									'bdg-status--danger' : false,
								}"
							>
								{{ 'No' }}
							</div>
						</div>
					</div>
					<div class="flex xs-text items-center mb-2">
						<label class="text-gray-500 flex-2 relative">Trusting Social <span class="absolute top-0 right-3 font-bold">:</span></label>
						<div class="flex-1">
							<div 
								class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
								:class="{
									'bdg-status--success' : true,
									'bdg-status--warning' : false,
									'bdg-status--danger' : false,
								}"
							>
								{{ '0' }}
							</div>
						</div>
					</div>
				</div>
				<div class="row-span-2 flex flex-col">
					<div class="flex flex-3">
						<div class="flex flex-col flex-5 mr-2">
							<div class="card px-4 py-3 flex-1 flex flex-col">
								<p class="sm-text font-bold mb-2">Validasi KTP</p>

								<div 
									class="count-badge rounded-2xl px-5 py-2 text-center w-full inline-block text-white font-bold xs-text mb-3"
									:class="{
										'bdg-status--success' : userDetails.ktp && userDetails.ktp.image != null,
										'bdg-status--warning' : false,
										'bdg-status--danger' : userDetails.ktp && userDetails.ktp.image == null,
									}"
								>
									<font-awesome-icon 
										:icon="['fas', userDetails.ktp && userDetails.ktp.image != null ? 'check' : 'times']" 
										class="mr-1" 
									/>
									{{ userDetails.ktp && userDetails.ktp.image != null ? 'Found - Match' : 'No Record' }}
								</div>

								<div class="flex flex-1 mb-2">
									<div class="flex-1 flex flex-col mr-1">
										<p class="xs-text font-bold mb-3">Foto KTP</p>
										<div @click="toggleModals(true, 'fotoKtp')" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
											<!-- style="background-image: url('https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg');background-size: cover;" -->
											<img 
												:src="userDetails.ktp ? userDetails.ktp.image : '/assets/img/no-image.png'" 
												class="rounded-lg absolute object-cover w-full" alt=""
											>
										</div>
									</div>
									<div class="flex-1 flex flex-col ml-1">
										<p class="xs-text font-bold mb-3">Selfie KTP</p>
										<div @click="toggleModals(true, 'selfieKtp')" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
											<img 
												:src="userDetails.selfie || '/assets/img/no-image.png'" 
												class="rounded-lg absolute object-cover w-full" alt=""
											>
										</div>
									</div>
								</div>

								<button @click="toggleModals(true, 'compareKTP')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold flex-none shadow py-2">Bandingkan</button>
							</div>
							
						</div>
						<div class="flex flex-col flex-3 ml-1">
							<div class="card px-4 py-3 mb-2 flex-2">
								<p class="xs-text font-bold mb-2">Waktu Daftar</p>

								<div class="flex items-center mb-2">
									<div class="w-5 mr-2">
										<img :src="'../../assets/img/calendar-icon.png'" class="w-full block" alt="">
									</div>
									<div class="flex-1 xs-text">
										{{ userDetails.createdAt | moment("DD MMM YYYY") }}
									</div>
								</div>
								<div class="flex items-center">
									<div class="w-5 mr-2">
										<img :src="'../../assets/img/clock-icon.png'" class="w-full block" alt="">
									</div>
									<div class="flex-1 xs-text">
										{{ userDetails.createdAt | moment("HH:MM:SS") }} WIB
									</div>
								</div>
							</div>
							<div class="card p-4 mt-1 flex-2">
								<p class="xs-text font-bold mb-2">Metode Pembayaran</p>
								<img :src="'../../assets/img/visa.png'" class="w-14 block mb-2" alt="">
								<button @click="toggleModals(true, 'paymentMethod')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold flex-1 shadow py-2">Info Lainnya</button>
							</div>
						</div>
					</div>
					<div class="card p-4 mt-3 flex-4">
						<p class="sm-text font-bold mb-3 flex items-center">
							<span class="mr-3">AFPI</span>
							<InsideSpinner v-if="!responseAFPI.hasOwnProperty('income')" :options="{width: '15px', height: '15px',}"  />
						</p>

						<div class="flex border-b-2 mb-2 pb-2">
							<div class="flex-1">
								<p class="text-gray-600 xs-text mb-1">Income</p>
								<p class="xs-text">{{ (responseAFPI.income ? (responseAFPI.income) : 0) | currency }}</p>
							</div>
							<div class="flex-1">
								<p class="text-gray-600 xs-text mb-1">Limit</p>
								<p class="xs-text">{{ userDetails.remainingCredit | currency }}</p>
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
								<img :src="'../../assets/img/afpi.png'" class="h-2/5 mt-2" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="card p-4 relative flex-1">
					<div class="flex mb-3">
						<div class="flex-1 flex items-center">
							<p class="sm-text font-bold mr-5">OCR</p>
							<InsideSpinner v-if="!userDetails.hasOwnProperty('ocrData')" :options="{width: '15px', height: '15px',}"  />
						</div>
						<div class="flex-1 text-right">
							<button @click="toggleModals(true, 'editInfo')" class="btn rounded-sm font-bold py-1 px-4 text-violet xs-text">Edit</button>
						</div>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="font-bold flex-4">{{ userDetails.ocrData && userDetails.ocrData.idNumber ? userDetails.ocrData.idNumber : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Tempat/ Tanggal Lahir <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.birthPlaceBirthday ? userDetails.ocrData.birthPlaceBirthday : '---' }}</p>
					</div>
					<div class="flex items-center xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Jenis Kelamin <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.gender ? userDetails.ocrData.gender : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Alamat <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.address ? userDetails.ocrData.address : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">RT/RW <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.rtrw ? userDetails.ocrData.rtrw : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Kelurahan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.village ? userDetails.ocrData.village : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Kecamatan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.district ? userDetails.ocrData.district : '---' }}</p>
					</div>
					<div class="flex xs-text mb-3">
						<label class="text-gray-500 flex-3 relative">Provinsi <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.province ? userDetails.ocrData.province : '---' }}</p>
					</div>
					<div class="flex xs-text">
						<label class="text-gray-500 flex-3 relative">Status Perkawinan <span class="absolute top-0 right-2 font-bold">:</span></label>
						<p class="flex-4">{{ userDetails.ocrData && userDetails.ocrData.maritalStatus ? userDetails.ocrData.maritalStatus : '---' }}</p>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="flex flex-3 mb-3">
						<div class="card px-4 py-3 mr-1 flex-1">
							<p class="sm-text font-bold mb-3">Date E-Wallet Lainnya</p>
							<div class="flex xs-text mb-3">
								<label class="text-gray-500 flex-3 relative">Gopay <span class="absolute top-0 right-2 font-bold">:</span></label>
								<p class="flex-4">{{ true ? '---' : 'Jeff Benzos(Verified)' }}</p>
							</div>
							<div class="flex xs-text mb-3">
								<label class="text-gray-500 flex-3 relative">OVO <span class="absolute top-0 right-2 font-bold">:</span></label>
								<p class="flex-4">{{ true ? '---' : 'J**f B****s' }}</p>
							</div>
							<div class="flex xs-text">
								<label class="text-gray-500 flex-3 relative">LinkAja <span class="absolute top-0 right-2 font-bold">:</span></label>
								<p class="flex-4">{{ true ? '---' : 'Benzos J' }}</p>
							</div>
						</div>	
						<div class="card px-4 py-3 ml-2 flex-1">
							<p class="sm-text font-bold mb-3">Kontak Darurat</p>
							<div class="flex xs-text mb-3">
								<label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
								<p class="flex-4">{{ true ? '---' : 'Jeff Benzos' }}</p>
							</div>
							<div class="flex xs-text mb-3">
								<label class="text-gray-500 flex-3 relative">Hubungan <span class="absolute top-0 right-2 font-bold">:</span></label>
								<p class="flex-4">{{ true ? '---' : 'Kakak' }}</p>
							</div>
							<div class="flex xs-text mb-3">
								<label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
								<p class="flex-4">{{ true ? '---' : '089977766554' }}</p>
							</div>
							<div class="flex xs-text items-center">
								<label class="text-gray-500 flex-3 relative">4X User <span class="absolute top-0 right-2 font-bold">:</span></label>
								<div class="flex-4">
									<div 
										class="count-badge rounded-2xl px-5 py-1 text-center w-16 inline-block text-white font-bold xs-text"
										:class="{
											'bdg-status--success' : true,
											'bdg-status--warning' : false,
											'bdg-status--danger' : false,
										}"
									>
										{{ 'No' }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-2">
						<div class="flex-1 mr-1">
							<div class="card px-4 py-3 h-full w-full">
								<p class="sm-text font-bold mb-5">Komentar</p>
								<button @click="toggleModals(true, 'comment')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold px-8 py-2 flex-1 shadow">Lihat & Komentar disini</button>
							</div>
						</div>	
						
						<div class="flex flex-1 ml-2 ">
							<div @click.prevent="toggleModals(true, 'location')" class="card mr-1 flex-1 relative outline-none border-none">
								<p class="sm-text font-bold mb-2 absolute top-3 left-4 z-10">Lokasi</p>

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
									<GmapMarker
											:position="{
												lat: -6.24072456693954,
												lng: 106.804145698369
											}"
										/>
								</GmapMap>
							</div>
							<div class="card px-4 py-3 ml-2 flex-1">
								<p class="sm-text font-bold mb-5">Email</p>
								<button @click="toggleModals(true, 'email')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold px-8 py-2 flex-1 shadow">Detail</button>
							</div>
						</div>
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

			<div v-if="false" class="flex-1 text-right">
				<button @click="toggleModals(true, 'process', 'incomplete')" class="btn ml-4 px-5 py-2 w-52 2xl:w-64 xs-text text-white rounded-md font-bold bg-warningBtn">
					Jadikan user Incomplete
				</button>
				<div class="w-5 border-r border-gray-300 h-9 align-middle inline-block"></div>
				<button @click="toggleModals(true, 'process', 'reject')" class="btn ml-4 px-5 py-2 w-28 2xl:w-36 xs-text text-white rounded-md font-bold bg-dangerBtn">
					Reject
				</button>
				<button @click="toggleModals(true, 'process', 'approve')" class="btn ml-4 px-5 py-2 w-52 2xl:w-64 xs-text text-white rounded-md font-bold bg-successBtn">
					Approve
				</button>
			</div>

			<div v-if="true" class="flex-1 flex items-center">
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
							Di {{ true ? 'Reject' : 'Approve' }} oleh :
						</b>
					</label>
					<div class="mr-2 sm-text">
						{{ 'Lorem Ipsum' }}
						<!-- {{ userDetails.sideDetails && userDetails.sideDetails.name ? userDetails.sideDetails.name : '---' }} -->
					</div>
				</div>
				<div class="flex-none flex justify-end items-center border-l pl-3 ml-3 ">
					<label for="" class="mr-3 font-bold sm-text">
						Waktu di {{ true ? 'Reject' : 'Approve' }} :
					</label>
					<div class="flex mr-2 items-center">
						<div class="img-icon w-5 mr-3">
							<img :src="'../../assets/img/calendar-icon.png'" class="w-full block align-middle" alt="">
						</div>
						<div class="flex-1 sm-text">
							{{ new Date( ) | moment("DD MMM YYYY") }}
						</div>
					</div>
					<div class="flex items-center">
						<div class="img-icon w-5 mr-3">
							<img :src="'../../assets/img/clock-icon.png'" class="w-full block align-middle" alt="">
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
			<CommentsModal :user="userDetails" :admin="adminData" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Email Modal -->
		<Modal 
			v-model="isEmailModalShow" 
			title="Email"
			modal-class="modal-wrapper max-w-none w-4/10"
		>
			<EmailModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>
		
		<!-- Emergency Contact Modal -->
		<Modal 
			v-model="isEmergencyContactModalShow" 
			title="Terdaftar sebagai Kontak Darurat user lain"
			modal-class="modal-wrapper max-w-none w-4/10"
		>
			<EmergencyContactModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Payment Method Modal -->
		<Modal 
			v-model="isPaymentMethodModalShow" 
			title="Metode Pembayaran"
			modal-class="modal-wrapper max-w-none w-5/10"
		>
			<PaymentMethodModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Location Modal -->
		<Modal 
			v-model="isLocationModalShow" 
			title="Lokasi"
			modal-class="modal-wrapper max-w-none w-6/10"
		>
			<LocationModal :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>
		
		<!-- Foto KTP Modal -->
		<Modal 
			v-model="isFotoKtpModalShow" 
			title="Foto KTP"
			modal-class="modal-wrapper max-w-none w-125 h-552px"
		>
			<FotoKtpModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Selfie KTP Modal -->
		<Modal 
			v-model="isSelfieKtpModalShow" 
			title="Selfie KTP"
			modal-class="modal-wrapper max-w-none w-125 h-552px"
		>
			<SelfieKtpModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<!-- Compare KTP Modal -->
		<Modal 
			v-model="isCompareKTPModalShow" 
			title=""
			modal-class="modal-wrapper max-w-none w-8/10 h-552px"
		>
			<CompareKTPModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
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