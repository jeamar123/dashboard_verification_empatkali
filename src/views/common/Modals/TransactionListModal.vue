<template>
  <div>
   

    <div class="text-right mt-5">
      <button @click.prevent="closeModal(false, 'comment')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Kembali</button>
      <button class="btn px-6 py-3 mx-1 bg-primaryBtn text-white rounded-md text-sm">Kirim Komentar</button>
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
