<template>
  <div>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Subject</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Status</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in 5" :key="list.index">
          <td class="py-2 pr-2 text-sm border-b-2">Lorem Ipsum dolor sit amet lorem </td>
          <td class="py-2 pr-2 text-sm border-b-2">Delivered </td>
          <td class="py-2 pr-2 text-sm border-b-2">
            <div class="text-sm mb-1">
              <span>{{ new Date() | moment('DD MMM YYYY') }}</span>
            </div>
            <div class="text-xs text-gray-500">
              <span>{{ new Date() | moment('HH:mm:ss') }} WIB</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    
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
