<script>
	import axios from 'axios';

	import { Header } from '../Header'
	import { Loader } from '../../components/Loader'

	var ChangeLimit = {
		components:	{
			Header,
			Loader,
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
				changeLimitOptions:	{
					startDate: new Date(),
					endDate: new Date(),
					resultCount: 0
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
			}
		},
		async created() {
			let vm = this
			console.log(this.filter);

			vm.setCurrentLimitStatus();
			// await vm.getAllUsers()
    	// await vm.totalUsers()
			// await vm.getLimitRequests(1);
			// await vm.getAdmin()
		},
		watch: {
    	async $route() {
				// to, from
				let vm = this
				vm.loader =	{
					isShow: false,
					message: 'Loading data',
				},
				vm.setCurrentLimitStatus();
				// await vm.getAllUsers()
				// await vm.totalUsers()
				// await vm.getLimitRequests(1);
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
			setCurrentLimitStatus()	{
				let vm = this
				switch (vm.$route.params.status) {
						case 'all':
							vm.limitStatus = null;
							break;
						case 'pending':
							vm.limitStatus = 0;
							break;
						case 'approved':
							vm.limitStatus = 3;
							break;
						case 'rejected':
							vm.limitStatus = 4;
							break;
						default:
							break;
					}
			},
			async getAdmin() {
				let vm = this;
				const adminLogin = vm.decodeJwt(vm.requestedHeaders.headers['x-access-token'])
				await axios.get(`api/admins/${adminLogin._id}`, vm.requestedHeaders)
				.then(function (response) {
					if (response) {
						vm.adminData = response.data
					}
				})
				.catch(function (error) {
					console.log(error);
				})
			},
			async getAllUsers() {
				let vm = this
				let url = `/api/users?skip=0&limit=3000`;
				let results = await axios.get(url, vm.requestedHeaders);
				vm.allUsers = results.data.data;
			},
			async totalUsers() {
				let vm = this
				try {
					let url = `/api/users/getuserupdatecredit?skip=0&limit=3000`;
					if(vm.limitStatus != null){
						url += `&status=${vm.limitStatus}`;
					}
					let totalRows = await axios.get(url, vm.requestedHeaders)
					vm.paginationData.totalResultsRows = totalRows.data.total;
					vm.changeLimitOptions =	{
						startDate: new Date(),
						endDate: new Date(),
						resultCount: vm.paginationData.totalResultsRows
					};
				} catch (err) {
					console.log(err);
					this.$swal('Error!', err ,'error')
					vm.loader.isShow = false
				}
			},
			async getLimitRequests(page, queryStringObj) {
				let vm = this
				vm.loader = { isShow: true, message: `Loading data` }
				let skip
				if (vm.paginationData.currentPage == 1) {
					skip = 0
				} else if (vm.paginationData.currentPage == page) {
					skip = (page - 1) * vm.paginationData.perPage
				}
				// if query string object is passed it'll be appended, otherwise no changes
				let url = `/api/users/getuserupdatecredit?skip=${skip}&limit=${vm.paginationData.perPage}${ (queryStringObj!==undefined)?`&${Object.keys(queryStringObj)}=${Object.values(queryStringObj)}`:'' }`
				if(vm.limitStatus != null){
					url += `&status=${vm.limitStatus}`;
				}
				// Limit display per page
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						console.log(res);
						vm.usersArr = res.data;

						vm.paginationData = { ...vm.paginationData, ...{
							resultStart: skip + 1,
							resultEnd: skip + vm.usersArr.data.length,
							totalPages: Math.ceil(vm.paginationData.totalResultsRows / vm.paginationData.perPage),
							currentPage: page,
						}};  
						
						vm.usersArr.data.map(async (value)  =>  {
							if(value.user != null){
								value.otherDetails = await vm.getOtherDetails(value); 
								value.transactionDetails = await vm.getTransactionDetails(value);
								let sideDetailsData = await vm.getSideDetails(value);
								value.sideDetails = sideDetailsData.information;
								value.imageDocs = sideDetailsData.docs;
								this.$forceUpdate();
							}else{
								value.user = {
									mobileNumber: 0
								}
							}
						})

						// if query string object is passed, load, otherwise, no changes
						if (queryStringObj!==undefined) {
							vm.search.showResult = true
							vm.search.totalRows = vm.users.length
						}
						vm.loader.isShow = false
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err, 'error')
						vm.loader.isShow = false
					})
			},
			/*
			* get transactions values
			*
			*/
			async getTransactionDetails(user)  {
				let vm = this
				let url = `/api/approvedtransactions/getusertransaction/${user.user._id}`;
				let result = await axios.get(url, vm.requestedHeaders);
				return result.data.data;
			},
			/*
			* getdetails for left side modal
			*
			*/
			async getSideDetails(user)  {
				let vm = this
				let url = `/api/users/getUserUpdateCreditDetail/${user._id}`;
				let result = await axios.get(url, vm.requestedHeaders);
				return result.data.data;
			},
			async getOtherDetails(user) {
				let vm = this
				return vm._.find(vm.allUsers, { _id: user.user._id }) ;
			},
			selectPage(page)  {
				let vm = this
				vm.paginationData.currentPage = page;
				vm.getLimitRequests(page);
			},
			goToVericationDetails(userData)	{
				console.log(userData);
				let vm = this
				vm.$router.push({ name: 'User Limit Details', params: { id: 1 } });
				// vm.$router.push({ name: 'User Verification Details', params: { id: userData._id } });
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
			}
    }
	}
	export default ChangeLimit
</script>