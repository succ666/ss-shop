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
	  <view class="btn-settle" @click="settlement">结算({{slectTotal}})</view>
	</view>
</template>

<script>
	import {mapState, mapGetters, mapMutations} from 'vuex'
	export default {
		name:"ss-settle",
		data() {
			return {
			 seconds: 3,
			 timer: null
			};
		},
		methods:{
			...mapMutations('m_cart', ['reverseSelectionAll']),
			selectAll(){
				this.reverseSelectionAll(this.checked = !this.checked)
			},
			// 展示倒计时的提示消息
			showTips(n) {
			  // 调用 uni.showToast() 方法，展示提示消息
			  uni.showToast({
				// 不展示任何图标
				icon: 'none',
				// 提示的消息
				title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
				// 为页面添加透明遮罩，防止点击穿透
				mask: true,
				// 1.5 秒后自动消失
				duration: 1500
			  })
			},
			settlement(){
			  // 1. 先判断是否勾选了要结算的商品
			  if (this.slectTotal < 0) return uni.$showMsg('请选择要结算的商品！')
			
			  // 2. 再判断用户是否选择了收货地址
			  if (!this.addstr) return uni.$showMsg('请选择收货地址！')
			
			  // 3. 最后判断用户是否登录了，如果没有登录，则调用 delayNavigate() 进行倒计时的导航跳转
			  // if (!this.token) return uni.$showMsg('请先登录！')
			  if (!this.token) return this.delayNavigate()
			  
			   // 4. 实现微信支付功能
			    this.payOrder()
			},
			// 延迟导航到 my 页面
			delayNavigate() {
			  // 把 data 中的秒数重置成 3 秒
			  this.seconds = 3
			  this.showTips(this.seconds)
			
			  // 1. 将定时器的 Id 存储到 timer 中
			  this.timer = setInterval(() => {
			    this.seconds--
			
			    // 2. 判断秒数是否 <= 0
			    if (this.seconds <= 0) {
			      // 2.1 清除定时器
			      clearInterval(this.timer)
			
			      // 2.2 跳转到 my 页面
			      uni.switchTab({
			        url: '/pages/my/my'
			      })
			
			      // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
			      return
			    }
			
			    this.showTips(this.seconds)
			  }, 1000)
			},
			async payOrder(){
				// 创建订单
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
				}
				// 1.2 发起请求创建订单
				const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				// 1.3 得到服务器响应的“订单编号”
				const orderNumber = res.message.order_number
				
			}
		},
		computed: {
			...mapGetters('m_cart', ['totalPrice','slectTotal','allButtonStatus']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
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