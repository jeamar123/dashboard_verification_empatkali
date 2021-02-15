<template>
  <div class="relative">

    <p class="text-sm mt-2 mb-4">Kamu yakin menyetujui pengajuan limit dari:</p>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm font-bold">{{ limitDetails.user && limitDetails.user.detail ? limitDetails.user.detail.name : '---' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Limit Sekarang <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm">{{ limitDetails.user.credit | currency }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Pengajuan Limit baru <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm text-violet font-bold">{{ limitDetails.creditNew | currency }}</p>
    </div>

    <div v-if="limitDetails.selectedOpt == 'approve-w-limit'">
      <div class="flex mb-3 items-center">
        <label for="" class="flex-1 text-sm text-gray-700 relative">Limit yang disetujui <span class="absolute top-0 right-2 font-bold">:</span></label>
        <div class="flex-1">
          <div class="relative select-limit-drop">
            <div class="border-b w-36 py-1 text-sm relative cursor-pointer" :class="{'text-gray-400' : !confirmData.approvedLimit, 'border-dangerBtn' : errStatus == 'limit' || errStatus == 'both'}" @click="toggleLimitDrop()">
              <span v-if="confirmData.approvedLimit != ''">{{ confirmData.approvedLimit | currency }}</span>
              <span v-if="confirmData.approvedLimit == ''">{{ 'Pilih Limit' }}</span>
              <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div v-if="isShowLimitDrop" class="w-36 absolute top-7 left-0 bg-gray-100 px-2 text-left">
              <ul>
                <li @click="selectLimitDrop(1000000)" class="cursor-pointer text-base px-1 py-2 border-b-2" :class="{'text-gray-300 pointer-events-none' : limitDetails.user.credit == '1000000'}">{{ '1000000' | currency }}</li>
                <li @click="selectLimitDrop(2000000)" class="cursor-pointer text-base px-1 py-2 border-b-2" :class="{'text-gray-300 pointer-events-none' : limitDetails.user.credit == '2000000'}">{{ '2000000' | currency }}</li>
                <li @click="selectLimitDrop(3000000)" class="cursor-pointer text-base px-1 py-2 border-b-2" :class="{'text-gray-300 pointer-events-none' : limitDetails.user.credit == '3000000'}">{{ '3000000' | currency }}</li>
                <li @click="selectLimitDrop(4000000)" class="cursor-pointer text-base px-1 py-2 border-b-2" :class="{'text-gray-300 pointer-events-none' : limitDetails.user.credit == '4000000'}">{{ '4000000' | currency }}</li>
                <li @click="selectLimitDrop(5000000)" class="cursor-pointer text-base px-1 py-2" :class="{'text-gray-300 pointer-events-none' : limitDetails.user.credit == '5000000'}">{{ '5000000' | currency }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="limitDetails.selectedOpt != 'approve'" class="input-div">
      <div class="flex mb-2">
        <label for="" class="flex-1 text-sm text-gray-700 relative">Alasan <span class="absolute top-0 right-2 font-bold">:</span></label>
        <p class="flex-1 text-sm text-right text-dangerMsg">{{ 'wajib' }}</p>
      </div>
      <textarea 
        cols="30" 
        rows="3" 
        class="comment-textarea" 
        :class="{
          'error' : errStatus == 'comment' || errStatus == 'both'
        }"
        v-model="confirmData.comment"
        style="resize: none;" 
        placeholder="Tulis disini"
      ></textarea>
    </div>

    <div class="text-right mt-5">
      <button @click.prevent="closeModal(false, 'process')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Batal</button>
      <button 
        class="btn px-6 py-3 mx-1 text-white font-bold rounded-md text-sm"
        :class="{
          'bg-successBtn' : limitDetails.selectedOpt != 'reject',
          'bg-dangerBtn' : limitDetails.selectedOpt == 'reject',
        }"
        @click="submitLimitConfirm()"
      >
        {{ limitDetails.selectedOpt != 'reject' ? 'Approve' : 'Reject' }}
      </button>
    </div>

    <div v-if="errStatus != 'none'" class="rounded-full p-3 absolute bg-white -bottom-24"
      :class="{
        'w-130 -left-8 ' : errStatus == 'both',
        'w-68 left-16' : errStatus != 'both',
      }"
    >
      <div class="flex items-center">
        <div class="img-container mr-4">
          <img :src="'../../assets/img/red-circle-times.png'" class="w-8" alt="">
        </div>
        <p class="text-sm">
          {{
            errStatus != 'both' ? 
              errStatus == 'limit' ?
              'Kamu belum memilih Limit yang disetujui.' 
              : 'Kamu belum memasukkan alasan.' 
            : 'Kamu belum memilih Limit yang disetujui dan menulis alasan.'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    closeModal: Function,
    requestSuccess: Function,
    toggleLoader: Function,
    limitDetails: {
      type: Object
    },
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
      confirmData:  {
        comment: '',
        approvedLimit: '',
      },
      commentVal: '',
      errStatus: 'none', // 'none', 'limit', 'comment', 'both'
  	}
  },
  created() {
    console.log(this.limitDetails.selectedOpt);
    this.initializeShowHideListener();
  },
  methods: {
    async initializeShowHideListener()	{
      let vm = this
      document.addEventListener("click",async function(e){
        if(vm.isShowLimitDrop){
          var parentMatchUser = await vm.checkParentMatch(e, 'select-limit-drop');
          vm.isShowLimitDrop = parentMatchUser;
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
    toggleLimitDrop() {
      let vm = this
      vm.isShowLimitDrop = vm.isShowLimitDrop ? false : true;
    },
    submitLimitConfirm()  {
      let vm = this

      if(vm.limitDetails.selectedOpt == 'approve-w-limit'){
        if(vm.confirmData.comment == '' && vm.confirmData.approvedLimit == ''){
          vm.errStatus = 'both';
          return false;
        }
        if(vm.confirmData.comment == ''){
          vm.errStatus = 'comment';
          return false;
        }
        if(vm.confirmData.approvedLimit == ''){
          vm.errStatus = 'limit';
          return false;
        }
      }
      if(vm.limitDetails.selectedOpt == 'reject'){
        if(vm.confirmData.comment == '' || !vm.confirmData.comment){
          vm.errStatus = 'comment';
          return false;
        }
      }

      vm.errStatus = 'none';
      let params  = {
        reqId: vm.limitDetails._id,
        approve:  vm.limitDetails.selectedOpt == 'reject' ? 0 : 1,
        nominal: vm.limitDetails.selectedOpt == 'approve-w-limit' ? vm.confirmData.approvedLimit : vm.limitDetails.creditNew,
        reason: vm.confirmData.comment
      }
      vm.toggleLoader(true);
      axios.put(`api/users/approvalupdatecredit`, params, vm.requestedHeaders)
      .then(async function (response) {
        console.log(response);
        if (response.data.status) {
          vm.$router.go(-1);
        }else{
          vm.$swal('Error!', response.data.message, 'error');
        }
        vm.toggleLoader(false);
      })
      .catch(function (error) {
        vm.toggleLoader(false);
        vm.$swal('Error!', error.response.data.message, 'error');
      })
    },
    selectLimitDrop(opt){
      let vm = this
      vm.confirmData.approvedLimit = opt;
      vm.isShowLimitDrop = false;
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
