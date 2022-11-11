<template>
	<view class="my-settle-container">
		<label class="radio" @click="checkedClick">
			<radio color="#FF5C58" :checked="isAllChecked"/><text>全选</text>
		</label>
		<view class="amount-box">
			合计<text>￥{{sumPrice}}</text>
		</view>
		<view class="settle-btn">
			结算（{{checkedAmount}}）
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters('m_cart', ['checkedAmount', 'total', 'sumPrice']),
			isAllChecked() {
				return this.checkedAmount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateCheckedState']),
			checkedClick() {
				this.updateCheckedState(this.isAllChecked)
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