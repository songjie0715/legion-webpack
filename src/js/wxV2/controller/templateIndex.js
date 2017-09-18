/**
 * Created by janey on 16/6/7.
 */

import Vue from "vue";
import appDownload from "../components/app-download-component";
import footerComponent from "../components/footer-component";
import core from "../core/core";


module.export = new Vue({
    el: '#app',
    data : {
        changeShow: false,
        findGoodBookShow: false,
        changeBookList: [],
        page: 1,
        isMonthlyPayment: false
    },
    watch: {
        changeBookList(){
            if(this.changeBookList && this.changeBookList.length >= 6 ){
                this.changeShow = true;
            }
        }
    },
    components: {
        appDownload,
        footerComponent
    },
    mounted:function(){
        //充值送包月体验卡
        this.showMonthlyPayment();

        if(this.page > 0){
            this.changeShow = true;
        }
        //获取换一换数据
//                    this.GetBookList(this.page);

        //banner
        if ($('#ad_banner1 .bd li').length > 1) {
            TouchSlide({
                slideCell: "#ad_banner1",
                titCell: ".hd ul",
                mainCell: ".bd ul",
                effect: "leftLoop",
                autoPage: true,
                autoPlay: true,
                interTime: 4000
            })
        } else {
            $('.hd ul.book_ul').hide();
        }

        //签到mod
        $.ajax({
            url: '/wx/user/sign/today',
            success: function (data) {
                if (!data.signinResult) {
                    $('.toUserCheckIn').show();
                }
            }
        })

        function countdown() {
            function fix(num, length) {
                return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
            }

            var endtime = $("#freeTime").val();//限免倒计时
            if (!endtime) {
                return;
            }
            var countdown = (endtime - new Date().getTime()) / 1000;
            if (countdown <= 0) {
                return
            }
            $('#t_h').text(fix((Math.floor(countdown / 3600)).toFixed(0), 2));
            $('#t_m').text(fix((Math.floor(countdown / 60 % 60)).toFixed(0), 2));
            $('#t_s').text(fix((countdown % 60).toFixed(0), 2));
        }

        //三本书滚动
        var swiper = new Swiper('.swiper-container', {
            paginationClickable: true,
            loop: true,
            autoplay: 5000,
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            slidesPerGroup: 1,
            touchMoveStopPropagation: true,
            onSlideChangeEnd: function (swiper) {

                var imgList = $('.swiper-slide-active').find('img');
                $.each(imgList, function (i, v) {
                    $(v).attr('src', $(v).data('original'))
                })
            }

        });
        setInterval(countdown, 1000);
    },
    methods: {
        GetBookList(page){
            var self = this;
            //获取换一换数据
            $.ajax({
                url: core.website_DOMAIN + '/api/next/discovery?page=' + page,
                success: function(data){
                    self.changeBookList = data.result.list;
                    if( self.changeBookList == null || !self.changeBookList || self.changeBookList == [] ){
                        self.findGoodBookShow = false;
                    } else {
                        self.findGoodBookShow = true;
                        if( self.changeBookList.length >= 6 ){
                            self.changeShow = true;
                        }
                    }
                }
            })
        },
        stringify(content){
            return JSON.stringify(content);
        },
        ChangeBook(){
            this.GetBookList(++this.page);
        },
        addMonthlyPaymentLog(){
            let d = new Date().getTime();
            localStorage.setItem('monthlyPayment', d);
        },
        closeMonthlyPayment(){
            this.addMonthlyPaymentLog();
            this.isMonthlyPayment = false;
        },
        showMonthlyPayment(){

            let time = new Date().getTime();
            if( !localStorage.getItem('monthlyPayment') ){
                this.isMonthlyPayment = true;
            }else{
                this.isMonthlyPayment = false;
            }
        }
    }
});
