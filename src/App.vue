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
				let wx = navigator.userAgent.toLowerCase()
				if (wx.match(/MicroMessenger/i) === 'micromessenger') {

				} else {
					this.$mui.alert('请使用微信打开页面，否则体验效果不佳', '面试大咖', '知道了', function() {

					})
				}
			}
		},
		mounted: function() {
			this.isWexin()
		}
	}
</script>

<style>
	/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/

	.fade-enter-active,
	.fade-leave-avtive {
		transition: opacity .5s
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0
	}
</style>
