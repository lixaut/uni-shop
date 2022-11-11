<template>
	<view class="container">
		<view 
			class="address-choose-box" 
			v-if="JSON.stringify(address) === '{}'"
		>
			<button 
				type="primary" 
				size="mini" 
				class="address-btn"
				@click="chooseAddress"
			>请选择收货地址+</button>
		</view>
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16px"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addStr}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
			}
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			chooseAddress() {
				uni.chooseAddress({
					success: (res) => {
						this.updateAddress(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		},
		computed: {
			...mapGetters('m_user', ['addStr']),
			...mapState('m_user', ['address'])
		}
	}
</script>

<style lang="scss">
	.container {
		border-bottom: 2px dashed #ddd;
	}
	.address-choose-box {
		height: 70px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box {
		height: 80px;
		font-size: 12px;
		padding: 0 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		.row1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}
		.row2 {
			display: flex;
			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>