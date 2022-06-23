import {mapGetters} from 'vuex'

export default {
	onShow(){
		this.setBadge()	
	},
	computed: {
		...mapGetters('m_cart',['total'])
	},
	watch: {
		total(){
			this.setBadge()
		}
	},
	methods: {
		setBadge(){
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}