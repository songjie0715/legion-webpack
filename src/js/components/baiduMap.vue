<template>
    <div class="baidu-map-container" :class="className"></div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import BMapWrap from '../utils/BMapWrap';

    export default {
        name: 'BaiduMap',
        props: {
            center: {
                type: String,
                default: '北京'
            },
            zoom: {
                type: Number,
                default: 16
            },
            height: {
                type: Number,
                default: 500
            },
            className: {
                type: Array,
                default(){
                    return [];
                }
            }
        },
        mounted: function () {
            if (this.height != 0) {
                this.$el.style.height = this.height + 'px';
            }

            BMapWrap.then((wrapper)=>{
                this.map = wrapper(this.$el);
                this.map.centerAndZoom(this.center, this.zoom);
                this.map.addEventListener('load', ()=>{
                    this.$emit('ready');
                });

                this.setStyle();
            });
        },
        watch: {
            center(){
                this.map.centerAndZoom(this.center, this.zoom);
            },
            zoom(){
                this.map.centerAndZoom(this.center, this.zoom);
            }
        },
        methods: {
            addOverlay(args){
                return this.map.addOverlay(args);
            },
            setViewport(points){
                this.map.setViewport(points);
            },
            setStyle(){
                this.map.setMapStyle({
                    styleJson: [{
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#cad8e3"
                        }
                    }, {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#f2f8f9"
                        }
                    }, {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#e0e9f0"
                        }
                    }, {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "color": "#e0e9f0"
                        }
                    }, {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "color": "#e0e9f0"
                        }
                    }, {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#b4c4d0"
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#dbe5ec"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "all",
                        "stylers": {
                            "color": "#e2ecf2"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#e0e9f0"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#e0e9f0"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "color": "#d6dee4"
                        }
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#839db2",
                            "weight": "0.6"
                        }
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffff"
                        }
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "color": "#d6dee4",
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "color": "#d9e3ea",
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "color": "#c6d4df",
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#cad8e3"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#dbe5ec"
                        }
                    }]
                })
            }
        }
    }
</script>
