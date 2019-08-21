<template>

	<div>
		<div class="mui-content pb">

			<!-- 头部 -->
			<div class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<a v-for="(item,index) in questionjobtypeList" @click="changeQuestionJobType(item,index)" :class="{'mui-active':position==item.id}"
				 class="mui-control-item">
					{{item.questionJobTypeName}}
				</a>
				<!-- <a class="mui-control-item">
					简历
				</a> -->
			</div>
			<!-- 轮播图 -->
			<div id="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<img src="../assets/banner1.jpg">
						</a>
					</div>
					<!-- 第一张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="../assets/banner1.jpg">
						</a>
					</div>
					<!-- 第二张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="http:\/\/placehold.it\/400x100">
						</a>
					</div>
					<!-- 第三张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="http:\/\/placehold.it\/400x100">
						</a>
					</div>
					<!-- 第四张 -->
					<div class="mui-slider-item">
						<a href="#">
							<img src="http:\/\/placehold.it\/400x100">
						</a>
					</div>
					<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<img src="http:\/\/placehold.it\/400x100">
						</a>
					</div>
				</div>
			</div>


			<!-- 练习、考试 -->
			<ul class="mui-table-view mui-grid-view mui-grid-9">

				<div style="position: relative;">
					<div @click="toRegularPractice" class="center--btn-box blue">
						<div class="wrap">
							<p>顺序练习</p>
							<p>{{questionDone}}/{{questionCount}}</p>
						</div>
					</div>
					<li @click="toExampaperList" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="javascript:;">
							<span class="mui-icon mui-icon-home"><span class="mui-badge mui-badge-blue">新功能</span></span>
							<div class="mui-media-body">专项练习</div>
							
						</a>
					</li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" style="border:none;">
						<!-- <a href="#">
							<span class="mui-icon mui-icon-email"><span class="mui-badge mui-badge-red">5</span></span>
							<div class="mui-media-body">Email</div>
						</a> -->
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-close"></span>
							<div class="mui-media-body">我的错题</div>
						</a>
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-location"></span>
							<div class="mui-media-body">VIP课程</div>
						</a>
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" style="border:none;">
						<!-- <a href="#">
							<span class="mui-icon mui-icon-search"></span>
							<div class="mui-media-body">Search</div>
						</a> -->
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-paperplane"></span>
							<div class="mui-media-body">随机练习</div>
						</a>
					</li>
				</div>

				<div style="position: relative;">
					<div @click="toTakeExam" class="center--btn-box green">
						<div class="wrap">
							<p>模拟笔试</p>
							<p>{{bestScore}}分</p>
						</div>
					</div>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-home"></span>
							<div class="mui-media-body">驾考讲堂</div>
						</a>
					</li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" style="border:none;">
						<!-- <a href="#">
							<span class="mui-icon mui-icon-email"><span class="mui-badge mui-badge-red">5</span></span>
							<div class="mui-media-body">Email</div>
						</a> -->
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-chatbubble"></span>
							<div class="mui-media-body">面试技巧</div>
						</a>
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-location"></span>
							<div class="mui-media-body">难题攻克</div>
						</a>
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" style="border:none;">
						<!-- <a href="#">
							<span class="mui-icon mui-icon-search"></span>
							<div class="mui-media-body">Search</div>
						</a> -->
					</li>
					<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4 no-border">
						<a href="#">
							<span class="mui-icon mui-icon-phone"></span>
							<div class="mui-media-body">学员惠购</div>
						</a>
					</li>
				</div>
			</ul>

			<!-- 工具宝典 -->
			<div class="mui-content-padded">
				<h4>工具宝典</h4>
			</div>

			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li @click="toRankList" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="javascript:void(0)">
						<div class="mui-media-body">我的排行</div>
						<span class="mui-icon mui-icon-home"><span class="mui-badge mui-badge-blue">新功能</span></span>
					</a>
				</li>
				<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<div class="mui-media-body">我的收藏</div>
						<span class="mui-icon mui-icon-home"></span>

					</a>
				</li>
				<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<div class="mui-media-body">我的成绩</div>
						<span class="mui-icon mui-icon-home"></span>

					</a>
				</li>
				<li @click="isDeveloping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<a href="#">
						<div class="mui-media-body">用户中心</div>
						<span class="mui-icon mui-icon-home"></span>
					</a>
				</li>
			</ul>
		</div>



	</div>

</template>

<script>
	export default {
		name: '',
		data() {
			return {
				questionjobtypeList: [],
				position: 0,
				questionJobTypeSelectedId: 1,
				questionJobTypeSelectedName: '',
				questionCount: 0, //  获取当前所选试题岗位类型的所有题数
				questionDone: 0, // 已经完成的题目数量
				bestScore:0,  // 模拟最高分笔试
				scoreInterval:null,  
			}
		},
		methods: {
			isDeveloping: function() {
				// console.log('test')
				// this.$router.push({path:'/login'})
				this.$mui.toast('开发中敬请期待')
			},
			toRankList:function(){
				this.$router.push({
					path:'/rankList',
					query:{
						questionJobTypeSelectedId:this.questionJobTypeSelectedId,
						questionJobTypeSelectedName:this.questionJobTypeSelectedName
					}
				})
			},
			toExampaperList:function(){
				this.$router.push({
					path:'/exampaperList',
					query:{
						questionJobTypeSelectedId:this.questionJobTypeSelectedId,
						questionJobTypeSelectedName:this.questionJobTypeSelectedName
					}
				})
			},
			getquestionjobtypeList: function() {
				var that = this
				var searchData = {
					"model": {

					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 1000
				}
				searchData.model.isChecked = 2
				this.$http.post('/msbd/getAllQuestionjobtype', searchData).then(res => {
					if (res.data.code == 200) {
						this.questionjobtypeList = res.data.content.list
						// this.questionJobTypeSelectedId = localStorage.getItem('questionJobTypeId') || this.questionjobtypeList[0].id
						// this.questionJobTypeSelectedName = localStorage.getItem('questionJobTypeName') || this.questionjobtypeList[0].questionJobTypeName
						this.questionJobTypeSelectedId = this.questionjobtypeList[0].id
						this.questionJobTypeSelectedName = this.questionjobtypeList[0].questionJobTypeName
						// this.question.questionJobTypeId = res.data.content.list[0].id
						// this.question.questionJobTypeName = res.data.content.list[0].questionJobTypeName
						this.position = this.questionJobTypeSelectedId
						this.getQuestionCount()
						this.$log(this.questionjobtypeList)
						this.$log(res.data)
						// 本地获取已经答题数
						var localAnswerLogArr = JSON.parse(localStorage.getItem('localAnswerLog')) || []
						this.questionDone = 0
						for (var i = 0; i < localAnswerLogArr.length; i++) {
							console.log(localAnswerLogArr[i].questionTypeId)
							console.log(this.questionJobTypeSelectedId)
							if (localAnswerLogArr[i].questionTypeId == this.questionJobTypeSelectedId) {
								this.questionDone++
							}
						}
						//
					} else {
						this.$mui.toast('试题所属职位数据加载失败')
					}
				}).catch(err => {
					this.$mui.toast('试题所属职位数据加载失败')
					that.$log(err)
				})
			},
			changeQuestionJobType: function(item, index) {
				this.$mui.toast('试题类型切换到:' + item.questionJobTypeName)
				this.position = item.id
				this.questionJobTypeSelectedId = item.id
				this.questionJobTypeSelectedName = item.questionJobTypeName
				// 本地获取已经答题数
				var localAnswerLogArr = JSON.parse(localStorage.getItem('localAnswerLog')) || []
				this.questionDone = 0
				for (var i = 0; i < localAnswerLogArr.length; i++) {
					console.log(localAnswerLogArr[i].questionTypeId)
					console.log(this.questionJobTypeSelectedId)
					if (localAnswerLogArr[i].questionTypeId == this.questionJobTypeSelectedId) {
						this.questionDone++
					}
				}
				//
				this.getQuestionCount()
				//
				this.getBestScoreByUserId()
			},
			getQuestionCount: function() {
				var that = this
				var searchData = {
					"model": {
						isChecked: 2,
						questionJobTypeId: that.questionJobTypeSelectedId
					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 10
				}
				searchData.model.isChecked = 2
				this.$http.post('/msbd/getAllQuestion', searchData).then(res => {
					if (res.data.code == 200) {
						this.questionCount = res.data.content.total
						this.$log(res.data)
					} else {
						// this.$mui.toast('试题所属职位数据加载失败')
					}
				}).catch(err => {
					// this.$mui.toast('试题所属职位数据加载失败')
					that.$log(err)
				})
			},
			getQuestionDone: function() {
				var that = this
				var searchData = {
					"model": {
						answerUserId: that.$getCookie('userId'),
						questionJobTypeId: that.questionJobTypeSelectedId
					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 10
				}
				searchData.model.isChecked = 2
				this.$http.post('/msbd/getAllUseranserquestion', searchData).then(res => {
					if (res.data.code == 200) {
						this.questionDone = res.data.content.total
						this.$log(res.data)
					} else {
						// this.$mui.toast('试题所属职位数据加载失败')
					}
				}).catch(err => {
					// this.$mui.toast('试题所属职位数据加载失败')
					that.$log(err)
				})
			},
			toRegularPractice: function() {
				console.log(this.questionJobTypeSelectedId)
				this.$router.push({
					path: '/regularPractice',
					query: {
						questionIndex: this.questionDone,
						questionJobTypeSelectedId: this.questionJobTypeSelectedId,
						questionJobTypeSelectedName: this.questionJobTypeSelectedName,
						questionCount: this.questionCount
					}
				})
				localStorage.setItem('questionJobTypeId', this.questionJobTypeSelectedId)
				localStorage.setItem('questionJobTypeName', this.questionJobTypeName)
			},
			toTakeExam: function() {
				console.log(this.questionJobTypeSelectedId)
				this.$router.push({
					path: '/examnation',
					query: {
						questionJobTypeSelectedId: this.questionJobTypeSelectedId,
						questionJobTypeSelectedName: this.questionJobTypeSelectedName
					}
				})
			},
			getBestScoreByUserId: function() {  
				//
				this.bestScore = 0
				clearInterval(this.scoreInterval)
				//
				var userId = this.$getCookie('userId')
				var data = {
					"model": {
						userId:userId,
						questionJobTypeId:this.questionJobTypeSelectedId
					},
					"orderParams": [
						'score desc'
					],
					"pageNum": 1,
					"pageSize": 1
				}
				var that = this
				this.$http.post('/msbd/getAllBestexamresult',data).then(res=>{
					// var score = res.data.content.list[0].score
					var score = typeof(res.data.content.list[0])=='undefined'?0:res.data.content.list[0].score
					if(score==0){
						that.bestScore = 0
						return
					}
					this.scoreInterval=setInterval(function(){
						that.bestScore +=1
						if(that.bestScore==score){
							clearInterval(that.scoreInterval)
						}
					},30)
				})
			}
		},
		mounted: function() {
			// 先获取岗位类型id
			// var questionJobTypeId = localStorage.getItem('questionJobTypeId')||1

			this.getquestionjobtypeList()

			// this.getQuestionCount()
			// this.getQuestionDone()  // 暂时不从后台查询已回答题数

			//从本地获取已做题数
			// var localAnswerLogArr = JSON.parse(localStorage.getItem('localAnswerLog'))||[]
			// for (var i = 0; i < localAnswerLogArr.length; i++) {
			// 	console.log(localAnswerLogArr[i].questionTypeId)
			// 	if(localAnswerLogArr[i].questionTypeId==this.questionJobTypeSelectedId){
			// 		this.questionDone ++
			// 	}
			// }
			this.getBestScoreByUserId()

		}

	}
</script>

<style>
</style>
