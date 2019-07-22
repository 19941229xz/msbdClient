<template>

	<div>

		<div class="jd_layout">
			<!-- 底部通栏-->
			<header class="jd_topBar">
				<a href="javascript:history.back(-1)" class="icon_back"></a>
				<form action="#">
					<input type="search" placeholder="顶部通栏" />
				</form>
				<a href="#" class="icon_menu"></a>
			</header>

			<!-- 分类主体-->
			<div class="jd_main">
				<div class="jd_cateLeft">
					<ul class="clearFix">
						<li v-for="(item,index) in productTypeList" @click="changeType(item,index)" :class="{'now':position==index}"><a>{{item.producttypeName}}</a></li>
					</ul>
				</div>
				<div class="jd_cateRight">
					<div class="jd_cateRight_box">
						<a class="banner"><img class="banner" :src="bannerImg" alt="" /></a>
						<div class="hot">
							<h3>新品推荐</h3>
							<ul class="clearFix">
								<li v-for="item in productListByCreateTime"><a><img :src="item.productImg" alt="" />
										<p>{{item.productName}}</p>
									</a></li>

							</ul>
						</div>

						<div class="hot">
							<h3>热门分类</h3>
							<ul class="clearFix">
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
								<li><a href="#"><img src="../assets/images/nv-fy.jpg" alt="" />
										<p>毛呢大衣</p>
									</a></li>
							</ul>
						</div>

					</div>
				</div>

			</div>


		</div>


	</div>

</template>

<script>
	export default {
		name: 'category',
		data() {
			return {
				productTypeList: [],
				productListByCreateTime: [],
				productListByViewNum: [],
				bannerImg: '',
				position: 0
			}
		},
		methods: {
			getAllProductType: function() {
				var that = this

				this.$http({
					url: "/getAllProducttype",
					method: 'post',
					data: {
						model: {

						},
						orderParams: [
							'viewNum desc'
						],
						pageNum: 0,
						pageSize: 100
					}

				}).then(function(res) {
					console.log(res)
					that.productTypeList = res.data.content.list
					that.getProductListByTypeId(that.productTypeList[0].id, 'createTime desc')  //默认展示第一个商品分类的商品
					that.bannerImg = res.data.content.list[0].typeImg
				}).catch(function(err) {
					that.$mui.toast('获取商品分类信息失败')
					console.log(err)
				})
			},
			changeType: function(item, index) {
				this.bannerImg = item.typeImg
				this.position = index
				this.getProductListByTypeId(item.id, 'createTime desc')


			},
			getProductListByTypeId: function(typeId, orderParam) {

				var that = this

				this.$http({
					url: "/getAllProduct",
					method: 'post',
					data: {
						model: {
							'typeId': typeId
						},
						orderParams: [
							orderParam
						],
						pageNum: 0,
						pageSize: 100
					}

				}).then(function(res) {
					console.log(res)
					that.productListByCreateTime = res.data.content.list
					// that.productTypeList = res.data.content.list
					// that.bannerImg = res.data.content.list[0].typeImg
				}).catch(function(err) {
					that.$mui.toast('获取商品列表信息失败')
					console.log(err)
				})

			}
		},
		mounted: function() {
			this.getAllProductType()
		}

	}
</script>

<style scoped="scoped">
	@import url("../assets/css/base.css");
	@import url("../assets/css/category.css");
</style>
