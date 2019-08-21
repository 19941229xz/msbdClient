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
		}


	]
})
