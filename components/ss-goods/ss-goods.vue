<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<slot name="radio"></slot>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
				<slot name="number"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		name:"ss-goods",
		data() {
			return {
				defaultPic: ''
			};
		},
		filters: {
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left{
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 0 10px;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			.goods-price{
				color:#f40;
				font-size: 16px;
			}
		}
		
	}
}
</style>