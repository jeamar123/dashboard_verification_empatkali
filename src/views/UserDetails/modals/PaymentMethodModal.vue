<template>
  <div>

    <div class="select-opt flex mt-2 mb-5">
      <div class="flex-1 border-gray-500 font-bold text-gray-800 text-center pb-4 mr-2 text-lg cursor-pointer"
        @click="selectOption('card')"
        :class="{
          'border-b-4 border-violet text-violet' : selectedOpt == 'card',
          'border-b-2': selectedOpt != 'card',
        }"
      >
        Kartu Debit/ Kredit
      </div>
      <div class="flex-1 border-gray-500 font-bold text-gray-800 text-center pb-4 ml-2 text-lg cursor-pointer"
        @click="selectOption('instant')"
        :class="{
          'border-b-4 border-violet text-violet' : selectedOpt == 'instant',
          'border-b-2': selectedOpt != 'instant',
        }"
      >
        Pembayaran Instan
      </div>
    </div>

    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Tipe</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Nomor {{ selectedOpt == 'card' ? 'Kartu' : 'HP' }}</th>
          <th v-if="selectedOpt == 'instant'" class="font-bold py-2 pr-2 text-sm border-b-2">Saldo</th>
          <th class="font-bold py-2 pr-2 text-sm border-b-2">Sama dengan user lain</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="selectedOpt == 'card' && user.card.length == 0">
          <td colspan="3" class="text-center py-8 pr-2 text-sm font-bold">No record</td>
        </tr>
        <tr v-for="list in (selectedOpt == 'card' ? user.card : 1)" :key="list.index">
          <td class="py-2 pr-2 text-sm font-bold">
            {{ selectedOpt == 'card' ? 'Kartu Debit' : user.danaVerifiedAccount ? 'Pembayaran Instan' : 'User not yet validate DANA Account' }}
            <img v-if="selectedOpt == 'card'" :src="'../../assets/img/visa.png'" class="w-8 ml-2 block inline-block" alt="">
            <img v-if="selectedOpt != 'card' && user.danaVerifiedAccount" :src="'../../assets/img/dana.png'" class="w-14 ml-2 block inline-block" alt="">
          </td>
          <td class="py-2 pr-2 text-sm" :class="{'border-b' : false}">
            {{ selectedOpt == 'card' ? 
                (list.masked ? list.masked : '---') 
              : user.mobileNumber
            }}
          </td>
          <td v-if="selectedOpt == 'instant'" class="py-2 pr-2 text-sm" :class="{'border-b' : false}">
            {{ user.danaData.dana | currency }}
          </td>
          <td class="py-2 pr-2">
            <div 
              class="count-badge rounded-2xl py-1 text-center w-16 inline-block text-white font-bold text-sm"
              :class="{
                'border-b' : false,
                'bdg-status--success' : true,
                'bdg-status--warning' : false,
                'bdg-status--danger' : false,
              }"
            >
              {{ 'No' }}
            </div>
          </td>
        </tr>
        <tr v-if="false">
          <td></td>
          <td :colspan="selectedOpt == 'card' ? 3 : 4">
            <div class="border-2 border-dangerBtn bg-dangerDiv px-3 py-1 rounded-xl my-2">
              <table class="w-full">
                <thead>
                  <tr>
                    <th class="pr-3 py-2 text-xs text-gray-500">
                      Nama
                    </th>
                    <th class="pr-3 py-2 text-xs text-gray-500">
                      Nomor HP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pr-3 py-2 text-sm text-violet font-bold ">{{true ? '---' : 'Lorem Ipsum'}}</td>
                    <td class="pr-3 py-2 text-sm">{{true ? '---' : '087888091699'}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="(selectedOpt == 'card' && user.card.length != 0) || (selectedOpt != 'card' && user.danaVerifiedAccount)" class="flex text-sm py-3 border-t">
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
      selectedOpt: 'card'
  	}
  },
  created() {
    console.log(this.user);
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

    selectOption(opt)  {
      let vm = this
      vm.selectedOpt = opt;
    },

  }
}
</script>

<style lang="scss" scoped>
  .bdg-status{
    &--success{
      background-color:#58DA90;
    }
    &--warning{
      background-color:#F7C848; 
    }
    &--danger{
      background-color: #EB5757; 
    }
    &--info{
      background-color: #39A0FD;
    }
    &--blacklist{
      background-color: #353D46;
    }
  }

  .bg-dangerDiv{
    background-color: #FFF9F9;
  }
</style>
