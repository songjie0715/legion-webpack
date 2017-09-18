/**
 * Created by janey on 2017/5/27.
 */

import Vue from "vue";
import Core from "../core/core";


export default Vue.extend({
    data(){
        return {
            domain: Core.website_DOMAIN,
            STATIC: Core.STATIC,
            qrcode: ''
        }
    },
    props: {
        detail: Object,
        iswechat: Boolean
    },
    template: `<div class="lk-footer">
                    <div class="focus-qrcode" v-if=" qrcode ? true : false " v-cloak>
                        <h5>关注官方微信公众号，方便下次阅读</h5>
                        <div class="qrcode">
                            <img :src=" qrcode ? qrcode : '' " alt="qrcode">
                        </div>
                        <span>微信内可长按识别</span>
                    </div>
                    <div class="mobile_foot">
                        <a :href="domain + '/'" class="collect-data-point" 
                        :data-user-id="detail.userid" data-collect-id="WX-FE-PORTAL_FOOTER_LEFT" 
                        :data-collect-data=" getString() ">首页</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a class="lk-app-download-link collect-data-point" :data-user-id="detail.userid" 
                        data-collect-id="WX-FE-PORTAL_FOOTER_APP" v-bind:data-collect-data=" getString() " href="javascript:;" rel="nofollow">客户端 </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;<a :href="domain + '/links/wechat'" class="collect-data-point" 
                        :data-user-id="detail.userid" v-bind:data-collect-data=" getString() " 
                        data-collect-id="WX-FE-PORTAL_FOOTER_RIGHT" rel="nofollow">微信</a>
                        <a href="#hd" class="gotop"><img :src="STATIC+'/img/mobile/footer_top_ico.png'" border="0" width="32"  align="right"/></a>
                        <p class="clear slogan"><img :src="STATIC+'/img/wx/laikan/lk_logo.png'" style="width:90px;padding-top:5px;" /></p>
                    </div>
                </div>`,
    mounted(){

        let downloadLink = $(this.$el).find('.lk-app-download-link');

        lkModal.checkEqui(downloadLink, 'http://lkoss.motieimg.com/laikan_android/laikan.apk' ,'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader', this.iswechat, ()=>{
            history.pushState({link: 'download'},'','/wx/links/up/download');
        })
        this.qrcode = this.detail.qrcode;

    },
    methods: {
        getString(){
            return '[{"pops_seat":"'+ this.detail.seat +'"}]'
        }
    }
})