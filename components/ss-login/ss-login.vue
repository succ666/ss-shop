<template>
	<view class="login-container">
		<icon type="info" size="100" color="#AFAFAF"></icon>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<text>登录后尽享权益</text>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"ss-login",
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
			// 获取微信用户的基本信息
			getUserProfile(){
				let _this = this
				uni.getUserProfile({
					desc: '用于收集信息',
					success(succ) {
						_this.updateUserInfo(succ.userInfo)
						//获取登录成功后的Token字符串
						_this.getToken(succ)
					},
					fail(err) {
						uni.$showMsg('您取消了授权')
					}
				}) 
			},
			// 调用登录接口，换取永久的 token
			async getToken(info){
				const [err, res] = await uni.login().catch(err => err)
				 // 判断是否 uni.login() 调用失败
				 if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
				 // 准备参数对象
				const query = {
				  code: res.code,
				  encryptedData: info.encryptedData,
				  iv: info.iv,
				  rawData: info.rawData,
				  signature: info.signature
				}
				// 换取 token
			    const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
			    if (loginResult.meta.status === 200) return uni.$showMsg('登录失败！')
			    uni.$showMsg('登录成功')
				// this.updateToken(loginResult.message.token)
				this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
	  // 登录盒子的样式
	  height: 750rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  background-color: #f8f8f8;
	  position: relative;
	  overflow: hidden;
	
	  // 绘制登录盒子底部的半椭圆造型
	  &::after {
	    content: ' ';
	    display: block;
	    position: absolute;
	    width: 100%;
	    height: 40px;
	    left: 0;
	    bottom: 0;
	    background-color: white;
	    border-radius: 100%;
	    transform: translateY(50%);
	  }
	
	  // 登录按钮的样式
	  .btn-login {
	    width: 90%;
	    border-radius: 100px;
	    margin: 15px 0;
	    background-color: #ff4400;
	  }
	
	  // 按钮下方提示消息的样式
	  .tips-text {
	    font-size: 12px;
	    color: gray;
	  }
	}

</style>