<template>
	<view class="my-container">
		<ss-login v-if="!token"></ss-login>
		<ss-userinfo v-else></ss-userinfo>
	</view>
</template>

<script>
	import bageMix from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins: [bageMix],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
