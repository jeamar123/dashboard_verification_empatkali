<script>
	import axios from 'axios'
	import EditInformationModal from '../modals/EditInformationModal.vue';
	import CommentsModal from '../modals/CommentsModal.vue';
	import RequestConfirmModal from '../modals/RequestConfirmModal.vue';
	import EmailModal from '../modals/EmailModal.vue';
	import EmergencyContactModal from '../modals/EmergencyContactModal.vue';
	import PaymentMethodModal from '../modals/PaymentMethodModal.vue';
	import LocationModal from '../modals/LocationModal.vue';
	import BlacklistModal from '../modals/BlacklistModal.vue';
	import FotoKtpModal from '../modals/FotoKtpModal.vue';
	import SelfieKtpModal from '../modals/SelfieKtpModal.vue';
	import CompareKTPModal from '../modals/CompareKTPModal.vue';

	import { InsideSpinner } from '../../../components/InsideSpinner'

	var Rejected = {
		components: {
			EditInformationModal,
			CommentsModal,
			RequestConfirmModal,
			EmailModal,
			EmergencyContactModal,
			PaymentMethodModal,
			LocationModal,
			BlacklistModal,
			FotoKtpModal,
			SelfieKtpModal,
			CompareKTPModal,
			InsideSpinner
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
					message: 'Loading data',
				},
				isEditInfoModalShow: false,
				isCommentModalShow: false,
				isEmailModalShow: false,
				isProcessModalShow: false,
				isEmergencyContactModalShow: false,
				isPaymentMethodModalShow: false,
				isLocationModalShow: false,
				isBlacklistModalShow: false,
				isFotoKtpModalShow: false,
				isSelfieKtpModalShow: false,
				isCompareKTPModalShow: false,
				editInfoData:	{},
				confirmTypeSelected: '',
				confirmTitle: '',
				userDetails: {},
				responseAFPI: {},
				adminData: {},
				requestData: {},
			}
		},
		async created() {
			console.log(this.$route.params.id);
			let vm = this
			await vm.getUserDetails();
			await vm.getUserOcrData();
			await vm.getAllTypeUserSalary();
			await vm.getAFPI();
			
			vm.getAdmin()
			console.log(vm.userDetails);
		},
		methods: {
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
      toggleModals(opt, type, confirmType)	{
				let vm = this;
				vm.isEditInfoModalShow = type == 'editInfo' ? opt : false;
				vm.isCommentModalShow = type == 'comment' ? opt : false;
				vm.isEmailModalShow = type == 'email' ? opt : false;
				vm.isProcessModalShow = type == 'process' ? opt : false;
				vm.isEmergencyContactModalShow = type == 'emergencyContact' ? opt : false;
				vm.isPaymentMethodModalShow = type == 'paymentMethod' ? opt : false;
				vm.isLocationModalShow = type == 'location' ? opt : false;
				vm.isBlacklistModalShow = type == 'blacklist' ? opt : false;
				vm.isFotoKtpModalShow = type == 'fotoKtp' ? opt : false;
				vm.isSelfieKtpModalShow = type == 'selfieKtp' ? opt : false;
				vm.isCompareKTPModalShow = type == 'compareKTP' ? opt : false;

				if(type == 'process'){
					vm.confirmTypeSelected = confirmType;
					if(confirmType == 'approve'){
						vm.confirmTitle = 'Approve Confirmation'
						vm.requestData.type = 'approve';
					}
					if(confirmType == 'incomplete'){
						vm.confirmTitle = 'Jadikan user Incomplete Confirmation'
						vm.requestData.type = 'incomplete';
					}
					if(confirmType == 'reject'){
						vm.confirmTitle = 'Reject Confirmation'
						vm.requestData.type = 'reject';
					}
				}
				if(type == 'editInfo'){
					let obj	=	{
						id: 1,
						name: 'a',
						idNumber: 'a',
						birthPlace: 'a',
						dob: new Date(),
						gender: 'a',
						occupation: 'a',
						bloodType: 'a',
						address: 'a',
						rtrw: 'a',
						city: 'a',
						province: 'a',
						village: 'a',
						district: 'a',
						religion: 'a',
						maritalStatus: 'a',
						nationality: 'a',
						expiryDate: new Date(),
					}
					vm.editInfoData = opt ? obj : {};
				}
			},
			refreshData(data, type)	{
				let vm = this
				vm.isEditInfoModalShow = false;

				if(type == 'editInfo'){
					console.log(data);
				}else{
					console.log('else');
				}
				vm.loader.isShow = false;
			},
			/** Toggle Parent Loader */
			toggleLoader(opt, msg){
				let vm = this
				vm.$parent.toggleLoader(opt, msg);
			},
			async getUserDetails(){
				let vm = this
				let url = `/api/users/${vm.$route.params.id}`
				vm.toggleLoader(true, 'Loading data');
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						console.log(res);
						vm.userDetails = res.data;
						vm.toggleLoader(false);
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err, 'error')
						vm.toggleLoader(false);
					})
			},
			async getUserOcrData(){
				let vm = this
				// let url = `/api/users//${vm.$route.params.id}`
				// await axios.get(url, vm.requestedHeaders)
				// 	.then((res)	=>	{
				// 		console.log(res);
						vm.userDetails.ocrData = {};
						vm.$forceUpdate();
					// })
					// .catch((err)	=>	{
					// 	console.log(err);
					// 	vm.$swal('Error!', err, 'error')
					// 	vm.toggleLoader(false);
					// })
			},
			async getAllTypeUserSalary() {
				let vm = this
				await axios.get(`api/usersalary`, vm.requestedHeaders)
					.then((res)	=>	{
						console.log(res);
						let userSalary = vm.userDetails.detail.penghasilan
						let findSalary = res.data.filter(data => data.type == userSalary)
						vm.userDetails.detail.descriptionOfsalary = findSalary[0].description //assign new object value of salary
					})
					.catch((err)	=>	{
						console.log(err.message);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			async getAFPI() { // Get AFPI data
				let vm = this
				await axios.get(`https://minion.empatkali.co.id/dataafpi2.php?ktp=${vm.$route.params.id}`)
					.then((res)	=>	{
						console.log(res);
						let extractValueFromString = vm.userDetails.detail.descriptionOfsalary
																					.replaceAll(/(rp\s)|(\.)/gi, '')
																					.replaceAll(/(\s-\s)|(<\s)|(>\s)/gi, '~')
																					.split('~')
						// This will get the median value, but for those value that has "<" and ">", just retain the
						// amount value and don't apply median formula
						let getMedian = extractValueFromString.reduce((acc, val) => {
							return isNaN(acc) ? parseInt(val) : acc + parseInt(val) / 2
						}, 0)
						vm.responseAFPI = Object.assign(res.data, { income: getMedian })
					})
					.catch((err)	=>	{
						console.log(err.message);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			getAdmin() {
				let vm = this;
				const adminLogin = vm.decodeJwt(vm.requestedHeaders.headers['x-access-token'])
				axios.get(`api/admins/${adminLogin._id}`, vm.requestedHeaders)
					.then(function (response) {
						if (response) {
							vm.adminData = response.data
						}
					})
					.catch(function (error) {
						console.log(error);
					})
			},
    }
	}
	export default Rejected
</script>