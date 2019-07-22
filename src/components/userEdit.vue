<template>
	
	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)"><</a>
			<h1 class="mui-title">修改个人信息</h1>
		</header>
		<form class="mui-input-group">
			<div class="mui-input-row">
				<label>用户名</label>
				<input v-model="userInfo.userName" type="text" class="mui-input-clear" placeholder="请输入">
			</div>
			<div class="mui-input-row">
				<label>密码</label>
				<input @change="changePass" v-model="userInfo.password" type="password" class="mui-input-clear" placeholder="请输入">
			</div>
			<div class="mui-input-row">
				<label>邮箱</label>
				<input v-model="userInfo.email" type="text" class="mui-input-clear" placeholder="请输入">
			</div>
			<div class="mui-input-row">
				<label>收货地址</label>
				<input v-model="userInfo.deliveryAddress" type="text" class="mui-input-clear" placeholder="请输入">
			</div>
			<div class="mui-input-row">
				<label>上传头像</label>
				<input @change="uploadHeadPic" type="file" class="mui-input-clear" >
			</div>
			<div style="background-color: green;" class="mui-input-row">
				<input @click="saveUser" type="button" class="mui-button-row" value="保存">
			</div>
		</form>
		
		
	</div>
	
</template>

<script>
	
	export default{
		name:'',
		data(){
			return{
				userInfo:{},
				isChangePass:false,
				oldPass:''
			}
		},
		methods:{
			uploadHeadPic: function(e) {
				console.log('uploadHeadPic')
				let that = this;
				if (e.target.files.length!== 0) {
					var formData = new FormData()
					formData.append('image_data', e.target.files[0]);
					//单个文件进行上传
					this.$http.post('/upload/addImage', formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							// "ticket":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjA4MjU4NTQsInVzZXJuYW1lIjoiamFjayJ9.WJCcrepMw8DyKWC5hV1FEtdhYJXX0hs0NRpnPtI7-tk",
							// "Access-Control-Allow-Origin":"http://localhost:8080"
						}
					}).then(response => {
						console.log('upload success')
						// that.$mui.alert('头像上传成功')
						that.userInfo.headPic=(that.$http.defaults.baseURL+"/static/"+e.target.files[0].name)
						that.$mui.alert('头像上传成功', '微品商城', function() {
							that.saveUser()
						});
					})
				}
			},
			toLogin:function(){
				this.$router.push({path:'/login'})
			},
			changePass:function(){
				this.isChangePass=(this.userInfo.password!=this.oldPass)
			},
			saveUser:function(){
				var that = this
				delete this.userInfo.roleId
				this.$http({
					method:'put',
					url:'/updateUser',
					data:that.userInfo
				}).then(function(res){
					console.log(res.data.code)
					if(res.data.code==200){
						if(that.isChangePass){
							that.$deleteCookie('userName')
							that.$router.push('/login')
							that.$mui.toast('密码已经更改，请重新登录')
						}else{
							that.$router.push('/userCenter')
						}
					}else{
						that.$mui.toast('修改失败')
					}
					
					
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		watch:{
			// userInfo:function(){
			// 	console.log('userinfo change')
			// 	this.isChangePass=(this.userInfo.password!=this.oldPass)
			// 	console.log(this.isChangePass)
			// }
		},
		mounted:function(){
			console.log(this.$route.params.userInfo)
			this.userInfo=this.$route.params.userInfo
			this.oldPass=this.userInfo.password
		}
		
	}
	
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");
	
	
</style>
