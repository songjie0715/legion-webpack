/**
 * Created by janey on 2017/5/27.
 */

<template>
    <div class="popOver" v-show="isShow" @touchend="stopBubble($event)" :class="{up: isup, down: isdown, left: isleft, right: isright}">
        <slot name="content"></slot>
    </div>
</template>

<script>
    import Vue from "vue";
    import core from "../core/core";

    export default Vue.extend({
        data(){
            return {
                isShow: false,
                isup: false,
                isdown: false,
                isleft: false,
                isright: false
            }
        },
        template: ``,
        mounted(){

        },
        methods: {
            show(direction){
                this.changeDirect(direction);
                this.isShow = !this.isShow;
            },
            hide(){
                this.isShow = false;
            },
            changeDirect(direction){
                switch ( direction ){
                    case 'up':
                        this.isup = true;
                        break;
                    case 'down':
                        this.isdown = true;
                        break;
                    case 'left':
                        this.isleft = true;
                        break;
                    case 'right':
                        this.isright = true;
                        break;
                    default:;
                }
            },
            stopBubble(e){
                e.stopPropagation();
                e.preventDefault();
            }
        }
    })
</script>
