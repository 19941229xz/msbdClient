<template>
	<div>

		<div class="mui-content">

			<header class="header">
				<a @click="toUserSetting" href="javascript:;"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>修改用户信息</h5>
			</header>

			<!-- <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;" class="mui-navigate-right">
						<img @click="updateHeadImg" v-show="userInfo.headImg!=''&&userInfo.headImg!=null&&userInfo.headImg!='null'" class="mui-media-object mui-pull-left"
						 :src="userInfo.headImg">
						<img @click="updateHeadImg" v-show="userInfo.headImg==''||userInfo.headImg==null||userInfo.headImg=='null'" class="mui-media-object mui-pull-left"
						 :src="userInfo.headImg">
						<input @change="addImage" id="headImg" type="file" style="display:none;" />
						<div class="mui-media-body">
							账号:{{userInfo.userName}} <span class="mui-badge">VIP</span>
							<p class="mui-ellipsis">等级3 积分：1000</p>
						</div>
					</a>
				</li>
			</ul> -->
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>昵称</label>
					<input type="text" class="mui-input-clear" v-model="userInfo.nickName" placeholder="请输入昵称">
				</div>
				<div class="mui-input-row">
					<label>真实姓名</label>
					<input type="text" class="mui-input-clear" v-model="userInfo.realName" placeholder="请输入真实姓名">
				</div>
				<div class="mui-input-row">
					<label>邮箱</label>
					<input type="text" class="mui-input-clear" v-model="userInfo.email" placeholder="请输入邮箱">
				</div>
				<div class="mui-button-row">
					<button @click="saveUser" type="button" class="mui-btn mui-btn-primary">确认</button>
				</div>
			</div>

			<!-- <div class="mui-input-group">
				<div class="mui-input-row">
					<label>Input</label>
					<input type="text" placeholder="普通输入框">
				</div>
			</div> -->

		</div>

	</div>
</template>

<script>
	export default {
		name: 'userSetting',
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			toUserSetting() {
				this.$router.push('/userSetting')
			},
			async getUserInfo() {
				var res = await this.$http('/user-server/getUserById/' + this.$getCookie('userId'))
				this.userInfo = res.data.content
				// console.log(this.userInfo)
			},
			async saveUser(){
				await this.$http.put('/user-server/updateUser',this.userInfo)
				//
				this.$http('/user-server/getUserById/' + this.$getCookie('userId')).then(res=>{
					this.$setCookie('userId', res.data.content.id, 24 * 60 * 60)
					this.$setCookie('userName', res.data.content.userName, 24 * 60 * 60)
					this.$setCookie('companyId', res.data.content.companyId, 24 * 60 * 60)
					this.$setCookie('schoolId', res.data.content.schoolId, 24 * 60 * 60)
					this.$setCookie('realName', res.data.content.realName, 24 * 60 * 60)
					this.$setCookie('roleId', res.data.content.roleId, 24 * 60 * 60)
					this.$setCookie('headImg', res.data.content.headImg, 24 * 60 * 60)
					this.$setCookie('nickName', res.data.content.nickName, 24 * 60 * 60)
				})
			}
		},
		mounted() {
			this.getUserInfo()
		}
	}
</script>

<style>
	@import '../../static/mui/css/userSetting.css'
</style>
