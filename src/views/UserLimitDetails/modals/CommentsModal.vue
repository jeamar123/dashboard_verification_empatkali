<template>
  <div>
    <div v-if="commentArr.length == 0" class="text-center mb-5">
      <img :src="'../../assets/img/message-icon.png'" class="w-28" alt="">
      <p class="text-center text-lg my-4">Belum ada yang<br>komentar sebelumnya</p>
    </div>

    <div v-if="commentArr.length > 0" class="mb-5">
      <div v-for="list in commentArr" :key="list.index" class="flex flex-col p-4 mb-4 bg-gray-100 rounded-lg">
        <div class="flex items-center" v-bind:class="{'flex-row-reverse' : list.commentBy == admin.displayName}">
          <div class="w-8 h-8">
            <img :src="list.profile || '../../assets/img/users.png'" class="w-full h-full rounded-full border" alt="">
          </div>
          <p class="flex-1 text-base mx-3" v-bind:class="{'text-right' : list.commentBy == admin.displayName}">
            {{ list.commentBy }}
          </p>
          <span class="text-sm text-gray-500" v-bind:class="{'text-right' : list.commentBy != admin.displayName}">
            {{ list.createdAt | moment('from', 'now') }}
          </span>
        </div>
        <div class="flex">
          <div v-if="list.commentBy != admin.displayName" class="w-8 mr-3"></div>
          <p class="flex-1 text-sm mt-2">
            {{ list.text }}
          </p>
        </div>
      </div>
    </div>


    <div class="input-div">
      <textarea 
        cols="30" 
        rows="4" 
        class="comment-textarea" 
        style="resize: none;" 
        placeholder="Tulis disini"
        v-model="commentVal"
      ></textarea>
    </div>

    <div class="text-right mt-5">
      <button @click.prevent="closeModal(false, 'comment')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Kembali</button>
      <button @click="submitComment()" class="btn px-6 py-3 mx-1 bg-primaryBtn text-white rounded-md text-sm">Kirim Komentar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    closeModal: Function,
    requestSuccess: Function,
    toggleLoader: Function,
    user: Object,
    admin: Object,
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem("auth_token")
        }
      },
      commentVal: '',
      commentArr: [],
  	}
  },
  created() {
    let vm = this
    vm.getCommentList();
  },
  methods: {
    async getCommentList()  {
      let vm = this
      vm.toggleLoader(true, 'Loading data');
      axios.get(`api/users/commentupdatecredit/${vm.user._id}`, vm.requestedHeaders)
        .then(res => {
          vm.commentArr = res.data.data;
          vm.toggleLoader(false);
        })
        .catch(err => {
          console.log(err)
          vm.$swal('Error!', err.message, 'error');
          vm.toggleLoader(false);
        })
    },
    submitComment() {
      let vm = this

      if( vm.commentVal == '' ){
        vm.$swal('Error!', 'Comment is required.', 'error');
        return false;
      }
      
      let params  = {
        comment: vm.commentVal,
      }
      vm.toggleLoader(true);
      axios.post(`api/users/commentupdatecredit/${vm.user._id}`, params, vm.requestedHeaders)
        .then(() => {
          // vm.dataPendukung = res.data
          vm.commentVal = '';
          vm.getCommentList();
          vm.toggleLoader(false);
        })
        .catch(err => {
          console.log(err)
          vm.$swal('Error!', err.message, 'error');
          vm.toggleLoader(false);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment-textarea{
    @apply w-full rounded-md text-sm py-4 px-4 outline-none border-2 border-gray-200 #{!important};
  }
  .bg-current-user{
    @apply bg-sidemenuChildBgColor #{!important};
  }
</style>
