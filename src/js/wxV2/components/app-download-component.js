/**
 * Created by janey on 2017/5/27.
 */

import Vue from "vue";

export default Vue.extend({
    data(){
        return {
            isOpen: false
        }
    },
    props: {
        iswechat: Boolean,
        userid: Number,
        position: String,
        datamsg: String
    },
    template: `<div class="app-test">
                    <div class="lk-app-download" v-show="isOpen" v-cloak>
                        <a class="link collect-data-point" href="javascript:;" :data-user-id="userid" :data-collect-id="position" :data-collect-data="datamsg">
                            <img src="http://lkresdev.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/pic-lk-app-download.jpg" />
                        </a>
                        <slot name="close"></slot>
                    </div>
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