/**
 * Created by janey on 2017/5/27.
 */

import Vue from "vue";
import core from "../core/core";

export default Vue.extend({
    data(){
        return {
        }
    },
    props: {
        iswechat: Boolean,
        userid: Number,
        position: String,
        datamsg: String,
        bookid: String
    },
    template: `<div class="app-test" style="position:absolute; z-index: 1; width: 100%; height: 32px;">
                    <div class="activity-free" @touchend="addToFreeDownload()" v-cloak>
                        <a class="link collect-data-point" href="javascript:;" :data-user-id="userid" :data-collect-id="position" :data-collect-data="datamsg">去APP免费阅读本书 &gt;</a>
                    </div>
                </div>
                `,
    mounted(){

        this.downloadLink = $(this.$el).find('.link');

        lkModal.checkEqui(this.downloadLink, 'http://lkoss.motieimg.com/laikan_wx/laikan-free.apk' ,'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader', this.iswechat, ()=>{
            history.pushState({link: 'download'},'','/wx/links/up/download#free');
        })

    },
    methods: {
        addDownClose(){
            let d = new Date();
            lkModal.setCookie('theFreeBook'+this.bookid, d.getDate(), 365);
        },
        addToFreeDownload(){

            sessionStorage.setItem('appFree', true);

            $.ajax({
                url: core.website_DOMAIN + '/ajax/guide/app/free/download',
                type: 'POST',
                data: {
                    "bookId": this.bookid
                }
            })
        }
    }
})