<template>
  <div>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Namar</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Nomor HP</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in user.isUsedAsEmergencyContact" :key="list.index">
          <td class="py-2 pr-2 text-sm border-b-2 font-bold text-violet">Lorem Ipsum</td>
          <td class="py-2 pr-2 text-sm border-b-2">087888091699</td>
          <td class="py-2 pr-2 text-sm border-b-2">loremipsum@gmail.com</td>
        </tr>
      </tbody>
    </table>

    <!-- <div class="flex text-sm py-3">
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
    </div> -->
    
  </div>
</template>

<script>
// import axios from 'axios'

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
