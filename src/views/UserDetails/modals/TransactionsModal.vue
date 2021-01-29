<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="border-b font-bold text-xs text-left pb-3 pr-3">Nomor Transaksi</th>
          <th class="border-b font-bold text-xs text-left pb-3 pr-3">Merchant</th>
          <th class="border-b font-bold text-xs text-left pb-3 pr-3">Status Pembayaran</th>
          <th class="border-b font-bold text-xs text-left pb-3 pr-3">Total Transaksi</th>
          <th class="border-b w-5 text-right"></th>
        </tr>
      </thead>
      <tbody v-for="list in transactionsArr" :key="list.index">
        <tr class="cursor-pointer" @click="toggleTransDrop(list)">
          <td class="border-b text-xs text-left py-3 pr-3">DEUSE.16002404745331</td>
          <td class="border-b text-xs text-left py-3 pr-3">DEUSE.16002404745331</td>
          <td class="border-b text-xs text-left py-3 pr-3">DEUSE.16002404745331</td>
          <td class="border-b text-xs text-left py-3 pr-3">DEUSE.16002404745331</td>
          <td class="border-b text-right">
            <svg v-if="!list.showDrop" class="text-gray-500 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>

            <svg v-if="list.showDrop" class="text-gray-500 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </td>
        </tr>
        <tr v-if="list.showDrop">
          <td 
            v-for="(terms, index) in 4" :key="terms.index" 
            class="p-3 border-r-2 border-white align-top"
            :class="{
              'trans--success' : index == 0,
              'trans--warning' : index >= 1,
              'trans--danger' : false,
            }"
            :colspan="(index == 3) ? 2 : 1"
          >
            <p class="font-bold text-xs text-gray-500 mb-2">
              {{ index == 0 ? '1st' : index == 1 ? '2nd' : index == 2 ? '3rd' : index == 3 ? '4th' : 'N/A' }}
            </p>

            <div 
              class="rounded-2xl py-2 px-8 mb-3 text-white font-bold inline-block text-xs"
              :class="{
                'bdg-status--success' : index == 0,
                'bdg-status--warning' : index >= 1,
                'bdg-status--danger' : false,
              }"
            >{{ index == 0 ? 'Paid' : 'VA telah dibuat' }}</div>

            <div class="flex items-center mb-2">
              <div class="w-4 mr-3">
                <img :src="'../assets/img/calendar-icon.png'" class="w-full block" alt="">
              </div>
              <div class="flex-1 text-xs">
                {{ new Date( ) | moment("DD MMM YYYY") }}
              </div>
            </div>
            <div class="flex items-center mb-2">
              <div class="w-4 mr-3">
                <img :src="'../assets/img/money.png'" class="w-full block" alt="">
              </div>
              <div class="flex-1 text-xs font-bold">
                {{ '250000' | currency }}
              </div>
            </div>


            <div v-if="index > 0">
              <div class="flex mb-2">
                <label class="font-bold text-red-500 text-xs relative flex-1">Masa Berlaku Cicilan <span class="absolute top-0 right-2 font-bold text-gray-500">:</span></label>
                <p class="text-xs flex-1">
                  {{ new Date() | moment('DD MMM YYYY') }}
                </p>
              </div>
              <div class="flex mb-2">
                <label class="text-gray-500 text-xs relative flex-1">Nomor VA <span class="absolute top-0 right-2 font-bold">:</span></label>
                <p class="text-xs flex-1">
                  {{ '9884400821011432' }}
                </p>
              </div>
              <div class="flex mb-2">
                <label class="text-gray-500 text-xs relative flex-1">Masa Berlaku VA <span class="absolute top-0 right-2 font-bold">:</span></label>
                <p class="text-xs flex-1">
                  {{ new Date() | moment('DD MMM YYYY') }}
                </p>
              </div>
              <div class="flex mb-2">
                <label class="text-gray-500 text-xs relative flex-1">Reimburse <span class="absolute top-0 right-2 font-bold">:</span></label>
                <p class="text-xs flex-1">
                  {{ '0' | currency }}
                </p>
              </div>

              <button class="btn rounded-md px-8 py-2 bg-white border border-violet w-44 text-xs text-violet font-bold mt-2 mb-3">Check Payment</button>

              <div>
                <div class="input-div mb-1">
                  <select class="va-select">
                    <option value="">Select a bank</option>
                    <option value="BNI">BNI</option>
                    <option value="MANDIRI">Mandiri</option>
                    <option value="PERMATA">Permata</option>
                    <option value="BRI">BRI</option>
                  </select>
                </div>
                <button class="btn bg-violet rounded-md text-sm font-bold text-white mt-1 w-44 px-8 py-2">Generate VA</button>
              </div>
              
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
      transactionsArr:  [
        { showDrop: true }, 
        { showDrop: false },
        { showDrop: false },
        { showDrop: false },
        { showDrop: false },
        { showDrop: false },
      ]
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

    toggleTransDrop(list) {
      let vm = this
      list.showDrop = list.showDrop == true ? false : true;
      vm.$forceUpdate();
    }
  }
}
</script>

<style lang="scss" scoped>
  .trans{ 
    &--success{
      background-color: #CDF4DE;
    }
    &--warning{
      background-color: #FFF3CE; 
    }
    &--danger{
      background-color: #EB5757; 
    }
  }
  .bdg-status{
    &--success{
      background-color:#58DA90;
    }
    &--warning{
      background-color:#F7C848; 
    }
    &--danger{
      background-color: #c96969; 
    }
  }
  .va-select{
    @apply border-0 border-b text-sm bg-transparent rounded-none pl-0 w-44 pb-0;
  }
</style>
