<template>
	 <!-- 最外层的容器 -->
	<view class="my-settle-container">
	<!-- 全选区域 -->
	  <label class="radio">
	    <radio color="#ff4400" :checked="allButtonStatus" @click="selectAll"/><text>全选</text>
	  </label>
	
	  <!-- 合计区域 -->
	  <view class="amount-box">
	    合计:<text class="amount">￥{{totalPrice}}</text>
	  </view>
	
	  <!-- 结算按钮 -->
	  <view class="btn-settle">结算({{slectTotal}})</view>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		name:"ss-settle",
		data() {
			return {
			
			};
		},
		methods:{
			...mapMutations('m_cart', ['reverseSelectionAll']),
			selectAll(){
				this.reverseSelectionAll(this.checked = !this.checked)
			}	
		},
		computed: {
			...mapGetters('m_cart', ['totalPrice','slectTotal','allButtonStatus'])
		}
	}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #ff4400;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #ff4400;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>