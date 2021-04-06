<script>
	import { Header } from '../Header'
	import { Loader } from '../../components/Loader'
	import axios from 'axios';

	var UnbanOTP = {
		components:	{
			Header,
			Loader
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: process.env.VUE_APP_AUTHORIZATION,
						'x-access-token': localStorage.getItem("auth_token")
					}
				},
				loader:	{
					isShow: false,
					message: 'Loading',
				},
				phoneNumber: undefined,
				errMsg: '',
			}
		},
		created() {
		},
		methods: {
			/**
			 * Toggle Loader
			 */
			toggleLoader(opt){
				let vm = this
				vm.loader.isShow = opt;
			},
			validatePhoneNumber(number){
				let vm = this
				if(number.length > 2){
					let firstTwoDigits = [number[0], number[1]]
					if(firstTwoDigits[0] != 0 || firstTwoDigits[1] != 8){
						vm.errMsg = 'Phone number should start with the digits 08'
						return false;
					}
				}
				if(number.length > 13){
					vm.errMsg = 'Phone number should be 13 digits max.'
					return false;
				}

				vm.errMsg = '';
				return true;
			},
			unbanOtpUser(number){
				let vm = this;

				if(number == '' || !number){
					vm.errMsg = 'Please input phone number.'
					return false;
				}
				// if(number.length != 13){
				// 	vm.errMsg = 'Phone number should be 13 digits and starts with the digits 08.'
				// 	return false;
				// }

				let data = {
					user: number
				}
				vm.toggleLoader(true);
				axios.post(`api/users/unbanfromotpfailed`, data, vm.requestedHeaders)
					.then(function (response) {
						console.log(response);
						if (response.status == 200) {
							vm.phoneNumber = undefined;
							vm.errMsg = '';
							vm.$swal('Success', '', 'success');
						}
						vm.toggleLoader(false);
					})
					.catch(function (error) {
						console.log(error);
						console.log(error.response.data);
						console.log(error.response.data.message);
						vm.$swal('Error', error.response.data.message, 'error');
						vm.toggleLoader(false);
					})
			}
    }
	}
	export default UnbanOTP
</script>