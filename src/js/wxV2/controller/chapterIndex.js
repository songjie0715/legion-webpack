/**
 * Created by janey on 16/6/7.
 */


import Vue from "vue";
import newUserPackageDialog from "../components/newUserPackageDialog";
import tipMod from "../components/tipMod";
import newUserPackageMod from "../components/newUserPackageMod";
import footerComponent from "../components/footer-component";
import appFreeDownloadComponent from "../components/app-free-download-component";
import appDownloadChapterComponent from "../components/app-download-chapter-component";
import readActionComponent from "../vueComponent/read-action-component.vue";
import core from "../core/core";

var userId = window['userId'];
var iswechat = window['iswechat'];
var isNewUser = window['isNewUser'];
var isFreeActivity = window['isFreeActivity'];
var qrcode = window['qrcode'];
var userCreateTime = window['userCreateTime'];
var bookid = window['bookid'];
var chapterid = window['chapterid'];
var nextChapterid = window['nextChapterid'];
var prevChapterid = window['prevChapterId'];
var autofeed = window['autofeed'];

export default new Vue({
    el: '#app',
    components: {
        'tip-mod': tipMod,
        'new-user-package-mod': newUserPackageMod,
        'footer-component': footerComponent,
        'read-action': readActionComponent,
        appFreeDownloadComponent,
        'app-download-chapter': appDownloadChapterComponent
    },
    data:{
        isCollectTipShow: false,
        isDownNewUserPackage: false,
        qrcode: '',
        minFont: 1.2,
        maxFont: 2.8,
        readMod: true,
        isReadActionShow: false,
        startX:0,
        startY:0,
        endX:0,
        endY: 0,
        showTap: 0,
        lastTap: 0,
        flag: false,
        target: '',
        autofeed: autofeed,
        isInShelf: false
    },
    mounted(){
        if( history.state && history.state.page == '1' ){ history.back(); }

        var newUserPackageD = newUserPackageDialog({'userid': userId, 'collectid': 'WX-BR-NEWCOMER-POPS-BACK'});
        var self = this;
        var isWechat = iswechat;
        //取当前用户是否为新用户
        var isNewUser = isNewUser || false;
        // let isNewUser = true;
        var href = location.href;
        var isCollectTipShow = localStorage.getItem('isCollectTipShow');
        var freeActivity = isFreeActivity;
        this.target = $(this.$el).find('.intro')[0];

        this.showReadAction();

        this.qrcode = qrcode;

        isNewUser && ( this.isCollectTipShow = true );
        isCollectTipShow && (this.isCollectTipShow = false);

        window.onpageshow = function(event){
            if( event.persisted ){
                window.location.reload()
            }
        };

        //点击App限免浮窗后，返回阅读页，提示 已加入App
        if( sessionStorage.getItem('appFree') == 'true' ){
            this.$refs['tip-mod'].show(function(){
                sessionStorage.setItem('appFree',false);
            });
        }

        if( freeActivity ){
            this.isDownNewUserPackage = false;
        } else {
            this.isNewUser();
        }

        $('.shadow').click(function(){
            lkModal.setCookie('isAndriodDownloadTip', new Date().getDate(), 365);
            sendMessage(userId, 'WX-BR-NEWCOMER-POPS-CLOSE', '[{"bookid": "'+ bookid +'"]');
            newUserPackageD.hide();
            self.$refs['new-user-package'].show();
        });

        //获取缓存状态(阅读模式)
        this.getChangedMod();

        this.chargeInShelf();


        //如果是老用户，则返回
        if( !isNewUser && !lkModal.getCookie('isAndriodDownloadTip') ){
            return;
        }

        if( !lkModal.getCookie('isAndriodDownloadTip') ){
            window.onpopstate = function(event){
                if( history.state == null && isNewUser ){
                    newUserPackageD.show();
                }

            };
            if(isNewUser && isNewUser != ''){
                if( href.indexOf('?') != -1 ){
                    history.pushState({page: 1}, "chapter detail");
                } else {
                    history.pushState({page: 1}, "chapter detail");
                }
            }
        }else if( isNewUser && lkModal.getCookie('isAndriodDownloadTip') && history.state && history.state.page == 1 ) {
            //点击下载新用户礼包后，返回阅读页，提示 已下载新用户礼包 （andriod）
            if( sessionStorage.getItem('getNewUserPackage') == 'true' ){
                this.$refs['get-user-package'].show();
            } else {
                history.back();
            }
        } else {
            //点击下载新用户礼包后，返回阅读页，提示 已下载新用户礼包 (ios)
            if( sessionStorage.getItem('getNewUserPackage') == 'true' ){
                this.$refs['get-user-package'].show();
            }
        }

    },
    methods: {
        closeCollectTip(){
            localStorage.setItem('isCollectTipShow', true);
            this.isCollectTipShow = false;
        },
        isNewUser(){
            var t = userCreateTime;
            t = t.replace(/-/g,'/');
            t = t.split('.')[0];
            var newUserTime = new Date(t);
            var newUserTimeStamp = newUserTime.getTime();
            var time = 48 * 3600 * 1000;

            if( new Date().getTime() - newUserTimeStamp > time ){
                this.isDownNewUserPackage = false;
            } else {
                this.isDownNewUserPackage = true;
            }
        },
        haveUserPackage(e){
            var d = new Date();
            var redirectHref = $(e.target).closest('.linkFree').data('redirect');

            $.ajax({
                url: core.website_DOMAIN +'/award/pack/draw?userId='+ userId,
                success: function(data){
                    var status = data.status;
                    switch (status){
                        case 0:
                            location.href = core.website_DOMAIN +'/accounts/login?backUrl=/wx/book/' +bookid + '/' + chapterid;
                            break;
                        case 1:
                            localStorage.setItem('isHaveUserPackage', true);
                            lkModal.setCookie('isAndriodDownloadTip', d.getDate(), 365);
                            setTimeout(function(){
                                location.href = redirectHref;
                            },500);
                            break;
                        case 2:
                            localStorage.setItem('isHaveUserPackage', true);
                            sessionStorage.setItem('getNewUserPackage', true);
                            lkModal.setCookie('isAndriodDownloadTip', d.getDate(), 365);
                            setTimeout(function(){
                                location.href = redirectHref;
                            },500);
                            break;
                        case -1:
                            alert('抱歉，服务器好像出了点问题哦，请稍后再试：）');
                    }
                }
            })
        },
        fontPlus(){
            let defaultSize = lkModal.getCookie('fontSize');
            if( !defaultSize ) { defaultSize = 1.6 };
            let elm = $(this.$el).find('.intro');
            defaultSize = Number(defaultSize);
            if (defaultSize <= this.maxFont ) {
                defaultSize += 0.2;
                elm.css({'fontSize' : defaultSize+'rem','line-height':defaultSize*1.8+'rem'});
                lkModal.setCookie('fontSize', defaultSize);
            }
        },
        fontMinus(){
            let defaultSize = Number(lkModal.getCookie('fontSize'));
            if( defaultSize < this.minFont ) return;
            let elm = $(this.$el).find('.intro');
            if (defaultSize >= this.minFont ) {
                defaultSize -= 0.2;
                elm.css({'fontSize' : defaultSize+'rem','line-height':defaultSize*1.8+'rem'});
                lkModal.setCookie('fontSize', defaultSize);
            }
        },
        changeMod(){
            this.readMod = !this.readMod;
            lkModal.setCookie('readMod', this.readMod);
        },
        chargeInShelf(){
            $.get(core.website_DOMAIN + '/ajax/book/' + bookid + '/favorite', data=>{
                if (data.status == 0) {
                    this.isInShelf = true;
                }
            });
        },
        addToShelf(){
            $.ajax({
                type: 'POST',
                data: {'favor': 0, 'backUrl': '/book/' + bookid + '/' + chapterid},
                url: core.website_DOMAIN + '/ajax/book/' + bookid + '/favorite',
                //dataType:'json',
                success: data => {
                    if (data != null && data.url != null && typeof (data.url) != 'undefined') {
                        location.href = data.url;
                        return;
                    }
                    if (data.status == 0) {
                        this.isInShelf = true;
                    }
                }
            });
        },
        getChangedMod(){
            let redMod = lkModal.getCookie('readMod');
            let defaultSize = Number(lkModal.getCookie('fontSize'));
            let elm = $(this.$el).find('.intro');

            redMod == 'false' ? (this.readMod = false): (this.readMod = true);
            if(defaultSize){
                elm.css({'fontSize' : defaultSize+'rem','line-height':defaultSize*1.8+'rem'})
            } else {
                elm.css({'fontSize' : '1.6rem','line-height':1.6*1.8+'rem'})
            };
        },
        showReadAction(event){

            this.target.addEventListener('touchstart',this.touch,false);
            this.target.addEventListener('touchmove',this.touch,false);
            this.target.addEventListener('touchend',this.touch,false);

        },
        touch(event){
            switch (event.type){
                case "touchstart":
                    console.log(1);
                    this.startX = event.touches[0].clientX;
                    this.startY = event.touches[0].clientY;

                    let currentTime = new Date().getTime();
                    let tapLength = currentTime - this.lastTap;

                    if( tapLength < 300 && tapLength > 0 ){
                        clearTimeout(this.showTap);
                        this.isReadActionShow = false;
                        event.preventDefault();
                    }

                    this.lastTap = currentTime;
                    break;

                case "touchmove":
                    console.log(2);
                    this.flag || (this.flag = true, this.target.addEventListener('touchend', this.stopTouchendPropagation, true));
                    break;
                case "touchend":
                    console.log(3);
                    this.endX = event.changedTouches[0].clientX;
                    this.endY = event.changedTouches[0].clientY;

                    if( this.endX == this.startX && this.endY == this.startY ){

                        this.showTap = setTimeout(()=>{
                            this.isReadActionShow = !this.isReadActionShow;
                        },300);
                    }else {
                    }
                    event.stopPropagation();
                    break;
            }
        },
        stopTouchendPropagation(e){
            e.stopPropagation();
            setTimeout(()=>{
                this.target.removeEventListener('touchend', this.stopTouchendPropagation, true);
                this.flag = false;
            }, 50);
        },
        stringify(content){
            return JSON.stringify(content);
        }
    }
});



