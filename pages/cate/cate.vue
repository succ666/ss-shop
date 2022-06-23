<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<ss-search @click="gotoSearch"></ss-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view 
						:class="['left-scroll-view-item', i == active ? 'active' : '']"
						@click="activeChange(i)"
					>
					{{ item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scroolTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateListTow" :key="i2">
					<view class="cate-lv2-title">{{item2.cat_name}}</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodList(item3)">
							<image :src="item3.cat_icon"></image>
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
				wh: 0,
				cateList: [],
				cateListTow: [],
				active: 0,
				scroolTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods: {
			// 获取分类数据
			async getCateList(){
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateListTow = res.message[0].children
			},
			activeChange(i){
				this.active = i
				this.cateListTow = this.cateList[i].children
				this.scroolTop = this.scroolTop == 0 ? 1: 0
			},
			gotoGoodList(item3){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${item3.cat_id}`
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:"../../subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
	}
	.left-scroll-view-item{
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		&.active{
			background-color: #FFFFFF;
			position: relative;
			&::before{
				content: ' ';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #f40;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}
	}
	.cate-lv2-title{
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
	
}
</style>
