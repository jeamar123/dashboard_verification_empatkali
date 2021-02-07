<template>
	<div class="verification-details-container relative">
		<Loader v-if="loader.isShow" :message="loader.message"/>

		<Active v-if="$route.params.status == 'active'"/>
		<Pending v-if="$route.params.status == 'pending'"/>
		<Incomplete v-if="$route.params.status == 'incomplete'"/>
		<Banned v-if="$route.params.status == 'banned'"/>
		<Freeze v-if="$route.params.status == 'freeze'"/>
		<Approved v-if="$route.params.status == 'approved'"/>
		<Rejected v-if="$route.params.status == 'rejected'"/>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<style lang="scss">
	// FOR KTP MODALS
  .show-image-modal{
    .ktp-wrapper{
      height: 438px;
    }
    .viewer-container{
      overflow: visible;
      position: relative;
      max-height: 439px;
    }
    .viewer-canvas{
      overflow: visible;
      position: relative;
      max-height: 439px;
			height: 100%;
      text-align: center;
			display: flex;
		}
    .viewer-footer{
      overflow: visible;
    }
    .viewer-title{
      position: relative;
      top: 78px;
      color: #333;
      padding-bottom: 5px;
    }
    .viewer-canvas > img{
      margin: auto !important;
      height: auto !important;
      width: auto !important;
      position: relative !important;
      max-height: 439px !important;
			display: block !important;
    }
    .viewer-toolbar > ul > li{
      background-color: #D8DAF4;
    }
  } 
</style>

<script>
	import UserDetails from './function.vue'
	export default UserDetails
</script>