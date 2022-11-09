<template>
	<view>
		<view class="goods-list">
			<view 
				v-for="(item, index) in goodsList" 
				:key="index"
				@click="goDetail(item)"
			>
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 商品列表数据
				goodsList: [],
				total: 0,
				isLoading: false
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				// 打开节流阀
				this.isLoading = true
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				// 关闭节流阀
				this.isLoading = false
				if (res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				cb && cb()
			},
			onReachBottom() {
				// 判断是否加载下一页
				if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
					return uni.$showMsg('数据加载完毕！')
				}
				// 判断是否正在请求数据
				if (this.isLoading) return
				this.queryObj.pagenum ++
				this.getGoodsList()
			},
			onPullDownRefresh() {
				// 判断是否正在请求数据
				if (this.isLoading) return
				// 重置关键数据
				this.queryObj.pagenum = 1
				this.total = 0
				this.goodsList = []
				// 重新发起数据请求
				this.getGoodsList(() => {
					uni.stopPullDownRefresh()
				})
			},
			goDetail(goods) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
				})
			}
		}
	}
	
</script>

<style lang="scss">

</style>
