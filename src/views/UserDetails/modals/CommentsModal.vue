<template>
  <div>
    <div v-if="false" class="text-center mb-5">
      <img :src="'../../assets/img/message-icon.png'" class="w-28" alt="">
      <p class="text-center text-lg my-4">Belum ada yang<br>komentar sebelumnya</p>
    </div>

    <div class="mb-5">
      <div class="flex flex-col p-4 mb-4 bg-gray-100 rounded-lg">
        <div class="flex items-center">
          <div class="w-8 h-8">
            <img :src="'../../assets/img/sample-avatar.png'" class="w-full h-full rounded-full border" alt="">
          </div>
          <p class="flex-1 text-base mx-3">
            {{ 'Jamie C' }}
          </p>
          <span class="text-sm text-gray-500" v-bind:class="{'text-right' : true}">
            {{ '2020-08-08' | moment('from', 'now') }}
          </span>
        </div>
        <div class="flex">
          <div class="w-8 mr-3"></div>
          <p class="flex-1 text-sm mt-2">
            {{ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et hendrerit magna. Fusce vulputate tincidunt quam, at tempor felis. Pellentesque vulputate nulla sit amet dignissim vestibul.' }}
          </p>
        </div>
      </div>

      <div class="flex flex-col p-4 mb-4 bg-gray-100 bg-current-user rounded-lg">
        <div class="flex items-center" v-bind:class="{'flex-row-reverse' : true}">
          <div class="w-8 h-8">
            <img :src="'../../assets/img/sample-avatar.png'" class="w-full h-full rounded-full border" alt="">
          </div>
          <p class="flex-1 text-base mx-3" v-bind:class="{'text-right' : true}">
            {{ 'Jamie C' }}
          </p>
          <span class="text-sm text-gray-500">
            {{ '2020-08-08' | moment('from', 'now') }}
          </span>
        </div>
        <div class="flex">
          <div v-if="false" class="w-8 mr-3"></div>
          <p class="flex-1 text-sm mt-2">
            {{ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et hendrerit magna. Fusce vulputate tincidunt quam, at tempor felis. Pellentesque vulputate nulla sit amet dignissim vestibul.' }}
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
      ></textarea>
    </div>

    <div class="text-right mt-5">
      <button @click.prevent="closeModal(false, 'comment')" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-sm">Kembali</button>
      <button class="btn px-6 py-3 mx-1 bg-primaryBtn text-white rounded-md text-sm">Kirim Komentar</button>
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
  .comment-textarea{
    @apply w-full rounded-md text-sm py-4 px-4 outline-none border-2 border-gray-200 #{!important};
  }
  .bg-current-user{
    @apply bg-sidemenuChildBgColor #{!important};
  }
</style>
