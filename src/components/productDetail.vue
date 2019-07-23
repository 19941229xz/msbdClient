<template>

	<div style="">
		<header class="mui-bar mui-bar-nav">
			<!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="tocategory"></a> -->
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
				<</a> <h1 class="mui-title">商品详情</h1>
		</header>
		<div class="mui-card">
			<!-- <div class="mui-card-header mui-card-media" style="height:40vw;background-image:url(../assets/images/detail02.jpg)"></div> -->
			<img src="../assets/seckill_1.jpg" />
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p align="left" style="color: #000000;" class="realPrice">
						{{product.productName}}
					</p>
					<p align="left" class="realPrice">￥{{product.normalPrice-product.discount}}
						<span v-if="product.isInDiscount==1" class="discountLogo">折扣商品</span>
						<span v-if="product.isInKill==1" class="discountLogo">秒杀商品</span>
					</p>
					<p align="left" class="huaxian normalPrice">￥{{product.normalPrice}}</p>
					<p align="left" style="color: #333;">
						{{product.miaoshu}}
					</p>
				</div>
			</div>
			<div class="mui-card-footer">   
				<a class="mui-card-link">快递：{{product.deliveryPrice}}</a>
				<a class="mui-card-link">销量：{{product.orderCount}}</a>
				<a class="mui-card-link">{{product.deliveryPlace}}</a>
			</div>
			<div class="mui-card-footer">
				<a class="mui-card-link">宝贝评论(1999)</a>
				<a class="mui-card-link">></a>
			</div>
		</div>
		
		<!-- 宝贝评论 -->
		
		<!-- 按钮组 -->
		<div class="carAndOrder">
			<div align="center" class="car">加入购物车</div>
			<div align="center" class="order">添加到订单</div>
		</div>
		<!-- <div class="mui-card">
			<div>
				<img src="../../build/logo.png" />
			</div>

			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品名称：test</p>
					<p style="color: #333;">商品价格：test</p>
					<p style="color: #333;">商品描述：test</p>
					<p style="color: #333;">商品类型：test</p>
					<p style="color: #333;">商品折扣价：test</p>
				</div>
			</div>
		</div>
		<button type="button" class="mui-btn mui-btn-blue mui-btn-block" @click="">加入购物车</button>
		<button type="button" class="mui-btn mui-btn-blue mui-btn-block" @click="">加入订单</button> -->
	</div>

</template>

<script>
	export default {
		name: 'productDetail',
		data() {
			return {
				product:{}
			}
		},
		methods: {
			getProductById:function(proId){
				
				this.$http('/getProductById/'+proId).then(res=>{
					console.log(res)
					this.product=res.data.content
					
				})
			}

		},
		mounted() {
			console.log(this.$route.query.proId)
			this.getProductById(this.$route.query.proId)
		}

	}
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");

	.huaxian {
		text-decoration: line-through;
	}

	.normalPrice {
		color: darkgray;
	}

	.realPrice {
		color: orangered;
		font-size: 20px;
		font-weight: bold;
	}

	.discountLogo {
		font-size: 10px;
		padding-left: 10px;
		padding-right: 10px;
		/* border: 2px solid inherit; */
		border-radius: 14px;
		background-color: moccasin;
	}

	.mui-card {
		margin: 0px;
		background-color: inherit;
		border: 0px solid;
		box-shadow: none;
	}

	.mui-card img {
		width: 100%;
	}

	.mui-card-footer a {
		color: darkgray;
	}

	/* 按钮组样式  */
	.carAndOrder {
		width: 100%;
		position: fixed;
		height: 50px;
		font-size: 17px;
		color: white;
		line-height: 47px;
		/* border: 1px solid #888888; */
		/* border-radius: 30px; */
	}

	.car {
		height: 100%;
		width: 50%;
		background-color: orange;
		float: left;
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
	}

	.order {
		height: 100%;
		width: 50%;
		background-color: orangered;
		float: right;
		border-top-right-radius: 30px;
		border-bottom-right-radius: 30px;
	}
</style>
