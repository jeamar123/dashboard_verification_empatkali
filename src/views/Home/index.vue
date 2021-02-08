<template>
	<div class="home-container">
		<Loader v-if="loader.isShow" :message="loader.message"/>
		<Header/>

		<div class="home-content px-4 pb-4 flex-1">
			<div class="card p-5 h-full">
				<div class="flex items-center w-full h-full no-data-content ">
					<div class="w-full text-center relative">
						<img :src="'../assets/img/Prototyping process.png'" class="my-4 w-3/10" :class="{'h-6/10' : false}" alt="">
						<p class="text-xl 2xl:text-2xl mt-5 2xl:mt-10 ff-medium">Designernya masih bertapa di Mars guys biar fiturnya maksimal.<br>Ditunggu ya..</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Home from './function.vue'
	export default Home
</script>