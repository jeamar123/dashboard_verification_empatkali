<template>
	<div class="verification-details-container relative">
		<Loader v-if="loader.isShow" :message="loader.message"/>

		<div class="h-full">

      <div 
        v-if="
          getStatusValue(userDetails.status) == 'active' ||
          getStatusValue(userDetails.status) == 'pending' ||
          getStatusValue(userDetails.status) == 'banned' ||
          getStatusValue(userDetails.status) == 'freeze' ||
          getStatusValue(userDetails.status) == 'approved' ||
          getStatusValue(userDetails.status) == 'rejected'
        " 
        class="verification-details-content p-4"
      >
        <div class="grid details-grid gap-3 h-full w-full">
          <div class="card p-4 relative">
            <div 
              class="corner-status absolute right-0 top-0 px-6 py-1 text-white font-bold xs-text rounded-tr-xl rounded-bl-xl capitalize"
              :class="{
                'bg-v-status-active' : getStatusValue(userDetails.status) == 'active',
                'bg-v-status-pending' : getStatusValue(userDetails.status) == 'pending',
                'bg-v-status-incomplete' : getStatusValue(userDetails.status) == 'incomplete',
                'bg-v-status-banned' : getStatusValue(userDetails.status) == 'banned',
                'bg-v-status-freeze' : getStatusValue(userDetails.status) == 'freeze',
                'bg-v-status-approved' : getStatusValue(userDetails.status) == 'approved',
                'bg-v-status-rejected' : getStatusValue(userDetails.status) == 'rejected',
              }"
            >
              {{ getStatusValue(userDetails.status) }}
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
                <img v-if="userDetails.emailVerified" :src="'../../assets/img/secure.png'" class="w-5 ml-3" alt="">
              </div>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.ktp && userDetails.ktp.number ? userDetails.ktp.number : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Usia <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p v-if="userDetails.detail && userDetails.detail.birthdate" class="flex-4">{{  new Date() | moment('diff', userDetails.detail ? ( userDetails.detail.birthdate ) : new Date() , 'years') }} tahun</p>
              <p v-else class="flex-4">{{ '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Pekerjaan <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4 capitalize">{{ userDetails.detail && userDetails.detail.pekerjaan ? userDetails.detail.pekerjaan.replace('---', ' ') : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Industri <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.detail && userDetails.detail.industri_label ? userDetails.detail.industri_label : '---' }}</p>
            </div>
            <div class="flex xs-text">
              <label class="text-gray-500 flex-3 relative">Penghasilan <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.detail && userDetails.detail.descriptionOfsalary ? userDetails.detail.descriptionOfsalary : '---' }}</p>
            </div>
          </div>
          <div class="card p-4 relative">
            <div v-if="!userDetails.blacklist || (userDetails.blacklist && !userDetails.blacklist.data)" class="corner-status absolute right-0 top-0 bdg-status--info px-6 py-1 text-white font-bold xs-text rounded-tr-xl rounded-bl-xl">
              Clear
            </div>
            <div v-if="userDetails.blacklist && userDetails.blacklist.data" class="corner-status absolute right-0 top-0 bdg-status--blacklist px-6 py-1 text-white font-bold xs-text rounded-tr-xl rounded-bl-xl">
              Blacklist <img @click="toggleModals(true, 'blacklist')" :src="'../../assets/img/info-white.png'" class="h-3 ml-2 cursor-pointer relative" alt="" style="top: -1px;">
            </div>

            <div class="flex mb-3">
              <p class="sm-text font-bold mr-3">Di cek oleh sistem</p>
              <InsideSpinner v-if="!userDetails.hasOwnProperty('ktp')" :options="{width: '15px', height: '15px',}"  />
            </div>
            <div class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">NPWP <span class="absolute top-0 right-3 font-bold">:</span></label>
              <p class="font-bold flex-1">{{ userDetails.npwp ? userDetails.npwp : '---' }}</p>
            </div>
            <div class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">Input NIK sama dengan NIK OCR <span class="absolute top-0 right-3 font-bold">:</span></label>
              <div class="flex-1">
                <div 
                  v-if="(userDetails.ktp && userDetails.ktp.number) && (userDetails.ocrData && userDetails.ocrData.idNumber)"
                  class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
                  :class="{
                    'bdg-status--success' : userDetails.ktp.number == userDetails.ocrData.idNumber,
                    'bdg-status--danger' : userDetails.ktp.number != userDetails.ocrData.idNumber,
                  }"
                >
                  {{ (userDetails.ktp.number == userDetails.ocrData.idNumber) ? 'Yes' : 'No' }}
                </div>
                <div v-else class="count-badge rounded-2xl py-1 text-center w-20 2xl:w-28 inline-block text-white font-bold xs-text bdg-status--warning">No Record</div>
              </div>
            </div>
            <div class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">Terdaftar sebagai Kontak Darurat user lain <span class="absolute top-0 right-3 font-bold">:</span></label>
              <div class="flex-1">
                <div 
                  class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
                  :class="{
                    'bdg-status--success' : userDetails.isUsedAsEmergencyContact && userDetails.isUsedAsEmergencyContact.length == 0,
                    'bdg-status--danger' : userDetails.isUsedAsEmergencyContact && userDetails.isUsedAsEmergencyContact.length > 0,
                  }"
                >
                  {{ userDetails.isUsedAsEmergencyContact && userDetails.isUsedAsEmergencyContact.length > 0 ? 'Yes' : 'No' }}
                </div>
                <img :src="'../../assets/img/info-circle-violet.png'" class="w-4 ml-3 cursor-pointer" @click="toggleModals(true, 'emergencyContact')" alt="">
              </div>
            </div>
            <div v-if="getStatusValue(userDetails.status) != 'pending'" class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">User Tele ID <span class="absolute top-0 right-3 font-bold">:</span></label>
              <p class="flex-1">{{ userDetails.tele_check && userDetails.tele_check.data != null ? userDetails.tele_check.data.status_msg : 'No Record' }}</p>
            </div>
            <div class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">Nomor HP sama dengan Kontak Darurat <span class="absolute top-0 right-3 font-bold">:</span></label>
              <div class="flex-1">
                <div 
                  class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
                  :class="{
                    'bdg-status--success' : userDetails.emergencyContact && userDetails.mobileNumber != userDetails.emergencyContact.mobileNumber,
                    'bdg-status--danger' : userDetails.emergencyContact && userDetails.mobileNumber == userDetails.emergencyContact.mobileNumber,
                  }"
                >
                  {{ userDetails.emergencyContact && userDetails.mobileNumber == userDetails.emergencyContact.mobileNumber ? 'Yes' : 'No' }}
                </div>
              </div>
            </div>
            <div v-if="getStatusValue(userDetails.status) != 'pending'" class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">Total Pinjaman 3 bulan terakhir <span class="absolute top-0 right-3 font-bold">:</span></label>
              <div class="flex-1">
                <InsideSpinner v-if="!userDetails.hasOwnProperty('ktp')" :options="{width: '15px', height: '15px',}"  />
                <div 
                  v-else-if="userDetails.multiPlatformResult && userDetails.multiPlatformResult.queryCount"
                  class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
                  :class="{
                    'bdg-status--success' : !userDetails.multiPlatformResult || (userDetails.multiPlatformResult && userDetails.multiPlatformResult.queryCount < 20),
                    'bdg-status--warning' : userDetails.multiPlatformResult && userDetails.multiPlatformResult.queryCount >= 20,
                  }"
                >
                  {{ userDetails.multiPlatformResult ? userDetails.multiPlatformResult.queryCount : '0' }}
                </div>
                <div v-else class="count-badge rounded-2xl py-1 text-center w-20 2xl:w-28 inline-block text-white font-bold xs-text bdg-status--warning">No Record</div>
              </div>
            </div>
            <div v-if="getStatusValue(userDetails.status) != 'pending'" class="flex xs-text items-center mb-2">
              <label class="text-gray-500 flex-2 relative">Trusting Social <span class="absolute top-0 right-3 font-bold">:</span></label>
              <div class="flex-1">
                <InsideSpinner v-if="!userDetails.hasOwnProperty('ktp')" :options="{width: '15px', height: '15px',}"  />
                <div 
                  v-else-if="userDetails.trusting_social"
                  class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold xs-text"
                  :class="{
                    'bdg-status--success' : userDetails.trusting_social >= 650,
                    'bdg-status--warning' : userDetails.trusting_social >= 550 && userDetails.trusting_social < 650,
                    'bdg-status--danger' : !userDetails.trusting_social || userDetails.trusting_social < 550,
                  }"
                >
                  {{ userDetails.trusting_social ? userDetails.trusting_social : '0' }}
                </div>
                <div v-else class="count-badge rounded-2xl py-1 text-center w-20 2xl:w-28 inline-block text-white font-bold xs-text bdg-status--warning">No Record</div>
              </div>
            </div>
          </div>
          <div class="row-span-2 flex flex-col">
            <!-- if NOT Pending, Approved and Rejected -->
            <div v-if="getStatusValue(userDetails.status) != 'pending' && getStatusValue(userDetails.status) != 'approved' && getStatusValue(userDetails.status) != 'rejected'" class="flex flex-col flex-3">
              <div class="flex flex-2">
                <div class="card px-4 py-3 mr-2 mb-2 flex-5">
                  <p class="sm-text font-bold mb-1 flex items-center">
                    <span class="mr-3">Limit</span>
                    <InsideSpinner v-if="!userDetails.hasOwnProperty('credit')" :options="{width: '15px', height: '15px',}"  />
                  </p>
                  <p class="lg-text text-violet font-bold ff-medium mb-1">{{ userDetails.credit | currency }}</p>
                  <div class="flex">
                    <label class="text-gray-500 relative xs-text flex-none mr-6">Digunakan <span class="absolute top-0 -right-3 font-bold">:</span></label>
                    <p class="flex-5 xs-text">{{ ( userDetails.credit - userDetails.remainingCredit ) | currency }}</p>
                  </div>
                </div>
                <div class="card px-4 py-3 ml-1 mb-2 flex-3">
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
              </div>
              <div class="flex flex-3">
                <div class="card px-4 py-3 mr-2 mt-1 flex-5 flex flex-col">
                  <div class="flex flex-1 mb-2">
                    <div class="flex-1 mr-1">
                      <div @click="toggleModals(true, 'fotoKtp')" class="img-container w-full h-full rounded-lg relative overflow-hidden">
                        <!-- style="background-image: url('https://empatkalibucket.oss-ap-southeast-5.aliyuncs.com/npwp/iN6u4kzhPrN1WUPURzNIfh0n9BU6Om.jpg');background-size: cover;" -->
                        <img 
                          :src="userDetails.ktp ? userDetails.ktp.image : '/assets/img/no-image.png'" 
                          class="rounded-lg absolute object-cover w-full" alt=""
                        >
                      </div>
                    </div>
                    <div @click="toggleModals(true, 'selfieKtp')" class="flex-1 ml-1">
                      <div class="img-container w-full h-full rounded-lg relative overflow-hidden">
                        <img 
                          :src="userDetails.selfie ? userDetails.selfie : '/assets/img/no-image.png'" 
                          class="rounded-lg absolute object-cover w-full" alt=""
                        >
                      </div>
                    </div>
                  </div>
                  <div class="flex-none">
                    <div 
                      class="count-badge rounded-2xl px-5 py-2 text-center w-full inline-block text-white font-bold xs-text"
                      :class="{
                        'bdg-status--success' : userDetails.ktpValidation ? userDetails.ktpValidation.isFoundMatch : '---',
                        'bdg-status--warning' : userDetails.ktpValidation ? userDetails.ktpValidation.isFoundNotMatch : '---',
                        'bdg-status--danger' : userDetails.ktpValidation ? userDetails.ktpValidation.isNotFound : '---',
                        'bdg-status--noRecord' : !userDetails.ktpValidation,
                      }"
                    >
                      <font-awesome-icon 
                        :icon="[ 'fas', userDetails.ktpValidation && userDetails.ktpValidation.isFoundMatch ? 'check' : 'times' ]" 
                        class="mr-1" 
                      />
                      {{ 
                        userDetails.ktpValidation && userDetails.ktpValidation.isFoundMatch ? 
                          'Found - Match' 
                        : userDetails.ktpValidation && userDetails.ktpValidation.isFoundNotMatch ?
                          'Found - Not Match' 
                        : userDetails.ktpValidation && userDetails.ktpValidation.isNotFound ?
                          'Not Found' 
                        : 'No Record' 
                      }}
                    </div>
                  </div>
                </div>
                <div class="card p-4 ml-1 mt-1 flex-3">
                  <p class="xs-text font-bold mb-2">Metode Pembayaran</p>
                  <img v-if="userDetails.defaultPayment == 'card'" :src="'../../assets/img/visa.png'" class="w-14 block mb-2" alt="">
                  <img v-if="userDetails.defaultPayment == 'dana'" :src="'../../assets/img/logo-dana-blue-sm.png'" class="w-18 block mb-2" alt="">
                  <img v-if="userDetails.defaultPayment == 'gopay'" :src="'../../assets/img/gopay-logo.svg'" class="w-18 block mt-2 mb-4" alt="">
                  <button 
                    :disabled="!userDetails.hasOwnProperty('danaData')" 
                    :class="{'opacity-40' : !userDetails.hasOwnProperty('danaData')}"
                    @click="toggleModals(true, 'paymentMethod')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold flex-1 shadow py-2 flex justify-center">
                    <InsideSpinner v-if="!userDetails.hasOwnProperty('danaData')" :options="{width: '15px', height: '15px',}"  />
                    <span v-else>Info Lainnya</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- if Pending, Approved and Rejected -->
            <div v-if="getStatusValue(userDetails.status) == 'pending' || getStatusValue(userDetails.status) == 'approved' || getStatusValue(userDetails.status) == 'rejected'" class="flex flex-3">
              <div class="flex flex-col flex-5 mr-2">
                <div class="card px-4 py-3 flex-1 flex flex-col">
                  <p class="sm-text font-bold mb-3">Validasi KTP</p>
                  <div 
                    class="count-badge rounded-2xl px-5 py-2 text-center w-full inline-block text-white font-bold xs-text mb-3"
                    :class="{
                      'bdg-status--success' : userDetails.ktpValidation ? userDetails.ktpValidation.isFoundMatch : '---',
                      'bdg-status--warning' : userDetails.ktpValidation ? userDetails.ktpValidation.isFoundNotMatch : '---',
                      'bdg-status--danger' : userDetails.ktpValidation ? userDetails.ktpValidation.isNotFound : '---',
                      'bdg-status--noRecord' : !userDetails.ktpValidation,
                    }"
                  >
                    <font-awesome-icon 
                      :icon="[ 'fas', userDetails.ktpValidation && userDetails.ktpValidation.isFoundMatch ? 'check' : 'times' ]" 
                      class="mr-1" 
                    />
                    {{ 
                      userDetails.ktpValidation && userDetails.ktpValidation.isFoundMatch ? 
                        'Found - Match' 
                      : userDetails.ktpValidation && userDetails.ktpValidation.isFoundNotMatch ?
                        'Found - Not Match' 
                      : userDetails.ktpValidation && userDetails.ktpValidation.isNotFound ?
                        'Not Found' 
                      : 'No Record' 
                    }}
                  </div>

                  <div class="flex flex-1 mb-2">
                    <div class="flex-1 flex flex-col mr-1">
                      <p class="xs-text font-bold mb-3">Foto KTP</p>
                      <!-- @click="toggleModals(true, 'fotoKtp')"  -->
                      <div @click="toggleModals(true, 'fotoKtp')" class="img-container w-full h-full rounded-lg relative overflow-hidden">
                        <img 
                          :src="userDetails.ktp ? userDetails.ktp.image : '/assets/img/no-image.png'" 
                          class="rounded-lg absolute object-cover w-full" alt=""
                        >
                      </div>
                    </div>
                    <div class="flex-1 flex flex-col ml-1">
                      <p class="xs-text font-bold mb-3">Selfie KTP</p>
                      <!-- @click="toggleModals(true, 'selfieKtp')"  -->
                      <div @click="toggleModals(true, 'selfieKtp')" class="img-container w-full h-full rounded-lg relative overflow-hidden">
                        <img 
                          :src="userDetails.selfie || '/assets/img/no-image.png'" 
                          class="rounded-lg absolute object-cover w-full" alt=""
                        >
                      </div>
                    </div>
                  </div>

                  <!-- <button @click="toggleModals(true, 'compareKTP')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold flex-none shadow py-2">Bandingkan</button> -->
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
                <div class="card p-4 mt-1 flex-3">
                  <p class="xs-text font-bold mb-2">Metode Pembayaran</p>
                  <img v-if="userDetails.defaultPayment == 'card'" :src="'../../assets/img/visa.png'" class="w-14 block mb-2" alt="">
                  <img v-if="userDetails.defaultPayment == 'dana'" :src="'../../assets/img/logo-dana-blue-sm.png'" class="w-18 block mb-2" alt="">
                  <img v-if="userDetails.defaultPayment == 'gopay'" :src="'../../assets/img/gopay-logo.svg'" class="w-18 block mt-2 mb-4" alt="">
                  <button 
                    :disabled="!userDetails.hasOwnProperty('danaData')" 
                    :class="{'opacity-40' : !userDetails.hasOwnProperty('danaData')}"
                    @click="toggleModals(true, 'paymentMethod')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold flex-1 shadow py-2 flex justify-center">
                    <InsideSpinner v-if="!userDetails.hasOwnProperty('danaData')" :options="{width: '15px', height: '15px',}"  />
                    <span v-else>Info Lainnya</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="card p-4 mt-3 flex-4" v-if="getStatusValue(userDetails.status) == 'pending'"></div>
            <div v-if="getStatusValue(userDetails.status) != 'pending'" class="card p-4 mt-3 flex-4">
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
                <InsideSpinner v-if="userDetails && !userDetails.ocrData" :options="{width: '15px', height: '15px',}"  />
              </div>
              <div class="flex-1 text-right">
                <button @click="toggleModals(true, 'editInfo')" class="btn rounded-sm font-bold py-1 px-4 text-violet xs-text" 
                  :disabled="userDetails && !userDetails.ocrData"
                  :class="{'text-opacity-50' : userDetails && !userDetails.ocrData}"
                >Edit</button>
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
                <p class="sm-text font-bold mb-3 flex items-center">
                  <span class="mr-3">Date E-Wallet Lainnya</span>
                  <InsideSpinner v-if="!userDetails.hasOwnProperty('gopay')" :options="{width: '15px', height: '15px',}"  />
                </p>
                <div class="flex xs-text mb-3">
                  <label class="text-gray-500 flex-3 relative">Gopay <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <p class="flex-4">
                    {{ userDetails.gopay ? userDetails.gopay.ewallet_account_name: '---' }}
                    <span v-if="userDetails.gopay && userDetails.gopay.kyc_status">
                    ({{ userDetails.gopay ? userDetails.gopay.kyc_status : ''}})
                    </span>
                  </p>
                </div>
                <div class="flex xs-text mb-3">
                  <label class="text-gray-500 flex-3 relative">OVO <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <p class="flex-4">
                    {{ userDetails.ovo && userDetails.ovo.ewallet_account_name ? userDetails.ovo.ewallet_account_name.replace(/X/g, '*') : '---' }}
                  </p>
                </div>
                <div class="flex xs-text">
                  <label class="text-gray-500 flex-3 relative">LinkAja <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <p class="flex-4">
                    {{ userDetails.linkaja ? userDetails.linkaja.ewallet_account_name : '---' }}
                  </p>
                </div>
              </div>	
              <div class="card px-4 py-3 ml-2 flex-1">
                <p class="sm-text font-bold mb-3 flex items-center">
                  <span class="mr-3">Kontak Darurat</span>
                  <InsideSpinner v-if="!userDetails.hasOwnProperty('emergencyContact')" :options="{width: '15px', height: '15px',}"  />
                </p>
                <div class="flex xs-text mb-3">
                  <label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <p class="flex-4">{{ userDetails.emergencyContact ? userDetails.emergencyContact.name : '---' }}</p>
                </div>
                <div class="flex xs-text mb-3">
                  <label class="text-gray-500 flex-3 relative">Hubungan <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <p class="flex-4">{{ userDetails.emergencyContact ? userDetails.emergencyContact.type : '---' }}</p>
                </div>
                <div class="flex xs-text mb-3">
                  <label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <p class="flex-4">{{ userDetails.emergencyContact ? userDetails.emergencyContact.mobileNumber : '---' }}</p>
                </div>
                <div class="flex xs-text items-center">
                  <label class="text-gray-500 flex-3 relative">4X User <span class="absolute top-0 right-2 font-bold">:</span></label>
                  <div class="flex-4">
                    <div 
                      class="count-badge rounded-2xl px-5 py-1 text-center w-16 inline-block text-white font-bold xs-text"
                      :class="{
                        'bdg-status--success' : !userDetails.emergencyContactIsUser,
                        'bdg-status--danger' : userDetails.emergencyContactIsUser,
                      }"
                    >
                      {{ userDetails.emergencyContactIsUser ? 'Yes' : 'No' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-2">
              <div class="flex-1 mr-1">
                <div class="card px-4 py-3 h-full w-full">
                  <p class="sm-text font-bold mb-5 flex items-center">
                    <span class="mr-3">Komentar</span>
                    <InsideSpinner v-if="!adminData.hasOwnProperty('displayName')" :options="{width: '15px', height: '15px',}"  />
                  </p>
                  <button 
                    :disabled="!adminData.hasOwnProperty('displayName')" 
                    :class="{'opacity-40' : !adminData.hasOwnProperty('displayName')}"
                    @click="toggleModals(true, 'comment')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold px-8 py-2 flex-1 shadow">Lihat & Komentar disini</button>
                </div>
              </div>	
              
              <div class="flex flex-1 ml-2 ">
                <div @click.prevent="toggleModals(true, 'location')" class="card mr-1 flex-1 relative outline-none border-none">
                  <p class="sm-text font-bold mb-2 absolute top-3 left-4 z-10">Lokasi</p>

                  <GmapMap
                    :center="{
                      lat: parseFloat(userDetails.loc ? userDetails.loc.coordinates[1] : 0),
                      lng: parseFloat(userDetails.loc ? userDetails.loc.coordinates[0] : 0)
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
                          lat: parseFloat(userDetails.loc ? userDetails.loc.coordinates[1] : 0),
                          lng: parseFloat(userDetails.loc ? userDetails.loc.coordinates[0] : 0)
                        }"
                      />
                  </GmapMap>
                </div>
                <div class="card px-4 py-3 ml-2 flex-1">
                  <p class="sm-text font-bold mb-5 flex items-center">
                    <span class="mr-3">Email</span>
                    <InsideSpinner v-if="userDetails && !userDetails.hasOwnProperty('emailLogs')" :options="{width: '15px', height: '15px',}"  />
                  </p>
                  <button 
                    :disabled="!userDetails.hasOwnProperty('emailLogs')" 
                    :class="{'opacity-40' : !userDetails.hasOwnProperty('emailLogs')}"
                  @click="toggleModals(true, 'email')" class="btn xs-text text-violet border border-violet rounded-md w-full font-bold px-8 py-2 flex-1 shadow">Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="getStatusValue(userDetails.status) == 'incomplete'" class="verification-details-content p-4">
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
            <p class="sm-text font-bold mb-4 flex items-center">
              <span class="mr-3">Data Pribadi</span>
              <InsideSpinner v-if="!userDetails.hasOwnProperty('mobileNumber')" :options="{width: '15px', height: '15px',}"  />
            </p>

            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.detail && userDetails.detail.name ? userDetails.detail.name : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.mobileNumber ? userDetails.mobileNumber : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
              <div class="flex-4 flex items-center">
                <p>{{ userDetails.detail ? userDetails.detail.email : '---' }}</p>
                <img v-if="userDetails.emailVerified" :src="'../../assets/img/secure.png'" class="w-5 ml-3" alt="">
              </div>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">NIK <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.ktp && userDetails.ktp.number ? userDetails.ktp.number : '---' }}</p>
            </div>
          </div>
          <div class="card p-4">
            <p class="sm-text font-bold mb-4 flex items-center">
              <span class="mr-3">Pekerjaan</span>
              <!-- <InsideSpinner v-if="!userDetails.hasOwnProperty('detail')" :options="{width: '15px', height: '15px',}"  /> -->
            </p>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Industri <span class="absolute top-0 right-2 font-bold">:</span></label>
              <div v-if="userDetails.detail && !userDetails.detail.industri_label" class="flex-4">
                <InsideSpinner :options="{width: '15px', height: '15px',}"  />
              </div>
              <p v-else class="flex-4">{{ userDetails.detail && userDetails.detail.industri_label ? userDetails.detail.industri_label : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Jenis Pekerjaan <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.detail && userDetails.detail.pekerjaan ? userDetails.detail.pekerjaan.replace('---', ' ') : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Pendidikan <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.detail && userDetails.detail.pendidikan ? userDetails.detail.pendidikan : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Penghasilan <span class="absolute top-0 right-2 font-bold">:</span></label>
              <div v-if="userDetails.detail && !userDetails.detail.descriptionOfsalary" class="flex-4">
                <InsideSpinner :options="{width: '15px', height: '15px',}"  />
              </div>
              <p v-else class="flex-4">{{ userDetails.detail && userDetails.detail.descriptionOfsalary ? userDetails.detail.descriptionOfsalary : '---' }}</p>
            </div>
          </div>
          <div class="card p-4">
            <p class="sm-text font-bold mb-4 flex items-center">
              <span class="mr-3">Metode Pembayaran - Kartu Debit/ Kredit</span>
              <InsideSpinner v-if="!userDetails" :options="{width: '15px', height: '15px',}"  />
            </p>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Tipe <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.card.length > 0 ? userDetails.card[0].type : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Nomor Kartu <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{  userDetails.card.length > 0 ? userDetails.card[0].masked : '---' }}</p>
            </div>
          </div>
          <div class="card p-4 flex">
            <div class="flex-1 flex flex-col mr-1">
              <p class="sm-text font-bold mb-3">Foto KTP</p>
              <div v-if="userDetails.ktp && userDetails.ktp.image" @click="toggleModals(true, 'fotoKtp')" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
                <img 
                  :src="userDetails.ktp && userDetails.ktp.image ? userDetails.ktp.image : '../../assets/img/foto-ktp.png'" 
                  class="rounded-lg absolute object-cover w-full" alt=""
                >
              </div>

              <div v-else class="h-no-ktp">
                <img 
                  :src="'../../assets/img/foto-ktp.png'" 
                  class="rounded-lg h-full" alt=""
                >
              </div>
            </div>
            <div class="flex-1 flex flex-col ml-1">
              <p class="sm-text font-bold mb-3">Foto selfie dengan KTP</p>
              <div v-if="userDetails.selfie" @click="toggleModals(true, 'selfieKtp')" class="img-container w-full h-full rounded-lg border relative overflow-hidden">
                <img 
                  :src="userDetails.selfie ? userDetails.selfie : '../../assets/img/selfie-foto-ktp.png'" 
                  class="rounded-lg absolute object-cover w-full" alt=""
                >
              </div>
              <div v-else class="h-no-ktp">
                <img 
                  :src="'../../assets/img/foto-ktp.png'" 
                  class="rounded-lg h-full" alt=""
                >
              </div>
            </div>
            <!-- <div class="flex h-full">
              <div class="flex-1 flex flex-col mr-1">
                <p class="sm-text font-bold mb-3">Foto KTP</p>
                <div class="h-no-ktp">
                  <img 
                    :src="'../../assets/img/foto-ktp.png'" 
                    class="rounded-lg h-full" alt=""
                  >
                </div>
              </div>
              <div class="flex-1 flex flex-col ml-1">
                <p class="sm-text font-bold mb-3">Foto selfie dengan KTP</p>
                <div class="h-no-ktp">
                  <img 
                    :src="'../../assets/img/foto-ktp.png'" 
                    class="rounded-lg h-full" alt=""
                  >
                </div>
              </div>
            </div> -->

          </div>
          <div class="card p-4">
            <p class="sm-text font-bold mb-4 flex items-center">
              <span class="mr-3">Kontak Darurat</span>
              <InsideSpinner v-if="userDetails.emergencyContact && !userDetails.emergencyContact.name" :options="{width: '15px', height: '15px',}"  />
            </p>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.emergencyContact ? userDetails.emergencyContact.name : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Nomor HP Kontak Darurat <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.emergencyContact ? userDetails.emergencyContact.mobileNumber : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Hubungan <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.emergencyContact ? userDetails.emergencyContact.type : '---' }}</p>
            </div>
          </div>
          <div class="card p-4">
            <p class="sm-text font-bold mb-4">Metode Pembayaran - Pembayaran Instan</p>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Tipe <span class="absolute top-0 right-2 font-bold">:</span></label>
              <div v-if="userDetails.danaVerifiedAccount || userDetails.gopayVerifiedAccount" class="flex-4">
                <img v-if="userDetails.danaVerifiedAccount" :src="'../../assets/img/dana.png'" class="w-16 block inline-block" alt="">
                <img v-if="userDetails.gopayVerifiedAccount" :src="'../../assets/img/gopay-logo.svg'" class="w-16 block inline-block" alt="">
              </div>
              <p v-else class="flex-4">{{ '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.danaVerifiedAccount || userDetails.gopayVerifiedAccount ? userDetails.mobileNumber : '---' }}</p>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Saldo <span class="absolute top-0 right-2 font-bold">:</span></label>
              <div v-if="userDetails.danaVerifiedAccount && !userDetails.danaData" class="flex-4">
                <InsideSpinner :options="{width: '15px', height: '15px',}"  />
              </div>
              <p v-else class="flex-4">
                <span v-if="userDetails.danaVerifiedAccount && userDetails.danaData">{{ userDetails.danaData.dana  | currency }}</span>
                <span v-else>{{ '---' }}</span>
              </p>
            </div>
          </div>
          <div class="card col-span-2 relative">
            <p class="sm-text font-bold mb-2 absolute top-3 left-4 z-10">Lokasi saat daftar</p>
            <GmapMap
              :center="{
                lat: parseFloat(userDetails.loc ? userDetails.loc.coordinates[1] : 0),
                lng: parseFloat(userDetails.loc ? userDetails.loc.coordinates[0] : 0)
              }"
              :zoom="10"
              :options="{
                fullscreenControl: false,
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
              }"
        
              style="height: 100%; border-radius: 12px;overflow: hidden;"
            >
              <GmapMarker
                  :position="{
                    lat: parseFloat(userDetails.loc ? userDetails.loc.coordinates[1] : 0),
                    lng: parseFloat(userDetails.loc ? userDetails.loc.coordinates[0] : 0)
                  }"
                />
            </GmapMap>
          </div>
          <div class="card p-4">
            <p class="sm-text font-bold mb-4">Data Pendukung</p>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Status Kontrak <span class="absolute top-0 right-2 font-bold">:</span></label>
              <div v-if="userDetails.danaVerifiedAccount && !userDetails.danaData" class="flex-4">
                <InsideSpinner :options="{width: '15px', height: '15px',}"  />
              </div>
              <p v-else class="flex-4">
                <span v-if="userDetails.danaVerifiedAccount && userDetails.danaData">{{ userDetails.danaData.kontrak }}</span>
                <span v-else>{{ '---' }}</span>
              </p>
            </div>
            <div class="flex xs-text mb-3 items-center">
              <label class="text-gray-500 flex-3 relative">Log Email <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p v-if="userDetails.emailLogs && userDetails.emailLogs.length == 0" class="flex-4">{{ '---' }}</p>
              <div v-else class="flex-4">
                <button @click="toggleModals(true, 'email')" class="btn xs-text text-violet border border-violet rounded-md font-bold px-8 py-2 shadow">Detail</button>
              </div>
            </div>
            <div class="flex xs-text mb-3">
              <label class="text-gray-500 flex-3 relative">Call <span class="absolute top-0 right-2 font-bold">:</span></label>
              <p class="flex-4">{{ userDetails.tele_check && userDetails.tele_check.data != null ? userDetails.tele_check.data.status_msg : '---' }}</p>
            </div>
          </div>
			  </div>
      </div>
      

      <div class="btn-options-wrapper flex items-center px-4 h-14 bg-white shadow-lg-reverse absolute w-full bottom-0 left-0">
        <div class="flex-none mr-10">
          <a href="#" @click.prevent="goBacktoUser()" class="text-violet xs-text font-bold flex items-center">
            <img :src="'../../assets/img/blue-arrow-left.png'" alt="" class="w-5 mr-2">
            Kembali ke list
          </a>
        </div>

        <div v-if="getStatusValue(userDetails.status) == 'pending'" class="flex-1 text-right">
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

        <div v-if="getStatusValue(userDetails.status) == 'active' || getStatusValue(userDetails.status) == 'approved' || getStatusValue(userDetails.status) == 'rejected'" class="flex-1 flex items-center">
          <div v-if="getStatusValue(userDetails.status) == 'rejected'" class="flex-1 flex truncate">
            <label class="flex-none mr-3 mb-0 sm-text">
              <b>
                Alasan :
              </b>
            </label>
            <div class="flex-auto mr-2 truncate sm-text">
              {{ userDetails.commentReviews.length > 0 ? userDetails.commentReviews[0].text : '---' }}
            </div>
          </div>
          <div v-else class="flex-1"></div>
          <div class="flex-none flex justify-end items-center ml-3">
            <label class="mr-3 mb-0 sm-text">
              <b>
                Di {{ getStatusValue(userDetails.status) == 'rejected' ? 'Reject' : 'Approve' }} oleh :
              </b>
            </label>
            <div class="mr-2 sm-text">
              {{ userDetails.commentReviews.length > 0 ? userDetails.commentReviews[0].commentBy : '---' }}
            </div>
          </div>
          <div class="flex-none flex justify-end items-center border-l pl-3 ml-3 ">
            <label for="" class="mr-3 font-bold sm-text">
              Waktu di {{ getStatusValue(userDetails.status) == 'rejected' ? 'Reject' : 'Approve' }} :
            </label>
            <div class="flex mr-2 items-center">
              <div class="img-icon w-5 mr-3">
                <img :src="'../../assets/img/calendar-icon.png'" class="w-full block align-middle" alt="">
              </div>
              <div class="flex-1 sm-text">
                <span v-if="userDetails.commentReviews.length > 0">{{ userDetails.commentReviews[0].createdAt | moment("DD MMM YYYY") }}</span>
                <span v-else>{{ '---' }}</span>
              </div>
            </div>
            <div class="flex items-center">
              <div class="img-icon w-5 mr-3">
                <img :src="'../../assets/img/clock-icon.png'" class="w-full block align-middle" alt="">
              </div>
              <div class="flex-1 sm-text">
                <span v-if="userDetails.commentReviews.length > 0">{{ userDetails.commentReviews[0].createdAt | moment("HH:mm:SS") }} WIB</span>
                <span v-else>{{ '---' }}</span>
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
        <EditInformationModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
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
        <EmailModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
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
        <PaymentMethodModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
      </Modal>

      <!-- Location Modal -->
      <Modal 
        v-model="isLocationModalShow" 
        title="Lokasi"
        modal-class="modal-wrapper max-w-none w-6/10"
      >
        <LocationModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
      </Modal>

      <!-- Blacklist Modal -->
      <Modal 
        v-model="isBlacklistModalShow" 
        title="Blacklist Result"
        modal-class="modal-wrapper max-w-none w-5/10"
      >
        <BlacklistModal :user="userDetails" :closeModal="toggleModals" :requestSuccess="refreshData" :toggleLoader="toggleLoader"/>
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

      <!-- Approve/Reject Confirmation Modal -->
      <Modal 
        v-model="isProcessModalShow" 
        :title="confirmTitle"
        :modal-class="requestData.type != 'reject' ? 'modal-wrapper' : 'modal-wrapper max-w-none w-143'"
      >
        <RequestConfirmModal 
          :user="userDetails" 
          :admin="adminData"
          :closeModal="toggleModals" 
          :requestSuccess="refreshData" 
          :toggleLoader="toggleLoader"
          :requestData="requestData"
        />
      </Modal>

    </div>
	</div>
</template>

<style lang="scss" scoped>
  .h-no-ktp{
    height: calc(100% - 30px);
  }

  @media (min-width: 1500px){
    .h-no-ktp{
      height: calc(100% - 40px);
    }
  }


	@import "./style.scss";
</style>

<style lang="scss">
	// FOR KTP MODALS
  .show-image-modal{
    .ktp-wrapper{
      height: 438px;
    }
    .viewer-container{
      overflow: visible;
  //     position: relative;
  //     max-height: 439px;
    }
    .viewer-canvas{
      // overflow: visible;
      --tw-shadow: 0 0px 6px 0px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  //     position: relative;
  //     max-height: 439px;
	// 		height: 100%;
  //     text-align: center;
	// 		display: flex;
		}
    .viewer-footer{
      overflow: visible;
    }
    .viewer-title{
  //     position: relative;
  //     top: 78px;
      color: #333;
      padding-bottom: 5px;
      position: absolute;
      margin: 0;
      width: 100%;
      left: 0;
      right: 0;
      max-width: unset;
      bottom: -28px;
    }
  //   .viewer-canvas > img{
  //     margin: auto !important;
  //     height: auto !important;
  //     width: auto !important;
  //     position: relative !important;
  //     max-height: 439px !important;
	// 		display: block !important;
  //   }
    .viewer-toolbar > ul > li{
      background-color: #D8DAF4;
    }
  } 
</style>

<script>
	import UserDetails from './function.vue'
	export default UserDetails
</script>