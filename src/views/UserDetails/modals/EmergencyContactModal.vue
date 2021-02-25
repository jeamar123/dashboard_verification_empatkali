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
          <td class="py-2 pr-2 text-sm border-b-2 font-bold text-violet">{{ list.detail ? list.detail.name : '---' }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.mobileNumber ? list.mobileNumber : '---' }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.detail && list.detail.email ? list.detail.email : '---' }}</td>
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
      emailArr: [
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },

        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
        {
          detail: { name: 'A' }
        },
      ],
  	}
  },
  created() {
    this.setPaginationValues();
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
    }
  },
  methods: {
    setPaginationValues(){
      let vm = this;
      console.log(vm.emailArr);
      vm.paginationData.totalResultsRows = vm.emailArr.length;
      vm.paginationData = { ...vm.paginationData, ...{
        resultStart: vm.paginationData.currentPage,
        resultEnd: vm.paginationData.currentPage * vm.paginationData.perPage,
        totalPages: Math.ceil(vm.paginationData.totalResultsRows / vm.paginationData.perPage),
        currentPage: 1,
      }};  

      console.log(vm.paginationData);
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
