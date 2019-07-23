import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import reg from '@/components/reg'
import forget from '@/components/forget'
import category from '@/components/category'
import shopList from '@/components/shopList'
import car from '@/components/car'
import trans from '@/components/trans'
import userCenter from '@/components/userCenter'
import userEdit from '@/components/userEdit'
import order from '@/components/order'
import orderDetail from '@/components/orderDetail'
import productDetail from '@/components/productDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
		{
		  path: '/login',
		  name: 'login',
		  component: login
		},
		{
		  path: '/reg',
		  name: 'reg',
		  component: reg
		},
		{
		  path: '/forget',
		  name: 'forget',
		  component: forget
		},
		{
		  path: '/category',
		  name: 'category',
		  component: category
		},
		{
		  path: '/shopList',
		  name: 'shopList',
		  component: shopList
		},
		{
		  path: '/car',
		  name: 'car',
		  component: car
		},
		{
		  path: '/trans',
		  name: 'trans',
		  component: trans
		},
		{
		  path: '/userCenter',
		  name: 'userCenter',
		  component: userCenter
		},
		{
		  path: '/userEdit',
		  name: 'userEdit',
		  component: userEdit
		},
		{
		  path: '/order',
		  name: 'order',
		  component: order
		},
		{
		  path: '/orderDetail',
		  name: 'orderDetail',
		  component: orderDetail
		},
		{
		  path: '/productDetail',
		  name: 'productDetail',
		  component: productDetail
		}
		
  ]
})
