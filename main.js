import App from './App'

//导入网络请求的包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

//请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(option){
	uni.showLoading({
		title: '数据加载中...'
	})
}
// 响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}

uni.$showMsg = function(title="数据加载失败！", duration = 1300){
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif