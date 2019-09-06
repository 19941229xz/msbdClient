<template>

  <div>

    <header class="header">
      <a @click="toCourseList"><span class="mui-icon mui-icon-arrowthinleft"></span></a>
      <h5>{{course.courseName}}</h5>
    </header>
    <div class="mui-content" style="background-color: inherit;padding-top: 10px">
      <img v-show="course.coursePic1!=''&&course.coursePic1!=null&&course.coursePic1!='null'" :src="course.coursePic1">
      <img v-show="course.coursePic2!=''&&course.coursePic1!=null&&course.coursePic1!='null'" :src="course.coursePic2">
      <img v-show="course.coursePic3!=''&&course.coursePic1!=null&&course.coursePic1!='null'" :src="course.coursePic3">
      <img v-show="course.coursePic4!=''&&course.coursePic1!=null&&course.coursePic1!='null'" :src="course.coursePic4">
      <button @click="pay" type="button" class="mui-btn mui-btn-block circleBtn"> 获取网盘资源</button>
      <div v-show="isPayed" style="text-align: center">
        长按识别二维码<br>
        <img v-show="course.courseQrcode!=''&&course.coursePic1!=null&&course.coursePic1!='null'"
             :src="course.courseQrcode" style="width: 50%">
      </div>
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
        courseId: '',
        course: {},
        isPayed: false,  // 是否已经购买本课程

      }
    },
    methods: {
      toCourseList: function () {
        this.$router.push({
          path: '/courseList',
          query: {
            questionJobTypeSelectedId: this.questionJobTypeSelectedId,
            questionJobTypeSelectedName: this.questionJobTypeSelectedName
          }
        })
      },
      getCourseById() {
        this.$http('/msbd/getCourseById/' + this.courseId).then(res => {
          this.course = res.data.content
        })
      },
      async pay() {
        if (this.isPayed) {
          this.$mui.toast('已购买本课程')
          return
        } else {
          //获取用户当前积分余额
          var res1 = await this.$http('/user-server/getUserById/' + this.$getCookie('userId'))
          var memberId = res1.data.content.memberId
          var res2 = await this.$http('/user-server/getMemberById/' + memberId)
          var points = res2.data.content.points
          //
          if (points < this.course.pointsNeed) {
            this.$mui.toast('积分余额不足')
            return
          } else {
            //
            var pointsLeft = points - this.course.pointsNeed
            res2.data.content.points = pointsLeft
            var res3 = await this.$http.put('/user-server/updateMember', res2.data.content)
            //
            if (res3.data.code == 200) {
              this.isPayed = true
              this.$mui.toast('购买成功，消费'+this.course.pointsNeed+'积分')
              //生成积分交易记录
              var pointsLog = {
                changeType:1,
                createDate:new Date(),
                belongUserId:this.$getCookie('userId'),
                belongUserName:this.$getCookie('userName'),
                belongUserRealName:this.$getCookie('realName'),
                belongUserNickName:this.$getCookie('nickName'),
                belongUserHeadPic:this.$getCookie('headImg'),
                consumeType:1,
                consumeTypeStr:'购买课程',
                changePoints:this.course.pointsNeed,
                buyCourseId:this.course.id,
                buyCourseName:this.course.courseName
              }
              this.$http.post('/msbd/addPointslog',pointsLog)
            } else {
              this.$mui.toast('获取失败，稍后再重试')
            }
            //
          }
        }


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
      this.courseId = this.$route.query.courseId
      //
      this.getCourseById()
    }

  }
</script>

<style scoped="scoped">
  @import '../../static/mui/css/course.css';
</style>
