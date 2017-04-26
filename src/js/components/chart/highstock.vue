<template>
    <div :style="{height: height}"></div>
</template>
<script>
	import 'highcharts';
	import 'highcharts/highstock';
	import _ from 'lodash';
	import mixin from './mixin';
	import moment from 'moment';

    Highcharts.setOptions({
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        colors: ['#47acb1', '#f26522', '#f9aa7b', '#a5a8aa', '#676766', '#add5d7', '#ffe8af', '#ffcd34'],
        lang: {
            loading: '载入中...',
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            rangeSelectorZoom: '缩放',
            rangeSelectorFrom: '从',
            rangeSelectorTo: '到'
        },
        global: {
            timezoneOffset: -8 * 60
        }
    });

    Highcharts.dateFormats = {
        W(timestamp) {
            return moment(timestamp).format('W');
        }
    };

	export default {
		name: 'Highcharts',
        mixins: [mixin],
		methods: {
            render(config){
			    this.destroy();
                this.chart = Highcharts.stockChart(this.$el, this.getConfig(config))
			},
			destroy(){
			    if(this.chart) {
                    this.chart.destroy();
                    this.chart = null;
                }
			},
			resize(){
			    if(this.chart){
                    this.chart.reflow();
                }
			}
		}
	}
</script>