<template>
  <div>
    <p class="text-sm mt-2 mb-4">Kamu yakin akan banned user ini :</p>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm font-bold">{{ user.detail ? user.detail.name : '---' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm">{{ user.mobileNumber ? user.mobileNumber : '---' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm text-violet font-bold">{{ user.detail ? user.detail.email : '---' }}</p>
    </div>

    <div class="text-right mt-8">
      <button @click.prevent="closeModal(false, 'ban')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Batal</button>
      <button @click="banUser" class="btn px-6 py-3 mx-1 bg-black font-bold text-white rounded-md text-sm">Banned</button>
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
    user: Object
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem("auth_token")
        }
      },
  	}
  },
  created() {
  },
  methods: {
    banUser(){
      let vm = this
      let data = { 
        user: vm.user._id 
      };
      vm.toggleLoader(true);
      axios.post(`/api/users/banninguser`, data, vm.requestedHeaders)
        .then((res)	=>	{
          console.log(res);
          vm.requestSuccess();
        })
        .catch((err)	=>	{
          console.log(err);
          vm.$swal('Error!', err, 'error')
          vm.toggleLoader(false);
        })
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
