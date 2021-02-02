<script>
	// import axios from 'axios'
	import EditInformationModal from '../modals/EditInformationModal.vue';
	import CommentsModal from '../modals/CommentsModal.vue';
	import RequestConfirmModal from '../modals/RequestConfirmModal.vue';
	import EmailModal from '../modals/EmailModal.vue';
	import EmergencyContactModal from '../modals/EmergencyContactModal.vue';
	import PaymentMethodModal from '../modals/PaymentMethodModal.vue';
	import LocationModal from '../modals/LocationModal.vue';
	import BlacklistModal from '../modals/BlacklistModal.vue';

	var Rejected = {
		components: {
			EditInformationModal,
			CommentsModal,
			RequestConfirmModal,
			EmailModal,
			EmergencyContactModal,
			PaymentMethodModal,
			LocationModal,
			BlacklistModal
		},
		props:	{
			id: {
				type: Number,
				required: false,
			}
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
				editInfoData:	{},
				confirmTypeSelected: '',
				confirmTitle: '',
				requestData: {},
			}
		},
		created() {
			console.log(this.id);
		},
		methods: {
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
			toggleLoader(opt){
				let vm = this
				vm.loader.isShow = opt;
			},
    }
	}
	export default Rejected
</script>