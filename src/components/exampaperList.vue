<template>

	<div>
		
		<header class="header">
			<a href="#/"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
			<h5>{{questionJobTypeSelectedName}}专项练习</h5>
		</header>
		<div class="mui-content" style="background-color: inherit;">
			<!--  -->
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="" style="font-size: 15px;font-weight: bolder;">
						公开试卷({{exampaperListPublic.length}})
					</a>
				</li>
				<li @click="toPreTest(item)" v-for="(item,index) in exampaperListPublic" class="mui-table-view-cell">
					<a class="mui-navigate-right">
						{{item.examPaperName}}
					</a>
				</li>
			</ul>
			<!--  -->
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="" style="font-size: 15px;font-weight: bolder;">
						公司或学校内部使用({{exampaperListSchoolOrCompany.length}})
					</a>
				</li>
				<li @click="toPreTest(item)" v-for="(item,index) in exampaperListSchoolOrCompany" class="mui-table-view-cell">
					<a class="mui-navigate-right">
						{{item.examPaperName}}
					</a>
				</li>
			</ul>
			<!--  -->
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="" style="font-size: 15px;font-weight: bolder;">
						班级专属({{exampaperListBanji.length}})
					</a>
				</li>
				<li @click="toPreTest(item)" v-for="(item,index) in exampaperListBanji" class="mui-table-view-cell">
					<a class="mui-navigate-right">
						{{item.examPaperName}}
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
				exampaperListPublic: [],
				exampaperListSchoolOrCompany: [],
				exampaperListBanji: []
			}
		},
		methods: {
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
			getExampaperListSchoolOrCompany: async function() {
				// 
				var data1 = {
					"model": {
						isChecked: 2,
						publicLevel: 2,
						companyId: typeof(this.$getCookie('companyId')) == 'undefined' ? '' : this.$getCookie('companyId'),
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [
						'checkDate desc'

					],
					"pageNum": 1,
					"pageSize": 1000
				}
				var res1 = await this.$http.post('/msbd/getAllExampaper', data1)
				this.exampaperListSchoolOrCompany = res1.data.content.list
				// 
				var data2 = {
					"model": {
						isChecked: 2,
						publicLevel: 2,
						schoolId: typeof(this.$getCookie('schoolId')) == 'undefined' ? '' : this.$getCookie('schoolId'),
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [
						'checkDate desc'

					],
					"pageNum": 1,
					"pageSize": 1000
				}
				var res2 = await this.$http.post('/msbd/getAllExampaper', data2)
				var tempArr = res2.data.content.list
				//过滤相同的数据
				for (var i = 0; i < tempArr.length; i++) {
					var id = tempArr[i].id
					for (var j = 0; j < this.exampaperListSchoolOrCompany.length; j++) {
						if (this.exampaperListSchoolOrCompany[j].id != id) {
							this.exampaperListSchoolOrCompany.push(tempArr[i])
						}
					}
				}
			},
			getExampaperListBanji: function() {
				var data1 = {
					"model": {
						isChecked: 2,
						publicLevel: 3,
						banjiId: typeof(this.$getCookie('banjiId')) == 'undefined' ? '' : this.$getCookie('banjiId'),
						questionJobTypeId: this.questionJobTypeSelectedId
					},
					"orderParams": [
						'checkDate desc'

					],
					"pageNum": 1,
					"pageSize": 1000
				}
				this.$http.post('/msbd/getAllExampaper', data1).then(res => {
					this.exampaperListBanji = res.data.content.list
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
			this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
			this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName
			//
			this.getExampaperListPublic()
			this.getExampaperListBanji()
			this.getExampaperListSchoolOrCompany()
		}

	}
</script>

<style scoped="scoped">
	@import '../../static/mui/css/exampaperList.css'
</style>
