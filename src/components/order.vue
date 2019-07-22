<template>
	
	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)"><</a>
			<h1 class="mui-title">你的订单</h1>
		</header>	
		<ul class="mui-table-view">
			<li @click="toOrderDetail" class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						订单号
						<p class="mui-ellipsis">下单时间</p>
					</div>
				</a>
			</li>
			<li @click="toOrderDetail" class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						订单号
						<p class="mui-ellipsis">下单时间</p>
					</div>
				</a>
			</li>
			<li @click="toOrderDetail" class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						订单号
						<p class="mui-ellipsis">下单时间</p>
					</div>
				</a>
			</li>
			<li @click="toOrderDetail" class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						订单号
						<p class="mui-ellipsis">下单时间</p>
					</div>
				</a>
			</li>
			<li style="background-color: red;" class="mui-table-view-cell mui-media">
				清空订单
			</li>
		</ul>
		
		
	</div>
	
</template>

<script>
	
	export default{
		name:'',
		data(){
			return{
				
			}
		},
		methods:{
			toOrderDetail:function(){
				this.$router.push({path:'/orderDetail'})
			}
		}
		
	}
	
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");
	
	
</style>
