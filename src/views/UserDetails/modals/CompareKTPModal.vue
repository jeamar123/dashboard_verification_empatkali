<template>
  <div class="show-image-modal">
    <div class="flex">
      <div class="shadow-lg-middle relative mb-5 mx-2 flex-1 ktp-wrapper">
        <div class="absolute top-72 -right-12 transform rotate-90 text-gray-400 z-50">
          <p class="text-lg leading-tight text-center">EMPATKALI.CO.ID</p>
          <p v-if="user.ktp && user.ktp.imageDate" class="text-xs text-center">{{ user.ktp.imageDate | moment('DD MMM YYYY HH:MM:SS') }} WIB</p> 
          <p v-else class="text-xs text-center">{{ '---' }}</p>
          <!-- 04 JAN 2021 09:07:41 WIB -->
        </div>
        <img 
          v-viewer="viewerOptions" 
          :src="user.ktp.image || '/assets/img/no-image.png'" 
          class="rounded-lg h-full w-full"  alt=""
        >
      </div>

      <div class="shadow-lg-middle relative mb-5 mx-2 flex-1 ktp-wrapper">
        <div class="absolute top-72 -right-12 transform rotate-90 text-gray-400 z-50">
          <p class="text-lg leading-tight text-center">EMPATKALI.CO.ID</p>
          <p v-if="user.selfieDate" class="text-xs text-center">{{ user.selfieDate | moment('DD MMM YYYY HH:MM:SS') }} WIB</p> 
          <p v-else class="text-xs text-center">{{ '---' }}</p>
          <!-- 04 JAN 2021 09:07:41 WIB -->
        </div>
        <img 
          v-viewer="viewerOptions" 
          :src="user.selfie || '/assets/img/no-image.png'" 
          class="rounded-lg h-full w-full"  alt=""
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
