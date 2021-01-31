<script>
	// import axios from 'axios'
	var Pending = {
		components:	{
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
			goToUserDetails(data)	{
				console.log(data);
				let vm = this
				vm.$router.push({ name: 'User Details', params: { status: 'pending', id: 1 } });
			}
    }
	}
	export default Pending
</script>