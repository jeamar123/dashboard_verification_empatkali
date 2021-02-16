<script>
	import axios from 'axios'
	import { Loader } from '../../components/Loader'
	import EditInformationModal from './modals/EditInformationModal.vue';
	import CommentsModal from './modals/CommentsModal.vue';
	import EmailModal from './modals/EmailModal.vue';
	import TransactionsModal from './modals/TransactionsModal.vue';
	import RequestConfirmModal from './modals/RequestConfirmModal.vue';

	var UserLimitDetails = {
		components: {
			EditInformationModal,
			CommentsModal,
			EmailModal,
			TransactionsModal,
			RequestConfirmModal,
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
					message: 'Loading data',
				},
				isEditInfoModalShow: false,
				isCommentModalShow: false,
				isEmailModalShow: false,
				isTransModalShow: false,
				isProcessModalShow: false,
				editInfoData:	{},
				confirmTypeSelected: '',
				confirmTitle: '',
				limitDetails: {},
				responseAFPI: {},
				adminData: {},
			}
		},
		async created() {
			let vm = this
			vm.getAdmin();
			await vm.getRequestLimitDetails();
			vm.getSideDetails();
			await vm.getUserInfo();
			vm.getTransactionDetails();
			vm.getAllTypeUserSalary();
			vm.getAFPI()

			console.log(vm.limitDetails);
		},
		methods: {
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
				vm.isTransModalShow = type == 'transactions' ? opt : false;
				vm.isProcessModalShow = type == 'process' ? opt : false;

				if(type == 'process'){
					vm.confirmTypeSelected = confirmType;
					if(confirmType == 'approve'){
						vm.confirmTitle = 'Approve Confirmation'
					}
					if(confirmType == 'approve-w-limit'){
						vm.confirmTitle = 'Approve dengan limit lain Confirmation'
					}
					if(confirmType == 'reject'){
						vm.confirmTitle = 'Reject Confirmation'
					}
					vm.limitDetails.selectedOpt = confirmType;
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
				console.log(data);
				let vm = this
				vm.isEditInfoModalShow = false;

				if(type == 'editInfo'){
					vm.getSideDetails();
				}else{
					console.log('else');
				}
				vm.loader.isShow = false;
			},
			toggleLoader(opt){
				let vm = this
				vm.loader.isShow = opt;
			},
			async getSideDetails()  {
				let vm = this
				let url = `/api/users/getUserUpdateCreditDetail/${vm.$route.params.id}`;
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						// console.log(res);
						vm.limitDetails.sideDetails = res.data.data.information ? res.data.data.information : {};
						vm.limitDetails.imageDocs = res.data.data.docs;
						vm.toggleLoader(false);
						vm.$forceUpdate();
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			/*
			* get transactions values
			*
			*/
			async getTransactionDetails()  {
				let vm = this
				let url = `/api/approvedtransactions/getusertransaction/${vm.limitDetails.user._id}`;
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						vm.limitDetails.transactionDetails = res.data.data;
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			async getUserInfo() {
				let vm = this
				let url = `/api/users/` + vm.limitDetails.user._id;
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						vm.limitDetails.otherDetails = res.data;
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			async getRequestLimitDetails() {
				let vm = this
				let url = `/api/users/getuserupdatecredit?skip=0&limit=10000`;
				vm.toggleLoader(true, 'Loading data');
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						// console.log(res.data.data);
						vm.limitDetails = vm._.find(res.data.data, { _id: vm.$route.params.id });
						vm.toggleLoader(false);
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			async getAllTypeUserSalary() {
				let vm = this;
				await axios.get(`api/usersalary`, vm.requestedHeaders)
					.then((res)	=>	{
						let userSalary = vm.limitDetails.otherDetails.detail.penghasilan
						userSalary = 'gol3' //debug userSalary
						let findSalary = res.data.filter(data => data.type == userSalary)
						vm.limitDetails.otherDetails.detail.descriptionOfsalary = findSalary[0].description //assign new object value of salary
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			/**
			 * Get AFPI data
			 */
			async getAFPI() {
				let vm = this
				await axios.get(`https://minion.empatkali.co.id/dataafpi2.php?ktp=${vm.limitDetails.user._id}`, vm.requestedHeaders)
						.then((res)	=>	{
							let extractValueFromString = vm.limitDetails.otherDetails.detail.descriptionOfsalary
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
							console.log(err);
							vm.$swal('Error!', err.message, 'error')
							vm.toggleLoader(false);
						})
			},
    }
	}
	export default UserLimitDetails
</script>