<template>
	<view class="my-settle-container">
		<label class="radio" @click="checkedClick">
			<radio color="#FF5C58" :checked="isAllChecked"/><text>全选</text>
		</label>
		<view class="amount-box">
			合计<text>￥{{sumPrice}}</text>
		</view>
		<view class="settle-btn" @click="settleClick">
			结算（{{checkedAmount}}）
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds: 3
			}
		},
		computed: {
			...mapGetters('m_cart', ['checkedAmount', 'total', 'sumPrice']),
			...mapGetters('m_user', ['addStr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
			isAllChecked() {
				return this.checkedAmount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateCheckedState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			checkedClick() {
				this.updateCheckedState(this.isAllChecked)
			},
			settleClick() {
				if (!this.checkedAmount) return uni.$showMsg('请选择要结算的商品！')
				if (!this.addStr) return uni.$showMsg('请选择收货地址！')
				if (!this.token) {
					this.delayNavigate(this.seconds)
				}
				
				this.payOrder()
			},
			async payOrder() {
				const orderInfo = {
					// 真实价格
					// order_price: this.sumPrice,
					// 开发演示价格
					order_price: 0.01,
					consignee_addr: this.addStr,
					goods: this.cart.filter(item => item.goods_state)
						.map(item => ({
							goods_id: item.goods_id,
							goods_number: item.goods_count,
							goods_price: item.goods_price
						}))
				}
				// 发起请求创建订单
				const { data: res } = 
					await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('订单创建失败！')
				// 得到服务器响应的订单编号
				const orderNumber = res.message.order_number
				// 发起请求获取订单的支付信息
				const { data: res1 } = 
					await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
						order_number: orderNumber
					})
				if (res.meta.status !== 200) return uni.$showMsg('预付订单失败！')
				// 获取订单支付相必要参数
				const payInfo = res1.message.payInfo
				// 发起微信支付
				uni.requestPayment({
					...payInfo,
					success: async (result) => {
						const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
							order_number: orderNumber
						})
						if(res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
						uni.showToast({
							title: '订单支付完成！',
							icon: 'success'
						})
					},
					fail: () => {
						uni.$showMsg('订单未支付！')
					}
				})
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: `请登录后再结算！${n} 秒后跳转到登录页`,
					mask: true,
					duration: 1100
				})
			},
			delayNavigate(n) {
				this.showTips(n)
				const timer = setInterval(() => {
					if (n < 1) {
						clearInterval(timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return 
					}
					this.showTips(--n)
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		box-sizing: border-box;
		height: 50px;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		.amount-box {
			text {
				padding-left: 5px;
				color: $theme-color;
				font-weight: bold;
			}
		}
		.settle-btn {
			color: #fff;
			text-align: center;
			line-height: 50px;
			min-width: 100px;
			height: 100%;
			background-color: $theme-color;
		}
	}
</style>