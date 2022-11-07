<template>
	<view>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="index">
					<view 
						:class="['left-scroll-view-item', index === active ? 'active' : '']"
						@click="tapActive(index)"
					>{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-level2" v-for="(item2, index) in cateLevel2" :key="index">
					<view class="cate-level2-title">
						- {{item2.cat_name}} -
					</view>
					<view class="cate-level2-container">
						<view class="cate-level3-item" @click="goGoodsList(item3.cat_id)" v-for="(item3, index) in item2.children" :key="index">
							<!-- 图片地址出问题，临时替换 -->
							<!-- <image :src="item3.cat_icon" class="pic"></image> -->
							<image src="../../static/img_filed.png"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// window 高度
				wh: 0,
				// 分类列表
				cateList: [],
				active: 0,
				// 二级分类列表
				cateLevel2: [],
				scrollTop: 0,
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync()
			this.wh = systemInfo.windowHeight
			this.getCateData()
		},
		methods: {
			async getCateData() {
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 一级分类数据
				this.cateList = res.message
				// 二级分类数据
				this.cateLevel2 = res.message[0].children
			},
			// 分类点击事件
			tapActive(index) {
				this.active = index
				// 二级分类重新赋值
				this.cateLevel2 = this.cateList[index].children
				// 每次跳转二级分类，距离顶端距离重置
				// 如果每次重置同样的值，则不起作用
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			goGoodsList(id) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?cid=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
	background-color: #fff;
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-view-item {
			background-color: #F9F9F9;
			line-height: 50px;
			text-align: center;
			font-size: 12px;
			position: relative;
			&.active {
				background-color: #fff;
				&::before {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					content: '';
					display: block;
					width: 3px;
					height: 40px;
					background-color: $theme-color;
				}
			}
		}
	}
	
	.cate-level2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-level2-container {
		display: flex;
		flex-wrap: wrap;
		.cate-level3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 10px;
			image {
				width: 60px;
				height: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
}
</style>
