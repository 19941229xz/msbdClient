<template>

	<div>



		<div class="mui-content" style="background-color: inherit">
			<!-- 标题 -->
			<div class="mui-content-padded" style="text-indent: 5%;margin-top: 100px;">
				<h2>您好，请登录</h2>
			</div>

			<!-- 登录表单 -->
			<form class="mui-input-group myform">
				<div class="mui-input-row" style="height: 80px;">
					<label style="font-size: 40px;"><span class="mui-icon mui-icon-phone"></span></label>
					<input v-validate="'required|mobile'" v-model="phoneNum" style="height: 80px;" type="text" placeholder="请输入手机号">
				</div>
				<div class="mui-input-row" style="height: 80px;">
					<label style="font-size: 40px;"><span class="mui-icon mui-icon-locked"></span></label>
					<input v-validate="''" v-model="textCode" style="height: 80px;" type="text" placeholder="请输入验证码">
					<span @click="sendTextCode" :style="{'color':sendTextCodeBtnIsDisabled?'#9ba9b7':'#007aff'}" class="yzmBtn">{{sendTextCodeTip}}</span>
				</div>
			</form>

			<button @click="regOrLoginWithPhoneCode" type="button" class="mui-btn mui-btn-block circleBtn">登录/注册</button>

			<!-- <div class="mui-row changeLoginMethod">
				账号密码登录
			</div> -->
		</div>
		<!-- 底部客服栏 -->
		<nav class="mui-bar mui-bar-tab" style="box-shadow: none;background-color: inherit;text-align: center;font-size: 14px;color: grey;">
			如无法登录，请点击<span style="font-weight: bold;color: #000000;">账号申诉</span>申请客服协助
		</nav>



	</div>

</template>

<script>
	export default {
		name: 'loginAndReg',
		data() {
			return {
				phoneNum: '', // 手机号
				textCode: '', // 短信验证码
				sendTextCodeTip: '发送验证码',
				phoneToken: '',
				sendTextCodeBtnIsDisabled: false,  // 默认验证码发送按钮可用
				searchData: {
					"model": {

					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 10
				}
			}
		},
		methods: {
			toLogin: function() {
				this.$router.push({
					path: '/login'
				})
			},
			sendTextCode: function() {
				if (this.sendTextCodeBtnIsDisabled) {

					return
				}

				this.$validator.validate().then(async (valid) => {
					if (!valid) {
						// do stuff if not valid.
						this.$mui.toast('手机号或验证码有误')
						return
					} else {
						var that = this
						var getPhoneTokenData = {
							"phone": that.phoneNum,
							"templateId": 1 // 1 是发送普通手机验证码
						}
						var res = await that.$http.post('/message-server/textMessage/getPhoneToken', getPhoneTokenData)
						if (res.data.code == 200) {
							var token = res.data.content
							that.phoneToken = token
							var res = await that.$http('/message-server/textMessage/sendCodeByPhone/' + token)
							if (res.data.code == 200) {
								// 如果发送验证码成功 禁用发送按钮 改变提示内容  60秒计时倒数
								that.$mui.toast('验证码已发送至您的手机')
								that.sendTextCodeBtnIsDisabled = true
								var _that = that
								var num = 60
								_that.sendTextCodeTip = '已发送(' + num + ')'
								var interval = setInterval(function() {
									num--
									_that.sendTextCodeTip = '已发送(' + num + ')'
									if (num == 0) {
										clearInterval(interval)
										_that.sendTextCodeBtnIsDisabled = false
										_that.sendTextCodeTip = '重新发送'
									}
								}, 1000)
							} else {
								that.$mui.toast('验证码发送失败')
							}
						} else {
							that.$mui.toast('验证码发送失败')
						}
					}
				})
			},
			regOrLoginWithPhoneCode: function() {
				var that = this
				if (this.textCode == '') {
					this.$mui.toast('验证码不能为空')
					return
				}

				if (that.phoneToken == '') {
					this.$mui.toast('验证码错误,请重试')
					return
				}
				this.$validator.validate().then(async (valid) => {
					var res = await that.$http('/message-server/textMessage/verifyCodeByPhone/' + that.phoneToken + '/' + that.textCode)
					if (res.data.code == 200) {
						// 手机验证成功  执行登录和注册操作
						// 先判断是否注册过
						that.searchData.model.phoneNum = that.phoneNum
						var res = await that.$http.post('/user-server/getAllUser', that.searchData)
						if (res.data.code == 200 && res.data.content.list.length == 0) {
							// 执行注册操作
							that.regUser()
						} else {
							// 执行登录操作
							that.loginUser()
						}
					} else {
						this.$mui.toast('验证失败,请重试')
					}
				})
			},
			regUser: function() {
				var that = this
				var userInfo = {}
				userInfo.phoneNum = this.phoneNum
				userInfo.password = '123456'
				userInfo.userName = this.phoneNum
				userInfo.status = 3 //  3代表是普通用户  无法使用后台功能
				userInfo.headImg = 'https://vp-saas-common.oss-cn-shenzhen.aliyuncs.com/1566436176212defaultHeadImg.jpg'
				// this.userInfo.phoneNum = this.phoneNum
				// this.userInfo.password = '123456'
				// this.userInfo.userName = this.phoneNum
				this.$http.post('/user-server/addUser', userInfo).then(res => {
					if (res.data.code == 200) {
						// alert('test')
						that.$setCookie('userId', res.data.content.id, 24 * 60 * 60)
						that.$setCookie('userName', res.data.content.userName, 24 * 60 * 60)
						that.$setCookie('companyId', res.data.content.companyId, 24 * 60 * 60)
						that.$setCookie('schoolId', res.data.content.schoolId, 24 * 60 * 60)
						that.$setCookie('realName', res.data.content.realName, 24 * 60 * 60)
						that.$setCookie('roleId', res.data.content.roleId, 24 * 60 * 60)
						that.$setCookie('headImg', res.data.content.headImg, 24 * 60 * 60)
						that.$setCookie('nickName', res.data.content.nickName, 24 * 60 * 60)
						that.$mui.toast('注册成功，马上跳转应用首页...')
						setTimeout(function() {
							that.$router.push('/')
						}, 2000)

					} else {
						that.$mui.toast('注册失败')
					}
				}).then(err => {
					that.$log(err)
					// that.$warnMsg('注册失败')
				})
			},
			loginUser: function() {
				var searchData = {
					"model": {
						phoneNum: this.phoneNum
					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 10
				}
				this.$http.post('/user-server/getAllUser', searchData).then(res => {
					if (res.data.code == 200 && res.data.content.list.length == 1) {
						this.$setCookie('userId', res.data.content.list[0].id, 24 * 60 * 60)
						this.$setCookie('userName', res.data.content.list[0].userName, 24 * 60 * 60)
						this.$setCookie('companyId', res.data.content.list[0].companyId, 24 * 60 * 60)
						this.$setCookie('schoolId', res.data.content.list[0].schoolId, 24 * 60 * 60)
						this.$setCookie('realName', res.data.content.list[0].realName, 24 * 60 * 60)
						this.$setCookie('roleId', res.data.content.list[0].roleId, 24 * 60 * 60)
						this.$setCookie('headImg', res.data.content.list[0].headImg, 24 * 60 * 60)
						this.$setCookie('nickName', res.data.content.list[0].nickName, 24 * 60 * 60)
						this.$router.push('/')
					} else {
						this.$mui.toast('登录失败')
					}
				})
			}
		},
		mounted: function() {

		}

	}
</script>

<style scoped="scoped">
	.yzmBtn {
		position: absolute;
		right: 14px;
		top: 30px;
		color: #007aff;
	}

	.myform {
		background-color: inherit;
		width: 90%;
		margin: 0px auto;
		margin-top: 50px;
	}

	.circleBtn {
		border-radius: 100px;
		margin-top: 30px;
		border: 0.5px solid grey;
		background-color: inherit;
		width: 90%;
		margin: 20px auto;
		margin-top: 50px;
	}

	.circleBtn:nth-of-type(1) {
		color: white;
		border: none;
		/* 渐变色 */
		background: -webkit-linear-gradient(left, #01DBE7, #018AFB);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #01DBE7, 018AFB);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #01DBE7, #018AFB);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #01DBE7, #018AFB);
		/* 标准的语法（必须放在最后） */
	}

	.changeLoginMethod {
		font-size: 14px;
		color: black;
		text-align: right;
		padding-right: 7%;
		font-weight: bold;
	}
</style>
