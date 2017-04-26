<template>
    <div class="heatmap-tools vm-grid">
        <div><span class="action pointer" @click="dragMap" :class="{active: controlMode == CONTROL_MODE.DRAG}"><i class="fa fa-hand-grab-o icon"></i>拖拽地图</span></div>
        <div><span class="action pointer" @click="counterRegion" :class="{active: controlMode == CONTROL_MODE.DRAW}"><i class="fa fa-object-ungroup icon"></i>圈选人数</span></div>
        <div v-show="overlaysCount > 0"><span class="action pointer" @click="clearRegion"><i class="fa fa-remove icon"></i>清除圈选</span></div>
    </div>
</template>

<script>
    import {CONTROL_MODE} from './const/index';
    import loader from '../../utils/loader';
    import _ from 'lodash';

    export default {
        name: 'HeatmapTools',
        data(){
        	this.overlays = {};
        	this.drawingManager = null;

            return {
                overlaysCount: 0,
                controlMode: CONTROL_MODE.DRAG,
                CONTROL_MODE
            }
        },
        created(){
			loader.series('bmap', 'bmapDrawingManager').then(()=>{
				this.ready()
			})
        },
        methods: {
        	ready(){
				this.drawingManager = new BMapLib.DrawingManager(this.$parent.map, {
					isOpen: false,
					rectangleOptions: {
						strokeColor: '#5ea0d8',
						fillColor: 'white',
						strokeWeight: 4,
						strokeOpacity: .8,
						fillOpacity: .8,
						strokeStyle: 'solid'
					}
				});

				this.$on('cancel-tools', ()=> {
					this.exitCounter();
				});

				this.drawingManager.addEventListener("rectanglecomplete", (overlay)=> {
					this.addCounter(overlay);
				});
            },
			dragMap(){
				this.$emit('cancel-tools');
				this.controlMode = CONTROL_MODE.DRAG;
			},
			exitCounter(){
				this.drawingManager.close();
				this.controlMode = CONTROL_MODE.DRAG;
			},
			counterRegion(){
				this.controlMode = CONTROL_MODE.DRAW;
				this.drawingManager.open();
				this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
			},
			clearRegion(){
				_.forEach(this.overlays, (overlay)=> {
					overlay.overlay.remove();
					overlay.label.remove();
				});

				this.overlaysCount = 0;
			},
			getCount({lt, rt, lb}){
				let result = 0;
				_.forEach(this.$parent.heatmapOverlay.xyData, (point)=> {
					if (point.x >= lt.x && point.x <= rt.x && point.y >= lt.y && point.y <= lb.y) {
						result += point.count;
					}
				});
				return result;
			},
			addCounter(overlay){
				this.overlaysCount++;
				let points = [];
				const bmap = this.$parent.map;

				_.map(overlay.getPath(), point=> {
					let result = bmap.pointToPixel(new BMap.Point(point.lng, point.lat));
					points.push(result);
				});

				let coordinate = {
					lt: points[0],
					rt: points[1],
					rb: points[2],
					lb: points[3]
				};
				let result = this.getCount(coordinate);

				let labelCenter = bmap.pixelToPoint(coordinate.lt);

				let label = new BMap.Label(result, {
					position: labelCenter
				});

				label.setStyle({
					color: "#000",
					backgroundColor: null,
					border: 0,
					fontSize: "20px",
					fontFamily: "Arial"
				});

				bmap.addOverlay(label);
				this.exitCounter();

				this.overlays[this.overlaysCount] = {
					overlay: overlay,
					label: label
				};

				overlay.addEventListener('rightclick', (e)=> {
					overlay.remove();
					label.remove();
					delete this.overlays[this.overlaysCount];
					this.overlaysCount--;
				});


			}
        }
    }
</script>