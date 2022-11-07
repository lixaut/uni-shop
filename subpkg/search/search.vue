<template>
	<view>
		<view class="search-box">
			<uni-search-bar
				:radius="100"
				@input="input"
				:focus="true"
			></uni-search-bar>
		</view>
		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view 
				class="sugg-item" 
				v-for="(item, index) in searchResult" 
				:key="index"
				@click="goDetail(item)"
			>
				<uni-icons type="search" size="12"></uni-icons>
				<view class="goods-name">
					{{item.goods_name}}
				</view>
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="deleteHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag 
					type="default" 
					v-for="(item, index) in historyList" 
					:key="index" 
					:text="item"
					@click="goGoodsList(item)"
				></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keywords: '',
				searchResult: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keywords = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.keywords === '') {
					this.searchResult = []
					return
				}
				const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keywords
				})
				if (res.meta.status !== 200) return umi.$showMsg()
				this.searchResult = res.message
				this.saveSearchHistory()
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			},
			saveSearchHistory() {
				if (this.historyList.includes(this.keywords)) return
				this.historyList.unshift(this.keywords)
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			deleteHistory() {
				this.historyList = []
				uni.setStorageSync('kw', [])
			},
			goGoodsList(kw) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?query=${kw}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: $theme-color;
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sugg-list {
		padding: 0 10px;
		.sugg-item {
			display: flex;
			justify-content: start;
			align-items: center;
			height: 50px;
			border-bottom: 1px solid #eeeeee;
			.goods-name {
				padding-left: 10px;
				font-size: 12px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	.history-box {
		padding: 0 10px;
		.history-title {
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			border-bottom: 1px solid #a8a8a8;
		}
		.history-list {
			display: flex;
			flex-wrap: wrap;
			.uni-tag {
				display: block;
				margin-top: 5px;
				margin-right: 5px;
				padding: 5px;
			}
		}

	}

</style>
