<script>
	// import axios from 'axios'
	import { Loader } from '../../components/Loader'
	import { Active } from './Active'
	import { Pending } from './Pending'
	import { Incomplete } from './Incomplete'
	import { Banned } from './Banned'
	import { Freeze } from './Freeze'
	import { Approved } from './Approved'
	import { Rejected } from './Rejected'

	var UserDetails = {
		components: {
			Loader,
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
					message: 'Loading data',
				},
			}
		},
		created() {
		},
		methods: {
			toggleLoader(opt, msg){
				let vm = this
				vm.loader.isShow = opt;
				vm.loader.message = msg ? msg : vm.loader.message;
			},
    }
	}
	export default UserDetails
</script>