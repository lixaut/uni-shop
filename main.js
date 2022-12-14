
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Store from '@/store/store.js'

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'
// 配置请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
	// 特殊支付接口需要 token
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: Store.state.m_user.token
		}
	}
}
// 配置响应拦截器
$http.afterRequest = function(options) {
	uni.hideLoading()
}

// 封装消息提示框
uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

import store from '@/store/store.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif