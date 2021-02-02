<script>
	// import axios from 'axios'

	var Incomplete = {
		components: {
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
			}
		},
		created() {
			console.log(this.id);
		},
		methods: {
      toggleModals(opt, type)	{
				let vm = this;
				vm.isEditInfoModalShow = type == 'editInfo' ? opt : false;
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
	export default Incomplete
</script>