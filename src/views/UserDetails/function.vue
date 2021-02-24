<script>
	import axios from 'axios'
	import { Loader } from '../../components/Loader'
	import { InsideSpinner } from '../../components/InsideSpinner'

	import EditInformationModal from './modals/EditInformationModal.vue';
	import CommentsModal from './modals/CommentsModal.vue';
	import RequestConfirmModal from './modals/RequestConfirmModal.vue';
	import EmailModal from './modals/EmailModal.vue';
	import EmergencyContactModal from './modals/EmergencyContactModal.vue';
	import PaymentMethodModal from './modals/PaymentMethodModal.vue';
	import LocationModal from './modals/LocationModal.vue';
	import BlacklistModal from './modals/BlacklistModal.vue';
	import FotoKtpModal from './modals/FotoKtpModal.vue';
	import SelfieKtpModal from './modals/SelfieKtpModal.vue';
	import CompareKTPModal from './modals/CompareKTPModal.vue';

	

	var UserDetails = {
		components: {
			Loader,
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
			let vm = this
			vm.getAdmin()
			await vm.getUserDetails();
			if(vm.getStatusValue(vm.userDetails.status) == 'incomplete' && vm.userDetails.detail || vm.getStatusValue(vm.userDetails.status) != 'incomplete'){
				vm.getAI();
				vm.getDanaBalance();
				vm.getActivityMailUSer();
				await vm.getAllTypeUserSalary();
				vm.getAllIndustry();
				vm.getAFPI();
			}
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
			},
			refreshData()	{
				let vm = this
				vm.isEditInfoModalShow = false;
				vm.loader.isShow = false;
			},
			/** Toggle Parent Loader */
			toggleLoader(opt, msg){
				let vm = this
				vm.loader = {
					isShow: opt,
					message: msg ? msg : vm.loader.message,
				}
			},
			async getUserDetails(){
				let vm = this
				let url = `/api/users/${vm.$route.params.id}`
				vm.toggleLoader(true, 'Loading data');
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						// console.log(res);
						vm.userDetails = res.data;
						vm.toggleLoader(false);
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err, 'error')
						vm.toggleLoader(false);
					})
			},
			async getAllTypeUserSalary() {
				let vm = this
				await axios.get(`api/usersalary`, vm.requestedHeaders)
					.then((res)	=>	{
						// console.log(res); 
						let userSalary = vm.userDetails.detail.penghasilan
						let findSalary = res.data.filter(data => data.type == userSalary)
						vm.userDetails.detail.descriptionOfsalary = findSalary.length > 0 ? findSalary[0].description : '---'; //assign new object value of salary
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
						// console.log(res);
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
						vm.$forceUpdate();
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
			async getAI() { // This is from the old dashboard existing api
				let vm = this
				let params = { 
					userid: vm.$route.params.id 
				}
				await axios.post('https://minion.empatkali.co.id/advanceai.php', params )
					.then(res => {
						console.log(res)
						if (res.data[0]) {
							let userData = res.data[0];
							let fixName = 'empty'
							if (userData.ocr) {
								if ( JSON.parse(userData).data ) {
									vm.userDetails.ocrData = JSON.parse(userData)
									fixName = JSON.parse(userData).data.name
								}else{
									vm.userDetails.ocrData.code = JSON.parse(userData).code;
								}
							}else{
								vm.userDetails.ocrData = {};
							}

							if (userData.ktp && userData.ktp.indexOf('error') == -1) {
								let ktpCheck = JSON.parse(userData.ktp)
								vm.userDetails.ktpValidation = ktpCheck;
								if ( ktpCheck.status == "FOUND" ) {
									if (ktpCheck.name_matches){
										vm.userDetails.ktpValidation.isFoundMatch = true;
									}else{
										vm.userDetails.ktpValidation.isFoundNotMatch = true;
									}
								} else {
									vm.userDetails.ktpValidation.isNotFound = true;
								}
							}

							if (userData.npwp) {
								if (typeof userData.npwp == 'number') {
									vm.userDetails.npwpCheck = userData.npwp
								}else if (typeof userData.npwp == 'string') {
									if (userData.npwp.length <= 16) {
										vm.userDetails.npwpCheck = userData.npwp
									}else if (JSON.parse(userData.npwp).data.length > 0) {
										if (userData.npwp.length > 16) {
											vm.userDetails.npwpCheck = JSON.parse(userData.npwp).data[0].nama.toUpperCase()
										}else {
											vm.userDetails.npwpCheck = userData.npwp
										}
									}else {
										if ( JSON.parse(userData.npwp).message ) {
											vm.userDetails.npwpCheck = JSON.parse(userData.npwp).message
										}else {
											vm.userDetails.npwpCheck = userData.npwp
										}
									}
								}
							}

							vm.userDetails.gopay = userData.GOPAY ? JSON.parse(userData.GOPAY).result : null;
							vm.userDetails.ovo = userData.OVO ? JSON.parse(userData.OVO).result : null;
							vm.userDetails.linkaja = userData.LINKAJA ? JSON.parse(userData.LINKAJA).result : null;


							vm.userDetails.nameMatch = [
								{ data: 'phone', value: 0 },
								{ data: 'nameOcr', value: 0 },
								{ data: 'tele_id', value: 0 },
								{ data: 'nameNpwp', value: 0 }
							]

							let dataNameToBeCompare = {
								phone: vm.userDetails.detail.name.toUpperCase(),
								nameOcr: vm.userDetails.ocr && vm.userDetails.ocr.data ? vm.userDetails.ocr.data.name.toUpperCase() : '-',
								// tele_id: vm.userDetails.tele_check.data.name ? vm.userDetails.tele_check.data.name.toUpperCase() : vm.userDetails.tele_check.data.name = '-',
								// nameNpwp: vm.userDetails.npwpCheck ? vm.userDetails.npwpCheck.nama.toUpperCase() : '--'
								nameNpwp: vm.userDetails.npwpCheck
							}

							if (fixName == dataNameToBeCompare.phone) {
								vm.userDetails.nameMatch[0].value = 33
							}
							if (fixName == dataNameToBeCompare.nameOcr) {
								if (fixName == '') {
									vm.userDetails.nameMatch[1].value = 0
									vm.userDetails.ocr.data.name = '-'
								} else {
									vm.userDetails.nameMatch[1].value = 33
								}
							}
							if (fixName == dataNameToBeCompare.nameNpwp) {
								if (fixName != '--') {
									vm.userDetails.nameMatch[3].value = 33
								}
							}

							const sumScoreNameMatch = datas => datas.reduce((sum, data) => {
								return sum + data.value;
							}, 0);
							vm.userDetails.scoreNameMatch = {};
							vm.userDetails.scoreNameMatch.score = sumScoreNameMatch(vm.userDetails.nameMatch)

							if (vm.userDetails.scoreNameMatch.score >= 80) {
								vm.userDetails.scoreNameMatch.colorScore = '#70AD47'
							}else if (vm.userDetails.scoreNameMatch.score >= 60) {
								vm.userDetails.scoreNameMatch.colorScore = 'yellow'
							}else {
								vm.userDetails.scoreNameMatch.colorScore = 'red'
							}

							if (userData.blacklist && JSON.parse(userData.blacklist).data) {
								vm.userDetails.blacklist =  JSON.parse(userData.blacklist).data;
								vm.userDetails.resultOfBlackList = vm.userDetails.blacklist.data ? vm.userDetails.blacklist.data.defaultListResult : vm.userDetails.blacklist.defaultListResult; 
							}
							if (userData['face blacklist']) vm.userDetails.face_blackList = JSON.parse(userData['face blacklist'])
							if (userData['face comparison']) vm.userDetails.face_comparison = JSON.parse(userData['face comparison'])
							if (userData['face search']) {
									vm.userDetails.face_search = JSON.parse(userData['face search'])
									vm.userDetails.faceSeacrhResult = vm.userDetails.face_search.data
							}
							if (userData['fraud score']) {
								// console.log('fraud score', userData['fraud score'])
							}
							if (userData['trusting']) {
								vm.userDetails.trusting_social = JSON.parse(userData['trusting'])
							}
							if (userData['multi platform']) {
								if (JSON.parse(userData['multi platform']).data == null) {
									vm.userDetails.multiPlatformResult = {}
								} else {
									vm.userDetails.multi_platform = JSON.parse(userData['multi platform'])
									vm.userDetails.multiPlatformResult = vm.userDetails.multi_platform.data.statistics.statisticCustomerInfo.pop()
								}

							}
							if (userData['tele check']) {
									vm.userDetails.tele_check = JSON.parse(userData['tele check'])
									let statusTeleCheck = ''
									if (vm.userDetails.tele_check.data) {
										statusTeleCheck = vm.userDetails.tele_check.data.status
									}
									if(vm.userDetails.tele_check.data != null){
										switch (statusTeleCheck) {
											case 1:
											vm.userDetails.tele_check.data.status_msg = 'Called number has ringer'
											break;
											case 2:
											vm.userDetails.tele_check.data.status_msg = 'Empty Number'
											break;
											case 3:
											vm.userDetails.tele_check.data.status_msg = 'Busy Line'
											break;
											case 4:
											vm.userDetails.tele_check.data.status_msg = 'Powered Off'
											break;
											case 5:
											vm.userDetails.tele_check.data.status_msg = 'Not Available'
											break;
											case 6:
											vm.userDetails.tele_check.data.status_msg = 'Temporarily unable to connect'
											break;
											case -1:
											vm.userDetails.tele_check.data.status_msg = 'Abnormal line, unknown state'
											break;
											default:
										}
									}
									
							}
						}else {
							vm.userDetails.ocrData = {};
							console.log('advanceAI', 'data null')
						}
					})
					.catch(err => {
						console.log(err);
						vm.$swal('Error!', err.message, 'error')
						vm.toggleLoader(false);
					})
			},
			async getDanaBalance() {
				let vm = this
				const tokenAuth = vm.decodeJwt(vm.requestedHeaders.headers['x-access-token'])
				let params = {
					mobileNumber: vm.userDetails.mobileNumber,
					'detail.email': vm.userDetails.detail.email,
					'ktp.number': vm.userDetails.ktp.number,
					npwp: vm.userDetails.npwp,
					'detail.name': vm.userDetails.detail.name,
					status: vm.userDetails.status,
					adminLogin: {
						_id: tokenAuth._id,
						email: tokenAuth.email
					}
				}
				await axios.post('https://minion.empatkali.co.id/jhon3.php', params)
					.then(res => {
						if (res.data){
							const statusCheck = res.data.kontrak
							const detailUser = vm.userDetails.status
							vm.userDetails.danaData = {};
							vm.userDetails.danaData.dana = res.data.dana
							if (statusCheck == 'Sudah klik kontrak' && detailUser == 2){
								vm.userDetails.danaData.kontrak = 'Sudah lihat dan menyetujui kontrak'
							}else if (statusCheck == 'Sudah klik kontrak' && detailUser == 6){
								vm.userDetails.danaData.kontrak = 'Sudah lihat kontrak'
							}else{
								vm.userDetails.danaData.kontrak = res.data.kontrak
							}
						}else{
							vm.userDetails.danaData ={
								kontrak: 'No Records',
								dana: 'No Records'
							}
						}
					})
					.catch(err => {
						console.log(err.response)
					})
			},
			async getActivityMailUSer() { // This is from the old dashboard existing api
				let vm = this;
				const tokenAuth = vm.decodeJwt(vm.requestedHeaders.headers['x-access-token'])

				let params = {
					mobileNumber: vm.userDetails.mobileNumber,
					'detail.email': vm.userDetails.detail.email,
					'ktp.number': vm.userDetails.ktp.number,
					npwp: vm.userDetails.npwp,
					'detail.name': vm.userDetails.detail.name,
					status: vm.userDetails.status,
					adminLogin: {
						_id: tokenAuth._id,
						email: tokenAuth.email
					}
				}
				axios.post('https://minion.empatkali.co.id/jhon2.php', params)
					.then(res => {
						vm.userDetails.emailLogs = JSON.parse(res.data.email)
					})
					.catch(err => {
						console.log(err.response)
					})

			},
			getStatusValue(status){
				let value = '';
				let numVal = '';
				switch (status) {
					case 0:
					case 'incomplete':
						value = 'incomplete';
						numVal = 0;
						break;
					case 1:
					case 'pending':
						value = 'pending';
						numVal = 1;
						break;
					case 2:
					case 'active':
						value = 'active';
						numVal = 2;
						break;
					case 3:
					case 'banned':
						value = 'banned';
						numVal = 3;
						break;
					case 4:
					case 'rejected':
						value = 'rejected';
						numVal = 4;
						break;
					case 5:
					case 'freeze':
						value = 'freeze';
						numVal = 5;
						break;
					case 6:
					case 'approved':
						value = 'approved';
						numVal = 6;
						break;
					default:
						value = '';
						numVal = null;
						break;
				}
				return typeof status == 'number' ? value : numVal;
			},
			goBacktoUser(){
				let vm = this
				let status = vm.getStatusValue(vm.userDetails.status);
				console.log(status);
				vm.$router.push({ name: 'Users', params : { status: status }});
			},
			getAllIndustry() {
				let vm = this
				// Industry
				fetch('../__tmp-files/industry.json')
					.then(resp => resp.json()) // Transform the data into JSON
					.then(resIndustry => {
						// console.log(resIndustry);
						if (vm.userDetails.detail) {
							let findIndustry = resIndustry.filter(data => data._id == vm.userDetails.detail.industri)
							vm.userDetails.detail.industri_label = findIndustry[0] ? findIndustry[0].label : '---';
						}
					})
			},
			check4xUser(user){
				let vm = this
				let status = vm._.findIndex(user.isUsedAsEmergencyContact, { 'mobileNumber': user.emergencyContact.mobileNumber }) >= 0 ? true : false ;
				return status;
			},
    }
	}
	export default UserDetails
</script>