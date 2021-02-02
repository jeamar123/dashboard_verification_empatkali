<template>
  <div>
    <p class="text-sm mt-2 mb-4">Kamu yakin akan unfreeze user ini :</p>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nama <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm font-bold">{{ 'Jeff Benzos' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Nomor HP <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm">{{ '081998679999' }}</p>
    </div>
    <div class="flex mb-3">
      <label for="" class="flex-1 text-sm text-gray-700 relative">Email <span class="absolute top-0 right-2 font-bold">:</span></label>
      <p class="flex-1 text-sm">{{ 'elon@empatkali.co.id' }}</p>
    </div>

    <div class="text-right mt-8">
      <button @click.prevent="closeModal(false, 'comment')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Batal</button>
      <button class="btn px-6 py-3 mx-1 bg-violet font-bold text-white rounded-md text-sm">UnFreeze</button>
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
  	}
  },
  created() {
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
  
</style>
