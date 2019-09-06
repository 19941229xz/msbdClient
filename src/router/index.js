import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import loginAndReg from '@/components/loginAndReg'
import regularPractice from '@/components/regularPractice'
import examnation from '@/components/examnation'
import testResult from '@/components/testResult'
import rankList from '@/components/rankList'
import exampaperList from '@/components/exampaperList'
import preTest from '@/components/preTest'
import wrongPractice from '@/components/wrongPractice'
import collectionPractice from '@/components/collectionPractice'
import userSetting from '@/components/userSetting'
import userEdit from '@/components/userEdit'
import diffcultList from '@/components/diffcultList'  
import diffcultPractice from '@/components/diffcultPractice'
import myGrade from '@/components/myGrade'
import points from '@/components/points'
import courseList from '@/components/courseList'
import course from '@/components/course'
import randomPractice from '@/components/randomPractice'


Vue.use(Router)

export default new Router({
	routes: [


		{
			path: '/',
			name: 'index',
			component: index 
		},
		{
			path: '/loginAndReg',
			name: 'loginAndReg',
			component: loginAndReg
		},
		{
			path: '/regularPractice',
			name: 'regularPractice',
			component: regularPractice
		},
		{
			path: '/examnation',
			name: 'examnation',
			component: examnation
		},
		{
			path: '/testResult',
			name: 'testResult',
			component: testResult
		},
		{
			path: '/rankList',
			name: 'rankList',
			component: rankList
		},
		{
			path: '/exampaperList',
			name: 'exampaperList',
			component: exampaperList
		},
		{
			path: '/preTest',
			name: 'preTest',
			component: preTest
		},
		{
			path: '/wrongPractice',
			name: 'wrongPractice',
			component: wrongPractice
		},
		{
			path: '/collectionPractice',
			name: 'collectionPractice',
			component: collectionPractice
		},
		{
			path: '/userSetting',
			name: 'userSetting',
			component: userSetting
		},
		{
			path: '/userEdit',
			name: 'userEdit',
			component: userEdit
		},
		{
			path: '/diffcultList',
			name: 'diffcultList',
			component: diffcultList
		},
		{
			path: '/diffcultPractice',
			name: 'diffcultPractice',
			component: diffcultPractice
		},
		{
			path: '/myGrade',
			name: 'myGrade',
			component: myGrade
		},
		{
			path: '/points',
			name: 'points',
			component: points
		},
    {
      path: '/courseList',
      name: 'courseList',
      component: courseList
    },
    {
      path: '/course',
      name: 'course',
      component: course
    },
    {
      path: '/randomPractice',
      name: 'randomPractice',
      component: randomPractice
    }


	]
})
