<template>
	<view class="userinfo-container">
		<view class="top-box">
			<image :src="userInfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>10</text>
						<text>收藏的订单</text>
					</view>
					<view class="panel-item">
						<text>12</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>15</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>20</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="@/static/待付款.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="@/static/待收货.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="@/static/退款.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="@/static/订单.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			
			<view class="panel">
				<view class="panel-body-list">
					<view class="panel-item">
						<text>收货地址</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="panel-item">
						<text>联系客服</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="panel-item" @click="logout">
						<text>退出登录</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['userInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
			logout() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							this.updateAddress({})
							this.updateUserInfo({})
							this.updateToken('')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.userinfo-container {
		
		.top-box {
			height: 400rpx;
			background-color: $theme-color;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			
			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #fff;
				box-shadow: 0 2px 5px #333;
			}
			
			.nickname {
				font-size: 16px;
				color: #fff;
				margin-top: 10px;
			}
		}
		
		.panel-list {
			position: relative;
			top: -10px;
			padding: 0 10px;
			
			.panel {
				margin-bottom: 10px;
				background-color: #fff;
				border-radius: 5px;
				padding: 0 10px;
				
				.panel-title {
					font-size: 15px;
					line-height: 45px;
					border-bottom: 1px dashed #eee;
				}
				
				.panel-body {
					display: flex;
					justify-content: space-between;
					padding: 10px 0;
					
					.panel-item {
						font-size: 12px;
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.icon {
							width: 35px;
							height: 35px;
						}
					}
				}
				
				.panel-body-list {
					display: flex;
					flex-direction: column;
					padding: 5px 0;
					
					.panel-item {
						display: flex;
						justify-content: space-between;
						
						text {
							line-height: 45px;
							font-size: 15px;
						}
					}
				}
			}
		}
	}
</style>