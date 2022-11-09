<template>
	<view v-if="goodsInfo.goods_name" class="container">
		<!-- 轮播图 -->
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="1000" 
			:circular="true"
		>
			<swiper-item 
				v-for="(item, index) in goodsInfo.pics" 
				:key="index"
			>
				<view class="swiper-item">
					<image 
						:src="item.pics_big"
						@click="preview(index)"
					></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<view class="goods-price">
				￥{{goodsInfo.goods_price}}
			</view>
			<view class="goods-title">
				<view class="name">
					{{goodsInfo.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="express">
				快递：免运费
			</view>
		</view>
		<!-- 富文本图文信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 底部商品导航 -->
		<view class="goods-nav">
			<uni-goods-nav
				:fill="true"  
				:options="options" 
				:buttonGroup="buttonGroup"  
				@click="onClick" 
				@buttonClick="buttonClick" 
			/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {},
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2,
					infoBackgroundColor: '#FF5C58'
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#FF5C58',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			}
		},
		onLoad(options) {
			const goodsId = options.goods_id
			this.getGoodsDetail(goodsId)
		},
		methods: {
			async getGoodsDetail(id) {
				const { data: res } =
					await uni.$http.get('/api/public/v1/goods/detail', { goods_id: id })
				if (res.meta.status !== 200) return uni.$showMsg()
				// 解决商品详情图片缝隙问题
				res.message.goods_introduce = 
					res.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ').replace(/webp/g, 'jpg')
				this.goodsInfo = res.message
					
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map(item => item.pics_big_url)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;
		image {
			height: 750rpx;
			width: 750rpx;
		}
	}
	
	.goods-info-box {
		padding: 10px;
		.goods-price {
			color: $theme-color;
			font-size: 18px;
			margin: 20px 0;
		}
		.goods-title {
			font-size: 13px;
			display: flex;
			justify-content: space-between;
			.name {
				margin-right: 20px;
			}
			.favi {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120px;
				border-left: 2px solid #efefef;
				color: gray;
			}
		}
		.express {
			font-size: 12px;
			color: gray;
			margin: 5px 0;
		}
	}
	
	.goods-nav {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	
	.container {
		padding-bottom: 50px;
	}
</style>
