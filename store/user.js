
export default {
	namespaced: true,
	
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
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