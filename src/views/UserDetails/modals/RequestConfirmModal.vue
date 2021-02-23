<template>
  <div class="relative">

    <p class="text-sm mt-2 mb-4">
      {{ requestData.type != 'incomplete' ?  'Kamu yakin menyetujui :' : 'Kamu yakin menyetujui Incomplete :' }}
    </p>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-2 text-sm font-bold">{{ user.detail ? user.detail.name : '---' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-2 text-sm">{{ user.mobileNumber ? user.mobileNumber : '---' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-2 text-sm">{{ user.detail ? user.detail.email : '---' }}</p>
    </div>

    <div v-if="requestData.type == 'approve'" class="flex mb-3 items-center">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Limit <span class="absolute top-0 right-2 font-bold">:</span></label>
      <!-- <p class="flex-1 text-sm text-voilet">{{ '5000000' | currency }}</p> -->
      <div class="flex-2">
        <div class="relative select-limit-drop">
          <div class="border-b w-36 py-1 text-sm relative cursor-pointer inline-block" :class="{'text-gray-400' : !confirmData.approvedLimit, 'border-dangerBtn' : errStatus == 'limit' || errStatus == 'all'}" @click="toggleDrops('limit')">
            <span v-if="confirmData.approvedLimit != ''">{{ confirmData.approvedLimit | currency }}</span>
            <span v-if="confirmData.approvedLimit == ''">{{ 'Pilih Limit' }}</span>
            <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span class="text-sm text-right text-dangerMsg inline-block ml-3">wajib</span>

          <div v-if="isShowLimitDrop" class="w-36 absolute -bottom-18 z-50 left-0 bg-gray-100 px-2 text-left">
            <ul>
              <li @click="selectLimitDrop(500000)" class="cursor-pointer text-sm px-1 py-2 border-b">{{ '500000' | currency }}</li>
              <li @click="selectLimitDrop(1000000)" class="cursor-pointer text-sm px-1 py-2 border-b">{{ '1000000' | currency }}</li>
              <li @click="selectLimitDrop(1500000)" class="cursor-pointer text-sm px-1 py-2 border-b">{{ '1500000' | currency }}</li>
              <li @click="selectLimitDrop(2000000)" class="cursor-pointer text-sm px-1 py-2 border-b">{{ '2000000' | currency }}</li>
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
            <div class="border-b w-36 py-1 text-sm relative cursor-pointer inline-block" :class="{'text-gray-400' : confirmData.reasonType == '', 'border-dangerBtn' : errStatus == 'reason-type' || errStatus == 'both-reject'}" @click="toggleDrops('fraud')">
              {{ confirmData.reasonType == '' ? 'Pilih Tipe Alasan' : confirmData.reasonType }}
              <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span class="text-sm text-right text-dangerMsg inline-block ml-3">wajib</span>

            <div v-if="isShowFraudDrop" class="w-36 absolute -bottom-18 z-50 left-0 bg-gray-100 px-2 text-left">
              <ul>
                <li @click="selectReasonTypeOpt('Fraud')" class="cursor-pointer text-sm px-1 py-2 border-b">{{ 'Fraud' }}</li>
                <li @click="selectReasonTypeOpt('Non Fraud')" class="cursor-pointer text-sm px-1 py-2 border-b">{{ 'Non Fraud' }}</li>
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
            <div class="border-b w-76 py-1 pr-4 text-sm relative cursor-pointer inline-block" :class="{'text-gray-400' : confirmData.reason == '', 'border-dangerBtn' : errStatus == 'reason' || errStatus == 'both-reject'}" @click="toggleDrops('reason')">
              {{ confirmData.reason == '' ? 'Pilih Alasan' : confirmData.reason }}
              <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <span class="text-sm text-right text-dangerMsg inline-block ml-3">wajib</span>

            <div v-if="isShowReasonDrop" class="w-76 max-h-80 absolute -bottom-18 z-50 left-0 bg-gray-100 px-2 text-left overflow-y-auto overflow-x-hidden">
              <ul v-if="confirmData.reasonType == 'Non Fraud'">
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R1 - Usia diluar ketentuan')">
                  {{ 'R1 - Usia diluar ketentuan' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R2 - KTP tidak valid/KTP rusak/KTP tidak terbaca')">
                  {{ 'R2 - KTP tidak valid/KTP rusak/KTP tidak terbaca' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R3 - Tidak ada Foto KTP/Selfie dengan KTP / Foto diluar ketentuan')">
                  {{ 'R3 - Tidak ada Foto KTP/Selfie dengan KTP / Foto diluar ketentuan' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R4 - Foto Selfie blur/tidak pantas')">
                  {{ 'R4 - Foto Selfie blur/tidak pantas' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R5 - Memiliki banyak pinjaman dalam waktu 90 hari')">
                  {{ 'R5 - Memiliki banyak pinjaman dalam waktu 90 hari' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R6 - Penilaian kredit rendah')">
                  {{ 'R6 - Penilaian kredit rendah' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R7 - Data AFPI buruk')">
                  {{ 'R7 - Data AFPI buruk' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R8 - Kapasitas diluar ketentuan')">
                  {{ 'R8 - Kapasitas diluar ketentuan' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R9 - Blacklist customer')">
                  {{ 'R9 - Blacklist customer' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R10 - High risk job (TNI/POLRI/Pengacara/Hakim/Wartawan/Reporter/Dsb)')">
                  {{ 'R10 - High risk job (TNI/POLRI/Pengacara/Hakim/Wartawan/Reporter/Dsb)' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R11 - High Risk Area')">
                  {{ 'R11 - High Risk Area' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R12 - Lokasi diluar Indonesia')">
                  {{ 'R12 - Lokasi diluar Indonesia' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R13 - User tidak bekerja')">
                  {{ 'R13 - User tidak bekerja' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R14 - User tidak dapat dihubungi')">
                  {{ 'R14 - User tidak dapat dihubungi' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R15 - User memberikan informasi yang tidak benar')">
                  {{ 'R15 - User memberikan informasi yang tidak benar' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R16 - Lain-lain')">
                  {{ 'R16 - Lain-lain' }}
                </li>
              </ul>
              <ul v-if="confirmData.reasonType == 'Fraud'">
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R17 - Fraud - Dokumen - KTP Edit/Identitas selain E-KTP Asli/Foto diambil dari media lain/KTP cocok dengan orang lain')">
                  {{ 'R17 - Fraud - Dokumen - KTP Edit/Identitas selain E-KTP Asli/Foto diambil dari media lain/KTP cocok dengan orang lain' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R18 - Fraud - Selfie - Selfie edit/tidak selfie/Menggunakan KTP orang lain')">
                  {{ 'R18 - Fraud - Selfie - Selfie edit/tidak selfie/Menggunakan KTP orang lain' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R19 - Fraud - Email - Email sementara/bounce email')">
                  {{ 'R19 - Fraud - Email - Email sementara/bounce email' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R20 - Fraud - Lokasi - Lokasi tidak cocok')">
                  {{ 'R20 - Fraud - Lokasi - Lokasi tidak cocok' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R21 - Fraud - Kontak darurat - Kontak darurat tidak valid')">
                  {{ 'R21 - Fraud - Kontak darurat - Kontak darurat tidak valid' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R22 - Fraud - Ewallet - Ewallet terdaftar nama orang lain')">
                  {{ 'R22 - Fraud - Ewallet - Ewallet terdaftar nama orang lain' }}
                </li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b break-all" @click="selectReasonOpt('R23 - Fraud - Lain-lain (Muncul tombol untuk menambahkan Freetext)')">
                  {{ 'R23 - Fraud - Lain-lain (Muncul tombol untuk menambahkan Freetext)' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="confirmData.reason == 'R16 - Lain-lain'" class="input-div">
      <textarea 
        cols="30" 
        rows="2" 
        class="comment-textarea" 
        :class="{
          'error' : errStatus == 'comment'
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
          'bg-successBtn' : requestData.type == 'approve',
          'bg-dangerBtn' : requestData.type == 'reject',
          'bg-warningBtn' : requestData.type == 'incomplete',
        }"
        @click.prevent="submitConfirm"
      >
        {{ requestData.type == 'approve' ? 'Approve' : requestData.type == 'reject' ? 'Reject' : 'Jadikan user Incomplete'}}
      </button>
    </div>

    <div v-if="errStatus != 'none'" class="rounded-full p-3 absolute bg-white -bottom-24"
      :class="{
        'w-68 left-32' : errStatus == 'both-reject' || errStatus == 'reason',
        'w-68 left-28' : errStatus == 'reason-type' || errStatus == 'comment',
        'w-68 left-24' : errStatus == 'limit',
      }"
    >
      <div class="flex items-center">
        <div class="img-container mr-4">
          <img :src="'../../assets/img/red-circle-times.png'" class="w-8" alt="">
        </div>
        <p class="text-sm">
          {{
            errStatus == 'limit' ?
              'Kamu belum memilih limit'
            : errStatus == 'comment' ?
              'Kamu belum memasukkan alasan'
            : errStatus == 'both-reject' || errStatus == 'reason' ?
              'Kamu belum memilih alasan'
            : 
              'Kamu belum memilih tipe alasan'
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
    requestData: {
      type: Object,
      required: false,
    },
    user: Object,
    admin: Object,
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
      confirmData:  {
        comment: '',
        approvedLimit: '',
        reasonType: '',
        reason: '',
      },
      commentVal: '',
      errStatus: 'none', // 'none', 'limit', 'reason', 'reason-type', 'both-reject', 'comment',  'all'
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
    selectReasonTypeOpt(opt)	{
      let vm = this;
      vm.confirmData.reasonType = opt;
      vm.isShowFraudDrop = false;
      console.log(vm.confirmData);
      vm.$forceUpdate();
    },
    selectLimitDrop(opt){
      let vm = this
      vm.confirmData.approvedLimit = opt;
      vm.isShowLimitDrop = false;
    },
    submitConfirm(){
      let vm = this
      if(vm.requestData.type == 'approve'){
        if(vm.confirmData.approvedLimit == ''){
          vm.errStatus = 'limit';
          return false;
        }
        vm.errStatus = 'none';
        vm.approveUser();
      }
      if(vm.requestData.type == 'reject'){
        if(vm.confirmData.reasonType == '' && vm.confirmData.reason == ''){
          vm.errStatus = 'both-reject';
          return false;
        }
        if(vm.confirmData.reasonType == ''){
          vm.errStatus = 'reason-type';
          return false;
        }
        if(vm.confirmData.reason == ''){
          vm.errStatus = 'reason';
          return false;
        }
        if(vm.confirmData.reason == 'R16 - Lain-lain'){
          if(vm.confirmData.comment == ''){
            vm.errStatus = 'comment';
            return false;
          }
        }
        vm.errStatus = 'none';
        vm.rejectUser();
      }
      if(vm.requestData.type == 'incomplete'){
        vm.incompleteUser(); 
      }
    },
    updateUserStatus(text){
      let vm = this
      let params = {
        user: vm.user._id,
        text: text != 'Incomplete' ? text + ` by ${vm.admin.username}` : `Set to Incomplete by ${vm.admin.username}`,
        commentBy: vm.admin.username
      }
      console.log(params);
      axios.post(`api/users/comment-review-status`, params, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          vm.toggleLoader(false);
          vm.$router.go(-1);
          localStorage.setItem('emitUserRequestStatus', JSON.stringify({ type: vm.requestData.type, name: vm.user.detail.name }));
        })
        .catch((err) => {
          console.log(err);
          vm.$swal('Error!', err, 'error')
          vm.toggleLoader(false);
        })
    },
    approveUser(){
      let vm = this
      let params = {
        user: vm.user._id,
        description: '',
        limit: 0
      }
      let url = `/api/users/activatinguser`
      vm.toggleLoader(true, 'Loading data');
      axios.post(url, params, vm.requestedHeaders)
        .then((res)	=>	{
          console.log(res);
          if (res.data.status == 6) {
            vm.updateUserStatus('Approved');
          }
        })
        .catch((err)	=>	{
          console.log(err);
          vm.$swal('Error!', err, 'error')
          vm.toggleLoader(false);
        })
    },
    rejectUser(){
      let vm = this
      let params = {
        user: vm.user.mobileNumber,
        description: vm.note,
        type: '',
        reason: '',
      }
      let url = `/api/users/reject`
      vm.toggleLoader(true, 'Loading data');
      axios.post(url, params, vm.requestedHeaders)
        .then((res)	=>	{
          console.log(res);
          if (res.data.message == 'User has been rejected') {
            vm.updateUserStatus('Rejected');
          }
        })
        .catch((err)	=>	{
          console.log(err);
          vm.$swal('Error!', err, 'error')
          vm.toggleLoader(false);
        })
    },
    incompleteUser(){
      let vm = this
      // let params = {
      //   user: vm.user._id,
      //   description: '',
      // }
      // let url = `/api/users/reject`
      // vm.toggleLoader(true, 'Loading data');
      // axios.post(url, params, vm.requestedHeaders)
      //   .then((res)	=>	{
      //     console.log(res);
          vm.$swal('No API yet.');
          // vm.updateUserStatus('Incomplete');
          vm.$router.go(-1);
          localStorage.setItem('emitUserRequestStatus', JSON.stringify({ type: vm.requestData.type, name: vm.user.detail.name }));
        // })
        // .catch((err)	=>	{
        //   console.log(err);
        //   vm.$swal('Error!', err, 'error')
        //   vm.toggleLoader(false);
        // })
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
