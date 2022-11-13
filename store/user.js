
export default {
	namespaced: true,
	
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向的 object
		redirectInfo: null
	}),
	
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, redirectInfo) {
			state.redirectInfo = redirectInfo
		}
	},
	
	getters: {
		addStr(state) {
			return state.address.provinceName ?
				state.address.provinceName +
				state.address.cityName +
				state.address.countyName +
				state.address.detailInfo
				:
				''
		}
	}
}