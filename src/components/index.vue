<template>
	<div>

		<div class="jd_container">
			<!-- 顶部搜索 -->
			<header class="jd_search">
				<div class="jd_search_box">
					<a href="#" class="icon_logo"></a>
					<form action="#">
						<span class="icon_search"></span>
						<input type="search" placeholder="搜索商品">
					</form>
					<a v-if="isLogin=='登出'" id="menu" href="#topPopover" class="login mui-action-menu mui-pull-right">
						<img v-if="userInfo.headPic==''" src="../../build/logo.png" />
						<img v-if="userInfo.headPic!=''" :src="userInfo.headPic" />
					</a>
					<a v-if="isLogin=='登录'" @click="toLogin" class="login">{{isLogin}}</a>
				</div>
			</header>
			<!-- 右上角菜单 -->
			<div id="topPopover" class="mui-popover">
				<div class="mui-popover-arrow"></div>
				<div class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell" @click="toTrans()">物流信息</li>
							<li class="mui-table-view-cell" @click="toOrder">你的订单</li>
							<li class="mui-table-view-cell" @click="toCar()">购物车</li>
							<li class="mui-table-view-cell" @click="logOut">登出</li>
						</ul>
						<!-- <ul class="mui-table-view">
							<li class="mui-table-view-cell">
								<a href="#">Item1</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item2</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item3</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item4</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item5</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item6</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item7</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item8</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item9</a>
							</li>
							<li class="mui-table-view-cell"><a href="#">Item10</a>
							</li>
						</ul> -->
					</div>
				</div>

			</div>

			<!-- 轮播图 -->
			<div id="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<img src="../assets/images/l8.jpg" alt="">
						</a>
					</div>
					<!-- 第一张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l1.jpg" alt="">
						</a>
					</div>
					<!-- 第二张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l2.jpg" alt="">
						</a>
					</div>
					<!-- 第三张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l3.jpg" alt="">
						</a>
					</div>
					<!-- 第四张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l4.jpg" alt="">
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l5.jpg" alt="">
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l6.jpg" alt="">
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l7.jpg" alt="">
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/images/l8.jpg" alt="">
						</a>
					</div>
					<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<img src="../assets/images/l1.jpg" alt="">
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
			<!-- 导航栏 -->
			<nav class="jd_nav">
				<ul class="clearFix">
					<li @click="toCategory()"><a><img src="../assets/images/nav0.png" alt="">
							<p>分类</p>
						</a></li>
					<li @click="toTrans()"><a><img src="../assets/images/nav1.png" alt="">
							<p>物流</p>
						</a></li>
					<li @click="toCar()"><a><img src="../assets/images/nav2.png" alt="">
							<p>购物车</p>
						</a></li>
					<li @click="toUserCenter()"><a><img src="../assets/images/nav3.png" alt="">
							<p>个人中心</p>
						</a></li>
					<!-- <li><a href="#"><img src="../assets/images/nav4.png" alt=""><p>分类</p></a></li>
		            <li><a href="#"><img src="../assets/images/nav5.png" alt=""><p>分类</p></a></li>
		            <li><a href="#"><img src="../assets/images/nav6.png" alt=""><p>分类</p></a></li>
		            <li><a href="#"><img src="../assets/images/nav7.png" alt=""><p>分类</p></a></li> -->
				</ul>
			</nav>

			<!--产品区块-->
			<div class="jd_product">
				<section class="jd_product_box sk">
					<!--second kill-->
					<div class="tit nb">
						<div class="f_left">
							<span class="icon"></span>
							<span class="name">秒杀活动</span>
							<div class="time">
								<span>0</span>
								<span>0</span>
								<span>:</span>
								<span>0</span>
								<span>0</span>
								<span>:</span>
								<span>0</span>
								<span>0</span>
							</div>
						</div>
						<div class="f_right"><a @click="toShopList" class="m_r10">更多&gt;</a></div>
					</div>
					<div class="con">
						<ul class="pro clearFix">
							<li>
								<a href="#"><img src="../assets/images/detail01.jpg" alt=""></a>
								<p class="nowPrice">&yen;10.00</p>
								<p class="oldPrice">&yen;100.00</p>
							</li>
							<li>
								<a href="#"><img src="../assets/images/detail02.jpg" alt=""></a>
								<p class="nowPrice">&yen;10.00</p>
								<p class="oldPrice">&yen;100.00</p>
							</li>
							<li>
								<a href="#"><img src="../assets/images/detail01.jpg" alt=""></a>
								<p class="nowPrice">&yen;10.00</p>
								<p class="oldPrice">&yen;100.00</p>
							</li>
							<li>
								<a href="#"><img src="../assets/images/detail01.jpg" alt=""></a>
								<p class="nowPrice">&yen;10.00</p>
								<p class="oldPrice">&yen;100.00</p>
							</li>
						</ul>
					</div>
				</section>
				<section class="jd_product_box">
					<div class="tit">
						<h3>京东超市</h3>
					</div>
					<div class="con clearFix">
						<a class="w_50p f_left br" href="#"><img src="../assets/images/cp1.jpg" alt=""></a>
						<a class="w_50p f_right bb" href="#"><img src="../assets/images/cp2.jpg" alt=""></a>
						<a class="w_50p f_right" href="#"><img src="../assets/images/cp3.jpg" alt=""></a>
					</div>
				</section>
				<section class="jd_product_box">
					<div class="tit">
						<h3>京东自营</h3>
					</div>
					<div class="con clearFix">
						<a class="w_50p f_right bl" href="#"><img src="../assets/images/cp4.jpg" alt=""></a>
						<a class="w_50p f_left bb" href="#"><img src="../assets/images/cp5.jpg" alt=""></a>
						<a class="w_50p f_left" href="#"><img src="../assets/images/cp6.jpg" alt=""></a>
					</div>
				</section>
				<section class="jd_product_box">
					<div class="tit">
						<h3>京东热门</h3>
					</div>
					<div class="con clearFix">
						<a class="w_50p f_left br" href="#"><img src="../assets/images/cp1.jpg" alt=""></a>
						<a class="w_50p f_right bb" href="#"><img src="../assets/images/cp2.jpg" alt=""></a>
						<a class="w_50p f_right" href="#"><img src="../assets/images/cp3.jpg" alt=""></a>
					</div>
				</section>
			</div>
		</div>



	</div>





</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				isLogin: '登录',
				userInfo:{}
			}
		},
		methods: {
			logOut:function(){
				this.$deleteCookie('userName')
				this.$mui.toast('安全退出')
				this.$mui('#topPopover').popover('hide')
				this.isLogin='登录'
				this.$router.push('/')
			},
			toOrder:function(){
				this.$mui('#topPopover').popover('hide')
				this.$router.push('/order')
			},
			toLogin: function() {
				if (this.isLogin === '登录') {
					this.$router.push({
						path: '/login'
					})
				} else {
					this.isLogin = '登录'
					this.$deleteCookie('userName')
					this.$mui.toast('安全退出')
				}

			},
			toCategory: function() {
				this.$router.push({
					path: '/category'
				})
			},
			toShopList: function() {
				this.$router.push({
					path: '/shopList'
				})
			},
			toCar: function() {
				this.$mui('#topPopover').popover('hide') // 隐藏右上角菜单
				this.$router.push({
					path: '/car'
				})
			},
			toTrans: function() {
				this.$mui('#topPopover').popover('hide')
				this.$router.push({
					path: '/trans'
				})
			},
			toUserCenter: function() {
				this.$router.push({
					path: '/userCenter'
				})
			},
			getUserInfo: function() {
				var that = this
			
				this.$http({
					url: "/getAllUser",
					method: 'post',
					data: {
						model: {
							"userName": that.$getCookie('userName')
						},
						orderParams: [
			
						],
						pageNum: 0,
						pageSize: 5
					}
			
				}).then(function(res) {
					console.log(res.data.content.list[0])
					that.userInfo = res.data.content.list[0]
				}).catch(function(err) {
					that.$mui.toast('获取用户信息失败')
					console.log(err)
				})
			
			}
		},
		mounted: function() {
			//获取用户信息
			this.getUserInfo()
			//轮播图
			this.$mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			var slider = this.$mui("#slider");
			slider.slider({
				interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
			// 判断cookie中是否有token 改变登录和登出的显示内容
			if (this.$getCookie('userName') != null && this.$getCookie('userName').length != 0 && this.$getCookie('userName') != '') {
				this.isLogin = '登出'
			} else {
				this.isLogin = '登录'
			}
			// 处理右上角弹出菜单
			this.$mui.plusReady(function() {});

			this.$mui('.mui-scroll-wrapper').scroll();
			this.$mui('body').on('shown', '.mui-popover', function(e) {
				//console.log('shown', e.detail.id);//detail为当前popover元素
			});
			this.$mui('body').on('hidden', '.mui-popover', function(e) {
				//console.log('hidden', e.detail.id);//detail为当前popover元素
			});
		}

	}
</script>

<style scoped="scoped">
	@import url("../assets/css/base.css");
	@import url("../assets/css/index.css");

	#slider {
		margin-top: -80px;
	}

	.mui-plus .plus {
		display: inline;
	}

	.plus {
		display: none;
	}

	/* #topPopover {
		position: fixed;
		top: 16px;
		right: 6px;
	}

	#topPopover .mui-popover-arrow {
		left: auto;
		right: 6px;
	} */

	/* p {
		text-indent: 22px;
	} */
	span.mui-icon {
		font-size: 14px;
		color: #007aff;
		margin-left: -15px;
		padding-right: 10px;
	}

	.mui-popover {
		height: 300px;
	}

	.mui-content {
		padding: 10px;
	}


/* 设置右上角菜单样式 */
	.mui-table-view-cell {
		position: relative;
		font-size: 22px;
		line-height: 41px;
		overflow: hidden;
	}

	.mui-popover{
		height: 180;
		width: 130;
		float: right;
	}
	
/* 设施头像样式 */	
#menu img{
	width: 70%;
    height: 70%;
    /* margin-top: 10%; */
    padding-top: 10%;
}
</style>
