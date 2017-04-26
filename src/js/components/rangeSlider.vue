<template>
    <input type="range" :value="value" :min="min" :max="max" data-rangeslider>
</template>

<script>
    import $ from 'jquery';
    import 'rangeslider.js';

    export default {
        name: 'RangeSlider',
        props: {
            value: Number,
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            polyfill: {
                type: Boolean,
                default: false
            },
            rangeClass: String,
            disabledClass: String,
            horizontalClass: String,
            verticalClass: String,
            fillClass: String,
            handleClass: String,
        },
        mounted(){
            this.slider = $(this.$el).rangeslider({
                rangeClass: this.rangeClass,
                disabledClass: this.disabledClass,
                horizontalClass: this.horizontalClass,
                verticalClass: this.verticalClass,
                fillClass: this.fillClass,
                handleClass: this.handleClass,
                polyfill: this.polyfill,
                onInit: ()=>{
                    this.$emit('init');
                },
                onSlideEnd: (position, value)=>{
                    this.$emit('slide-end', value, position)
                },
                onSlide: (position, value)=>{
                    this.$emit('slide', value, position)
                }
            });
        }
    }
</script>