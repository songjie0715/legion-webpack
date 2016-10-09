<template>
    <div class="baidu-map-container" :class="className"></div>
</template>

<script>
    import Vue from 'vue';
    import BMapWrap from '../utils/BMapWrap';

    export default {
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
        compiled: function () {
            if (this.height != 0) {
                this.$el.style.height = '500px';
            }
        },
        attached: function () {
            BMapWrap.then((wrapper)=>{
                this.map = wrapper(this.$el);
                this.map.centerAndZoom(this.center, this.zoom);
                this.map.addEventListener('load', ()=>{
                    this.$emit('ready');
                })
            });
        }
    }
</script>
