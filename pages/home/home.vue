<template>
	<view>
		<view class="search-box">
			<ss-search></ss-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view v-for="(item, i) in navList" :key="i" class="nav-item" @click="navClickHander(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-box">
					<navigator 
						class="left-img-box" 
						:url="item.product_list[0].navigator_url">
						<image mode="widthFix" :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<view class="right-img-box">
						<navigator 
							class="right-img-item" 
							v-for="(item2, i2) in item.product_list" 
							:url="item2.navigator_url" 
							:key="i2">
							<image v-if="i2 != 0" :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		computed:{
			
		},
		methods:{
			async getSwiperList() {
				const { data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavList(){
				const { data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			async getFloorList(){
				const { data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.floorList = res.message.map(item=>{
					item.product_list.map(item2 => {
						item2.navigator_url = '/subpkg/goods_list' + item2.navigator_url.slice(6)
						return item2
					})
					return item
				})
			},
			navClickHander(item){
				if(item.name === '分类'){
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	margin: 15px 0;
	height: 140rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.nav-item image{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title{
	height: 60rpx;
	width: 100%;
	display: flex;
}
.floor-box{
	display: flex;
	justify-content: space-between;
	margin: 0 5rpx;
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
}
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}

</style>
