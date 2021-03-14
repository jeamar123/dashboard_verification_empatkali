<template>
  <div>
    <GmapMap
      :center="{
        lat: parseFloat(user.loc ? user.loc.coordinates[1] : 0),
        lng: parseFloat(user.loc ? user.loc.coordinates[0] : 0)
      }"
      :zoom="10"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      }"
      style="height: 400px;overflow: hidden;"
    >
      <GmapMarker
          :position="{
            lat: parseFloat(user.loc ? user.loc.coordinates[1] : 0),
            lng: parseFloat(user.loc ? user.loc.coordinates[0] : 0)
          }"
        />
    </GmapMap>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  props: {
    closeModal: Function,
    requestSuccess: Function,
    toggleLoader: Function,
    user: Object
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem("auth_token")
        }
      },
  	}
  },
  created() {
  },
  methods: {
    /**
		 * Form Validator
		 *
		 * This will validate multiple forms
		 * 
		 * @param  String scope
		 */
		formValidator(scope) {
			let vm = this

			vm.$validator.validateAll(scope).then(result => {
				if (result) {
          console.log(result);
				}
			})
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
