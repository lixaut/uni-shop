<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<radio 
					:checked="goods.goods_state" 
					color="#FF5C58" 
					v-if="showRadio" 
					@click="radioClick"
				></radio>
				<image 
					:src="goods.goods_small_logo || defaultImg" 
					class="goods-pic"
				></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info">
					<view class="goods-price">
						￥{{goods.goods_price | tofixed}}
					</view>
					<view class="goods-num" v-if="showNum">
						<uni-number-box 
							:min="1" 
							:value="goods.goods_count"
							@change="numChangeHandler"
						></uni-number-box>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				// 默认图片
				defaultImg: 'https://img10.360buyimg.com/seckillcms/s500x500_jfs/t1/76223/29/22739/100664/6368eb6cEc028d1e2/d41fdadc89af0f2f.jpg',
			}
		},
		methods: {
			radioClick() {
				this.$emit('radioChange', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numChangeHandler(num) {
				this.$emit('numChange', {
					goods_id: this.goods.goods_id,
					goods_count: +num
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		height: 100px;
		margin: 10px 5px;
		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic {
				height: 100px;
				width: 100px;
			}
		}
		.goods-item-right {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			.goods-name {
				font-size: 13px;
			}
			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-price {
					color: $theme-color;
					font-size: 16px;
				}
				.goods-num {
					
				}
			}
		}
	}
</style>