<template>

	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
				<</a> <h1 class="mui-title">购物车</h1>
		</header>
		<ul class="carProList">
			<li v-for="item in shoppingcarList" class="carProduct">
				<input @change="calTotalPrice()" type="checkbox" v-model="checkedProd" :value="item.id"/>
				<img :src="item.productImg" />
				<div class="proInfoAndOption">
					<ul>
						<li class="name">{{item.productName}}</li>
						<li class="miaoshu">{{item.miaoshu}}</li>
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
			</li>

			<!-- <li class="carProduct">

			</li>

			<li class="carProduct">

			</li> -->


		</ul>


		<div class="calBanner">
			<span class="left">
				<input type="checkbox" @change="checkAll"/><span>全选</span>
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
				totalPrice:0,
				checkedProd:[]
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
						} else {
							this.$mui.toast('获取购物车信息失败')
						}
					})
			},
			minus:function(item){
				if(item.productNum>1){
					item.productNum--
				}
				// 判断商品是否被选中
				var flag= false  //  默认没有选中商品
				for(var i=0;i<this.checkedProd.length;i++){
					if(this.checkedProd[i]==item.id){
						this.calTotalPrice()
					}
				}
			},
			plus:function(item){
				if(item.productNum<item.deserveNum){
					item.productNum++
				}
				// 判断商品是否被选中
				var flag= false  //  默认没有选中商品
				for(var i=0;i<this.checkedProd.length;i++){
					if(this.checkedProd[i]==item.id){
						this.calTotalPrice()
					}
				}
			},
			calTotalPrice:function(){
				this.totalPrice=0
				// debugger
				for(var i=0;i<this.checkedProd.length;i++){
					
					var tempProId=this.checkedProd[i]
					for(var j=0;j<this.shoppingcarList.length;j++){
						if(tempProId==this.shoppingcarList[j].id){
							var normalPrice = this.shoppingcarList[j].normalPrice
							var discount = this.shoppingcarList[j].discount
							var killDiscount = this.shoppingcarList[j].killDiscount
							var item = this.shoppingcarList[j]
							this.totalPrice+= (  normalPrice- (item.isInDiscount==2?discount:0)  -  (item.isInKill==2?killDiscount:0)    )*item.productNum
							
						}
					}
				}
			},
			checkAll:function(){
				var _this = this
				if (this.checkedProd.length==this.shoppingcarList.length) {
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
		margin-top: 40px;
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
</style>
