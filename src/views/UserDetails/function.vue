<script>
	// import axios from 'axios'
	import { Loader } from '../../components/Loader'
	import EditInformationModal from './modals/EditInformationModal.vue';
	import CommentsModal from './modals/CommentsModal.vue';
	import TransactionsModal from './modals/TransactionsModal.vue';
	import RequestConfirmModal from './modals/RequestConfirmModal.vue';

	var UserDetails = {
		components: {
			EditInformationModal,
			CommentsModal,
			TransactionsModal,
			RequestConfirmModal,
			Loader
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
				isTransModalShow: false,
				isProcessModalShow: false,
				editInfoData:	{},
				confirmTypeSelected: '',
				confirmTitle: '',
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
	export default UserDetails
</script>