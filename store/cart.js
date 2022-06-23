export default{
	namespaced: true,
	
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || [])
	}),
	
	mutations: {
		// 增加商品
		addToCart(state, goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		// 将选中的商品数据缓存到本地
		saveToStorage(state){
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 修改商品是否选中
		reviseState(state, goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			findResult.goods_state = !findResult.goods_state
			this.commit('m_cart/saveToStorage')
		},
		// 修改商品个数
		reviseCount(state, {count,goods}){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			findResult.goods_count = count
			this.commit('m_cart/saveToStorage')
		},
		// 删除商品
		deleteGoods(state, goods){
			const index = state.cart.findIndex(x => x.goods_id === goods.goods_id)
			state.cart.splice(index, 1);
			this.commit('m_cart/saveToStorage')
		},
		// 全部选中/取消
		reverseSelectionAll(state, status){
			state.cart.forEach(o => o.goods_state = status)
			this.commit('m_cart/saveToStorage')
		}
		
	},
	getters: {
		// 获得商品总个数
		total(state){
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		// 总钱数
		totalPrice(state){ 
			let total_price = 0
			if(state.cart.length == 0) return total_price
			state.cart.forEach(goods => {
				if(goods.goods_state){
					total_price += goods.goods_price * goods.goods_count
				}
			})
			return total_price.toFixed(2)
		},
		// 结算商品数量
		slectTotal(state){
			return state.cart.filter(o => o.goods_state).reduce((pre,cur)=>{
				return pre += cur.goods_count
			},0)
		},
		// 全选按钮状态
		allButtonStatus(state){
			return state.cart.every(goods => goods.goods_state)
		}
	}
	
}