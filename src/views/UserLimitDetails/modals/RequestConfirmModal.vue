<template>
  <div>

    <p class="text-sm mt-2 mb-4">Kamu yakin menyetujui pengajuan limit dari:</p>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm font-bold">{{ 'Jeff Benzos' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Limit Sekarang <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm">{{ '2000000' | currency }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Pengajuan Limit baru <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm text-violet font-bold">{{ '5000000' | currency }}</p>
    </div>

    <div>
      <div class="flex mb-3 items-center">
        <label for="" class="flex-1 text-sm text-gray-700 relative">Limit yang disetujui <span class="absolute top-0 right-2 font-bold">:</span></label>
        <!-- <p class="flex-1 text-sm text-voilet">{{ '5000000' | currency }}</p> -->
        <div class="flex-1">
          <div class="relative select-limit-drop">
            <div class="border-b w-36 py-1 text-sm relative cursor-pointer" :class="{'text-gray-400' : true}" @click="toggleLimitDrop()">
              Pilih Limit
              <svg class="text-gray-500 w-4 absolute top-1.5 right-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div v-if="isShowLimitDrop" class="w-36 absolute -bottom-48 left-0 bg-gray-100 px-2 text-left">
              <ul>
                <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '1000000' | currency }}</li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b text-gray-300">{{ '2000000' | currency }}</li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '3000000' | currency }}</li>
                <li class="cursor-pointer text-sm px-1 py-2 border-b">{{ '4000000' | currency }}</li>
                <li class="cursor-pointer text-sm px-1 py-2">{{ '5000000' | currency }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-div">
      <div class="flex mb-2">
        <label for="" class="flex-1 text-sm text-gray-700 relative">Alasan <span class="absolute top-0 right-2 font-bold">:</span></label>
        <p class="flex-1 text-sm text-right text-dangerMsg">{{ 'wajib' }}</p>
      </div>
      <textarea 
        cols="30" 
        rows="3" 
        class="comment-textarea" 
        style="resize: none;" 
        placeholder="Tulis disini"
      ></textarea>
    </div>

    <div class="text-right mt-5">
      <button @click.prevent="closeModal(false, 'process')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Batal</button>
      <button 
        class="btn px-6 py-3 mx-1 text-white font-bold rounded-md text-sm"
        :class="{
          'bg-successBtn' : false,
          'bg-dangerBtn' : true,
        }"
      >
        {{ false ? 'Approve' : 'Reject' }}
      </button>
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
    toggleLimitDrop() {
      let vm = this
      vm.isShowLimitDrop = vm.isShowLimitDrop ? false : true;
    },

  }
}
</script>

<style lang="scss" scoped>
  .comment-textarea{
    @apply w-full rounded-md text-sm py-4 px-4 outline-none border-2 border-gray-200 #{!important};
  }
</style>
