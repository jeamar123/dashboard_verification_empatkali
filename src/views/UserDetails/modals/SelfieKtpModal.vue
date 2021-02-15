<template>
  <div class="show-image-modal">
    <div class="shadow-lg-middle relative mb-5 ktp-wrapper">
      <img 
        v-viewer="viewerOptions" 
        :src="user.selfie || '/assets/img/no-image.png'" 
        class="rounded-lg h-full opacity-0 " hidden alt=""
        style="display: none !important;"
      >
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
