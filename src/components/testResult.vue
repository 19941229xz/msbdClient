<template>

	<div>

		<div class="mui-content bg-gray">

			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" style="text-align: center;">
						<h1 style="font-size: 50px;">{{score}}分</h1>
						<p>本次考试成绩</p>
						<div class="mui-row">
							<div class="mui-col-sm-4 mui-col-xs-4" style="text-align: center;">
								<p class="number">{{examTimeUsed | s2hs}}</p>
								<p>考试用时</p>
							</div>
							<div class="mui-col-sm-4 mui-col-xs-4" style="text-align: center;">
								<p class="number">{{falseCount}}</p>
								<p>错题数</p>
							</div>
							<div class="mui-col-sm-4 mui-col-xs-4" style="text-align: center;">
								<p class="number">{{rightPoint}}%</p>
								<p>正确率</p>
							</div>
						</div>
						<div class="mui-row">
							<div class="mui-col-sm-6 mui-col-xs-6">
								<button @click="toIndex" type="button" class="mui-btn  mui-btn-block circleBtn" style="background-color: inherit;">回到首页</button>
							</div>
							<div class="mui-col-sm-6 mui-col-xs-6">
								<button @click="takeExamAgain()" type="button" class="mui-btn  mui-btn-block circleBtn blue">再考一次</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mui-card">
				<div class="">
					<div class="mui-content-padded clearfix">
						<h4 class="fl">累计答题：{{userAnswerCount}}题</h4>
						<span class="fr" style="line-height: 30px;">未做题{{totalQuestionCount - userAnswerCount}}题</span>
					</div>
					<div class="bar-wrap" id="demo1">
						<p class="mui-progressbar mui-progressbar-in" data-progress="70"><span></span></p>
					</div>
				</div>

				<div class="mui-content-padded">
					<h4>相关课程(开发中)</h4>
				</div>

				<div class="mui-slider">
					<div class="mui-slider-group mui-slider-loop">
						<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一个图文表格) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<ul class="mui-table-view mui-grid-view">
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">Color of SIP CBD</div>
									</a></li>
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">静静看这世界</div>
									</a></li>
							</ul>
						</div>
						<div class="mui-slider-item">
							<ul class="mui-table-view mui-grid-view">
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">幸福就是可以一起睡觉</div>
									</a></li>
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div>
									</a></li>
							</ul>
						</div>
						<div class="mui-slider-item">
							<ul class="mui-table-view mui-grid-view">
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">Color of SIP CBD</div>
									</a></li>
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">静静看这世界</div>
									</a></li>
							</ul>
						</div>
						<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一个图文表格) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<ul class="mui-table-view mui-grid-view">
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">幸福就是可以一起睡觉</div>
									</a></li>
								<li class="mui-table-view-cell mui-media mui-col-xs-6"><a href="#"><img class="mui-media-object" src="http:\/\/placehold.it\/40x40">
										<div class="mui-media-body">想要一间这样的木屋，静静的喝咖啡</div>
									</a></li>
							</ul>
						</div>
					</div>
					<!-- <div class="mui-slider-indicator" style="position: static;background-color: #fff;">
			        <span class="mui-action mui-action-previous mui-icon mui-icon-back"></span>
			        <div class="mui-number">
			            <span>1</span> / 2
			        </div>
			        <span class="mui-action mui-action-next mui-icon mui-icon-forward"></span>
			    </div> -->
				</div>

				<div class="mui-content-padded">
					<h4>相关专题</h4>
				</div>
				<ul class="mui-table-view">
					<li @click="toPreTest(item)" v-for="item in exampaperListPublic" class="mui-table-view-cell mui-media">
						<a href="javascript:;" class="mui-navigate-right">
							<div class="mui-media-body">
								<p class="mui-ellipsis" style="color: black;">{{item.examPaperName}}</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
	import timeUtil from '.././util/timeUtil.js'

	export default {
		name: 'regularPractice',
		data() {
			return {
				examTimeUsed: 0,
				falseCount: 0,
				rightCount: 0,
				questionCount: 0,
				score: 0,
				rightPoint: 0, //  正确率 
				questionJobTypeSelectedId: 1,
				questionJobTypeSelectedName: '',
				totalQuestionCount: 0,
				userAnswerCount: 0,
				exampaperId: 0,
				exampaperName: '',
				exampaperListPublic:[],
			}
		},
		methods: {
			calTheResult: async function() {
				// 计算分数
				if (this.rightCount == this.questionCount) {
					this.score = 100
				} else {
					var scorePerQues = parseInt(100 / this.questionCount)
					this.score = parseInt(scorePerQues * this.rightCount)
				}
				// 计算正确率
				this.rightPoint = (this.rightCount + this.falseCount) == 0 ? 0 : parseInt(this.rightCount * 100 / (this.rightCount +
					this.falseCount))
				//将考试数据保存到服务器
				//判断本次成绩是不是最好成绩
				var data1 = {
					"model": {
						userId: this.$getCookie('userId'),
						questionJobTypeId:this.questionJobTypeSelectedId
					},
					"orderParams": [
						'score desc',
						'finishTimeLong asc'
					],
					"pageNum": 1,
					"pageSize": 1
				}
				var res1 = await this.$http.post('/msbd/getAllBestexamresult', data1)
				if (res1.data.content.list.length == 0) { // 还没有任何成绩
					if (this.exampaperId == 0) { // 如果做得是试卷  不计入排行榜成绩
						var data = {
							"banjiId": this.$getCookie('banjiId'),
							"banjiName": this.$getCookie('banjiName'),
							"companyId": this.$getCookie('companyId'),
							"companyName": this.$getCookie('companyName'),
							"finishTimeLong": this.examTimeUsed,
							"finishiDate": new Date(),
							"isFinished": (this.rightCount + this.falseCount) == this.questionCount ? 2 : 1,
							"questionJobTypeId": this.questionJobTypeSelectedId,
							"schoolId": this.$getCookie('schoolId'),
							"schoolName": this.$getCookie('schoolName'),
							"score": this.score,
							"totalQuestionCount": this.questionCount,
							"userId": this.$getCookie('userId'),
							"wrongAnswerCount": this.falseCount,
							"userName": this.$getCookie('userName'),
							"userNickName": this.$getCookie('nickName'),
							"userRealName": this.$getCookie('realName'),
							"userHeadImg": this.$getCookie('headImg'),
							"wrongAnswerCount": this.falseCount
						}
						this.$http.post('/msbd/addBestexamresult', data)
					}

				} else {
					if (this.exampaperId == 0) { // 如果做得是试卷  不计入排行榜成绩
						var bestGrade = res1.data.content.list[0]
						if (this.score > bestGrade.score) { // 如果本次成绩大于最好成绩 删除数据库中的最好成绩  并插入最新好成绩
							var data = {
								"banjiId": this.$getCookie('banjiId'),
								"banjiName": this.$getCookie('banjiName'),
								"companyId": this.$getCookie('companyId'),
								"companyName": this.$getCookie('companyName'),
								"finishTimeLong": this.examTimeUsed,
								"finishiDate": new Date(),
								"isFinished": (this.rightCount + this.falseCount) == this.questionCount ? 2 : 1,
								"questionJobTypeId": this.questionJobTypeSelectedId,
								"schoolId": this.$getCookie('schoolId'),
								"schoolName": this.$getCookie('schoolName'),
								"score": this.score,
								"totalQuestionCount": this.questionCount,
								"userId": this.$getCookie('userId'),
								"wrongAnswerCount": this.falseCount,
								"userName": this.$getCookie('userName'),
								"userNickName": this.$getCookie('nickName'),
								"userRealName": this.$getCookie('realName'),
								"userHeadImg": this.$getCookie('headImg'),
								"wrongAnswerCount": this.falseCount
							}
							await this.$http('/msbd/removeBestexamresultById/' + bestGrade.id)
							this.$http.post('/msbd/addBestexamresult', data)
						} else if (this.score == bestGrade.score) {
							if (this.exampaperId == 0) { // 如果做得是试卷  不计入排行榜成绩
								if (this.examTimeUsed < bestGrade.finishTimeLong) { // 如果成绩相同 比时间 时间短的话 删除数据库中的最好成绩  并插入最新好成绩
									var data = {
										"banjiId": this.$getCookie('banjiId'),
										"banjiName": this.$getCookie('banjiName'),
										"companyId": this.$getCookie('companyId'),
										"companyName": this.$getCookie('companyName'),
										"finishTimeLong": this.examTimeUsed,
										"finishiDate": new Date(),
										"isFinished": (this.rightCount + this.falseCount) == this.questionCount ? 2 : 1,
										"questionJobTypeId": this.questionJobTypeSelectedId,
										"schoolId": this.$getCookie('schoolId'),
										"schoolName": this.$getCookie('schoolName'),
										"score": this.score,
										"totalQuestionCount": this.questionCount,
										"userId": this.$getCookie('userId'),
										"wrongAnswerCount": this.falseCount,
										"userName": this.$getCookie('userName'),
										"userNickName": this.$getCookie('nickName'),
										"userRealName": this.$getCookie('realName'),
										"userHeadImg": this.$getCookie('headImg'),
										"wrongAnswerCount": this.falseCount
									}
									await this.$http('/msbd/removeBestexamresultById/' + bestGrade.id)
									this.$http.post('/msbd/addBestexamresult', data)
								}
							}
						}
					}

				}
				// 添加考试数据
				var data3 = {
					"banjiId": this.$getCookie('banjiId'),
					"banjiName": this.$getCookie('banjiName'),
					"companyId": this.$getCookie('companyId'),
					"companyName": this.$getCookie('companyName'),
					"finishTimeLong": this.examTimeUsed,
					"finishiDate": new Date(),
					"isFinished": (this.rightCount + this.falseCount) == this.questionCount ? 2 : 1,
					"questionJobTypeId": this.questionJobTypeSelectedId,
					"schoolId": this.$getCookie('schoolId'),
					"schoolName": this.$getCookie('schoolName'),
					"score": this.score,
					"totalQuestionCount": this.questionCount,
					"userId": this.$getCookie('userId'),
					"wrongAnswerCount": this.falseCount,
					"userName": this.$getCookie('userName'),
					"userNickName": this.$getCookie('nickName'),
					"userRealName": this.$getCookie('realName'),
					"userHeadImg": this.$getCookie('headImg'),
					"wrongAnswerCount": this.falseCount,
					"exampaperId": this.exampaperId,
					"exampaperName": this.exampaperName
				}
				this.$http.post('/msbd/addExamresult', data3)
				//
			},
			takeExamAgain: function() {
				// 判断是否考的是试卷
				if(this.exampaperId==0){
					this.$router.push({
						path: '/examnation',
						query: {
							questionJobTypeSelectedId: this.questionJobTypeSelectedId,
							questionJobTypeSelectedName: this.questionJobTypeSelectedName
						}
					})
				}else{
					this.$router.push({
						path:'/preTest',
						query:{
							exampaperId:this.exampaperId,
							questionJobTypeSelectedId:this.questionJobTypeSelectedId,
							questionJobTypeSelectedName:this.questionJobTypeSelectedName
						}
					})
				}
				
				
			},
			getUserAnswerCount: async function() { //  获取用户累计答题  和 总题数  然后计算出 未做题数  同时计算进度条
				var data1 = {
					"model": {
						isChecked: 2,
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 1
				}

				var res1 = await this.$http.post('/msbd/getAllQuestion', data1)
				var total = res1.data.content.total
				//
				var data2 = {
					"model": {
						answerUserId: this.$getCookie('userId'),
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 1
				}
				var res2 = await this.$http.post('/msbd/getAllUseranserquestion', data2)
				var userAnswerTotal = res2.data.content.total
				//
				this.userAnswerCount = userAnswerTotal
				this.totalQuestionCount = total
				//计算进度条
				var progressbar1 = this.$mui('#demo1');
				this.$mui(progressbar1).progressbar().setProgress(parseInt(this.userAnswerCount * 100 / this.totalQuestionCount))

			},
			toIndex: function() {
				this.$router.push('/')
			},
			getExampaperListPublic: function() {
				// 
				var data = {
					"model": {
						isChecked: 2,
						publicLevel: 1,
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [
						'checkDate desc'
			
					],
					"pageNum": 1,
					"pageSize": 1000
				}
				this.$http.post('/msbd/getAllExampaper', data).then(res => {
					this.exampaperListPublic = res.data.content.list
				})
			},
			toPreTest: function(item) {
				this.$router.push({
					path: '/preTest',
					query: {
						exampaperId: item.id,
						questionJobTypeSelectedId: this.questionJobTypeSelectedId,
						questionJobTypeSelectedName: this.questionJobTypeSelectedName
					}
				})
			}
		},
		filters: {
			s2hs: function(s) {
				return timeUtil.s_to_hs(s)
			}
		},
		mounted: function() {
			// mui配置
			this.$mui.init({
				gestureConfig: {
					tap: true, //默认为true
					doubletap: true, //默认为false
					longtap: true, //默认为false
					swipe: true, //默认为true
					drag: true, //默认为true
					hold: false, //默认为false，不监听
					release: false //默认为false，不监听
				}
			});
			this.$mui(".mui-slider").slider();
			// var progressbar1 = this.$mui('#demo1');
			// this.$mui(progressbar1).progressbar().setProgress(10)

			//
			// query: {
			this.examTimeUsed = this.$route.query.examTimeUsed
			this.falseCount = this.$route.query.falseCount
			this.questionCount = this.$route.query.questionCount
			this.rightCount = this.$route.query.rightCount
			//
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName
			//  看是否是考的试卷
			this.exampaperId = this.$route.query.exampaperId
			this.exampaperName = this.$route.query.exampaperName
			//
			this.calTheResult()
			//
			this.getUserAnswerCount()
			//
			this.getExampaperListPublic()
		}

	}
</script>

<style scoped="scoped">
	.circleBtn {
		border-radius: 100px;
		border: 0.5px solid grey;
		background-color: inherit;
		width: 80%;
		margin: 10px auto;
		padding: 5px 0 !important;
	}

	.circleBtn.blue {
		color: white;
		border: none;
		/* 渐变色 */
		background: -webkit-linear-gradient(left, #01DBE7, #018AFB);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #01DBE7, 018AFB);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #01DBE7, #018AFB);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #01DBE7, #018AFB);
		/* 标准的语法（必须放在最后） */
	}

	.userInfo {
		text-align: center;
	}

	.number {
		font-size: 17px;
	}

	.preTestInfo li {
		list-style: none;
	}

	.bar-wrap {
		margin: 10px;
	}

	.mui-progressbar {
		height: 5px;
	}

	.mui-content-padded {
		margin: 20px 10px;
	}
</style>
