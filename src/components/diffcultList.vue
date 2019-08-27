<template>

	<div>

		<header class="header">
			<a href="#/"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
			<h5>{{questionJobTypeSelectedName}}难题排行</h5>
		</header>
		<div class="mui-content" style="background-color: inherit;">
			<!--  -->
			<ul class="mui-table-view">
				<li @click="toDiffcultPractice(index)" v-for="(item,index) in diffcultQuestionList" class="mui-table-view-cell">
					
					<a class="mui-navigate-right">
						<span class="listOrder" :class="{'firstScore':0==index,'secondScore':1==index,'thirdScore':2==index}">{{index+1}}</span>{{item.question}}
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
				questionJobTypeSelectedId: 1,
				questionJobTypeSelectedName: '',
				diffcultQuestionList: []
			}
		},
		methods: {
			getDiffcultList: function() {
				var data = {
					"model": {
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [
						'answeredNum asc',
						'answerIsFalseNum desc'

					],
					"pageNum": 1,
					"pageSize": 15
				}
				this.$http.post('/msbd/getAllQuestion', data).then(res => {
					this.diffcultQuestionList = res.data.content.list
				})
			},
			toDiffcultPractice:function(index){
				this.$router.push({
					path: '/diffcultPractice',
					query: {
						questionJobTypeSelectedId: this.questionJobTypeSelectedId,
						questionJobTypeSelectedName: this.questionJobTypeSelectedName,
						questionIndex: index+1
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
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName
			//
			this.getDiffcultList()
		}

	}
</script>

<style scoped="scoped">
	@import '../../static/mui/css/diffcultList.css'
</style>
