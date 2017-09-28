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
    template: `<div class="app-test">
                    <slot name="inner"></slot>
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