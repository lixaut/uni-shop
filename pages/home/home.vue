<template>
	<view>
		<view class="search-box">
			<my-search @click="goSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="1000"
			:circular="true"
		>
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator 
					class="swiper-item" 
					:url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"
				>
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view 
				class="nav-item" 
				v-for="(item, index) in navList" 
				:key="index" @click="navHandler(item)"
			>
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层布局 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image 
							:src="item.product_list[0].image_src" 
							:style="{width: item.product_list[0].image_width + 'rpx'}"
							 mode="widthFix"
						 ></image>
					</navigator>
					<view class="right-img-box">
						<navigator 
							class="right-img-item" 
							v-for="(item, index) in item.product_list" 
							:key="index"
							:url="item.url"
						>
							<image 
								:src="item.image_src" 
								mode="widthFix" 
								v-if="index !== 0" 
								:style="{width: item.image_width + 'rpx'}"
							></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 分类导航数据
				navList: [],
				// 楼层数据
				floorList: []
			};
		},
		onLoad() {
			// 获取轮播图数据
			this.getSwiperData()
			// 获取导航栏数据
			this.getNavData()
			// 获取'楼层'数据
			this.getFloorData()
		},
		methods: {
			async getSwiperData() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavData() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			async getFloorData() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 修改 url 数据
				res.message.forEach(item => {
					item.product_list.forEach(item => {
						const query = item.navigator_url.split('?')[1]
						item.url = `/subpkg/goods_list/goods_list?${query}`
					})
				})
				this.floorList = res.message
			},
			navHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;
		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	.nav-list {
		display: flex;
		justify-content: space-evenly;
		margin: 15rpx 0;
		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
	}
	.floor-img-box {
		padding-left: 10rpx;
		display: flex;
		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
		}
	}

</style>
