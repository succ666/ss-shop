<template>
	<view @click="searchBoxHandler" class="ss-search-container" :style="{'background-color': bgcolor}">
	  <view class="ss-search-box" :style="{'border-radius': radius + 'px'}">
	    <icon class="search" type="search" size="17"></icon>
	    <text class="placeholder">搜索</text>
	  </view>
	</view>
</template>

<script>
	export default {
		name:"ss-search",
		props: {
		  // 背景颜色
		  bgcolor: {
		    type: String,
		    default: '#F40'
		  },
		  // 圆角尺寸
		  radius: {
		    type: Number,
		    // 单位是 px
		    default: 18
		  }
		},
		data() {
			return {
				
			};
		},
		methods: {
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.ss-search-container{
	height: 50px;
	padding: 0 10px;
	display: flex;
	align-items: center;
}
.ss-search-box{
	height: 36px;
	line-height: 36px;
	background-color: #ffffff;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.search{
		height: 20px;
	}
}

</style>