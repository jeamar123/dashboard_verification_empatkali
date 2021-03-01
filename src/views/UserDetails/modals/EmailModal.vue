<template>
  <div>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="font-bold py-2 pr-8 text-sm border-b-2 ">Subject</th>
          <th class="font-bold py-2 pr-8 text-sm border-b-2">Status</th>
          <th class="font-bold py-2 pr-8 text-sm border-b-2" style="width: 110px">Tanggal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="user.emailLogs.length == 0">
          <td colspan="3" class="py-5 pr-8 text-sm text-center">No Record</td>
        </tr>
        <tr v-for="list in user.emailLogs" :key="list.index">
          <td class="py-2 pr-8 text-sm border-b-2">{{ list.subject ? list.subject : '---' }} </td>
          <td class="py-2 pr-8 text-sm border-b-2">{{ list.tipe ? list.tipe : '---' }}</td>
          <td class="py-2 pr-8 text-sm border-b-2">
            <div class="text-sm mb-1">
              <span>{{ list.tgl | moment('DD MMM YYYY') }}</span>
            </div>
            <div class="text-xs text-gray-500">
              <span>{{ list.tgl | moment('HH:mm:ss') }} WIB</span>
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
