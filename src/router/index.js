import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import loginAndReg from '@/components/loginAndReg'
import regularPractice from '@/components/regularPractice'


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
		}


	]
})
