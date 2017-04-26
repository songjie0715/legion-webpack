<template>
    <div :style="{height: height}"></div>
</template>

<script>
    import Chartist from 'chartist';
    import mixin from './mixin';
    import 'chartist/dist/chartist.css';

    export default {
        name: 'Chartist',
        mixins: [mixin],
        methods: {
            render(config){
                this.destroy();

                let {type, data, options, responsiveOptions} = this.getConfig(config);

                this.chart = new Chartist[type](this.$el, data, options, responsiveOptions);
            },
            destroy(){
                if(this.chart) {
                    this.chart.detach();
                    this.chart = null;
                }
            }
        }
    }
</script>