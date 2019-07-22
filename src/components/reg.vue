<template>
	<div>
		
		
		<header class="mui-bar mui-bar-nav">
			<a href="javascript:history.back()" class="backFont mui-icon mui-pull-left"><</a>
			<h1 class="mui-title">注册</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' @change="userNameIsReged" type="text" v-model="userName" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
				<div class="mui-input-row">
					<label>确认</label>
					<input id='password_confirm' v-model="password_confirm" type="password" class="mui-input-clear mui-input" placeholder="请确认密码">
				</div>
				<div class="mui-input-row">
					<label>邮箱</label>
					<input id='email' v-model="email" type="email" class="mui-input-clear mui-input" placeholder="请输入邮箱">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='reg' @click="reg()" class="mui-btn mui-btn-block mui-btn-primary">注册</button>
			</div>
			<div class="mui-content-padded">
				<p>注册真实可用，注册成功后的用户可用于登录，但是示例程序并未和服务端交互，用户相关数据仅存储于本地。</p>
			</div>
		</div>
		
		
	</div>
	
	
</template>

<script>
export default{
	name:'reg',
	data(){
		return {
			userName:''
		}
	},
	methods:{
		userNameIsReged:function(){  // 用户输入完用户名  立马去后台查询是否被注册
			var that = this
			this.$http({
					method: 'post',
					url: '/reg/userNameIsReged/'+that.userName,
					data: {
						// userName: that.userName,
						// password: that.password
					}
				}).then(function(res) {
					console.log(res);
					if(res.data.code==200){
						// that.$setCookie('token',res.data.content)
						// that.$mui.toast('登录成功')
						// that.$router.push('/')
					}else{
						that.$mui.alert('用户名已经被占用')
						that.userName=''
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		reg:function(){
			//if(){} // 对注册信息进行非空校验  以及邮箱格式  密码数字字母长度 
			if(this.password!=this.password_confirm){
				this.$mui.alert('两次密码输入的不一致')
				this.password_confirm=''
				return
			}
			
			var that = this
			this.$http({
					method: 'post',
					url: '/reg/user',
					data: {
						userName: that.userName,
						password: that.password,
						email:that.email
					}
				}).then(function(res) {
					console.log(res);
					if(res.data.code==200){
						// that.$setCookie('token',res.data.content)
						that.$mui.toast('注册成功，请登录')
						that.$router.push('/login')
					}else{
						that.$mui.alert('注册失败，原因：'+res.data.msg)
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
}	
	
	
	
	
	
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/style.css");
	@import url("../assets/css/reg.css");
	
	
	
	
	
</style>
