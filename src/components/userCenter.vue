<template>

	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
				<</a> <a style="font-size: 0.9375rem;line-height: 1.5625rem;" class="mui-icon mui-pull-right" @click="toEditUser()">编辑
			</a>
			<h1 class="mui-title">个人中心</h1>
		</header>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img v-if="userInfo.headPic==''" class="mui-media-object mui-pull-left" src="../../build/logo.png">
					<img v-if="userInfo.headPic!=''" class="mui-media-object mui-pull-left" :src="userInfo.headPic">
					<div class="mui-media-body">
						
						<p class='mui-ellipsis'>{{userInfo.userName}}</p>
					</div>
				</a>
			</li>
		</ul>	
		<ul class="mui-table-view">
			<!-- <li class="mui-table-view-cell">
				<a class="">
					用户名:{{userInfo.userName}}
				</a>
			</li> -->
			<li class="mui-table-view-cell">
				<a class="">
					密码:{{userInfo.password | castToPass}}
				</a>
			</li>
			<li class="mui-table-view-cell">
				<a class="">
					邮箱:{{userInfo.email}}
				</a>
			</li>
			<li class="mui-table-view-cell">
				<a class="">
					收货地址:{{userInfo.deliveryAddress}}
				</a>
			</li>
			<li @click="toOrder" class="mui-table-view-cell">
				<a class="">
					你的订单
				</a>
			</li>
			<!-- <li @click="logOut" style="background-color: red;" class="mui-table-view-cell">
				<a class="">
					退出
				</a>
			</li> -->
		</ul>
		<button @click="logOut" type="button" class="mui-btn-block mui-btn mui-btn-blue">安全退出</button>

	</div>

</template>

<script>
	export default {
		name: '',
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			logOut: function() {
				this.$deleteCookie('userName')
				this.$mui.toast('安全退出')
				this.$router.push('/')
			},
			toEditUser: function() {
				// this.$router.push({
				// 	name: 'userEdit',params:userInfo
				// })
				console.log('test')
				console.log(this.userInfo)
				this.$router.push({
					name: 'userEdit',
					params: {
						"userInfo": this.userInfo
					}
				})
			},
			toOrder: function() {
				this.$router.push({
					path: '/order'
				})
			},
			getUserInfo: function() {
				var that = this

				this.$http({
					url: "/getAllUser",
					method: 'post',
					data: {
						model: {
							"userName": that.$getCookie('userName')
						},
						orderParams: [

						],
						pageNum: 0,
						pageSize: 5
					}

				}).then(function(res) {
					console.log(res.data.content.list[0])
					that.userInfo = res.data.content.list[0]
				}).catch(function(err) {
					that.$mui.toast('获取用户信息失败')
					console.log(err)
				})

			}
		},
		filters: {
			castToPass: function(value) {
				if(typeof(reValue) != undefined){
					var len = value.length
					var res = ''
					for (var i = 0; i < len; i++) {
						res += '*'
					}
					return res
				}else{
					return '********'
				}
				
			}
		},
		mounted: function() {
			this.getUserInfo()
		}

	}
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");
</style>
