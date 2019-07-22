<template>
	
	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)"><</a>
			<h1 class="mui-title">订单详情</h1>
		</header>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						商品名称
						<p class="mui-ellipsis">商品价格</p>
						<p class="mui-ellipsis">件数</p>
					</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						商品名称
						<p class="mui-ellipsis">商品价格</p>
						<p class="mui-ellipsis">件数</p>
					</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						商品名称
						<p class="mui-ellipsis">商品价格</p>
						<p class="mui-ellipsis">件数</p>
					</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../assets/images/buy-pro1.jpg">
					<div class="mui-media-body">
						商品名称
						<p class="mui-ellipsis">商品价格</p>
						<p class="mui-ellipsis">件数</p>
					</div>
				</a>
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
			toLogin:function(){
				this.$router.push({path:'/login'})
			}
		}
		
	}
	
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");
	
	
</style>
