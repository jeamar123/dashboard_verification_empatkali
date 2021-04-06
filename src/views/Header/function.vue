<script>
	import axios from 'axios';
	import UpdateProfileModal from './modals/UpdateProfileModal.vue';
	import { Loader } from '../../components/Loader'

	var Header = {
		components:	{
			UpdateProfileModal,
			Loader,
		},
		props:	{
			headerOptions:	{
				required: false,
				type: Object
			},
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: process.env.VUE_APP_AUTHORIZATION,
						'x-access-token': localStorage.getItem("auth_token")
					}
				},
				isShowUserProfileMenu: false,
				headerContentName: 'default',
				dateToday: new Date(),
				timeNow: this.$moment().format('hh:mm:ss'),
				isShowUpdateProfileModal: false,
				adminData: {},
			}
		},
		created() {
			this.getAdmin();
			this.liveClock();
			this.initializeShowHideListener();
			this.actionAdmin();
			this.getHeaderContent();
		},
		watch: {
    	$route(to, from) {
				// react to route changes...
				console.log('from', from.params);
				console.log('to', to.params);
				this.getHeaderContent();
			}
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
			/*
			 * For ShowHide Toggle Event Listeners
			 */
      initializeShowHideListener()	{
				let vm = this
				window.addEventListener("click",function(e){
					if(vm.isShowUserProfileMenu){
						var el = e.target;
						var parentSelector = document.getElementsByClassName('user-header-toggle')[0];
						if (parentSelector === undefined) {
							parentSelector = document;
						}
						var p = el.parentNode;
						var parentMatch = false;
						if(p == parentSelector){
							parentMatch = true;
						}else{
							while (p !== parentSelector) {
								var o = p;
								if(o == null){
									break;
								}
								p = o.parentNode;
								if(p == parentSelector){
									parentMatch = true;
								}
							}
						}
						vm.isShowUserProfileMenu = parentMatch;
					}
				});
			},
			logout() {
				// let vm = this
				// vm.$router.replace({ name: 'Login'});
				this.actionAdmin('admin logout')
				this.$auth.logout({
					// makeRequest: true,
					success() {},
					error() {},
					redirect: "/login"
				});
			},
			actionAdmin(paramsAction) {
				let vm = this
				const adminLogin = vm.decodeJwt(vm.requestedHeaders.headers['x-access-token'])
				// vm.getDataAdminLogin(adminLogin._id)

				delete adminLogin.iat
				delete adminLogin.mobileNumber
				delete adminLogin._id

				let actionAdmin = {
					adminLogin,
					action: paramsAction,
				}
				actionAdmin = JSON.stringify(actionAdmin)
				axios.post('https://mon.empatkali.co.id/cs', { actionAdmin })
					.then(res => {
						console.log('res', res)
					})
					.catch(err => {
						console.log(err.res)
					})
				// console.log('actionAdmin', actionAdmin)
			},
			getHeaderContent()	{
				let vm = this
				if(
					vm.$route.name == 'Settings' ||
					vm.$route.name == 'Email Template' || 
					vm.$route.name == 'Fee' || 
					vm.$route.name == 'User Management' || 
					vm.$route.name == 'Salary'){
						vm.headerContentName = 'settings';
				}else if(
					vm.$route.name == 'Tools' ||
					vm.$route.name == 'UnbanOTP'){
					vm.headerContentName = 'tools';
				}else if(vm.$route.name == 'Change Limit'){
					vm.headerContentName = vm.$route.params.status == 'all' ? 'All request' : vm.$route.params.status;
				}else if(vm.$route.name == 'Users'){
					vm.headerContentName = vm.$route.params.status == 'all' ? 'All users' : vm.$route.params.status;
				}else if(vm.$route.name == 'Home'){
					vm.headerContentName = 'Dashboard';
				}
			},
			toggleProfileModal(opt)	{
				let vm = this
				vm.isShowUpdateProfileModal = opt;
				vm.isShowUserProfileMenu = false;
			},
			toggleLoader(opt)	{
				if(opt){
					this.$parent.hideLoading();
				}else{
					this.$parent.showLoading();
				}
			},
			liveClock(){
				let vm = this
				setInterval(() => {
					vm.timeNow = this.$moment().format('hh:mm:ss');
				}, 1000);
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
	export default Header
</script>