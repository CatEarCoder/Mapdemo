<template>
		<div class="map" ref="map">
 			 <el-amap vid="amap" :zoom="zoom" :events="events" :amap-manager="amapManager" isHotspot="true">
				<el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
				<el-amap-marker v-for="marker,index in markers" :key="index" :position="marker.position"  :content="marker.content" :events="marker.events"></el-amap-marker>
			</el-amap> 
  </div>
</template>

<script>
import Vue from "vue";
import VueAMap from 'vue-amap';

Vue.use(VueAMap);

let _this;
export default {
  name: 'Map',
  data () {
    return {
			zoom: 5,
			markers: [],
			window:'',
			windows:[],
			amapManager:new VueAMap.AMapManager(),
			events:{
				hotspotclick(e){
					_this.skip(e);
				}
			}
    }
  },
	methods:{
		init(){
			
			VueAMap.initAMapApiLoader({
			　key: 'f9885477747bd7aa13caca67b67491fc',
			　plugin: ['AMap.Map','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder','AMap.HotSpot']
			});
			
			let markers = [];
			let windows = [];
	 
			let positionArr = [{
				lng:116.398019,
				lat:39.916834,
				address:"故宫博物院"
			},{
				lng:117.086346,
				lat:36.264186,
				address:"泰山风景区"
			},{
				lng:118.158987,
				lat:30.144482, 
				address:"安徽黄山风景区"
			},{
				lng:109.280711,
				lat:34.384626,
				address:"西安秦兵马俑博物馆"
			}]; 
			let self = this;
	
			for (let i = 0 ; i < positionArr.length ; i ++) {
				markers.push({
					position: [positionArr[i].lng, positionArr[i].lat],
					content: `<div class="marker"></div>`,
					events: {
						click() {
							self.windows.forEach(window => {
								window.visible = false;
							});
	
							self.window = self.windows[i];
							self.$nextTick(() => {
								self.window.visible = true;
							});
						}
					}
				});
	
				windows.push({
					position: [positionArr[i].lng, positionArr[i].lat],
					content: `<div class="prompt">${positionArr[i].address}</div>`,
					visible: false
				});
			}
	
			this.markers = markers;
			this.windows = windows;
		},
		skip(data){
			let c = data.name;
			let self = this;
			new Promise(function(resolve, reject){
        self.$router.push({path:"/hotdetail",query:{clickName:c}});
			});
			
		},
		removeEvent(element, eType, handler, bol) {
				if(element.addEventListener){
						element.removeEventListener(eType, handler, bol);
				}else if(element.attachEvent){
						element.detachEvent("on"+eType, handler);
				}else{
						element["on"+eType] = null;
				}
		}
	},
	created(){
		_this = this;
		this.init();
		
	},
	mounted(){
		
	},
	beforeDestroy() {
		location.reload()
	}
}
</script> 
<style>
.map{
	width:100vw;
	height:100vh;
}
.prompt{
	padding:20px 0;
}
.marker{
	width:30px;
	height:30px;
	border-radius: 30px;
	background-image: url(../assets/science.jpg);
	background-size:cover;
}
</style>
