<template>
	<div>

		<div class="mui-content">

			<header class="header">
				<a href="#/userSetting"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>我的积分</h5>
			</header>

			<div class="points-top">
				<div class="points">0积分</div>
				<div class="points-rule">1元=100积分</div>
			</div>

			<div class="card">
				<button type="button" @click="chargePoints" class="mui-btn mui-btn-block circleBtn">充值</button>
			</div>

			<div class="introduce">
				1,QQ客服充值<br />
				2,当提示是否允许离开应用是请点击允许<br />
				3,QQ转账时请备注好自己的账号，转账成功积分5分钟内到账
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'points',
		data() {
			return {
				userInfo: {},
				points: 0,
			}
		},
		methods: {
			chargePoints() {
				// http://wpa.qq.com/msgrd?v=3&uin=2300819486&site=qq&menu=yes
				// http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes
				window.location.href = "http://wpa.qq.com/msgrd?v=3&uin=2300819486&site=qq&menu=yes"
			},
			async regMember() {
				let res = await this.$http('/user-server/getUserById/' + this.$getCookie('userId'))
				let memberId = res.data.content.memberId
				let userInfo = res.data.content
				if (memberId != null && memberId != '' && memberId != 'null') {
					let res = await this.$http('/user-server/getMemberById/' + memberId)
					this.points = res.data.content.points
				} else {
					let data = {
						"memberLevel": 1,
						"points": 0
					}
					let res = await this.$http.post('/user-server/addMember',data)
					userInfo.memberId = res.data.content.id
					this.$http.put('/user-server/updateUser',userInfo)
					this.points = res.data.content.points
				}
			}
		},
		mounted() {
			this.regMember()
		}
	}
</script>

<style>
	@import '../../static/mui/css/points.css'
</style>
