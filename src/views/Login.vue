<template>
  <div class="login-container h-screen w-full">
    <Loader v-if="loader.isShow" :message="loader.message"/>

    <form @submit.prevent="login()" class="h-full">
      <div class="flex h-full">
        <div class="flex-1 bg-div">
        </div>
        <div class="login-content bg-sidemenuChildBgColor pt-36 px-12">
          <div class="text-center">
            <img :src="'../assets/img/EmpatKali_Logo.png'" alt="empatkali logo" class="mb-7 w-7/10 ">
          </div>

          <div class="mb-10 text-center ">
            <p class="text-2xl"><span class="font-bold">Verification</span> Dashboard</p>
          </div>

          <div class="input-div text-left mb-5">
            <label for="" class="font-bold mb-1 block">email/username</label>
            <input type="text" class="text-base" :class="{'error' : isEmailErr}" placeholder="Masukkan email/ username" name="username" v-model="data.body.identity" autofocus>
            
          </div>

          <div class="input-div text-left mb-5 relative">
            <label for="" class="font-bold mb-1 block">password</label>
            <input :type="isShowPassword ? 'text' : 'password'" class="text-base" :class="{'error' : isPassErr}" placeholder="Masukkan password" v-model="data.body.password" name="password">

            <span @click="togglePassword()" class="cursor-pointer absolute right-0 bottom-1">
              <img v-if="isShowPassword" :src="'../assets/img/eye.png'" class="w-8">
              <img v-if="!isShowPassword" :src="'../assets/img/eye-hide.png'" class="w-8">
            </span>
          </div>

          <a href="#" class="text-violet text-md my-3 text-left">forgot password?</a>

          <div class="text-center mt-6">
            <button class="btn px-6 py-4 bg-primaryBtn text-white rounded-md w-full font-bold">Login</button>
          </div>

          <div v-if="loginError.isShow" class="rounded-full p-2 bg-white mt-8 shadow-md">
            <div class="flex items-center">
              <div class="img-container mr-2 w-8">
                <img :src="'../../assets/img/red-circle-times.png'" class="w-full" alt="">
              </div>
              <p class="text-xs flex-1">{{ loginError.err }}</p>
            </div>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import { Loader } from '../components/Loader'
import axios from 'axios'

export default {
  components: {
    Loader
  },
  data() {
  	return {
      data: {
        body: {},
        rememberMe: false,
        fetchUser: true
      },
      loginError: {
        isShow: false,
        err: '',
      },
      isEmailErr: false,
      isPassErr: false,
      isShowPassword: false,
      loader:	{
        isShow: false,
        message: 'Preparing',
      },
  	}
  },
  created() {
  },
  methods: {
    login() {
      let vm = this

      if(!vm.data.body.identity && !vm.data.body.password){
        vm.loginError = {
          isShow: true,
          err: 'Anda belum memasukkan email/nama pengguna atau kata sandi',
        }
        vm.isEmailErr = true;
        vm.isPassErr = true;
        return false;
      }
      if(!vm.data.body.identity){
        vm.loginError = {
          isShow: true,
          err: 'Anda belum memasukkan email/nama pengguna',
        }
        vm.isEmailErr = true;
        return false;
      }else{
        vm.isEmailErr = false;
      }
      if(!vm.data.body.password){
        vm.loginError = {
          isShow: true,
          err: 'Anda belum memasukkan kata sandi',
        }
        vm.isPassErr = true;
        return false;
      }else{
        vm.isPassErr = false;
      }
      // vm.$router.push({ name: 'Users', params: { status: 'all' } });
      // let redirect = vm.$auth.redirect()
      vm.loader =	{
        isShow: true,
        message: 'Logging in',
      };
      vm.$auth
        .login({
          data: vm.data.body, // Axios
          rememberMe: true,
          redirect: '/users/all',
          fetchUser: false,
          headers: {
            'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'Content-Type': 'application/json'
          }
        })
        .then(
          res => {
            this.actionAdmin('Admin new login', res.data.token)
            vm.captureInfo()
            vm.loader.isShow = false;
            vm.loginError.isShow = false;
          },
          err => {
            console.log(err);
            // alert("Invalid Email/Password!");
            vm.loader.isShow = false;
            vm.$swal('Error!', 'Invalid Email/Password!', 'error' );
          }
        )
    },
    decodeJwt(paramToken) {
      const b64DecodeUnicode = str =>
      decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));

      const parseJwt = token =>
      JSON.parse(
        b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/'))
      );

      return parseJwt(paramToken)
    },
    actionAdmin(paramsAction, token) {
      let vm = this
      const adminLogin = vm.decodeJwt(token)
      delete adminLogin.iat
			delete adminLogin.mobileNumber
			delete adminLogin._id

      let actionAdmin = {
        adminLogin,
        action: paramsAction,
      }
			actionAdmin = JSON.stringify(actionAdmin)

			axios
        .post('https://mon.empatkali.co.id/cs', {
					actionAdmin
        })
        .then(res => {
					console.log('res', res)
        })
        .catch(err => {
          console.log(err.res)
        })
			// console.log('actionAdmin', actionAdmin)
    },

    // Capture information for the user who logged i.e. IP address,
    // date/time, etc
    captureInfo() {
      let vm = this

      fetch('https://api.ipify.org?format=json')
        .then(x => x.json())
        .then(({ ip }) => {
          let reqBody = {
            username: vm.data.body.identity,
            ipAddress: ip
          }
          axios
            .post('https://web-api.empatkali.co.id/admin-logger', reqBody)
            .then(() => {})
        })
    },

    togglePassword(){
      let vm = this
      vm.isShowPassword = vm.isShowPassword ? false : true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container{
    .bg-div{
      background-image: url('/assets/img/login-bg.png');
      background-size: cover;
      background-position: center;
    }
  }
  .input-div input{
    @apply border-0 rounded-none border-b-2 px-0 pt-2 pb-1 w-full bg-transparent border-gray-300 text-gray-700;

    &.error{
      @apply border-dangerMsg;
    }
  }
  .login-content{
    max-width: 400px;
  }
</style>
