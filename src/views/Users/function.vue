<script>
	import { Header } from '../Header'
	import { Loader } from '../../components/Loader'
	// import axios from 'axios'
	var Users = {
		components:	{
			Header,
			Loader
		},
		data() {
			return {
				loader:	{
					isShow: true,
					message: 'Preparing'
				},
				headerOptions:	{
					startDate: new Date(),
					endDate: new Date(),
					resultCount: 0
				},
			}
		},
		created() {
			this.getUsersList();
		},
		watch: {
    	async $route() {
				// to, from
				let vm = this
				vm.loader =	{
					isShow: true,
					message: 'Loading data',
				},
				await vm.getUsersList();
			}
		},
		methods: {
      async getUsersList()	{
				let vm = this

				setTimeout(() => {
					vm.loader.isShow = false;
				}, 500);
			},
			/**
			 * Toggle Loader
			 */
			toggleLoader(opt){
				let vm = this
				vm.loader.isShow = opt;
			},
    }
	}
	export default Users
</script>