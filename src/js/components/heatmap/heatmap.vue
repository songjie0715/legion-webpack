<template>
    <div class="heatmap-container">
        <vue-map :height="height" ref="bmap" @ready="mapReady"></vue-map>
        <heatmap-control ref="control" v-show="isRendered" :point-count="pointCount" v-if="mapLoaded"></heatmap-control>
        <heatmap-tools ref="tools" v-show="isRendered && $refs.control.isShow" v-if="mapLoaded"></heatmap-tools>
    </div>
</template>

<script>
	import vueMap from '../map/baidu.vue';
	import HeatmapOverlay from  '../map/bmap/heatmapOverlay';
	import heatmapControl from './control.vue';
	import heatmapTools from './tools.vue';
	import {DEFAULT_GRADIENT, FILTER_TYPE} from './const';
	import CanvasView from './CanvasView';
	import {readText} from '../../utils/file';
	import heatmapProcessor from './utils/processor';

	export default {
		name: 'HeatmapView',
		props: {
			height: String
		},
		components: {
			heatmapControl,
			heatmapTools,
			vueMap
		},
		data(){
			this.heatmapOverlay = null;
			this.heatmapCanvas = null;

			return {
				isRendered: false,
				pointCount: 0,
				gradient: DEFAULT_GRADIENT,
				mapLoaded: false
			}
		},
		methods: {
			mapReady(){
				this.mapLoaded = true;
				this.map = this.$refs.bmap.map;
				this.map.setMinZoom(5);
			},
			render({pointCount = 0, dataArray = {}}={}){

				this.pointCount = pointCount;

				this.map.centerAndZoom('中国', 6);

				if (!this.heatmapOverlay) {
					this.heatmapOverlay = new HeatmapOverlay({
						radius: 30,
						useGradientOpacity: true,
						gradient: this.gradient
					});

					this.map.addOverlay(this.heatmapOverlay);

					this.heatmapCanvas = new CanvasView(document.querySelector('.heatmap-canvas'));

					this.$refs.control.setOpacity();
				}

				this.heatmapOverlay.setDataSet({
					data: dataArray,
					max: 100
				});

				this.$refs.control.toggleShow(true);

				this.isRendered = true;
			},
			readFromFile(file){
				readText(file).then(data => {
					heatmapProcessor(data.split('\n'), {
						stay: {
							start: 0,
							end: 23,
							type: FILTER_TYPE.ALL,
							stayFilter: 0
						},
						filter: {
							start: 0,
							end: 23,
							type: FILTER_TYPE.ALL
						}
					}).then(data=>{
						console.log(data);
                    });
				});
			}
		}
	}
</script>