<template>
	<div class="detail">
		选择的地点名称为: {{ detailContent }}
	</div>
</template>
<script>
	
	export default {
		data(){
			return {
				detailContent:""
			}
		},
		mounted(){
			//
		},
		methods:{
			init(){
				this.detailContent = this.$route.query.clickName;
			}
		},
		created(){
			this.init();
		}
	}
</script>
<style>
	.detail{
		width: 100vw;
		height: 100vh;
		line-height: 100vh;
		text-align: center;
	}
</style>