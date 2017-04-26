<template>
    <div class="baidu-map" :class="className" :style="{height: height}">
        <div class="map-container" ref="mapContainer" style="height:100%"></div>
        <slot name="overlay"></slot>
    </div>
</template>

<style>
    .anchorBL {
        display: none;
    }
</style>

<script>
    import _ from 'lodash';
    import loader from '../../utils/loader';
    import FencingManager from './baidu/tools/fencing/FencingManager';
    import {FENCING_TYPE} from './baidu/tools/fencing/const';
    import geoUtils from './utils/geoUtils';

    export default {
        name: 'BaiduMap',
        props: {
            center: {
                type: [String, Object],
                default: '中国'
            },
            zoom: {
                type: Number,
                default: 6
            },
            height: {
                type: String,
                default: '500px'
            },
            continuousZoom: {
                type: Boolean,
                default: true
            },
            scrollWheelZoom: {
                type: Boolean,
                default: true
            },
            className: Array,
            fencingToolsOptions: {
                type: Object,
                default(){
                    return {
                        enableContextMenu: false
                    }
                }
            },
            options: Object
        },
        computed: {
            FENCING_TYPE(){
                return FENCING_TYPE
            }
        },
        data(){
            this.map = null;
            this.fencingManager = null;
            this.overlays = [];
            return {
            }
        },
        mounted(){
            loader.load('bmap').then(d=>{
                let map = this.map = new BMap.Map(this.$refs.mapContainer, this.options);
                let center = typeof this.center == 'string' ? this.center: new BMap.Point(this.center.lng, this.center.lat);

                this.map.centerAndZoom(center, this.zoom);

                //添加比例尺
                map.addControl(new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
                }));

                //添加平移缩放控件
                map.addControl(new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
                }));

                //启用滚轮缩放
                this.scrollWheelZoom && map.enableScrollWheelZoom();

                //启用连续缩放
                this.continuousZoom && map.enableContinuousZoom();

                this.fencingManager = new FencingManager(this.map, this.fencingToolsOptions);

                this.fencingManager.on('add', fencing=>{
                    this.$emit('fencing-add', fencing);
                });

                this.fencingManager.on('render', fencing=>{
                    this.$emit('fencing-render', fencing);
                });

                this.fencingManager.on('remove', fencing=>{
                    this.$emit('fencing-remove', fencing);
                });

                this.map.addEventListener('load', ()=>{
                    this.$emit('ready', map);
                });
            });
        },
        methods: {
            centerAndZoom(center, zoom){
                this.map.centerAndZoom(center, zoom);
            }
        }
    }
</script>