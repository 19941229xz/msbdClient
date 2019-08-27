<template>

	<div>

		<div id="question" class="mui-content">
			<header class="header">
				<a @click="toIndex" href="javascript:;"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>顺序练习({{questionJobTypeSelectedName}})</h5>
			</header>

			<div class="mui-content-padded">
				<span v-if="currentQuestion.questionTypeId==1" class="mui-badge mui-badge-blue">选择题</span>
				<span v-if="currentQuestion.questionTypeId==2" class="mui-badge mui-badge-green">判断题</span>
				<span v-if="currentQuestion.questionTypeId==3" class="mui-badge mui-badge-warning">多选题</span>
				{{currentQuestion.question}}
				<img v-if="currentQuestion.questionImg1!=''&&currentQuestion.questionImg1!=null" data-preview-src="" width="100%"
				 :src="currentQuestion.questionImg1" alt="">
			</div>
			<ul class="options" id="options">
				<li @click="chooseOption('A',$event)">
					<a href="javascript:;">
						<span id="A" class="circleSpan">A</span>
						{{currentQuestion.optionA}}
					</a>
				</li>
				<li @click="chooseOption('B',$event)">
					<a href="javascript:;">
						<span id="B" class="circleSpan">B</span>
						{{currentQuestion.optionB}}
					</a>
				</li>
				<li @click="chooseOption('C',$event)" v-show="currentQuestion.questionTypeId==1||currentQuestion.questionTypeId==3">
					<a href="javascript:;">
						<span id="C" class="circleSpan">C</span>
						{{currentQuestion.optionC}}
					</a>
				</li>
				<li @click="chooseOption('D',$event)" v-show="currentQuestion.questionTypeId==1||currentQuestion.questionTypeId==3">
					<a href="javascript:;">
						<span id="D" class="circleSpan">D</span>
						{{currentQuestion.optionD}}
					</a>
				</li>
			</ul>

			<div v-if="isAnswered">
				<div class="mui-content-padded">
					<h4>试题详解</h4>
				</div>

				<div class="mui-card">
					<div class="mui-card-content">
						<div class="mui-card-content-inner mui-table-view-cell">
							<div class="mui-content-padded my_answer">
								<h4>答案：{{currentQuestion.rightOption}}</h4>
								<div class="right">报错 <span>考朋友</span></div>
							</div>
							<div>
								<strong>题目解析：</strong>{{currentQuestion.explaination}}
							</div>
							<img v-if="currentQuestion.explainationImg1!=''&&currentQuestion.explainationImg1!=null" width="100%" style="margin-bottom: 10px"
							 :src="currentQuestion.explainationImg1">

							<div>
								<strong>详细解释：</strong>{{currentQuestion.fullExplaination}}
							</div>
							<img v-if="currentQuestion.fullExplainationImg1!=''&&currentQuestion.fullExplainationImg1!=null" width="100%"
							 style="margin-bottom: 10px" :src="currentQuestion.fullExplainationImg1">

						</div>
					</div>
				</div>

				<div class="mui-content-padded">
					<h4>题目点评(开发中)</h4>
				</div>
				<ul class="mui-table-view" style="margin-bottom: 40px;">
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left" src="http:\/\/placehold.it\/40x40">
							<div class="mui-media-body">
								<p class="my_comment">
									用户12839 &nbsp;&nbsp;
									<span class="mui-icon mui-icon-chat"></span>
									<span class="my_up mui-icon ">999+</span>
								</p>
								<p style="color: #000;" class="mui-ellipsis">这道题实在是太难了太难了</p>
							</div>
						</a>
					</li>
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left" src="http:\/\/placehold.it\/40x40">
							<div class="mui-media-body">
								<p class="my_comment">
									用户12839 &nbsp;&nbsp;
									<span class="mui-icon mui-icon-chat"></span>
									<span class="my_up mui-icon ">999+</span>
								</p>
								<p style="color: #000;" class="mui-ellipsis">这道题实在是太难了太难了</p>
							</div>
						</a>
					</li>
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left" src="http:\/\/placehold.it\/40x40">
							<div class="mui-media-body">
								<p class="my_comment">
									用户12839 &nbsp;&nbsp;
									<span class="mui-icon mui-icon-chat"></span>
									<span class="my_up mui-icon ">999+</span>
								</p>
								<p style="color: #000;" class="mui-ellipsis">这道题实在是太难了太难了</p>
							</div>
						</a>
					</li>

				</ul>
			</div>


			<nav class="my_form">

				<a @click="clearLocalAnswerLog" href="javascript:;"><span style="font-size: 14px;" class="mui-icon mui-icon-bars"></span>清除答题数据</a>
				<a @click="addToCollection" href="javascript:;"><span style="font-size: 14px;" :class="{'mui-icon':true, 'mui-icon-star':!isCollected,'mui-icon-star-filled':isCollected}"></span>收藏</a>
				<div class="my_submit">
					<span class="mui-icon mui-icon-checkmarkempty">{{rightCount}}</span>
					<span class="mui-icon mui-icon-closeempty">{{falseCount}}</span>
					<span><strong>{{questionIndex}}</strong>/{{questionCount}}</span>
				</div>
			</nav>

		</div>
		<div class="androidCtlBtn" style="position: fixed;bottom: 100px;width: 100%;">
			<span id="preBtn" @click="preQuestion" class="mui-icon mui-icon-arrowthinleft leftBtn" style="z-index: 1000;font-size: 50px;border: 1px solid #e2e2e2;border-radius: 35px;float: left;margin-left: 10px;background-color: #e2e2e2;color: white;opacity: 1;"></span>
			<span id="nextBtn" @click="nextQuestion" class="mui-icon mui-icon-arrowthinright rightBtn" style="z-index: 1000;font-size: 50px;border: 1px solid #e2e2e2;border-radius: 35px;float: right;margin-right: 10px;background-color: #e2e2e2;color: white;opacity: 1;"></span>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'regularPractice',
		data() {
			return {
				questionJobTypeSelectedId: 1,
				questionJobTypeSelectedName: '',
				// questionTypeId:1,
				questionIndex: 0,
				questionCount: 0,
				searchData: {
					"model": {
						isChecked: 2
					},
					"orderParams": [
						'createDate asc'
					],
					"pageNum": 1,
					"pageSize": 1
				},
				currentQuestion: {},
				isCollected: false,
				isAnswered: false, // 当前试题是否已经被回答
				answerQuestionIds: [],
				rightCount: 0,
				falseCount: 0,
				changeSpan: null,
				phoneModel: 'others',
				tempAnswer: '',
				localAnswerLog: [] //  浏览器本地记录答题数据
			}
		},
		methods: {
			toLogin: function() {
				this.$router.push({
					path: '/login'
				})
			},
			clearLocalAnswerLog: function() {
				var tempArr = [] // 临时存放其他岗位的答题记录
				var answerArr = JSON.parse(localStorage.getItem('localAnswerLog')) || [];
				for (var i = 0; i < answerArr.length; i++) {
					if (answerArr[i].questionTypeId != this.questionJobTypeSelectedId) {
						tempArr.push(answerArr[i])
					}
				}
				localStorage.removeItem('localAnswerLog')
				localStorage.setItem('localAnswerLog', JSON.stringify(tempArr))
				this.falseCount = 0
				this.rightCount = 0
				this.questionIndex = 1
				this.$mui.toast('答题记录清除成功')
				this.$router.push('/')

			},
			getQuestion: async function() {
				var that = this
				//根据索引查询出下一题的数据
				// that.searchData.pageSize = that.questionIndex
				// that.searchData.pageNum = 2
				// that.searchData.questionJobTypeId = that.questionJobTypeSelectedId
				// console.log(that.searchData.questionJobTypeId)
				var searchData2 = {
					"model": {
						isChecked: 2,
						questionJobTypeId: that.questionJobTypeSelectedId
					},
					"orderParams": [

					],
					"pageNum": 2,
					"pageSize": that.questionIndex
				}
				var res = await this.$http.post('/msbd/getAllQuestion', searchData2)

				var currentQuestion = res.data.content.list[0]
				//拿着该题的id 去服务端查询用户答题表中查询 如果已经答过了 索引加1 递归调用
				// 				var searchData = {
				// 					"model": {
				// 						answerUserId: this.$getCookie('userId'),
				// 						questionId: currentQuestion.id
				// 					},
				// 					"orderParams": [
				// 
				// 					],
				// 					"pageNum": 1,
				// 					"pageSize": 100
				// 				}
				// 服务器端查询用户是否回答过本题
				// var res2 = await this.$http.post('/msbd/getAllUseranserquestion', searchData)
				// console.log(res2)
				// if (res2.data.content.list.length == 0) { //  如果用户没回答过这题
				that.currentQuestion = res.data.content.list[0]
				// 查询本地答题记录
				for (var i = 0; i < this.localAnswerLog.length; i++) {
					if (this.localAnswerLog[i].questionId == that.currentQuestion.id) {
						// 说明该题已经答过了
						this.isAnswered = true
						// 显示正确答案和当时答错的答案
						var userAnswerArr = this.localAnswerLog[i].answer.split('') // 用户的答案数组
						for (var j = 0; j < userAnswerArr.length; j++) { // 先显示错误答案
							if (this.currentQuestion.rightOption.indexOf(userAnswerArr[j]) <= -1) {
								document.getElementById(userAnswerArr[j]).style.backgroundColor = 'red'
								document.getElementById(userAnswerArr[j]).innerHTML = '错'
							}
						}
						var rightArr = this.currentQuestion.rightOption.split('') // 正确答案数组
						for (var k = 0; k < rightArr.length; k++) {
							document.getElementById(rightArr[k]).style.backgroundColor = 'greenyellow'
							document.getElementById(rightArr[k]).innerHTML = '对'
						}
					}
				}
				// } else {
				// 	that.questionIndex++
				// 	that.getQuestion()
				// }
			},
			toIndex: function() {
				this.$router.push('/')
			},
			addToCollection: async function() { // 收藏该题  收藏过得  再次点击就是取消收藏
				if (!this.isCollected) { // 收藏  
					var data = {
						"collectDate": new Date(),
						"collectUserId": this.$getCookie('userId'),
						"questionId": this.currentQuestion.id,
						"questionJobTypeId": this.questionJobTypeSelectedId,
						"questionTypeId": this.currentQuestion.questionTypeId
					}
					this.$http.post('/msbd/addQuestioncollection', data).then(res => {
						if (res.data.code == 200) {
							this.$mui.toast('收藏成功')
							this.isCollected = true
						} else {
							this.$mui.toast('收藏失败')
						}
					})
				} else { // 取消收藏
					// 先查询收藏记录主键id
					var data = {
						"model": {
							"collectUserId": this.$getCookie('userId'),
							"questionId": this.currentQuestion.id,
							"questionJobTypeId": this.questionJobTypeSelectedId,
						},
						"orderParams": [],
						"pageNum": 1,
						"pageSize": 1
					}
					var res = await this.$http.post('/msbd/getAllQuestioncollection', data)
					var id = res.data.content.list[0].id
					var res2 = await this.$http('/msbd/removeQuestioncollectionById/' + id)

					if (res2.data.code == 200) {
						this.$mui.toast('取消收藏成功')
						this.isCollected = false
					} else {
						this.$mui.toast('取消收藏失败')
					}
				}


			},
			chooseOption: async function(val, e) {
				var that = this
				if (this.isAnswered == true) {
					this.$mui.toast('不能再次选择')
					return
				}
				//
				document.getElementById(val).style.backgroundColor = '#01DBE7'
				if (this.currentQuestion.questionTypeId == 1 || this.currentQuestion.questionTypeId == 2) { // 单选题和判断提的情况
					if (this.currentQuestion.rightOption == val) {
						this.$mui.toast('正确')
						document.getElementById(val).style.backgroundColor = 'greenyellow'
						document.getElementById(val).innerHTML = '对'
						this.rightCount++
						// 答题完毕 记录数据到本地
						this.localAnswerLog.push({
							questionId: this.currentQuestion.id,
							answer: val,
							isRight: true,
							questionTypeId: this.questionJobTypeSelectedId
						})
						// 更新该题的回答次数和答错次数
						this.currentQuestion.answeredNum++
						this.$http.put('/msbd/updateQuestion',that.currentQuestion)
						//记录到服务器
						let data1 = {
							"model": {
								"questionId": this.currentQuestion.id,
								"answerUserId": this.$getCookie('userId'),
								"questionJobTypeId": this.questionJobTypeSelectedId
							},
							"orderParams": [],
							"pageNum": 1,
							"pageSize": 1
						}
						var res = await this.$http.post('/msbd/getAllUseranserquestion', data1)
						if (res.data.content.total == 0) {
							let data2 = {
								"answerDate": new Date(),
								"answerIsRight": 1,
								"answerUserId": this.$getCookie('userId'),
								"questionId": this.currentQuestion.id,
								"questionJobTypeId": this.currentQuestion.questionJobTypeId,
								"questionTypeId": this.currentQuestion.questionTypeId
							}
							this.$http.post('/msbd/addUseranserquestion', data2)
							//
						}
						//
					} else {
						this.$mui.toast('错误')
						document.getElementById(val).style.backgroundColor = 'red'
						document.getElementById(val).innerHTML = '错'
						document.getElementById(this.currentQuestion.rightOption).style.backgroundColor = 'greenyellow'
						document.getElementById(this.currentQuestion.rightOption).innerHTML = '对'
						this.falseCount++
						// 答题完毕 记录数据到本地
						this.localAnswerLog.push({
							questionId: this.currentQuestion.id,
							answer: val,
							isRight: false,
							questionTypeId: this.questionJobTypeSelectedId
						})
						// 更新该题的回答次数和答错次数
						this.currentQuestion.answeredNum++
						this.currentQuestion.answerIsFalseNum++
						this.$http.put('/msbd/updateQuestion',that.currentQuestion)
						//记录到服务器
						let data1 = {
							"model": {
								"questionId": this.currentQuestion.id,
								"answerUserId": this.$getCookie('userId'),
								"questionJobTypeId": this.questionJobTypeSelectedId
							},
							"orderParams": [],
							"pageNum": 1,
							"pageSize": 1
						}
						var res = await this.$http.post('/msbd/getAllUseranserquestion', data1)
						if (res.data.content.total == 0) {
							let data2 = {
								"answerDate": new Date(),
								"answerIsRight": 2,
								"answerUserId": this.$getCookie('userId'),
								"questionId": this.currentQuestion.id,
								"questionJobTypeId": this.currentQuestion.questionJobTypeId,
								"questionTypeId": this.currentQuestion.questionTypeId
							}
							this.$http.post('/msbd/addUseranserquestion', data2)
							//
						}
						//
					}
					this.isAnswered = true

					// // 存放到浏览器本地缓存中
					// localStorage.setItem('localAnswerLog',JSON.stringify(this.localAnswerLog));
				} else if (this.currentQuestion.questionTypeId == 3) { //  多选题的情况
					//如果是重复选项 再次点击则可以撤回选中状态
					if (this.tempAnswer.indexOf(val) > -1) {
						this.tempAnswer = this.tempAnswer.replace(val, '')
						document.getElementById(val).style.backgroundColor = 'inherit'
						document.getElementById(val).innerHTML = val
						return
					}
					//
					this.tempAnswer += val
					var answerNum = this.currentQuestion.rightOption.length
					if (this.tempAnswer.length < answerNum) { //  说明还有正确答案没有选择

					} else { // 如果选完了  立即判断对错
						var answerArr = this.tempAnswer.split('')
						var rightNum = 0;
						for (var i = 0; i < answerArr.length; i++) {
							if (this.currentQuestion.rightOption.indexOf(answerArr[i]) > -1) {
								rightNum++
							} else {
								document.getElementById(answerArr[i]).style.backgroundColor = 'red'
								document.getElementById(answerArr[i]).innerHTML = '错'
							}
						}
						if (rightNum == answerNum) { //  多选题答案全对的情况
							this.$mui.toast('正确')
							this.rightCount++
							// 答题完毕 记录数据到本地
							this.localAnswerLog.push({
								questionId: this.currentQuestion.id,
								answer: this.tempAnswer,
								isRight: true,
								questionTypeId: this.questionJobTypeSelectedId
							})
							// 更新该题的回答次数和答错次数
							this.currentQuestion.answeredNum++
							this.$http.put('/msbd/updateQuestion',that.currentQuestion)
							//记录到服务器
							let data1 = {
								"model": {
									"questionId": this.currentQuestion.id,
									"answerUserId": this.$getCookie('userId'),
									"questionJobTypeId": this.questionJobTypeSelectedId
								},
								"orderParams": [],
								"pageNum": 1,
								"pageSize": 1
							}
							var res = await this.$http.post('/msbd/getAllUseranserquestion', data1)
							if (res.data.content.total == 0) {
								let data2 = {
									"answerDate": new Date(),
									"answerIsRight": 1,
									"answerUserId": this.$getCookie('userId'),
									"questionId": this.currentQuestion.id,
									"questionJobTypeId": this.currentQuestion.questionJobTypeId,
									"questionTypeId": this.currentQuestion.questionTypeId
								}
								this.$http.post('/msbd/addUseranserquestion', data2)
								//
							}
							//
						} else {
							this.$mui.toast('错误')
							this.falseCount++
							// 答题完毕 记录数据到本地
							this.localAnswerLog.push({
								questionId: this.currentQuestion.id,
								answer: this.tempAnswer,
								isRight: false,
								questionTypeId: this.questionJobTypeSelectedId
							})
							// 更新该题的回答次数和答错次数
							this.currentQuestion.answeredNum++
							this.currentQuestion.answerIsFalseNum++
							this.$http.put('/msbd/updateQuestion',that.currentQuestion)
							//记录到服务器
							let data1 = {
								"model": {
									"questionId": this.currentQuestion.id,
									"answerUserId": this.$getCookie('userId'),
									"questionJobTypeId": this.questionJobTypeSelectedId
								},
								"orderParams": [],
								"pageNum": 1,
								"pageSize": 1
							}
							var res = await this.$http.post('/msbd/getAllUseranserquestion', data1)
							if (res.data.content.total == 0) {
								let data2 = {
									"answerDate": new Date(),
									"answerIsRight": 2,
									"answerUserId": this.$getCookie('userId'),
									"questionId": this.currentQuestion.id,
									"questionJobTypeId": this.currentQuestion.questionJobTypeId,
									"questionTypeId": this.currentQuestion.questionTypeId
								}
								this.$http.post('/msbd/addUseranserquestion', data2)
								//
							}
							//
						}
						// 显示正确答案
						var rightAnswerArr = this.currentQuestion.rightOption.split('')
						for (var i = 0; i < rightAnswerArr.length; i++) {
							document.getElementById(rightAnswerArr[i]).style.backgroundColor = 'greenyellow'
							document.getElementById(rightAnswerArr[i]).innerHTML = '对'
						}
						this.isAnswered = true
						this.tempAnswer = ''
					}
				}
				// 存放到浏览器本地缓存中
				localStorage.setItem('localAnswerLog', JSON.stringify(this.localAnswerLog));
			},
			resetSpanStyle: function() {
				document.getElementById('A').style.backgroundColor = 'inherit'
				document.getElementById('A').innerHTML = 'A'

				document.getElementById('B').style.backgroundColor = 'inherit'
				document.getElementById('B').innerHTML = 'B'

				document.getElementById('C').style.backgroundColor = 'inherit'
				document.getElementById('C').innerHTML = 'C'

				document.getElementById('D').style.backgroundColor = 'inherit'
				document.getElementById('D').innerHTML = 'D'
			},
			preQuestion: function() {
				// 加深按钮背景色
				document.getElementById('preBtn').style.opacity = 1
				document.getElementById('nextBtn').style.opacity = 1
				setTimeout(function() {
					document.getElementById('preBtn').style.opacity = 0.5
					document.getElementById('nextBtn').style.opacity = 0.5
				}, 2000)
				//
				this.questionIndex--
				if (this.questionIndex == 0) {
					this.questionIndex = 1
					this.$mui.toast('没有上一题')
					return
				}
				this.isAnswered = false
				this.resetSpanStyle()
				this.getQuestion()
			},
			nextQuestion: function() {
				// 加深按钮背景色
				document.getElementById('preBtn').style.opacity = 1
				document.getElementById('nextBtn').style.opacity = 1
				setTimeout(function() {
					document.getElementById('preBtn').style.opacity = 0.5
					document.getElementById('nextBtn').style.opacity = 0.5
				}, 2000)
				//
				this.questionIndex++
				if (this.questionIndex > this.questionCount) {
					this.questionIndex--
					this.$mui.toast('没有下一题')
					return
				}
				this.isAnswered = false
				this.resetSpanStyle()
				this.getQuestion()
			}
		},
		watch: {
			currentQuestion: function() {
				// 检测该题是否被收藏
				var data = {
					"model": {
						collectUserId: this.$getCookie('userId'),
						questionId: this.currentQuestion.id
					},
					"orderParams": [],
					"pageNum": 1,
					"pageSize": 1
				}
				this.$http.post('/msbd/getAllQuestioncollection', data).then(res => {
					if (res.data.content.total == 0) {
						// console.log('未收藏')
						this.isCollected = false
					} else {
						// console.log('已收藏')
						this.isCollected = true
					}
				})
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

			// 获取试题类型  和索引值
			if (this.$route.query.questionIndex == 0) {
				this.questionIndex = this.$route.query.questionIndex + 1
			}
			this.questionCount = this.$route.query.questionCount
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			console.log(this.$route.query.questionJobTypeSelectedId)
			console.log(this.questionJobTypeSelectedId)
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName
			// this.getQuestion()
			// 获取手机型号  iPhone   Android  iPad  适配安卓解决首饰问题
			console.log(navigator.userAgent)
			if (navigator.userAgent.indexOf('Android') > -1) {
				this.phoneModel = 'Android'
			} else {
				this.phoneModel = 'others'
				// this.$mui.previewImage();
				// var that = this
				// document.getElementById('question').addEventListener("swiperight", function() {
				// 	console.log('swiperight')
				// 	console.log(document.getElementById('options'))
				// 	that.preQuestion()
				// });
				// document.getElementById('question').addEventListener("swipeleft", function() {
				// 	console.log('swipeleft')
				// 	that.nextQuestion()
				// });
			}
			// 从浏览器本地缓存中读取用户的答题记录
			this.localAnswerLog = JSON.parse(localStorage.getItem('localAnswerLog')) || [];
			// 本地统计错题数
			this.falseCount = 0
			this.rightCount = 0
			for (var i = 0; i < this.localAnswerLog.length; i++) {
				if (!this.localAnswerLog[i].isRight && this.localAnswerLog[i].questionTypeId == this.questionJobTypeSelectedId) {
					this.falseCount++
				} else if (this.localAnswerLog[i].isRight && this.localAnswerLog[i].questionTypeId == this.questionJobTypeSelectedId) {
					this.rightCount++
				}
			}
			this.questionIndex = this.falseCount + this.rightCount == 0 ? 1 : this.falseCount + this.rightCount
			this.getQuestion()
			//

		}

	}
</script>

<style scoped="scoped">
	/* .androidCtlBtn .leftBtn{
		font-size: 100px;
		border: 1px solid;
		border-radius: 35px;
		float: left;
	} */


	@import '../../static/mui/css/question.css'
</style>
