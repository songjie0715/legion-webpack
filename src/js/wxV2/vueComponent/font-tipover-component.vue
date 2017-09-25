/**
 * Created by janey on 2017/5/27.
 */

<template>
    <tip-over ref="fontTipOver">
        <ul slot="content">
            <li class="fontSizePlus" @touchend="changefont('plus')"><a href="javascript:;"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/aless.png"></a></li>
            <li class="fontSizeMinus" @touchend="changefont('minus')"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/aplus.png"></li>
        </ul>
    </tip-over>
</template>

<script>
    import Vue from "vue";
    import tipoverComponent from "./tipover-component.vue";
    import core from "../core/core";

    export default Vue.extend({
        data(){
            return {
            }
        },
        components: {
            'tip-over': tipoverComponent
        },
        props: {
            mustHide: Boolean
        },
        watch: {
            mustHide: function (val) {
                if(!val){
                    this.hide();
                }
            }
        },
        template: ``,
        mounted(){
        },
        methods: {
            show(direction){
                this.$refs.fontTipOver.show(direction);
            },
            hide(){
                this.$refs.fontTipOver.hide();
            },
            changefont(type){
                this.$emit('changefontStatus', type);
            }
        }
    })
</script>
