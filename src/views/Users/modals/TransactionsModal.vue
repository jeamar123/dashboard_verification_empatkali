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
          <td class="border-b text-xs text-left py-3 pr-3">{{ list.transactionNumber ? list.transactionNumber : '---' }}</td>
          <td class="border-b text-xs text-left py-3 pr-3">{{ list.store ? list.store.name : '---' }}</td>
          <td class="border-b text-xs text-left py-3 pr-3">Cicilan ke- {{ list.status == 1 ? '2nd' : list.status == 2 ? '3rd' : list.status == 3 || list.status == 4 ? '4th' : '1st' }}</td>
          <td class="border-b text-xs text-left py-3 pr-3">{{ list.total | currency }}</td>
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
            v-for="(terms, index) in list.termins" :key="terms.index" 
            class="p-3 border-r-2 border-white align-top"
            :class="{
              'trans--success' : !mapTransactionTerms(terms).btnGenerateVA,
              'trans--warning' : mapTransactionTerms(terms).btnGenerateVA,
              'trans--danger' : terms.number == 1 && !mapTransactionTerms(terms).paymentStatus,
            }"
            :colspan="(index == 3) ? 2 : 1"
          >
            <p class="font-bold text-xs text-gray-500 mb-2">
              {{ index == 0 ? '1st' : index == 1 ? '2nd' : index == 2 ? '3rd' : index == 3 ? '4th' : 'N/A' }}
            </p>

            <div 
              class="rounded-2xl py-2 px-8 mb-3 text-white font-bold inline-block text-xs"
              :class="{
                'bdg-status--success' : !mapTransactionTerms(terms).btnGenerateVA,
                'bdg-status--warning' : mapTransactionTerms(terms).btnGenerateVA,
                'bdg-status--danger' : terms.number == 1 && !mapTransactionTerms(terms).paymentStatus,
              }"
            >{{ mapTransactionTerms(terms).msg }}</div>

            <div class="flex items-center mb-2">
              <div class="w-4 mr-3">
                <img :src="'../assets/img/calendar-icon.png'" class="w-full block" alt="">
              </div>
              <div class="flex-1 text-xs">
                {{ mapTransactionTerms(terms).paid_date | moment("DD MMM YYYY") }}
              </div>
            </div>
            <div class="flex items-center mb-2">
              <div class="w-4 mr-3">
                <img :src="'../assets/img/money.png'" class="w-full block" alt="">
              </div>
              <div class="flex-1 text-xs font-bold">
                {{ mapTransactionTerms(terms).total | currency }}
              </div>
            </div>


            <div v-if="index > 0">
              <div class="flex mb-2">
                <label class="font-bold text-red-500 text-xs relative flex-1">Masa Berlaku Cicilan <span class="absolute top-0 right-2 font-bold text-gray-500">:</span></label>
                <p class="text-xs flex-1">
                  {{ terms.due.date | moment("DD MMM YYYY") }}
                </p>
              </div>
              <div class="flex mb-2">
                <label class="text-gray-500 text-xs relative flex-1">Nomor VA <span class="absolute top-0 right-2 font-bold">:</span></label>
                <p class="text-xs flex-1">
                  {{ terms.paid.payment_id ? terms.paid.payment_id : '---' }}
                </p>
              </div>
              <div class="flex mb-2">
                <label class="text-gray-500 text-xs relative flex-1">Masa Berlaku VA <span class="absolute top-0 right-2 font-bold">:</span></label>
                <p class="text-xs flex-1">
                  {{ mapTransactionTerms(terms).paid_date | moment("DD MMM YYYY") }}
                </p>
              </div>
              <div class="flex mb-2">
                <label class="text-gray-500 text-xs relative flex-1">Reimburse <span class="absolute top-0 right-2 font-bold">:</span></label>
                <p class="text-xs flex-1">
                  {{ terms.reimbursement | currency }}
                </p>
              </div>

              <button @click.prevent="checkPayment(list, terms)" class="btn rounded-md px-8 py-2 bg-white border border-violet w-44 text-xs text-violet font-bold mt-2 mb-3">Check Payment</button>

              <div>
                <div class="input-div mb-1">
                  <select class="va-select" v-model="generateVAforUnpaidInstallmentBankInput[terms._id]">
                    <option value="">Select a bank</option>
                    <option value="BNI">BNI</option>
                    <option value="MANDIRI">Mandiri</option>
                    <option value="PERMATA">Permata</option>
                    <option value="BRI">BRI</option>
                  </select>
                </div>
                <button @click.prevent="generateVAforUnpaidInstallment(list, terms)" class="btn bg-violet rounded-md text-sm font-bold text-white mt-1 w-44 px-8 py-2">Generate VA</button>
              </div>
              
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
      transactionsArr:  [],
      generateVAforUnpaidInstallmentBankInput: [],
  	}
  },
  created() {
    let vm = this
    vm.getTransactionList();
  },
  methods: {
    getTransactionList(){
      let vm = this
      vm.toggleLoader(true, 'Loading data');
      axios.get(`${process.env.VUE_APP_API_URL}/api/approvedtransactions?skip=0&limit=0&user=${vm.user._id}`, vm.requestedHeaders)
        .then(res => {
          console.log(res);
          vm.transactionsArr = res.data
          // vm.transactionsArr.map((value) =>  {
          //   value.showDrop = false;
          // });
          vm.toggleLoader(false);
        })
        .catch((err)	=>	{
          console.log(err);
          vm.$swal('Error!', err, 'error')
          vm.toggleLoader(false);
        })
    },
    toggleTransDrop(list) {
      let vm = this
      list.showDrop = list.showDrop == true ? false : true;
      vm.$forceUpdate();
    },
    /**
     * Map transaction terms
     *
     * This will just display the necessary info and filter it
     * @param  Object dat
     */
    mapTransactionTerms(dat) {
      let responseObj = {
        payment_id: dat.paid.payment_id,
        paid_date: dat.paid.date
      }

      // Compute total, that may include reimbursement, late fee, etc
      responseObj.total = ( parseFloat(dat.total) + parseFloat(dat.lateFee) ) + (dat.reimbursement)

      // reset value of select
      this.generateVAforUnpaidInstallmentBankInput[dat._id] = ''

      responseObj.btnCheckPayment = false
      responseObj.btnGenerateVA = false

      if ( dat.number !== 1 ) {
        if ( (dat.paid.status_code == 201 || dat.paid.status_code == 200) && dat.paid.status ) {
          responseObj.msg = 'Va telah dibayar'
          responseObj.dateLabel = 'Dibayar pada'
        } else if ( dat.paid.payment_id == '' && dat.paid.status_code == 201 && !dat.paid.status ) {
          responseObj.msg = 'VA belum di buat'
          responseObj.btnCheckPayment = true
          responseObj.btnGenerateVA = true
        } else if ( dat.paid.payment_id != '' && dat.paid.status_code == 201 && !dat.paid.status ) {
          responseObj.msg = 'VA telah di buat'
          responseObj.dateLabel = 'Dibuat pada'
          responseObj.btnCheckPayment = true
          responseObj.btnGenerateVA = true
        }
      } else {
        // awts
        if ( dat.paid.status ) {
          responseObj.msg = 'Paid'
          responseObj.dateLabel = 'Dibuat pada'
          responseObj.paymentStatus = true
        } else {
          responseObj.msg = 'Not Paid'
          responseObj.paymentStatus = false
        }
      }

      return responseObj
    },
    /**
     * Generate VA for unpaid installment
     * 
     * @param  ObjectId transaction
     * @param  ObjectId terminObj
     */
    generateVAforUnpaidInstallment(transaction, terminObj) {
      let vm = this

      let dataInput = {
        terminId: terminObj._id,
        bank: vm.generateVAforUnpaidInstallmentBankInput[terminObj._id],
      }

      if ( vm.generateVAforUnpaidInstallmentBankInput[terminObj._id] == '' ) {
        vm.$swal('Error!', 'Please select a bank', 'error');
        return false
      }

      vm.toggleLoader(true, 'Generating');
      axios.post(`/api/approvedtransactions/injectva/${transaction._id}`, dataInput, vm.requestedHeaders)
        .then(() => {
          // vm.getTransactionList()
          vm.toggleLoader(false);
          vm.generateVAforUnpaidInstallmentBankInput[terminObj._id] = ''
          vm.$swal('Success!', 'Successfully generated!', 'success');
        })
        .catch(function (error) {
          console.log(error);
          vm.$swal('Error!', error.response, 'error');
          console.log(error.response);
          vm.toggleLoader(false);
        })
    },

    async checkPayment(transaction, terminObj) {
      let vm = this
      let checkPaymentReq = {
                              transactionNumber: transaction.transactionNumber,
                              terminNumber: terminObj.number
                            }
      vm.toggleLoader(true, 'Checking');
      try {
        let checkPayment = await axios.post('/api/approvedtransactions/checkpayment', checkPaymentReq, vm.requestedHeaders)
        vm.toggleLoader(false);
        vm.$swal('', checkPayment.data, 'info');
      } catch (err) {
        console.log(err)
        vm.toggleLoader(false);
        vm.$swal('Error!', 'Tidak ada pembayaran untuk transaksi ini.', 'error');
      }
    },
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
      background-color:#EB5757; 
    }
  }
  .va-select{
    @apply border-0 border-b text-sm bg-transparent rounded-none pl-0 w-44 pb-0;
  }
</style>
