<script>
	var Sidemenu = {
		data() {
			return {
				isShowUserChildMenu: false,
				isShowLimitChildMenu: false,
			}
		},
		created() {
			this.initializeShowHideListener();
		},
		methods: {
			/*
			 * For ShowHide Toggle Event Listeners
			 */
      async initializeShowHideListener()	{
				let vm = this
				document.addEventListener("click",async function(e){
					if(vm.isShowUserChildMenu){
						var parentMatchUser = await vm.checkParentMatch(e, 'sidemenu-user-toggle');
						vm.isShowUserChildMenu = parentMatchUser;
					}
					if(vm.isShowLimitChildMenu){
						var parentMatchLimit = await vm.checkParentMatch(e, 'sidemenu-limit-toggle');
						vm.isShowLimitChildMenu = parentMatchLimit;
					}
				});
			},
			async checkParentMatch(e, parentClass)	{
				var el = e.target;
				var parentSelector = document.getElementsByClassName(parentClass)[0];
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
				return parentMatch;
			}
    }
	}
	export default Sidemenu
</script>