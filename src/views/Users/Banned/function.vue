<script>
	import UnBanUserModal from '../modals/UnBanUserModal.vue';
	import axios from 'axios';
	var Banned = {
		components:	{
			UnBanUserModal,
		},
		props:	{
			headerOptions: Function,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: process.env.VUE_APP_AUTHORIZATION,
						'x-access-token': localStorage.getItem("auth_token")
					}
				},
				filter:	{
					searchVal: '',
					startDate: new Date(this.$moment()),
					endDate: new Date(this.$moment()),
				},
				dateFormat: {
					input: 'DD MMM YYYY',
				},
				paginationData:	{
					totalResultsRows: 1,
					currentPage: 1,
					perPage: 10,
					resultStart: 1,
					resultEnd: 1,
					totalPages: 1,
				},
				paginationCount: 10,
				allUsers: [],
				usersArr: {},
				search: {},
				isBanUserModalShow: false,
				isBanStatusAlertShow: false,
				selectedUser: null,
				isSearchActive: false,
				isDatePickerActive: false,
			}
		},
		async created() {
			let vm = this
			vm.toggleLoader(true);
			// await vm.getAllUsers()
    	// await vm.totalUsers()
			await vm.getUserList(1);
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
			/** Toggle Parent Loader */
			toggleLoader(opt, msg){
				let vm = this
				vm.$parent.toggleLoader(opt, msg);
			},
			async submitFilter(page) {
				let vm = this
				let searchFilterObj = {
					date_from: vm.isDatePickerActive ? vm.$moment(vm.filter.startDate).format('YYYY-MM-DD') : null,
					date_to: vm.isDatePickerActive ? vm.$moment(vm.filter.endDate).format('YYYY-MM-DD') : null,
					filter: vm.filter.searchVal != '' ? vm.filter.searchVal : null,
				}
				vm.isSearchActive = true;
				vm.toggleLoader(true, 'Loading data');
				vm.paginationData.currentPage = page !== undefined ? vm.paginationData.currentPage : 1;
				await vm.getUserList(vm.paginationData.currentPage, searchFilterObj)
			},
			async removeFilter() {
				let vm = this
				vm.isSearchActive = false;
				vm.filter =	{
					searchVal: '',
					startDate: new Date(this.$moment()),
					endDate: new Date(this.$moment()),
				};
				vm.isDatePickerActive = false;
				vm.toggleLoader(true, 'Loading data');
				// await vm.totalUsers();
				await vm.getUserList(1)
			},
			filterDateChanged()	{
				let vm = this
				vm.isDatePickerActive = true;
			},
			goToUserDetails(data)	{
				let vm = this
				vm.$router.push({ name: 'User Details', params: { id: data._id } });
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
					let url = `/api/users?status=3&skip=0&limit=10000${ (queryStringObj!==undefined)?`&${Object.keys(queryStringObj)}=${Object.values(queryStringObj)}`:'' }`;
					let totalRows = await axios.get(url, vm.requestedHeaders)
					vm.paginationData.totalResultsRows = totalRows.data.total;
					vm.headerOptions({
						startDate: new Date(),
						endDate: new Date(),
						resultCount: vm.paginationData.totalResultsRows
					});
				} catch (err) {
					console.log(err);
					this.$swal('Error!', err ,'error')
					vm.toggleLoader(false);
				}
			},
			async getUserList(page, queryStringObj) {
				let vm = this
				let skip
				if (vm.paginationData.currentPage == 1) {
					skip = 0
				} else if (vm.paginationData.currentPage == page) {
					skip = (page - 1) * vm.paginationData.perPage
				}
				// if query string object is passed it'll be appended, otherwise no changes
				let url = `/api/users?status=3&skip=${skip}&limit=${vm.paginationData.perPage}`
				if(queryStringObj !== undefined){
					Object.keys(queryStringObj).map(val => queryStringObj[val] != null && (url += `&${val}=${queryStringObj[val]}`) );
				}
				vm.toggleLoader(true, 'Loading data');
				// Limit display per page
				await axios.get(url, vm.requestedHeaders)
					.then((res)	=>	{
						console.log(res);
						vm.usersArr = res.data;
						// vm._.remove(vm.usersArr.data, function(n) {
						// 	return n.status == 7;
						// });
						vm.paginationData.totalResultsRows = res.data.total;
							vm.headerOptions({
							startDate: new Date(),
							endDate: new Date(),
							resultCount: vm.paginationData.totalResultsRows
						});
						vm.paginationData = { ...vm.paginationData, ...{
							resultStart: skip + 1,
							resultEnd: skip + vm.usersArr.data.length,
							totalPages: Math.ceil(vm.paginationData.totalResultsRows / vm.paginationData.perPage),
							currentPage: page,
						}};  
						vm.toggleLoader(false);
					})
					.catch((err)	=>	{
						console.log(err);
						vm.$swal('Error!', err, 'error')
						vm.toggleLoader(false);
					})
			},
			selectPage(page)  {
				let vm = this
				vm.paginationData.currentPage = page;
				if(vm.isSearchActive){
					vm.submitFilter(page);
				}else{
					vm.getUserList(page);
				}
			},
			changePage(opt)  {
				let vm = this
				vm.paginationData.currentPage = opt == 'prev' ? vm.paginationData.currentPage-1 : vm.paginationData.currentPage+1;
				if(vm.isSearchActive){
					vm.submitFilter(vm.paginationData.currentPage);
				}else{
					vm.getUserList(vm.paginationData.currentPage);
				}
			},
			toggleModals(opt, type, data)	{
				let vm = this;
				vm.isBanUserModalShow = type == 'ban' ? opt : false;
				if(data){
					vm.selectedUser = data;
				}
			},
			async refreshData(opt)	{
				let vm = this
				vm.isBanUserModalShow = false;
				if(opt && opt == 'ban'){
					vm.isBanStatusAlertShow = true;
					setTimeout(()	=>	{
						vm.closeAlert();
					},10000);
				}
				vm.toggleLoader(true);
				// await vm.totalUsers()
				await vm.getUserList(1);
			},
			closeAlert(){
				let vm = this
				vm.isBanStatusAlertShow = false;
			},
    }
	}
	export default Banned
</script>