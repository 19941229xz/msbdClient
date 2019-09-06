<template>

	<div>

		<div class="mui-content">
			<header class="header">
				<a href="#/"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>我的{{questionJobTypeSelectedName}}成绩</h5>
			</header>

			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<a href="">
						<span class="mui-icon">{{jigeTimes}}</span>
						<div class="mui-media-body">及格次数</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<a href="">
						<span class="mui-icon">{{totalExamTimes}}</span>
						<div class="mui-media-body">考试次数</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<a href="">
						<span class="mui-icon">{{guessGrade}}</span>
						<div class="mui-media-body">成绩预测</div>
					</a>
				</li>
			</ul>


			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="userInfo.headImg">
						<div class="mui-media-body">
							您的历史最高成绩是{{bestScore}}分
							<p class="mui-ellipsis">您累计答题{{questionDone}}题!</p>
						</div>
					</a>
				</li>
			</ul>


			<ul class="mui-table-view">
				<li v-if="ScoreList.length==0" class="mui-table-view-cell mui-media" style="font-size: 12px;text-align: center;">
					暂无考试记录~
				</li>
				<li v-for="(item,index) in ScoreList" class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<div class="mui-media-object mui-pull-left">
							{{item.score || 0}}分
						</div>
						<!-- <img v-if="item.userHeadImg!=''&&item.userHeadImg!=null&&item.userHeadImg!='null'" style="margin-left: 30px;" class="mui-media-object mui-pull-left" :src="item.userHeadImg">
						<img v-else style="margin-left: 30px;" class="mui-media-object mui-pull-left" src="../assets/defaultHeadImg.jpg"> -->
						<div class="mui-media-body">
							<div style="margin-left: 30px;" class="mui-pull-left">
								<!-- <div v-if="item.userRealName!=''&&item.userRealName!=null&&item.userRealName!='null'">用户{{item.userRealName}}</div>
								<div v-else-if="item.userNickName!=''&&item.userNickName!=null&&item.userNickName!='null'">用户{{item.userNickName}}</div>
								<div v-else>用户{{item.userName}}</div> -->
								用时：{{item.finishTimeLong | s2hs}}
								<p class="mui-ellipsis">{{item.finishiDate | dateformat}}</p>
							</div>
							<div class="mui-pull-right">
								<span v-if="item.isFinished == 1" class="mui-media-object">未完成</span>
								<span v-else-if="parseInt(item.wrongAnswerCount*100/item.totalQuestionCount)<=10" class="mui-media-object">大神</span>
								<span v-else-if="parseInt(item.wrongAnswerCount*100/item.totalQuestionCount)<=20" class="mui-media-object">优秀</span>
								<span v-else-if="parseInt(item.wrongAnswerCount*100/item.totalQuestionCount)<=30" class="mui-media-object">良</span>
								<span v-else-if="parseInt(item.wrongAnswerCount*100/item.totalQuestionCount)<=40" class="mui-media-object">及格</span>
								<span v-else class="mui-media-object">不及格</span>
							</div>
						</div>
					</a>
				</li>
			</ul>

		</div>

	</div>

</template>

<script>
	import timeUtil from '.././util/timeUtil.js'

	export default {
		name: 'rankList',
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

				ScoreList: [],
				questionDone: 0,
				bestScore: 0,
				totalExamTimes: 0,
				guessGrade: 0,
				jigeTimes:0,
				userInfo:{},
			}
		},
		methods: {
			getScoreList: function() {
				var data = {
					"model": {
						questionJobTypeId: this.questionJobTypeSelectedId,
						userId: this.$getCookie('userId')
					},
					"orderParams": [
						'finishiDate desc'
					],
					"pageNum": 1,
					"pageSize": 9
				}
				this.$http.post('/msbd/getAllExamresult', data).then(res => {
					this.ScoreList = res.data.content.list
				})
			},
			getExamResultTimes: function() { // 获取考试次数
				var data = {
					"model": {
						questionJobTypeId: this.questionJobTypeSelectedId,
						userId: this.$getCookie('userId')
					},
					"orderParams": [
						'finishiDate desc'
					],
					"pageNum": 1,
					"pageSize": 9
				}
				this.$http.post('/msbd/getAllExamresult', data).then(res => {
					this.totalExamTimes = res.data.content.total
				})
			},
			guessTheFutureGrade: function() { // 预测考试分数
				var data = {
					"model": {
						questionJobTypeId: this.questionJobTypeSelectedId,
						userId: this.$getCookie('userId'),
						isFinished:2
					},
					"orderParams": [
						'finishiDate desc'
					],
					"pageNum": 1,
					"pageSize": 9
				}
				this.$http.post('/msbd/getAllExamresult', data).then(res => {
					var arr = res.data.content.list
					var total = 0
					for (var i = 0; i < arr.length; i++) {
						total += arr[i].score
					}
					console.log(total)
					this.guessGrade = total==0?0:parseInt(total / arr.length)
				})
			
				
				// var arr = this.ScoreList
				
			},
			get60Times: function() { // 获取及格次数
				var data = {
					"model": {
						questionJobTypeId: this.questionJobTypeSelectedId,
						userId: this.$getCookie('userId')
					},
					"orderParams": [
					],
					"pageNum": 1,
					"pageSize": 10000
				}
				this.$http.post('/msbd/getAllExamresult', data).then(res => {
					var arr = res.data.content.list
					for (var i = 0; i < arr.length; i++) {
						console.log(parseInt(arr[i].wrongAnswerCount * 100 / arr[i].totalQuestionCount))
						if (parseInt(arr[i].wrongAnswerCount * 100 / arr[i].totalQuestionCount) <= 40 && arr[i].isFinished == 2) {
							this.jigeTimes += 1
						}
					}
				})
			
			
			
				// var arr = this.ScoreList
				
			},
			getQuestionDone: function() {
				var that = this
				var searchData = {
					"model": {
						answerUserId: that.$getCookie('userId'),
						questionJobTypeId: that.questionJobTypeSelectedId
					},
					"orderParams": [],
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
			getBestScoreByUserId: function() {
				var userId = this.$getCookie('userId')
				var data = {
					"model": {
						userId: userId,
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [
						'score desc'
					],
					"pageNum": 1,
					"pageSize": 1
				}
				var that = this
				this.$http.post('/msbd/getAllBestexamresult', data).then(res => {
					this.bestScore = res.data.content.list[0].score
				})
			},
			getUserInfo:function(){
				this.$http('/user-server/getUserById/'+this.$getCookie('userId')).then(res=>{
					this.userInfo = res.data.content
				})
			}
		},
		filters: {
			s2hs: function(s) {
				return timeUtil.s_to_hs(s)
			},
			dateformat: function(val) {
				var dateee = new Date(val).toJSON();
				var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
				return date
			}
		},
		mounted: function() {
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName


			this.getScoreList()
			this.getQuestionDone()
			this.getBestScoreByUserId()
			this.getExamResultTimes()
			this.guessTheFutureGrade()
			this.get60Times()
			this.getUserInfo()
		}

	}
</script>

<style scoped="scoped">
	@import '../../static/mui/css/rankList.css'
</style>
