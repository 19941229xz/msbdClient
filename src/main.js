// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//配置mui的js  与css
import mui from '../static/mui/js/mui.min.js'
import '../static/mui/css/mui.min.css'
import '../static/mui/css/common.css'
// 引入layer弹框组建
import layer from '../static/mui/js/layer.js'
import '../static/mui/js/need/layer.css'
// 引入手机端弹层插件 主要用来显示加载等待状态
Vue.prototype.$layer = layer
// vue默认配置
Vue.config.productionTip = false
// 表单校验插件
import VeeValidate, {
	Validator
} from 'vee-validate';
// 表单校验提示中文支持
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'zh_CN',
})
// 增加自定义手机号格式验证
Validator.extend('mobile', {
	messages: {
		en: field => field + '必须是11位手机号码',
	},
	validate: value => {
		return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
	}
});
Vue.use(VeeValidate, {
	// validity: true,
	aria: true,
	i18n,
	i18nRootKey: 'validation',
	dictionary: {
		zh_CN
	}
});
//
// 配置axios相关属性  发送请求时的拦截
axios.interceptors.request.use(config => {
	// 每次请求发送前去检查userId 如果不存在说明本次登录已经过期
	let userId = Vue.prototype.$getCookie('userId')
	//获取当前页面的路由名称
	let routeName = router.currentRoute.name
	if (userId == null || userId == '') { //登录过期且不再登录页 跳转到登录页
		if (routeName.indexOf('ogin') <= -1) {
			router.push('/loginAndReg')
		}
	}
	return config;
}, error => { //请求错误处理  暂时不做处理
	console.log('请求错误');
	console.log(error)
	console.log(JSON.stringify(error));
	Promise.reject(error)
});
// 接受返回时的拦截
axios.interceptors.response.use(
	response => { //成功请求到数据
		return response
	},
	error => { //响应错误处理
		console.log('响应错误');
		console.log(error);
		console.log(JSON.stringify(error));
		return Promise.reject(error)
	}
)

// 配置网关路径
axios.defaults.baseURL = 'https://www.bitcoc.top'
Vue.prototype.$http = axios
//
Vue.prototype.$mui = mui
//cookie操作
Vue.prototype.$getCookie = function(name) {
	//console.log(name)
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	//console.log(arr)
	if (arr != null) return unescape(arr[2]);
	return null;
}
Vue.prototype.$setCookie = function(name, value) {
	//此 cookie 将被保存 1 小时
	var hour = 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
	document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
}
Vue.prototype.$deleteCookie = function(name) {
	//console.log(document.cookie.length)
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = this.$getCookie(name); // 这是cookie的值
	// var adss = this.$getCookie(address);
	if (cval != null) {
		// 这里删除操作其实是将expires过期时间设置为当前时间，使cookie立即过期
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		// document.cookie = address + "=" + adss + ";expires=" + exp.toGMTString();
	}
}
Vue.prototype.$clearAllCookie = function() {
	console.log('清除所有cookie')
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	// console.log("需要删除的cookie名字：" + keys);
	if (keys) {
		for (var i = keys.length; i--;)
			document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
	}
}
// 日志开关
var isDev = true
Vue.prototype.$log = function(log) {
	if (isDev) {
		console.log(log)
	}
}
// 添加全局用户信息
Vue.prototype.$userInfo = {}
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
