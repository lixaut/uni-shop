<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 购物车列表 -->
		<uni-swipe-action class="cart-list">
			<block v-for="(item, i) in cart" :key="item.goods_id">
				<uni-swipe-action-item 
					:right-options="options" 
					@click="onClick(item.goods_id)"
				>
					<my-goods
						:goods="item"
						:showRadio="true"
						:showNum="true"
						@radioChange="radioChangeHandler"
						@numChange="numChangeHandler"
					></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>
	<view class="cart-nothing" v-else>
		<image src="@/static/cart_nothing.png"></image>
		<text>购物车空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#FF5C58'
					}
				}]
			}
		},
		methods: {
			...mapMutations('m_cart', [
				'updateGoodsState', 
				'updateGoodsCount', 
				'removeGoodsById'
			]),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			onClick(id) {
				this.removeGoodsById(id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #efefef;
		text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.cart-nothing {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 200px;
		image {
			width: 100px;
			height: 100px;
		}
		text {
			padding-top: 30px;
			font-size: 14px;
			color: #a8a8a8;
		}
	}
</style>
