<script>
	import TransactionsModal from '../modals/TransactionsModal.vue';
	import BanUserModal from '../modals/BanUserModal.vue';
	// import axios from 'axios'
	var Banned = {
		components:	{
			TransactionsModal,
			BanUserModal,
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
				filter:	{
					searchVal: '',
					startDate: new Date(),
					endDate: new Date(),
				},
				dateFormat: {
					input: 'DD MMM YYYY',
				},
				allUsers: [],
				paginationData:	{
					totalResultsRows: 1,
					currentPage: 1,
					perPage: 10,
					resultStart: 1,
					resultEnd: 1,
					totalPages: 1,
				},
				adminData: {},
				limitStatus: '',
				usersArr: [],
				search: {},
				activeStatus: 'all',
				isTransModalShow: false,
				isBanUserModalShow: false,
			}
		},
		created() {
			this.getUsersList();
			console.log(this.$route);
		},
		watch: {
    	async $route() {
				// to, from
				let vm = this
				vm.loader =	{
					isShow: false,
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
				vm.$parent.toggleLoader(opt);
			},
			submitFilter() {
				let vm = this
				console.log(vm.filter);

				if (vm.filter.searchVal == '') {
					vm.$swal('', 'Seems like you forgot to put something on the search input!', 'warning')
					return false;
				}

				// Prepare end users input i.e. trim,etc.
				let sanitizeQuery = vm.filter.searchVal.split(',').map(item=>item.trim())
				console.log( sanitizeQuery )
				let searchFilterObj = {}
				searchFilterObj['name'] = sanitizeQuery
				vm.isSearchActive = true;
				console.log(searchFilterObj);
				// vm.getLimitRequests(1, searchFilterObj)
			},
			removeFilter() {
				let vm = this
				vm.isSearchActive = false;
				vm.filter =	{
					searchVal: '',
					startDate: new Date(),
					endDate: new Date(),
				};
				// vm.showUsersPerPage(1)
			},
			filterDateChanged()	{
				let vm = this
				console.log(vm.filter.startDate);
				console.log(vm.filter.endDate);

				// vm.getLimitRequests(1)
			},
			selectUserStatus(opt)	{
				let vm = this
				vm.activeStatus = opt;
				vm.getUsersList();
			},
			toggleModals(opt, type)	{
				let vm = this;
				vm.isTransModalShow = type == 'transaction' ? opt : false;
				vm.isBanUserModalShow = type == 'ban' ? opt : false;
			},
			refreshData(data, type)	{
				console.log(data, type);
				let vm = this
				vm.isTransModalShow = false;
				vm.isBanUserModalShow = false;
				vm.loader.isShow = false;
			},
    }
	}
	export default Banned
</script>