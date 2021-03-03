<template>
  <div class="show-image-modal">
    <div class="flex">
      <div class="shadow-lg-middle relative mb-5 mx-2 flex-1 ktp-wrapper">
        <img 
          v-viewer="viewerOptions" 
          :src="user.ktp.image || '/assets/img/no-image.png'" 
          class="rounded-lg h-full"  alt=""
        >
      </div>

      <div class="shadow-lg-middle relative mb-5 mx-2 flex-1 ktp-wrapper">
        <img 
          v-viewer="viewerOptions" 
          :src="user.selfie || '/assets/img/no-image.png'" 
          class="rounded-lg h-full"  alt=""
        >
      </div>
    </div>

    
  </div>
</template>

<script>

export default {
  props: {
    closeModal: Function,
    user: Object
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
        backdrop: true,
      }
  	}
  },
  created() {
  },
  methods: {
  }
}
</script>
