import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import loginAndReg from '@/components/loginAndReg'
import regularPractice from '@/components/regularPractice'
import examnation from '@/components/examnation'
import testResult from '@/components/testResult'


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
		}


	]
})
