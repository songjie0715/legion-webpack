/**
 * Created by janey on 2017/5/27.
 */

import Vue from "vue";
import Core from "../core/core";

export default Vue.extend({
    data(){
        return {
            domain: Core.website_DOMAIN,
            STATIC: Core.STATIC
        }
    },
    props: {
        detail: Object
    },
    template: `<div class="lk-header" id="hd">
                    <span class="arrow-left collect-data-point" :data-user-id="detail.userid" data-collect-id="WX-FE-PORTAL_HEADER_LEFT" 
                    :data-collect-data="dataToJson()"
                     onclick="window.history.go(-1)"><a href="javascript:;"><img :src="STATIC+'/img/mobile/lk_arrowLeft.png'" /></a></span>
                    <slot name="tit"></slot>
                    <span class="indexIco collect-data-point" :data-user-id="detail.userid" :data-collect-data="dataToJson()"
                    data-collect-id="WX-FE-PORTAL_HEADER_RIGHT"><a :href="domain+'/'"><img :src="STATIC+'/img/mobile/lk_index_ico.png'" /></a></span>
                </div>`,
    mounted(){

        // lkModal.appDownload()

    },
    methods: {
        dataToJson(){
            return '[{"pops_seat":"'+ this.detail.seat +'"}]';
        }
    }
})


