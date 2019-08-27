<template>

	<div>

		<div id="question" class="mui-content">
			<header class="header">
				<a @click="toIndex" href="javascript:;"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>我的错题</h5>
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

			<div v-if="isAnswered&&isWithAnswer">
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

				<a @click="removeThisWrongQuestion" href="javascript:;"><span style="font-size: 14px;" class="mui-icon mui-icon-trash"></span>移除</a>
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
	import timeUtil from '.././util/timeUtil.js'
	import examnationUtil from '.././util/examnationUtil.js'
	import numUtil from '.././util/numUtil.js'


	export default {
		name: 'regularPractice',
		data() {
			return {
				questionJobTypeSelectedId: 1,
				questionJobTypeSelectedName: '',
				// questionTypeId:1,
				questionIndex: 1,
				questionCount: 30, //  默认官方考试  30题  如果题目不够 就显示最大题数
				examTime: 30 * 60,
				examTimeUsed: 0, // 考试用时  单位秒
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
				localAnswerLog: [], //  浏览器本地记录答题数据
				randomIndexArr: [], //  存放随机题目索引 如果随机到相同的  重新随机
				questionListThisExam: [], //存放题目和答题记录
				exampaperId: 0,
				exampaperName: '',
				isWithAnswer: true
			}
		},
		methods: {
			toLogin: function() {
				this.$router.push({
					path: '/login'
				})
			},
			removeThisWrongQuestion: async function() {
				var wrongQuestionId = this.currentQuestion.wrongQuestionId
				await this.$http('/msbd/removeUseranserquestionById/'+wrongQuestionId)
				this.questionListThisExam.splice(this.questionIndex-1,1)
				this.questionCount = this.questionListThisExam.length
				this.currentQuestion = this.questionListThisExam[this.questionIndex-1]
				this.$mui.toast('移除成功')
				
				//
				if(this.questionListThisExam.length==0){
					this.$router.push('/')
				}
				
			},
			getQuestion: async function() { // 一次获取指定数量的试题  questionCount
				var that = this
				// 获取总试题数
				var count = await examnationUtil.getQuestionCount('/msbd/getAllQuestion', that.questionJobTypeSelectedId)
				//
				this.questionCount = count <= this.questionCount ? count : this.questionCount
				//
				var questionRandomIndex = numUtil.randomIntNumBeginEnd(1, count)
				while (this.randomIndexArr.indexOf(questionRandomIndex) > -1) {
					questionRandomIndex = numUtil.randomIntNumBeginEnd(1, count)
				}
				this.randomIndexArr.push(questionRandomIndex)
				console.log(this.randomIndexArr)
				var searchData2 = {
					"model": {
						isChecked: 2,
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [

					],
					"pageNum": questionRandomIndex,
					"pageSize": 1
				}
				var question = await examnationUtil.getQuestion(searchData2)
				question.answer = ''
				this.questionListThisExam.push(question)
				console.log(this.questionListThisExam)
				this.currentQuestion = this.questionListThisExam[this.questionIndex - 1]
				// this.questionListThisExam.push(this.currentQuestion)  //  存放到题目和答题记录表中
			},
			toIndex: function() {
				this.$router.push('/')
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
						this.questionListThisExam[this.questionIndex - 1].questionId = this.currentQuestion.id
						this.questionListThisExam[this.questionIndex - 1].answer = val
						this.questionListThisExam[this.questionIndex - 1].isRight = true
						// 更新该题的回答次数和答错次数
						that.currentQuestion.answeredNum++
						this.$http.put('/msbd/updateQuestion',that.currentQuestion)
					} else {
						this.$mui.toast('错误')
						document.getElementById(val).style.backgroundColor = 'red'
						document.getElementById(val).innerHTML = '错'
						document.getElementById(this.currentQuestion.rightOption).style.backgroundColor = 'greenyellow'
						document.getElementById(this.currentQuestion.rightOption).innerHTML = '对'
						this.falseCount++
						// 答题完毕 记录数据到本地
						this.questionListThisExam[this.questionIndex - 1].questionId = this.currentQuestion.id
						this.questionListThisExam[this.questionIndex - 1].answer = val
						this.questionListThisExam[this.questionIndex - 1].isRight = false
						// 更新该题的回答次数和答错次数
						that.currentQuestion.answeredNum++
						that.currentQuestion.answerIsFalseNum++
						this.$http.put('/msbd/updateQuestion',that.currentQuestion)
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
					this.tempAnswer += val
					var answerNum = this.currentQuestion.rightOption.length
					if (this.tempAnswer.length < answerNum) { //  说明还有正确答案没有选择

					} else { // 如果选完了  立即判断对错
						var answerArr = this.tempAnswer.split('')
						var rightNum = 0;
						//
						for (var i = 0; i < answerArr.length; i++) {
							if (this.currentQuestion.rightOption.indexOf(answerArr[i]) > -1) {
								rightNum++
							} else {
								document.getElementById(answerArr[i]).style.backgroundColor = 'red'
								document.getElementById(answerArr[i]).innerHTML = '错'
							}
						}
						//
						if (rightNum == answerNum) { //  多选题答案全对的情况
							this.$mui.toast('正确')
							this.rightCount++
							// 答题完毕 记录数据到本地
							this.questionListThisExam[this.questionIndex - 1].questionId = this.currentQuestion.id
							this.questionListThisExam[this.questionIndex - 1].answer = this.tempAnswer
							this.questionListThisExam[this.questionIndex - 1].isRight = true
							// 更新该题的回答次数和答错次数
							that.currentQuestion.answeredNum++
							this.$http.put('/msbd/updateQuestion',that.currentQuestion)
						} else {
							this.$mui.toast('错误')
							this.falseCount++
							// 答题完毕 记录数据到本地
							this.questionListThisExam[this.questionIndex - 1].questionId = this.currentQuestion.id
							this.questionListThisExam[this.questionIndex - 1].answer = this.tempAnswer
							this.questionListThisExam[this.questionIndex - 1].isRight = false
							// 更新该题的回答次数和答错次数
							that.currentQuestion.answeredNum++
							that.currentQuestion.answerIsFalseNum++
							this.$http.put('/msbd/updateQuestion',that.currentQuestion)
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
				// localStorage.setItem('localAnswerLog', JSON.stringify(this.localAnswerLog));
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
					this.$mui.toast('没有上一题')
					this.questionIndex++
				}
				//
				this.currentQuestion = this.questionListThisExam[this.questionIndex - 1]
				//
				this.isAnswered = false
				//
				this.resetSpanStyle()
				//
				if (this.currentQuestion.answer.length != 0) {
					// 查询本地答题记录
					for (var i = 0; i < this.questionListThisExam.length; i++) {
						if (this.questionListThisExam[i].questionId == this.currentQuestion.id) {
							// 说明该题已经答过了
							this.isAnswered = true
							// 显示正确答案和当时答错的答案
							var userAnswerArr = this.questionListThisExam[i].answer.split('') // 用户的答案数组
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
				}


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
					this.$mui.toast('没有下一题')
					this.questionIndex--
				}
				//
				//
				if (this.questionIndex > this.questionListThisExam.length) {
					this.getQuestion()
					//
					this.isAnswered = false
					this.resetSpanStyle()
				} else {
					this.currentQuestion = this.questionListThisExam[this.questionIndex - 1]
					//
					this.isAnswered = false
					this.resetSpanStyle()
					//
					// 查询本地答题记录
					for (var i = 0; i < this.questionListThisExam.length; i++) {
						if (this.questionListThisExam[i].questionId == this.currentQuestion.id) {
							// 说明该题已经答过了
							this.isAnswered = true
							// 显示正确答案和当时答错的答案
							var userAnswerArr = this.questionListThisExam[i].answer.split('') // 用户的答案数组
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
				}
				//

			},
			getCurrentQuestionById: async function(id) { // 通过id获取试题
				var res = await this.$http('/msbd/getQuestionById/' + id)
				this.currentQuestion = res.data.content
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
			getWrongQuestionByUserId: async function() {
				var loadTip = this.$layer.open({
					type: 2,
					content: '正在搜集您的错题'
				});
				var data1 = {
					"model": {
						answerUserId: this.$getCookie('userId'),
						answerIsRight: 2,
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [],
					"pageNum": 1,
					"pageSize": 1000
				}
				var res1 = await this.$http.post('/msbd/getAllUseranserquestion', data1)
				// 题目数量为0的判断
				if(res1.data.content.total == 0){
					this.$layer.close(loadTip)
					this.$mui.toast('您还没有任何错题')
					this.$router.push('/')
					return
				}
				var wrongQuestionIdArr = []
				var tempArr = []  // 存放答题记录主键
				for (var i = 0; i < res1.data.content.list.length; i++) {
					wrongQuestionIdArr.push(res1.data.content.list[i].questionId)
					tempArr.push(res1.data.content.list[i].id)
				}
				var tempQuestionArr = []
				for (var i = 0; i < wrongQuestionIdArr.length; i++) {
					var wrongQuestionId = wrongQuestionIdArr[i]
					var res = await this.$http('/msbd/getQuestionById/' + wrongQuestionIdArr[i])
					res.data.content.wrongQuestionId = tempArr[i]
					tempQuestionArr.push(res.data.content)
				}
				this.currentQuestion = tempQuestionArr[0]
				this.questionListThisExam = tempQuestionArr
				this.questionCount = tempQuestionArr.length
				this.$layer.close(loadTip)
				// this.$http.post('/msbd/getAllQuestion', data).then(res => {
				// 	this.questionListThisExam = res.data.content.list
				// 	this.currentQuestion = this.questionListThisExam[0]
				// })
			},
			examTimeWatcher: function() { // 考试时间监控
				// var that = this
				// // this.examTime
				// var examTimeOut = setInterval(function() {
				// 	//
				// 	that.examTime--
				// 	that.examTimeUsed++
				// 	if (that.examTime == 0) {
				// 		//
				// 		clearInterval(examTimeOut)
				// 		that.$mui.alert('考试时间结束，用时：' + that.examTimeUsed)
				// 		//
				// 		that.$router.push({
				// 			path: '/testResult',
				// 			query: {
				// 				examTimeUsed: that.examTimeUsed,
				// 				falseCount: that.falseCount,
				// 				questionCount: that.questionCount,
				// 				rightCount: that.rightCount,
				// 				questionJobTypeSelectedId: that.questionJobTypeSelectedId,
				// 				questionJobTypeSelectedName: that.questionJobTypeSelectedName
				// 			}
				// 		})
				// 		//
				// 	}
				// }, 1000)
			}
		},
		filters: {
			s2hs: function(s) {
				return timeUtil.s_to_hs(s)
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

			// 判断是考试卷还是  官方模拟考试
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName
			// if (typeof(this.$route.query.exampaperId) == 'undefined') { //  官方模拟考试
			// 	// 随机获取三十题
			// 	this.getQuestion()
			// } else { // 考的是试卷
			// 	var exampaperId = this.$route.query.exampaperId
			// 	this.questionCount = this.$route.query.questionCount
			// 	this.examTime = this.$route.query.examTime
			// 	this.exampaperId = exampaperId
			// 	this.exampaperName = this.$route.query.exampaperName
			// 	this.isWithAnswer = this.$route.query.isWithAnswer
			this.getWrongQuestionByUserId()
			// }


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
				// 	that.preQuestion()
				// });
				// document.getElementById('question').addEventListener("swipeleft", function() {
				// 	console.log('swipeleft')
				// 	that.nextQuestion()
				// });
			}
			// 从浏览器本地缓存中读取用户的答题记录
			// this.localAnswerLog = JSON.parse(localStorage.getItem('localAnswerLog'))||[];
			// 本地统计错题数
			// this.falseCount = 0
			// this.rightCount = 0
			// for (var i = 0; i < this.localAnswerLog.length; i++) {
			// 	if(!this.localAnswerLog[i].isRight&&this.localAnswerLog[i].questionTypeId==this.questionJobTypeSelectedId){
			// 		this.falseCount++
			// 	}else if(this.localAnswerLog[i].isRight&&this.localAnswerLog[i].questionTypeId==this.questionJobTypeSelectedId){
			// 		this.rightCount++
			// 	}
			// }
			// this.questionIndex = this.falseCount + this.rightCount == 0 ? 1 : this.falseCount + this.rightCount
			// this.getQuestion()
			//
			// 考试时间监控
			this.examTimeWatcher()
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
