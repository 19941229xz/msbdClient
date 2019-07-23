<template>

	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
				<</a> <h1 class="mui-title">购物车</h1>
		</header>
		
		<!-- <ul id="OA_task_1" class="mui-table-view">
			<li class="mui-table-view-cell">
				<div class="mui-slider-right mui-disabled">
					<a class="mui-btn mui-btn-red">删除</a>
				</div>
				<div class="mui-slider-handle">
					左滑显示删除按钮
				</div>
			</li>
		</ul> -->	
		<ul class="carProList">
			<li v-for="item in shoppingcarList" class="carProduct mui-table-view-cell" >
				<!-- <div class="mui-slider-right mui-disabled">
					<a class="mui-btn mui-btn-red">删除</a>
				</div> -->
				<div @click="removeCarProById(item.id)" class="mui-slider-right mui-disabled">
					<a class="mui-btn mui-btn-red">删除</a>
				</div>
				<div class="mui-slider-handle">
				<input @change="calTotalPrice()" type="checkbox" v-model="checkedProd" :value="item.id" />
				<img :src="item.productImg" />
				<div class="proInfoAndOption">
					<ul>
						<li class="name">{{item.productName}}</li>
						<li style="overflow: hidden;" :title="item.miaoshu" class="miaoshu">{{item.miaoshu}}</li>
						<li class="opt">
							<span v-if="item.isInDiscount==1" class="left">￥{{item.normalPrice}}</span>
							<span v-if="item.isInDiscount!=1 && item.isInKill!=1" class="left">￥{{item.normalPrice-item.killDiscount-item.discount}}</span>
							<span v-if="item.isInDiscount!=1 && item.isInKill==1" class="left">￥{{item.normalPrice-item.discount}}</span>
							<span v-if="item.isInDiscount==1 && item.isInKill!=1" class="left">￥{{item.normalPrice-item.killDiscount}}</span>
							<span class="right">
								<span @click="minus(item)">-</span>
								<span>{{item.productNum}}</span>
								<span @click="plus(item)">+</span>
							</span>
						</li>
					</ul>
				</div>
				</div>
			</li>

			<!-- 购物车为空的 -->
			<div v-if="shoppingcarList.length==0" class="carEmpty" style="margin-top: 50%;">
				<p>购物车竟然是空的</p>
				<p>在忙，也要记得买点什么犒赏自己~</p>
				<span @click="$router.push('/category')" style="border: 1px solid gray;padding: 7px;border-radius: 5px;">去逛逛</span>
			</div>
		</ul>


		<!-- 推荐商品 -->
		<h5 v-show="shoppingcarList.length==0" style="background-color:#efeff4;color: orangered;margin-top: 20%;">>>你可能喜欢<<</h5>
		 <ul v-show="shoppingcarList.length==0" id="tuijian" class="mui-table-view mui-grid-view tuijian" style="margin-bottom: 20%;">
				<li @click="toProductDetail(item.id)" v-for="item in productListByOrderCount" id="tuijianPro" class="mui-table-view-cell mui-media mui-col-xs-6">
					<a>
						<img class="mui-media-object" :src="item.productImg">
						<div align="left" class="mui-media-body">{{item.productName}}</div>
						<div align="left" class="mui-media-body">{{item.miaoshu}}</div>
						<div align="left" class="mui-media-body"><span style="color: orangered;">￥{{item.normalPrice}}</span>&nbsp&nbsp&nbsp销量:{{item.orderCount}}</div>
					</a></li>
				<!-- <li id="tuijianPro" class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="#">
						<img class="mui-media-object" src="../assets/seckill_1.jpg">
						<div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div>
						<div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div>
					</a></li>
				<li id="tuijianPro" class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="#"><img class="mui-media-object" src="../assets/seckill_1.jpg">
						<div class="mui-media-body">Color of SIP CBD</div>
						<div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div>
					</a></li>
				<li id="tuijianPro" class="mui-table-view-cell mui-media mui-col-xs-6">
					<a href="#">
						<img class="mui-media-object" src="../assets/seckill_1.jpg">
						<div class="mui-media-body">静静看这世界</div>
						<div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div>
					</a></li> -->
				</ul>


				<div class="calBanner">
					<span class="left">
						<input type="checkbox" @change="checkAll" /><span>全选</span>
					</span>
					<span class="right2">
						结算({{checkedProd.length}})
					</span>
					<span class="right1">
						合计：<span style="color: orangered;font-weight: bold;">￥{{totalPrice}}</span>
					</span>

				</div>

	</div>

</template>

<script>
	export default {
		name: '',
		data() {
			return {
				shoppingcarList: [],
				totalPrice: 0,
				checkedProd: [],
				productListByOrderCount:[]    // 热销商品
			}
		},
		methods: {
			getShoppingcarListByUserId: function(userId) {
				var data = {
					model: {
						userId: userId
					},
					orderParams: [
						'createTime desc'
					],
					pageNum: 0,
					pageSize: 5 // 默认5 商品分类不会太多
				}
				this.$http.post("/getAllShoppingcar", data).then(
					res => {
						console.log(res)
						if (res.data.code == 200) {
							this.shoppingcarList = res.data.content.list
							if(this.shoppingcarList.length==0){  // 如果购物车为空 就去请求热销商品
								this.getProductByOrderCount()
							}
						} else {
							this.$mui.toast('获取购物车信息失败')
						}
					})
			},
			minus: function(item) {
				if (item.productNum > 1) {
					item.productNum--
				}
				// 判断商品是否被选中
				for (var i = 0; i < this.checkedProd.length; i++) {
					if (this.checkedProd[i] == item.id) {
						this.calTotalPrice()
					}
				}
			},
			plus: function(item) {
				if (item.productNum < item.deserveNum) {
					item.productNum++
				}
				// 判断商品是否被选中
				for (var i = 0; i < this.checkedProd.length; i++) {
					if (this.checkedProd[i] == item.id) {
						this.calTotalPrice()
					}
				}
			},
			calTotalPrice: function() {
				this.totalPrice = 0
				// debugger
				for (var i = 0; i < this.checkedProd.length; i++) {

					var tempProId = this.checkedProd[i]
					for (var j = 0; j < this.shoppingcarList.length; j++) {
						if (tempProId == this.shoppingcarList[j].id) {
							var normalPrice = this.shoppingcarList[j].normalPrice
							var discount = this.shoppingcarList[j].discount
							var killDiscount = this.shoppingcarList[j].killDiscount
							var item = this.shoppingcarList[j]
							this.totalPrice += (normalPrice - (item.isInDiscount == 2 ? discount : 0) - (item.isInKill == 2 ? killDiscount :
								0)) * item.productNum

						}
					}
				}
			},
			checkAll: function() {
				var _this = this
				if (this.checkedProd.length == this.shoppingcarList.length) {
					// 实现反选
					this.checkedProd = []
				} else {
					// 实现全选
					this.checkedProd = []
					//console.log(this.checked)
					this.shoppingcarList.forEach(function(item) {
						_this.checkedProd.push(item.id)
						//console.log("..."+_this.checked)
					})
				}
				this.calTotalPrice()
			},
			getProductByOrderCount:function(){
				var that = this
				//获取热销商品
				this.$http({
					url: "/getAllProduct",
					method: 'post',
					data: {
						model: {
							
						},
						orderParams: [
							'orderCount desc'
						],
						pageNum: 0,
						pageSize: 8
					}
				
				}).then(function(res) {
					console.log(res)
					that.productListByOrderCount = res.data.content.list
					// that.productTypeList = res.data.content.list
					// that.bannerImg = res.data.content.list[0].typeImg
				}).catch(function(err) {
					that.$mui.toast('获取商品列表信息失败')
					console.log(err)
				})
			},
			toProductDetail:function(productId){ // 跳转到商品详情页面
				console.log('proId:'+productId)
				this.$router.push({path:'/productDetail',query:{proId:productId}})
			},
			removeCarProById:function(id){
				var temp = this.shoppingcarList
				this.shoppingcarList=[]
				this.$http("/removeShoppingcarById/"+id).then(
					res=>{
						if(res.data.code==200){
							this.$mui.toast('移除成功')
							this.getShoppingcarListByUserId(this.$userInfo.id)
						}else{
							this.$mui.toast('移除失败')
							this.shoppingcarList=temp
						}
					}
				)
			}
		},
		mounted: function() {
			this.getShoppingcarListByUserId(this.$userInfo.id)
		}

	}
</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");


	/* 购物车样式 */
	.carProList {
		padding: 0px;
	}

	.carProduct {
		list-style: none;
		width: 100%;
		height: 100px;
		margin-top: 10px;
		background-color: white;
	}

	.carProduct img {
		float: left;
		height: 100%;
		width: 30%;
		margin-top: -10px;
		vertical-align: middle;
	}

	.carProduct .proInfoAndOption {
		float: right;
		width: 60%;
		height: 100%;
		/* border: 1px solid red; */
	}

	.proInfoAndOption ul {
		list-style: none;
		padding: 0px;
		height: 100%;
		width: 100%;
		margin: 0px;

	}

	.proInfoAndOption ul li {
		width: 100%;
		height: 33%;
		margin-top: -10px;
		/* border: 1px solid red; */
	}

	.carProduct input {
		float: left;
		height: 20px;
		width: 20px;
		border-radius: 15px;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		line-height: 18px;
		position: relative;
		margin-top: 30px;
		margin-left: 3%;
	}

	.name {
		font-weight: bold;
		text-align: left;
		font-size: 15px;
		line-height: 30px;
	}

	.miaoshu {
		text-align: left;
		font-size: 10px;
		line-height: 30px;
	}

	.opt span {
		font-size: 17px;
		line-height: 33px;
	}

	.opt .left {
		float: left;
		color: orangered;
		font-weight: bold;
	}

	.opt .right {
		float: right;
		margin-right: 10px;
	}

	.opt .right span {
		margin-right: 10px;
	}


	/* 计算样式 */
	.calBanner {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0px;
		background-color: white;
		/* border: 1px solid red; */
	}

	.calBanner span {
		height: 100%;
	}

	.calBanner span.left {
		float: left;
		width: 20%;
		/* border: 1px solid red; */
	}

	.calBanner span.right2 {
		float: right;
		width: 35%;
		/* border: 1px solid red; */
		font-size: 16px;
		line-height: 50px;
		background-color: orangered;
		color: white;
	}

	.calBanner span.right1 {
		float: right;
		width: 40%;
		/* border: 1px solid red; */
		font-size: 15px;
		line-height: 50px;
	}

	.calBanner span.left input {
		margin-top: 15px;
		width: 20px;
		height: 20px;
	}

	.calBanner span.left span {
		font-size: 16px;
		line-height: 20px;
		margin-left: 10px;
		font-weight: bold;
	}

	/* 推荐商品 */

	/* #tuijianPro {
		background-color: white;
		padding: 0px;
	} */
</style>
