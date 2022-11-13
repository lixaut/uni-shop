<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="login-btn" @click="getUserInfo">一键登录</button>
		<view class="login-info">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			}
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			getUserInfo() {
				uni.getUserProfile({
					desc: '用于获取登录code',
					lang: 'zh_CN',
					success: (e) => {
						this.updateUserInfo(e.userInfo)
						this.getToken(e)
					},
					fail: (err) => {
						uni.$showMsg('获取授权失败')
					}
				})
			},
			getToken(info) {
				// 获取 code
				uni.login({
					success: async (res) => {
						if (res === 'undefined' || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
						// 准备参数
						const query = {
							code: res.code,
							encryptedData: info.encryptedData,
							iv: info.iv,
							rawData: info.rawData,
							signature: info.signature
						}
						
						// 原本逻辑 需要获取 token ，账号限制并不能获取 token，使用假 token
						// const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)		
						// if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
						// uni.$showMsg('登录成功！')
						
						// 假 token 逻辑
						let _token = 'asdfhakgfadjadfjflsadj'
						uni.$showMsg('登录成功！')
						this.updateToken(_token)
						this.navigateBack()
					}
				})
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType == 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						success: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: relative;
		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			background-color: yellow;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
			background-color: white;
		}
		.login-btn {
			font-size: 16px;
			width: 80%;
			border-radius: 100px;
			margin: 20px 0;
			background-color: $theme-color;
		}
		.login-info {
			color: gray;
			font-size: 12px;
		}
	}
</style>