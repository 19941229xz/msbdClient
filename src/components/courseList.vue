<template>

  <div>

    <header class="header">
      <a href="#/"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
      <h5>{{questionJobTypeSelectedName}}名师课程</h5>
    </header>
    <div class="mui-content" style="background-color: inherit;">
      <ul class="mui-table-view">
        <li @click="toCourse(item)" v-for="item in courseList" class="mui-table-view-cell mui-media">
          <a href="javascript:;" class="mui-navigate-right  ">
            <img class="mui-media-object mui-pull-left" :src="item.coursePic1">
            <div class="mui-media-body">
              {{item.courseName}}
<!--              <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>-->
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
        questionJobTypeSelectedId: 1,
        questionJobTypeSelectedName: '',
        courseList: [],

      }
    },
    methods: {
      getCourseList() {
        var data = {
          "model": {
            isChecked: 2,
            questionJobTypeId: this.questionJobTypeSelectedId
          },
          "orderParams": [
            'checkDate desc'

          ],
          "pageNum": 1,
          "pageSize": 1000
        }
        this.$http.post('/msbd/getAllCourse', data).then(res => {
          this.courseList = res.data.content.list
        })
      },
      toCourse(item){
        this.$router.push({
          path: '/course',
          query: {
            questionJobTypeSelectedId: this.questionJobTypeSelectedId,
            questionJobTypeSelectedName: this.questionJobTypeSelectedName,
            courseId: item.id
          }
        })
      }
    },
    filters: {
      s2hs: function (s) {
        return timeUtil.s_to_hs(s)
      }
    },
    mounted: function () {
      this.questionJobTypeSelectedId = this.$route.query.questionJobTypeSelectedId
      this.questionJobTypeSelectedName = this.$route.query.questionJobTypeSelectedName
      //
      this.getCourseList()
    }

  }
</script>

<style scoped="scoped">
  @import '../../static/mui/css/courseList.css';
</style>
