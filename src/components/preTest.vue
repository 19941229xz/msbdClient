<template>

	<div>

		<div class="mui-content bg-gray">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="userInfo">
							<img style="width: 15%;" v-if="userHeadImg!=''&&userHeadImg!=null" :src="userHeadImg">
							<img v-else src="http:\/\/placehold.it\/40x40">
							<p v-if="userRealName!=''&&userRealName!=null">{{userRealName}}</p>
							<p v-else-if="userNickName!=''&&userNickName!=null">{{userNickName}}</p>
							<p v-else>{{userName}}</p>
							<!-- <p>最新考试战绩 分数4 用时13秒</p> -->
						</div>
						<ul class="preTestInfo">
							<li>试卷名称：{{exampaper.examPaperName}}</li>
							<li>面试类型：{{exampaper.questionJobTypeName}}</li>
							<li>笔试时间：{{exampaper.examTime | s2hs}}</li>
							<!-- <li>合格标准：90分</li> -->
							<li>试卷题数：{{totalQuestionThisExampaper}}题</li>
							<li>出题老师：{{exampaper.userRealName}}</li>
						</ul>
						<!-- <div class="warmTip">
							温馨提示：本考试不能参考答案
						</div> -->
					</div>
				</div>
			</div>

			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner mui-table-view-cell">
						<p class="title">闭卷考试</p>
						<div id="isWithAnswer" @click="changeSwitch" class="mui-switch mui-active">
							<div class="mui-switch-handle"></div>
						</div>
						<p class="warmTip">考试全程无详解</p>
					</div>
				</div>
			</div>

			<div class="card">
				<button @click="toExamnation()" type="button" class="mui-btn mui-btn-block circleBtn">开始考试</button>
				<button @click="toExamperList" type="button" class="mui-btn mui-btn-block circleBtn">返回</button>
				<!-- <button type="button" class="mui-btn mui-btn-block circleBtn">智能考试</button> -->
			</div>
		</div>

	</div>

</template>

<script>
	import timeUtil from '.././util/timeUtil.js'

	export default {
		name: 'preTest',
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
				totalQuestionThisExampaper: 0,
				userAnswerCount: 0,

				bestScoreList: [],
				exampaperId: 1,
				exampaper: {},
				isWithAnswer: true,
				userName:'',
				userNickName:'',
				userRealName:'',
				userHeadImg:''
			}
		},
		methods: {
			getExampaperById: function() {
				var that = this
				this.$http('/msbd/getExampaperById/' + that.exampaperId).then(res => {
					this.exampaper = res.data.content
				})
			},
			toExamperList: function() {
				// this.questionJobTypeSelectedId=this.$route.query.questionJobTypeSelectedId 
				// this.questionJobTypeSelectedName=this.$route.query.questionJobTypeSelectedName 
				this.$router.push({
					path: '/exampaperList',
					query: {
						questionJobTypeSelectedId: this.questionJobTypeSelectedId,
						questionJobTypeSelectedName: this.questionJobTypeSelectedName
					}
				})
			},
			getTotalQuestionThisExampaper: function() {
				var data = {
					"model": {
						isChecked: 2,
						examPaperId: this.exampaperId
					},
					"orderParams": [

					],
					"pageNum": 1,
					"pageSize": 1
				}
				this.$http.post('/msbd/getAllQuestion', data).then(res => {
					this.totalQuestionThisExampaper = res.data.content.total
				})
			},
			changeSwitch:function(){
				// console.log(this.$mui('#isWithAnswer')[0].className)
				var className = this.$mui('#isWithAnswer')[0].className 
				this.isWithAnswer = className.indexOf('mui-active')>-1?false:true
				// console.log(this.isWithAnswer)
			},
			toExamnation:function(){
				this.$router.push({
					path: '/examnation',
					query: {
						questionJobTypeSelectedId: this.questionJobTypeSelectedId,
						questionJobTypeSelectedName: this.questionJobTypeSelectedName,
						exampaperId:this.exampaperId,
						examTime:this.exampaper.examTime,
						questionCount:this.totalQuestionThisExampaper,
						isWithAnswer:this.isWithAnswer,
						exampaperName:this.exampaper.examPaperName
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
			//mui配置
			this.$mui.init({
				swipeBack: true //启用右滑关闭功能
			});
			this.$mui('#isWithAnswer').switch()
			//
			this.changeSwitch()

			this.exampaperId = this.$route.query.exampaperId
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName

			this.getExampaperById()
			this.getTotalQuestionThisExampaper()
			// this.getRankList()
			//从cookie中获取用户信息
			this.userName = this.$getCookie('userName')
			this.userNickName = this.$getCookie('nickName')
			this.userRealName = this.$getCookie('realName')
			this.userHeadImg = this.$getCookie('headImg')
		}

	}
</script>

<style scoped="scoped">
	.circleBtn {
		border-radius: 100px;
		margin-top: 30px;
		border: 0.5px solid grey;
		background-color: inherit;
	}

	.circleBtn:nth-of-type(1) {
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

	.userInfo img {}

	.mui-card .title {
		color: #000;
		font-size: 17px;
		min-height: 34px;
		padding: 5px 10px 0;
	}

	.preTestInfo {
		padding: 0 10px;
	}

	.preTestInfo li {
		list-style: none;
		line-height: 30px;
		font-size: 16px;
	}

	.warmTip {
		padding: 0 10px;
		color: #999;
		font-size: 15px;
	}
	
	/* .mui-card-content{
		border-radius: 100px!important;
	} */

	.mui-card-content-inner {
		position: relative;
	}

	.mui-card-content-inner .mui-switch {
		position: absolute;
		right: 10px;
		top: 25px;
	}
	.mui-card{
		border-radius: 25px;
	}
	
	.card{
		width: 90%;
		position: fixed;
		bottom: 10px;
		margin: 0px!important;
		left: 5%;
	}
</style>
