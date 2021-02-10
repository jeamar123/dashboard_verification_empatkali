<script>
	import { Header } from '../Header'
	import { Loader } from '../../components/Loader'
	import { AllUsers } from './AllUsers';
	import { Active } from './Active';
	import { Pending } from './Pending';
	import { Incomplete } from './Incomplete';
	import { Banned } from './Banned';
	import { Freeze } from './Freeze';
	import { Approved } from './Approved';
	import { Rejected } from './Rejected';
	// import axios from 'axios'
	var Users = {
		components:	{
			Header,
			Loader,
			AllUsers,
			Active,
			Pending,
			Incomplete,
			Banned,
			Freeze,
			Approved,
			Rejected,
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
					message: 'Preparing',
				},
				headerOptions:	{
					startDate: new Date(),
					endDate: new Date(),
					resultCount: 0
				},
				statusSelected: this.$route.params.status,
			}
		},
		created() {
		},
		watch: {
    	async $route() {
				let vm = this
				vm.statusSelected = vm.$route.params.status;
				console.log(vm.statusSelected);
			}
		},
		methods: {
			/**
			 * Toggle Loader
			 */
			toggleLoader(opt, msg){
				let vm = this
				vm.loader.isShow = opt;
				vm.loader.message = msg ? msg : vm.loader.message;
			},
    }
	}
	export default Users
</script>