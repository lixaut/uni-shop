<template>
	<view 
		class="my-search-container" 
		:style="{'background-color': bgcolor}"
		@click="searchBoxHandler"
	>
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="15"></uni-icons>
			<text class="text">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			// 北京颜色
			bgcolor: {
				type: String,
				default: '#FF5C58'
			},
			// 圆角尺寸 单位 px
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			searchBoxHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container {
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box {
		width: 100%;
		background-color: #fff;
		height: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
		.text {
			padding-left: 8px;
			font-size: 15px;
			font-weight: 400;
			color: #a8a8a8;
		}
	}
}
</style>