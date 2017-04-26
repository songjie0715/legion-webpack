<template>
    <component :is="library" ref="chart" :auto="auto" :config="config"></component>
</template>

<script>
    import _ from 'lodash';
    import mixin from './mixin';

    export default {
        name: 'ChartAdaptor',
        mixins: [mixin],
        props: {
            library: {
                type: String,
                default: 'highcharts'
            },
        },
        components: {
            highcharts: () => System.import('./highcharts.vue'),
            echarts: () => System.import('./echarts3.vue'),
            chartjs: () => System.import('./chartjs.vue'),
            chartist: () => System.import('./chartist.vue'),
        }
    }
</script>