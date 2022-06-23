export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
     address: JSON.parse(uni.getStorageSync('address') || '{}'),
	 token: uni.getStorageSync('token') || '',
	 // 用户的基本信息
	 userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
		state.address = address
		console.log('address:',state.address)
		this.commit('m_user/saveAddressToStorage')
    },
	saveAddressToStorage(state) {
		uni.setStorageSync('address', JSON.stringify(state.address))
	},
	// 更新用户的基本信息
	updateUserInfo(state, userinfo){
		state.userinfo = userinfo
		this.commit('m_user/saveUserInfoToStorage')
	},
	// 将 userinfo 持久化存储到本地
	saveUserInfoToStorage(state){
		uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
	},
	// 更新 token 字符串
	updateToken(state, token){
		state.token = token
		this.commit('m_user/saceTokenToStorage')
	},
	// 将 token 持久化存储到本地
	saceTokenToStorage(state){
		uni.setStorageSync('token', JSON.stringify(state.token))
	}
	
  },

  // 数据包装器
  getters: {
	  // 收货详细地址的计算属性
	    addstr(state) {
	      if (!state.address.provinceName) return ''
	  
	      // 拼接 省，市，区，详细地址 的字符串并返回给用户
	      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	    }
  },
}