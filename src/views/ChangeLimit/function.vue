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
					isShow: true,
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
				paginationCount: 10,
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
				usersArr: {},
				search: {},
				limitReqAlert: {
					isShow: true,
				},
			}
		},
		async created() {
			let vm = this
			vm.setCurrentLimitStatus();
			vm.checkLimitRequestTransactions();
			// await vm.getAllUsers()
    	await vm.totalUsers()
			await vm.getLimitRequests(1);
			await vm.getAdmin()

		},
		computed: {
			paginateTotalPages: function() {
				let vm = this
				if(vm.paginationData.totalPages > vm.paginationCount){
					let pagiArr = [];
					let chunkArr = vm._.chunk([...Array(vm.paginationData.totalPages).keys()], 10);
					pagiArr = chunkArr[vm._.findIndex(chunkArr, function(el) { return el.includes(vm.paginationData.currentPage-1)})];
					pagiArr = pagiArr.map(v => v+1);
					if(pagiArr[pagiArr.length - 1] < vm.paginationData.totalPages){
						pagiArr.push( pagiArr[pagiArr.length - 1] + 1 );
					}
					return pagiArr;
				}else{
					return vm.paginationData.totalPages;
				}
			}
    },
		watch: {
    	async $route() {
				// to, from
				let vm = this
				vm.loader =	{
					isShow: true,
					message: 'Loading data',
				},
				vm.setCurrentLimitStatus();
				// await vm.getAllUsers()
				await vm.totalUsers()
				await vm.getLimitRequests(1);
			}
		},
		methods: {
			checkLimitRequestTransactions(){
				let vm = this
				let limitReq = JSON.parse(localStorage.getItem('emitLimitRequestStatus'));
				console.log(limitReq);
				vm.limitReqAlert = limitReq ? { isShow: true, ...limitReq } : { isShow: false };

				setTimeout(()	=> {
					vm.closeAlert();
				}, 10000);
			},
			closeAlert(){
				let vm = this
				vm.limitReqAlert.isShow = false;
				localStorage.setItem('emitLimitRequestStatus', null);
			},
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
				let url = `/api/users?skip=0&limit=10000`;
				let results = await axios.get(url, vm.requestedHeaders);
				vm.allUsers = results.data.data;
			},
			async totalUsers(queryStringObj) {
				let vm = this
				try {
					let url = `/api/users/getuserupdatecredit?skip=0&limit=10000${ (queryStringObj!==undefined)?`&${Object.keys(queryStringObj)}=${Object.values(queryStringObj)}`:'' }`;
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
							if(value.user == null){
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
			selectPage(page)  {
				let vm = this
				vm.paginationData.currentPage = page;
				if(vm.isSearchActive){
					vm.submitFilter(page);
				}else{
					vm.getLimitRequests(page);
				}
			},
			changePage(opt)  {
				let vm = this
				vm.paginationData.currentPage = opt == 'prev' ? vm.paginationData.currentPage-1 : vm.paginationData.currentPage+1;
				if(vm.isSearchActive){
					vm.submitFilter(vm.paginationData.currentPage);
				}else{
					vm.getLimitRequests(vm.paginationData.currentPage);
				}
			},
			goToVericationDetails(userData)	{
				let vm = this
				vm.$router.push({ name: 'User Limit Details', params: { id: userData._id } });
			},
			async submitFilter(page) {
				let vm = this
				if (vm.filter.searchVal == '') {
					vm.$swal('', 'Seems like you forgot to put something on the search input!', 'warning')
					return false;
				}
				// Prepare end users input i.e. trim,etc.
				let sanitizeQuery = vm.filter.searchVal.split(',').map(item=>item.trim())
				let searchFilterObj = {
					// start: vm.$moment(vm.filter.startDate).format('YYYY-MM-DD'),
					// end: vm.$moment(vm.filter.endDate).format('YYYY-MM-DD'),
					name: sanitizeQuery,
				}
				vm.isSearchActive = true;
				console.log(searchFilterObj);
				vm.toggleLoader(true, 'Loading data');
				vm.paginationData.currentPage = page !== undefined ? vm.paginationData.currentPage : 1;
				await vm.totalUsers(searchFilterObj);
				await vm.getLimitRequests(vm.paginationData.currentPage, searchFilterObj)
			},
			async removeFilter() {
				let vm = this
				vm.isSearchActive = false;
				vm.filter =	{
					searchVal: '',
					startDate: new Date(),
					endDate: new Date(),
				};
				vm.toggleLoader(true, 'Loading data');
				await vm.totalUsers();
				await vm.getLimitRequests(1)
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