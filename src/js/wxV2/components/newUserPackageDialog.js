/**
 * Created by janey on 16/6/20.
 */

import Dialog from "./dialog";
import bookReaderService from "../service/bookReaderService";
import core from "../core/core";

export default function(status){
    return new Dialog({
        template: '#template-book-newUserPackage-dialog',
        created(){
            this.$on('show-dialog',this.showDialog);
        },
        mounted(){
            $(this.$el).click(function (e) {
                e.stopPropagation();
            })
        },
        methods: {
            showDialog(){
                bookReaderService.changeUserStatus();
                //新手礼包弹窗出现时埋点，收费页增加 data = [{"type": "1"}]
                if( status.collectdata ){
                    sendMessage(status.userid, status.collectid, status.collectdata);
                } else {
                    sendMessage(status.userid, status.collectid, '[]');
                }
            },
            hideDialog(e){
                this.hide();
            },
            getPackage(e){
                var d = new Date();
                var self = this;
                var redirectHref = $(e.target).data('redirect');

                lkModal.setCookie('isAndriodDownloadTip', d.getDate(), 365);
                sessionStorage.setItem('getNewUserPackage', true);
                localStorage.setItem('isHaveUserPackage', true);
                $.ajax({
                    url: core.website_DOMAIN+'/award/pack/draw?userId='+ status.userid,
                    success: function(data){
                        if(data){
                            location.href = redirectHref;
                        }
                    }
                })
            }
        }
    });
}

