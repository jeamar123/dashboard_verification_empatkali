<template>
  <div class="relative">

    <p class="text-sm mt-2 mb-4">
      {{ requestData.type != 'incomplete' ?  'Kamu yakin menyetujui :' : 'Kamu yakin menyetujui Incomplete :' }}
    </p>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-2 text-sm font-bold">{{ 'Jeff Benzos' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-2 text-sm">{{ '081188091678' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-2 text-sm">{{ 'jeff@afterpay.com' }}</p>
    </div>

    <div v-if="requestData.type == 'approve'" class="flex mb-3 items-center">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Limit <span class="absolute top-0 right-2 font-bold">:</span></label>
      <!-- <p class="flex-1 text-sm text-voilet">{{ '5000000' | currency }}</p> -->
      <div class="flex-2">
        <div class="relative select-limit-drop">
          <div class="border-b w-36 py-1 text-sm relative cursor-pointer inline-block" :class="{'text-gray-400' : true, 'border-dangerBtn' : false}" @click="toggleDrops('limit')">
            Pilih Limit
            <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span class="text-sm text-right text-dangerMsg inline-block ml-3">wajib</span>

          <div v-if="isShowLimitDrop" class="w-36 absolute top-10 z-50 left-0 bg-gray-100 px-2 text-left">
            <ul>
              <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '500000' | currency }}</li>
              <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '1000000' | currency }}</li>
              <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '1500000' | currency }}</li>
              <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '2000000' | currency }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="requestData.type == 'reject'">
      <div  class="flex mb-3 items-center">
        <label for="" class="flex-1 text-sm text-gray-700 relative">Tipe Alasan <span class="absolute top-0 right-2 font-bold">:</span></label>
        <!-- <p class="flex-1 text-sm text-voilet">{{ '5000000' | currency }}</p> -->
        <div class="flex-2">
          <div class="relative select-fraud-drop">
            <div class="border-b w-36 py-1 text-sm relative cursor-pointer inline-block" :class="{'text-gray-400' : true, 'border-dangerBtn' : false}" @click="toggleDrops('fraud')">
              Pilih Tipe Alasan
              <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span class="text-sm text-right text-dangerMsg inline-block ml-3">wajib</span>

            <div v-if="isShowFraudDrop" class="w-36 absolute top-10 z-50 left-0 bg-gray-100 px-2 text-left">
              <ul>
                <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ 'FRAUD' }}</li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ 'Non FRAUD' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mb-3 items-center">
        <label for="" class="flex-1 text-sm text-gray-700 relative">Alasan <span class="absolute top-0 right-2 font-bold">:</span></label>
        <!-- <p class="flex-1 text-sm text-voilet">{{ '5000000' | currency }}</p> -->
        <div class="flex-2">
          <div class="relative select-reason-drop">
            <div class="border-b w-76 py-1 text-sm relative cursor-pointer inline-block" :class="{'text-gray-400' : true, 'border-dangerBtn' : false}" @click="toggleDrops('reason')">
              Pilih Alasan
              <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span class="text-sm text-right text-dangerMsg inline-block ml-3">wajib</span>

            <div v-if="isShowReasonDrop" class="w-76 absolute top-10 z-50 left-0 bg-gray-100 px-2 text-left">
              <ul>
                <li class="cursor-pointer text-sm px-1 py-2 border-b" @click="selectReasonOpt('R1 - Usia diluar ketentuan')">
                  {{ 'R1 - Usia diluar ketentuan' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b" @click="selectReasonOpt('R2 - KTP tidak valid/KTP rusak/KTP tidak terbaca')">
                  {{ 'R2 - KTP tidak valid/KTP rusak/KTP tidak terbaca' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b" @click="selectReasonOpt('R3 - Tidak ada Foto KTP/Selfie dengan KTP / Foto diluar ketentuan')">
                  {{ 'R3 - Tidak ada Foto KTP/Selfie dengan KTP / Foto diluar ketentuan' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b" @click="selectReasonOpt('R4 - Foto Selfie blur/tidak pantas')">
                  {{ 'R4 - Foto Selfie blur/tidak pantas' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="confirmData.reason == 'R3 - Tidak ada Foto KTP/Selfie dengan KTP / Foto diluar ketentuan'" class="input-div">
      <textarea 
        cols="30" 
        rows="2" 
        class="comment-textarea" 
        :class="{
          'error' : false
        }"
        style="resize: none;" 
        placeholder="Tulis disini"
      ></textarea>
    </div>

    <div class="text-right mt-5">
      <button @click.prevent="closeModal(false, 'process')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Batal</button>
      <button 
        class="btn px-6 py-3 mx-1 text-white font-bold rounded-md text-sm"
        :class="{
          'bg-successBtn' : requestData.type == 'approve',
          'bg-dangerBtn' : requestData.type == 'reject',
          'bg-warningBtn' : requestData.type == 'incomplete',
        }"
      >
        {{ requestData.type == 'approve' ? 'Approve' : requestData.type == 'reject' ? 'Reject' : 'Jadikan user Incomplete'}}
      </button>
    </div>

    <div v-if="false" class="rounded-full p-3 absolute bg-white -bottom-24"
      :class="{
        'w-130 -left-8 ' : false,
        'w-68 left-16' : true,
      }"
    >
      <div class="flex items-center">
        <div class="img-container mr-4">
          <img :src="'../../assets/img/red-circle-times.png'" class="w-8" alt="">
        </div>
        <p class="text-sm">
          {{
            true ? 
            'Kamu belum memasukkan alasan' :
            'Kamu belum memilih Limit yang disetujui dan menulis alasan.'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  props: {
    closeModal: Function,
    requestSuccess: Function,
    toggleLoader: Function,
    requestData: {
      type: Object,
      required: false,
    }
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem("auth_token")
        }
      },
      isShowLimitDrop: false,
      isShowFraudDrop: false,
      isShowReasonDrop: false,
      confirmData: {}
  	}
  },
  created() {
    this.initializeShowHideListener();
  },
  methods: {
    async initializeShowHideListener()	{
      let vm = this
      document.addEventListener("click",async function(e){
        if(vm.isShowLimitDrop){
          let parentMatchUser = await vm.checkParentMatch(e, 'select-limit-drop');
          vm.isShowLimitDrop = parentMatchUser;
        }
        if(vm.isShowFraudDrop){
          let parentMatchUser = await vm.checkParentMatch(e, 'select-fraud-drop');
          vm.isShowFraudDrop = parentMatchUser;
        }
        if(vm.isShowReasonDrop){
          let parentMatchUser = await vm.checkParentMatch(e, 'select-reason-drop');
          vm.isShowReasonDrop = parentMatchUser;
        }
      });
    },
    async checkParentMatch(e, parentClass)	{
      var el = e.target;
      var parentSelector = document.getElementsByClassName(parentClass)[0];
      if (parentSelector === undefined) { parentSelector = document; }
      var p = el.parentNode;
      var parentMatch = false;
      if(p == parentSelector){
        parentMatch = true;
      }else{
        while (p !== parentSelector) {
          var o = p;
          if(o == null){
            break;
          }
          p = o.parentNode;
          if(p == parentSelector){
            parentMatch = true;
          }
        }
      }
      return parentMatch;
    },
    /**
		 * Form Validator
		 *
		 * This will validate multiple forms
		 * 
		 * @param  String scope
		 */
		formValidator(scope) {
			let vm = this

			vm.$validator.validateAll(scope).then(result => {
				if (result) {
          console.log(result);
				}
			})
    },
    toggleDrops(type) {
      let vm = this
      vm.isShowLimitDrop = type == 'limit' & (vm.isShowLimitDrop ? false : true);
      vm.isShowFraudDrop = type == 'fraud' & (vm.isShowFraudDrop ? false : true);
      vm.isShowReasonDrop = type == 'reason' & (vm.isShowReasonDrop ? false : true);
    },
    selectReasonOpt(opt)	{
      let vm = this;
      vm.confirmData.reason = opt;
      vm.isShowReasonDrop = false;
      console.log(vm.confirmData);
      vm.$forceUpdate();
    },
  }
}
</script>

<style lang="scss" scoped>
  .comment-textarea{
    @apply w-full rounded-md text-sm py-4 px-4 outline-none border #{!important};

    &.error{
      @apply border-dangerBtn #{!important};
    }
  }
</style>
