<template>
	
	<div>
		
		<header class="jd_search">
			<div class="jd_search_box">
				<div @click="toIndex"><a class="icon_logo"></a></div>
				<form action="#">
					<span class="icon_search"></span>
		            <input type="search" placeholder="请输入商品名称">
				</form>
			</div>
		</header>
		
		
		<div class="jd_product">
		    <section class="jd_product_box sk">
		        <!-- <div class="tit nb">
		            <div class="f_left">
		                <span class="icon"></span>
		                <span class="name">掌上描述</span>
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
		            <div class="f_right"><a class="m_r10" href="#">更多&gt;</a></div>
		        </div> -->
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
		</div>
		
		
	</div>
	
</template>

<script>
	
	export default{
		name:'shopList',
		data(){
			return{
				
			}
		},
		methods:{
			toIndex:function(){
				console.log('test')
				this.$router.push("/")
			}
		}
		
	}
	
</script>

<style scoped="scoped">
	@import url("../assets/css/base.css");
	@import url("../assets/css/index.css");
	
	
	.icon_logo{
		z-index: 1000;
	}
	
</style>
