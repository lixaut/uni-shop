
export default {
	namespaced: true,
	
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		// 加入购物车
		addToCart(state, goods) {
			const targetGoods = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!targetGoods) {
				state.cart.push(goods)
			} else {
				targetGoods.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		// 永久化存储
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新商品状态
		updateGoodsState(state, { goods_id, goods_state }) {
			const targetGoods = state.cart.find(item => item.goods_id === goods_id)
			if (targetGoods) {
				targetGoods.goods_state = goods_state
			}
			this.commit('m_cart/saveToStorage')
		},
		// 更新商品数量
		updateGoodsCount(state, { goods_id, goods_count }) {
			const targetGoods = state.cart.find(item => item.goods_id === goods_id)
			if (targetGoods) {
				targetGoods.goods_count = goods_count
			}
			this.commit('m_cart/saveToStorage')
		},
		// 删除商品
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(item => item.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 全新按钮
		updateCheckedState(state, isAllChecked) {
			state.cart.forEach(item => {
				item.goods_state = !isAllChecked
			})
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters: {
		// 商品总数
		total(state) {
			return state.cart.reduce((acc, cur) => acc += cur.goods_count, 0)
		},
		// 选中商品总数
		checkedAmount(state) {
			return state.cart.filter(item => item.goods_state)
				.reduce((acc, cur) => acc += cur.goods_count, 0)
		},
		// 商品总价
		sumPrice(state) {
			return state.cart.filter(item => item.goods_state)
				.reduce((acc, cur) => acc += cur.goods_count * cur.goods_price, 0)
				.toFixed(2)
		}
	}
}