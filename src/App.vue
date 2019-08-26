<template>
	<div id="app">
		<transition name="fade">
			<router-view />
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {

			}
		},
		methods: {
			isWexin: function() {
				var ua = navigator.userAgent.toLowerCase();
				// alert(ua)
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					
				} else{
					// this.$mui.alert('请使用微信打开，否则体验效果不佳')
				}
			}
		},
		mounted: function() {
			this.isWexin()
		}
	}
</script>

<style>
	/* 路由动画配置 */
	.fade-enter-active,
	.fade-leave-avtive {
		transition: opacity .5s
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}

	/*  */
</style>
