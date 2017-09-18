/**
 * Created by janey on 16/6/7.
 */


define([
'vue',
'components/purchaseDialog',
'service/bookDetailService',
'components/loading',
'components/overlay',
'components/resultTipDialog',
'components/bookSundryDialog',
'components/openMonthDialog',
'core'
],function(Vue,purchaseDialog, bookDetailService,loading,overlay,resultTipDialog,bookSundryDialog,openMonthDialog,core){

    return function(chapterId,autoSubscribe,isWechat,toolTip, tipMod, newUserPackageDialog, newUserPackageMod){

        new Vue({
            el: '#app',
            components: {
                tipMod,
                newUserPackageMod
            },
            data : {
                isAutoSubChecked: autoSubscribe || false
            },
            mounted:function(){
                if( history.state && history.state.page == '1' ){ history.back(); }


                let href = location.href;

                window.onpageshow = function(event){
                    if( event.persisted ){
                        window.location.reload()
                    }
                };

                //点击App限免浮窗后，返回阅读页，提示 已加入App
                if( sessionStorage.getItem('appFree') == 'true' ){
                    this.$refs.tipMod.show();
                }

                //如果是老用户，则返回
                if( !toolTip && !lkModal.getCookie('isAndriodDownloadTip') ){
                    return;
                }

                if( !lkModal.getCookie('isAndriodDownloadTip') ){
                    window.onpopstate = (event) => {
                        if( history.state == null && toolTip ){
                            newUserPackageDialog({'userid': '${LOGIN_USER_ID}', 'collectid': 'WX-BR-NEWCOMER-POPS-BACK', 'collectdata': '[{"type": "1"}]'}).show();
                        }

                    };
                    if(toolTip && toolTip != ''){
                        if( href.indexOf('?') != -1 ){
                            history.pushState({page: 1}, "chapter detail");
                        } else {
                            history.pushState({page: 1}, "chapter detail");
                        }
                    }
                }else if( toolTip && lkModal.getCookie('isAndriodDownloadTip') && history.state && history.state.page == 1 ) {
                    //点击下载新用户礼包后，返回阅读页，提示 已下载新用户礼包 （andriod）
                    if( sessionStorage.getItem('getNewUserPackage') == 'true' ){
                        this.$refs.getUserPackage.show();
                    } else {
                        history.back();
                    }
                } else {
                    //点击下载新用户礼包后，返回阅读页，提示 已下载新用户礼包 (ios)
                    if( sessionStorage.getItem('getNewUserPackage') == 'true' ){
                        this.$refs.getUserPackage.show();
                    }
                }
            },
            methods: {
                showDialog: function(){
                    purchaseDialog(chapterId, this.isAutoSubChecked).show();
                    // this.isOverlayShow = true;
                },
                checkAutoSub: function(){
                    this.isAutoSubChecked = !this.isAutoSubChecked;
                },
                purchaseCurChapter: function(num,chapterId){
                    var self = this;
                    loading.show();
                    bookDetailService.purchaseChapter(num,chapterId, self.isAutoSubChecked).then(function(data){
                        loading.hide();
                        overlay.show();
                        resultTipDialog.show();

                        if( data.status == 1 ){

                            resultTipDialog.setContent("恭喜,购买成功!", true);
                            setTimeout(function(){
                                location.href = core.wap_DOMAIN + data.url;
                            },0);
                        } else if( data.status == -1 ){

                            resultTipDialog.setContent("抱歉,购买失败,请重新购买!", false);
                            setTimeout(function(){
                                overlay.hide();
                            },2000);
                        }
                    })
                },
                lastChapterStaff: function(){
                    bookSundryDialog.show();
                },
                openMonthDialog: function(bookId){
                    openMonthDialog.show();
                }
            }
        });
    }
});

