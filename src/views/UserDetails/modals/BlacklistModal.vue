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
        <tr v-for="list in user.resultOfBlackList" :key="list.index">
          <td class="py-2 pr-2 text-sm border-b-2 font-bold">{{ list.hitReason ? list.hitReason : '---' }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.eventTime ? list.eventTime : '---' | moment('MMM DD') }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.reasonCode ? list.reasonCode : '---' }}</td>
          <td class="py-2 pr-2 text-sm border-b-2">{{ list.productType ? list.productType  : '---'}}</td>
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
  	}
  },
  created() {
  },
  methods: {
    

  }
}
</script>

<style lang="scss" scoped>
</style>
