<template>
	<div>

		<div class="mui-content">

			<header class="header">
				<a @click="toIndex" href="javascript:;"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>用户设置</h5>
			</header>

			<ul class="mui-table-view">
				<li  class="mui-table-view-cell mui-media">
					<a @tap="toUserEdit()"  class="mui-navigate-right">
						<img @tap.stop="updateHeadImg()" v-show="userInfo.headImg!=''&&userInfo.headImg!=null&&userInfo.headImg!='null'" class="mui-media-object mui-pull-left"
						 :src="userInfo.headImg">
						<img @tap.stop="updateHeadImg()" v-show="userInfo.headImg==''||userInfo.headImg==null||userInfo.headImg=='null'" class="mui-media-object mui-pull-left"
						 :src="userInfo.headImg">
						<input @change="addImage" id="headImg" type="file" style="display:none;" />
						<div class="mui-media-body">
							账号:{{userInfo.userName}} <span class="mui-badge">vip</span>
							<p class="mui-ellipsis">等级3 积分：1000</p>
						</div>
					</a>
				</li>
			</ul>

			<ul class="mui-table-view">
				<!-- <li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						个人信息
					</a>
				</li> -->
				<li class="mui-table-view-cell">
					<a href="#/points" class="mui-navigate-right">
						我的积分
					</a>
				</li>
				<!-- <li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						会员中心
					</a>
				</li> -->
			</ul>

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
			toIndex() {
				this.$router.push('/')
			},
			toUserEdit() {
				this.$router.push('/userEdit')
			},
			async getUserInfo() {
				var res = await this.$http('/user-server/getUserById/' + this.$getCookie('userId'))
				this.userInfo = res.data.content
				// console.log(this.userInfo)
			},
			async addImage(e) {
				var that = this;
				var loadTip = this.$layer.open({
					type: 2,
					content: '头像上传中'
				});
				if (e.target.files.length !== 0) {
					var formData = new FormData()
					formData.append('file_data', e.target.files[0]);
					// console.log(e.target.files[0].name)
					var fileName = e.target.files[0].name
					// 获取fileToken
					var fileParam = {
						fileName: fileName
					}
					var res = await this.$http.post('/file-server/createFileToken', fileParam)
					var token = res.data.content
					var res2 = await this.$http.post('/file-server/uploadFile/' + token, formData)
					//
					this.userInfo[e.target.id] = res2.data.content
					//
					this.$http.put('/user-server/updateUser', this.userInfo)
					//
					this.$layer.close(loadTip)
				} else {
					this.$layer.close(loadTip)
					this.$warnMsg('文件选择错误')
				}
			},
			updateHeadImg() {
				document.getElementById('headImg').click()
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
