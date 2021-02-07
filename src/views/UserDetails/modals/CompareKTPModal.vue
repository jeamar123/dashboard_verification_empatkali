<template>
  <div class="show-image-modal">
    <div class="flex">
      <div class="shadow-lg-middle relative mb-5 mx-2 flex-1 ktp-wrapper">
        <img 
          v-viewer="viewerOptions" 
          :src="'../../assets/img/full-passport.png'" 
          class="rounded-lg h-full opacity-0 " hidden alt=""
          style="display: none !important;"
        >
      </div>

      <div class="shadow-lg-middle relative mb-5 mx-2 flex-1 ktp-wrapper">
        <img 
          v-viewer="viewerOptions" 
          :src="'../../assets/img/no-image.png'" 
          class="rounded-lg h-full opacity-0 " hidden alt=""
          style="display: none !important;"
        >
      </div>
    </div>

    
  </div>
</template>

<script>

export default {
  props: {
    closeModal: Function,
  },
  data() {
  	return {
      viewerOptions: {
        inline: true,
        button: false, 
        navbar: false, 
        title: true, 
        toolbar: true, 
        tooltip: true, 
        transition: false, 
        fullscreen: false, 
        keyboard: false, 
        backdrop: false,
      }
  	}
  },
  created() {
  },
  methods: {
  }
}
</script>
