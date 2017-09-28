/**
 * Created by janey on 2017/5/27.
 */

import Vue from "vue";
import core from "../core/core";

export default Vue.extend({
    data(){
        return {
            isOpen: false,
            static: core.STATIC
        }
    },
    props: {
        iswechat: Boolean,
        userid: Number,
        datamsg: String
    },
    template: `<div class="lk-app-download" v-show="isOpen">
                    <a href="javascript:;" class="link lk-app-download-link collect-data-point" :data-collect-data="datamsg" data-collect-id="WX-POPS-DOWNLOAD">
                        <img :src=" static+'/img/wx/laikan/pic-lk-app-download-02.png?version=201704061110'"/>
                    </a>
                    <b class="closed collect-data-point" @touchend="addDownClose()" :data-collect-data="datamsg" data-collect-id="WX-POPS-DOWNLOAD-CLOSE"></b>
                </div>
                `,
    mounted(){

        let isYesterday=lkModal.getCookie('theDate');
        this.downloadLink = $(this.$el).find('.link');

        if(new Date().getDate() != isYesterday){
            this.isOpen = true;
        }else{
            this.isOpen = false;
        }

        lkModal.checkEqui(this.downloadLink, 'http://lkoss.motieimg.com/laikan_android/laikan.apk' ,'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader', this.iswechat, ()=>{
            history.pushState({link: 'download'},'','/wx/links/up/download');
        })

    },
    methods: {
        addDownClose(){
            this.isOpen = false;
            let d = new Date();
            lkModal.setCookie('theDate',d.getDate(), 365);
        }
    }
})