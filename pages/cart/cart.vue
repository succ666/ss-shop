<template>
	<view class="cart-container">
		<ss-address></ss-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<icon type="shop" size="18"/>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click=swipeActionClickHandler(goods)>
					<ss-goods :goods="goods">
						<template v-slot:radio>
							<radio :checked="goods.goods_state" color="#ff4400" @click="radioClick(goods)"></radio>
						</template>
						<template v-slot:number>
							<uni-number-box :min="0" :max="99" v-model="goods.goods_count" @change="numberChange($event,goods)"></uni-number-box> 
						</template>
					</ss-goods> 
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<ss-settle></ss-settle>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from 'vuex'
	import bageMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [bageMix],
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#FF4400'
						}
					}
				]
			}; 
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['totalPrice'])
		},
		methods: {
			...mapMutations('m_cart',['reviseState','reviseCount','deleteGoods']),
			radioClick(goods){
				this.reviseState(goods)
			},
			numberChange(count, goods){
				this.reviseCount({count,goods})
			},
			swipeActionClickHandler(goods){
				this.deleteGoods(goods)
			}
		}
	}
</script>

<style lang="scss">
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		margin-left: 10px;
		font-size: 14px;
	}
}
.goods-item-left{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.goods-info-box {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.cart-container {
  padding-bottom: 50px;
}
</style>
