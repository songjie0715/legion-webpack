<template>
    <div>
        <div class="main-content bd map">
            <vue-bmap
                    ref="bmap"
                    :height="mapHeight"
                    :center="mapCenter"
                    :zoom="mapZoom"
                    @ready="ready"></vue-bmap>
            <div class="options input-group">
                <select class="form-control" v-model="selectedMap" @change="showMap">
                    <option v-for="item in maps" :value="item">{{item.text}}</option>
                </select>
                <div class="btn btn-primary input-group-addon" @click="labelVisible = !labelVisible">
                    <span class="fa fa-eye" v-if="!labelVisible" ></span>
                    <span class="fa fa-eye-slash" v-else></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .labelHidden .BMapLabel{
        display: none !important;
    }
    .options {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 180px;
        /*padding-top: 76px;*/
        /*margin-left: 270px;*/
    }

    .input-group-addon, .input-group-btn, .input-group .form-control {
        flex-direction: row;
    }
</style>
<script type="text/ecmascript-6">
    import VueBmap from '../../../components/map/baidu.vue';
    import _ from 'lodash';
    import geoUtils from '../../../components/map/utils/geoUtils';
    import * as d3 from 'd3';
    import $ from 'jquery';

    export default {
        name: 'BmapView',
        components: {
            VueBmap
        },
        data(){
            return {
                mapHeight: 600,
                mapCenter: "北京",
                mapZoom: 10,
                dataIndex: 0,
                labelVisible: true,
                selectedMap: {
                    text: '北京',
                    center: '北京',
                    data: STATIC_PATH + '/data/bj.tsv'
                },
                maps: [{
                    text: '北京',
                    center: '北京',
                    data: STATIC_PATH + '/data/bj.tsv'
                }, {
                    text: '上海',
                    center: '上海',
                    data: STATIC_PATH + '/data/sh.tsv'
                }]
            };
        },
        watch:{
            labelVisible(){
                $(this.$refs.bmap.$el).parent().toggleClass('labelHidden', !this.labelVisible);
            }
        },
        mounted(){
            this.map = this.$refs.bmap;
        },
        methods: {
            ready(){
                this.showMap();
            },
            showMap(){
                this.drawDots(this.selectedMap.data);
//                this.mapCenter = this.selectedMap.center;
            },
            drawDots(tsvFile){
                var points = [];

                d3.tsv(tsvFile, data=>{
                    points = _.map(data, item=>{
                        let title = item.title;
                        let l = [item.lat, item.lng];

                        return {
                            title,
                            loc: this._transCoord(l)
                        }
                    });

                    points.forEach(item=>{
                        let option = {
                            icon: new BMap.Icon(STATIC_PATH + "/assets/house_icon.png", new BMap.Size(22, 31)),
                            title: item.title
                        };

                        var opts = {
                            position : item.loc,    // 指定文本标注所在的地理位置
                            offset   : new BMap.Size(-20, -30)    //设置文本偏移量
                        };
                        var label = new BMap.Label(item.title, opts);  // 创建文本标注对象
                        label.setStyle({
                            color : "red",
                            fontSize : "12px",
                            height : "20px",
                            lineHeight : "20px",
                            fontFamily:"微软雅黑"
                        });

                        var marker = new BMap.Marker(item.loc, option);
                        this.map.addOverlay(label);
                        this.map.addOverlay(marker);
                    });
                    this.map.setViewport(_.map(points, 'loc'));
                });
            },
            drawCircle(center, size){
                var circle = new BMap.Circle(center, size, {strokeColor:"blue", strokeWeight:1, strokeOpacity: .5, fillOpacity: .3});
                this.map.addOverlay(circle);
            },
            _transCoord(item){
                var latlon = {'lat': item[0], 'lon': item[1]};
                return new BMap.Point(latlon['lon'], latlon['lat']);
            }
        }
    }
</script>