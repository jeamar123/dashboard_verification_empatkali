<template>
  <div>
    <form @submit.prevent="formValidator('frmUpdateProfile')" data-vv-scope="frmUpdateProfile">
      <div class="img-container text-center -mt-8 mb-8">
        <img :src="'../assets/img/sample-user-img.png'" class="h-32 rounded" alt="">

        <div class="flex justify-center items-center mt-4">
          <div class="img-container mr-3">
            <img :src="'../assets/img/edit.png'" class="w-4" alt="">
          </div>
          <p class="text-base">Ubah Profil</p>
        </div>
      </div>
      <div class="input-div mb-5">
        <label for="" class="font-bold mb-1 block">username</label>
        <input type="text" class="text-base" name="username" 
                v-model="updateProfileData.username"
                :class="{ 'border-dangerMsg': errors.first('frmUpdateProfile.username') }"
                v-validate="'required'" autofocus>
        <small class="text-dangerMsg mt-2 block">{{ errors.first('frmUpdateProfile.username') }}</small>
      </div>
      <div class="input-div mb-5">
        <label for="" class="font-bold mb-1 block">email</label>
        <input type="text" class="text-base" name="email" 
                v-model="updateProfileData.email"
                :class="{ 'border-dangerMsg': errors.first('frmUpdateProfile.email') }"
                v-validate="'required'">
        <small class="text-dangerMsg mt-2 block">{{ errors.first('frmUpdateProfile.email') }}</small>
      </div>

      <div class="text-right">
        <button @click.prevent="closeModal(false)" class="btn px-4 py-2 mx-1 text-violet font-bold rounded-md text-base">Kembali</button>
        <button class="btn px-12 py-3 mx-1 font-bold bg-primaryBtn text-white rounded-md text-base">Simpan</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    closeModal: Function,
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
      updateProfileData: {},
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
					// vm.saveProfile();
				}
			})
    },

    /**
		 * Save
		 */
		saveProfile() {
      let vm = this
      vm.toggleLoader(true);
      axios.post(`${process.env.VUE_APP_API_URL}/api/usersalary`, vm.updateProfileData, vm.requestedHeaders )
      .then(res => {
        vm.$swal('Success!', 'Profile Updated!', 'success')
        vm.addFeeSuccess(res.data, 'add');
      })
      .catch(err => {
        vm.toggleLoader(false);
        vm.$swal('Error!', err.response.data.message, 'error')
      })
		},
  }
}
</script>

<style lang="scss" scoped>
  .input-div input{
    @apply border-0 border-b-2 text-gray-500 border-gray-300 rounded-none px-0 py-2;
  }
</style>
