<template>
  <div class="show-image-modal">
    <div class="relative mb-5 ktp-wrapper">
      <img 
        v-viewer="viewerOptions" 
        :src="user.ktp.image || '/assets/img/no-image.png'" 
        class="rounded-lg h-full"  alt=""
        @viewed="viewed"
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
        backdrop: true,
      },
  	}
  },
  created() {
  },
  methods: {
    viewed(viewer){
      this.$viewer = viewer;
      console.log(this.$viewer);
      // this.$viewer.srcElement.$viewer.canvas.clientHeight
      // this.$viewer.detail.image.style.height = this.$viewer.srcElement.$viewer.canvas.clientHeight + "px";
    },
  }
}
</script>


