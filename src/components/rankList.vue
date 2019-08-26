<template>

	<div>

		<div class="mui-content">
			<header class="header">
				<a href="#/"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
				<h5>{{questionJobTypeSelectedName}}排行榜</h5>
			</header>
		
			<ul class="mui-table-view">
				<li v-for="(item,index) in bestScoreList" class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<div class="mui-media-object mui-pull-left">
							<span class="mui-badge" :class="{'firstScore':0==index,'secondScore':1==index,'thirdScore':2==index}">{{index+1}}</span>
						</div>
						<img v-if="item.userHeadImg!=''&&item.userHeadImg!=null&&item.userHeadImg!='null'" style="margin-left: 30px;" class="mui-media-object mui-pull-left" :src="item.userHeadImg">
						<img v-else style="margin-left: 30px;" class="mui-media-object mui-pull-left" src="../assets/defaultHeadImg.jpg">
						<div class="mui-media-body">
							<div style="margin-left: 30px;" class="mui-pull-left">
								<div v-if="item.userRealName!=''&&item.userRealName!=null&&item.userRealName!='null'">用户{{item.userRealName}}</div>
								<div v-else-if="item.userNickName!=''&&item.userNickName!=null&&item.userNickName!='null'">用户{{item.userNickName}}</div>
								<div v-else>用户{{item.userName}}</div>
								<p class="mui-ellipsis">用时：{{item.finishTimeLong | s2hs}}</p>
							</div>
							<div class="mui-pull-right">
								<span class="mui-media-object">{{item.score}}分</span>
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
				
				bestScoreList:[]
			}
		},
		methods: {
			getRankList:function(){
				var data = {
					"model": {
						questionJobTypeId:this.questionJobTypeSelectedId
					},
					"orderParams": [
						'finishTimeLong asc',
						'score desc'
						
					],
					"pageNum": 1,
					"pageSize": 10
				}
				this.$http.post('/msbd/getAllBestexamresult',data).then(res=>{
					this.bestScoreList = res.data.content.list
				})
			}
		},
		filters: {
			s2hs: function(s) {
				return timeUtil.s_to_hs(s)
			}
		},
		mounted: function() {
			this.questionJobTypeSelectedId=this.$route.query.questionJobTypeSelectedId 
			this.questionJobTypeSelectedName=this.$route.query.questionJobTypeSelectedName 
			
			
			this.getRankList()
		}

	}
</script>

<style scoped="scoped">
	@import '../../static/mui/css/rankList.css'
	
	
</style>
