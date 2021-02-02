<template>
  <div>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Hit season</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Event time</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Reason Code</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Product Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in 2" :key="list.index">
          <td class="py-2 pr-2 text-sm border-b-2 font-bold">IDNumberAndName</td>
          <td class="py-2 pr-2 text-sm border-b-2">Nov 2020</td>
          <td class="py-2 pr-2 text-sm border-b-2">OVERDUE_DAYS_GREATER_THAN_90</td>
          <td class="py-2 pr-2 text-sm border-b-2">CASH_LOAN</td>
        </tr>
      </tbody>
    </table>

    <div class="flex text-sm py-3">
      <div class="flex-1 flex font-bold">
        <span class="mr-1">Terlihat</span>
        <span class="mr-1">{{ 1 }}-{{ 1 }}</span> 
        <span class="mr-1">dari</span>
        <span>{{ 1 }}</span>
      </div>
      <div class="flex-1 flex justify-end pr-5">
        <div 
          v-for="(list) in 1" 
          :key="list.index" 
          class="font-bold px-2 cursor-pointer"
          v-bind:class="{'text-violet' : list != 1}" 
        >{{ list }}</div>
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
