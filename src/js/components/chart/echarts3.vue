<template>
    <div :style="{height: height}"></div>
</template>
<script>
    import echarts from 'echarts';
    import mixin from './mixin';
    import _ from 'lodash';
    import {lazyResize} from 'helper.js';

    export default {
        name: 'Echarts3',
        mixins: [mixin],
        mounted(){
            this.offResize = lazyResize({
                end: ()=>{
                    this.resize();
                }
            })
        },
        beforeDestroy(){
            this.offResize();
        },
        methods: {
            render(config){
                this.destroy();
                this.chart = echarts.init(this.$el);
                this.chart.setOption(this.getConfig(config));
            },
            destroy(){
                if(this.chart){
                    this.chart.dispose();
                    this.chart = null;
                }
            },
            resize(){
                if(this.chart) {
                    this.chart.resize();
                }
            }
        }
    }
</script>