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
        <tr v-if="user.isUsedAsEmergencyContact.length == 0">
          <td colspan="3" class="text-center py-8 pr-2 text-sm font-bold">No record</td>
        </tr>
        <tr v-for="list in paginateArray" :key="list.index">
          <td class="py-2 pr-2 text-sm border-b-2 font-bold text-violet">{{ list.detail ? list.detail.name : '---' }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.mobileNumber ? list.mobileNumber : '---' }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.detail && list.detail.email ? list.detail.email : '---' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="user.isUsedAsEmergencyContact && user.isUsedAsEmergencyContact.length > 0" class="flex text-sm py-3">
      <div class="flex-1 flex font-bold">
        <span class="mr-1">Terlihat</span>
        <span class="mr-1">{{ paginationData.resultStart }}-{{ paginationData.resultEnd }}</span> 
        <span class="mr-1">dari</span>
        <span>{{ paginationData.totalResultsRows }}</span>
      </div>
      <div class="flex-1 flex justify-end pr-5">
        <div v-if="paginationData.currentPage > 1" @click="changePage('prev')" class="cursor-pointer">
          <svg class="w-5 text-violet" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div 
          v-if="paginationData.currentPage > paginationCount"
          class="font-bold px-1 h-5 cursor-pointer text-violet"
          @click="selectPage(1)"
        >1</div>
        <div 
          v-if="paginationData.currentPage > paginationCount"
          class="font-bold text-lg h-5 leading-none tracking-widest text-violet"
        >...</div>

        <div 
          v-for="list in paginateTotalPages" 
          :key="list.index" 
          class="font-bold px-1 mx-1 h-5 cursor-pointer"
          v-bind:class="{
            'text-violet' : list != paginationData.currentPage,
          }" 
          @click="selectPage(list)"
        >{{ list }}</div>

        <div 
          v-if="paginationData.totalPages > 10 && (paginationData.totalPages - paginationData.currentPage >= paginationData.totalPages % paginationCount)"
          class="font-bold text-lg h-5 leading-none tracking-widest text-violet"
        >...</div>
        <div 
          v-if="paginationData.totalPages > 10 && (paginationData.totalPages - paginationData.currentPage >= paginationData.totalPages % paginationCount)"
          class="font-bold px-1 h-5 cursor-pointer text-violet"
          @click="selectPage(paginationData.totalPages)"
        >{{ paginationData.totalPages }}</div>
        <div v-if="paginationData.currentPage < paginationData.totalPages" @click="changePage('next')" class="cursor-pointer">
          <svg class="w-5 text-violet" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
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
      paginationData:	{
        totalResultsRows: 1,
        currentPage: 1,
        perPage: 10,
        resultStart: 1,
        resultEnd: 1,
        totalPages: 1,
      },
      paginationCount: 10,
  	}
  },
  created() {
  },
  computed: {
    paginateTotalPages: function() {
      let vm = this
      if(vm.paginationData.totalPages > vm.paginationCount){
        let pagiArr = [];
        let chunkArr = vm._.chunk([...Array(vm.paginationData.totalPages).keys()], 10);
        pagiArr = chunkArr[vm._.findIndex(chunkArr, function(el) { return el.includes(vm.paginationData.currentPage-1)})];
        pagiArr = pagiArr.map(v => v+1);
        if(pagiArr[pagiArr.length - 1] < vm.paginationData.totalPages){
          pagiArr.push( pagiArr[pagiArr.length - 1] + 1 );
        }
        return pagiArr;
      }else{
        return vm.paginationData.totalPages;
      }
    },
    paginateArray:  function(){
      let vm = this
      let arr = vm.user.isUsedAsEmergencyContact;
      if(arr.length > 0){
        let chunkArr = vm._.chunk(arr, vm.paginationData.perPage);
        let startCount = (vm.paginationData.currentPage * vm.paginationData.perPage) - vm.paginationData.perPage + 1;
        let endCount = startCount + chunkArr[vm.paginationData.currentPage-1].length - 1;
        vm.paginationData.totalResultsRows = arr.length;
        vm.paginationData = { ...vm.paginationData, ...{
          resultStart: startCount,
          resultEnd: endCount,
          totalPages: Math.ceil(vm.paginationData.totalResultsRows / vm.paginationData.perPage),
        }};  
        return chunkArr[vm.paginationData.currentPage-1];
      }else{
        return [];
      }
      
    }
  },
  methods: {
    selectPage(page)  {
      let vm = this
      vm.paginationData.currentPage = page;
    },
    changePage(opt)  {
      let vm = this
      vm.paginationData.currentPage = opt == 'prev' ? vm.paginationData.currentPage-1 : vm.paginationData.currentPage+1;
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
