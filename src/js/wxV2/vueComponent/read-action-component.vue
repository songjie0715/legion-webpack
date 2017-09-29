/**
 * Created by janey on 2017/5/27.
 */

<template>
    <div class="read-action-component">
        <div class="chapter-menu chapter-menu-top" :class="[status.initshow ? 'show':'']">
            <ul>
                <li class="l"><a href="/wx/"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_index.png"></a></li>
                <li class="pd collect-data-poin show" data-collect-id="WX-BR-NAVI-BTN-BUY" id="chapterAutoBuy" @touchend="showControlFont('down')">
                    <a href="javascript:;"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_more.png"></a>
                    <subscribe-tipover-component :detail="{mustHide: isAllHide, autofeed: status.autofeed}" ref="subscribeShow" v-cloak></subscribe-tipover-component>
                </li>
                <li id="down" class="mg status">
                    <a href="javascript:;" class="collect-data-point link" data-collect-id="WX-BR-NAVI-BTN-DOWN" :data-collect-data='[{"bookid": bookId}]'><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_download.png"></a>
                </li>
                <li><a href="'/wx/book/'+bookid" class="collect-data-point" data-collect-id="WX-BR-NAVI-BTN-BD"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_detail.png"></a></li>
            </ul>
        </div>
        <div class="chapter-menu chapter-menu-bottom" :class="[status.initshow ? 'show':'']">
            <ul>
                <li><a class="status collect-data-point" @touchend="chargePrevChapter()" href="javascript:;"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_prev.png"><span>上一章</span></a></li>
                <li id="chapterFontSize" class="chapterFontSize" @touchend="showControlFont('up')">
                    <a href="javascript:;" style="margin-top:-5px;"><span>字体</span></a>
                    <font-tipover-component @changefontStatus="changefont"  :must-hide="isAllHide" ref="fontShow" v-cloak></font-tipover-component>
                </li>
                <li id="fontBulb" class="collect-data-point" :class="{nightStatus: !mod}" @touchend="changeMod()" :data-user-id="userId" data-collect-id="WX-BR-NAVI-BTN-DAYNIGHT"><a href="javascript:;"><img :src=" mod ? 'http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_status.png' : 'http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_status-on-new.png'"><span v-if="mod">白天</span><span v-else>黑夜</span></a></li>
                <li><a class="status collect-data-point" :href="'/wx/book/'+ bookId +'/catalogs?chapterId='+ chapterId " data-collect-id="WX-BR-NAVI-BTN-CONTENTS"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_list.png"><span>目录</span></a></li>
                <li><a class="status collect-data-point" @touchend="chargeNextChapter()" data-collect-id="WX-BR-NAVI-BTN-NEXT"><img src="http://lkres.motieimg.com/StaticResources/public_html/wings/_resources/img/wx/laikan/chapter-menu_next.png"><span>下一章</span></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import bookSundryDialog from "../components/bookSundryDialog";
    import fontTipoverComponent from "./font-tipover-component.vue";
    import subscribeTipoverComponent from "./subscribe-tipover-component.vue";
    import core from "../core/core";

    export default Vue.extend({
        data(){
            return {
                isAllHide: false,
                mod: true,
                bookId: 0,
                chapterId: 0
            }
        },
        components: {
            subscribeTipoverComponent,
            fontTipoverComponent
        },
        props: {
            status: Object
        },
        watch: {
            status: {
                handler: function (val) {
                    this.mod = val.mod;
                    if(!val.initshow){
                        this.isAllHide = val;
                        this.$refs['subscribeShow'].hide('down');
                        this.$refs['fontShow'].hide('up');
                    }
                },
                deep: true
            }
        },
        template: `
                `,
        created(){

        },
        mounted(){
            this.bookId = bookid;
            this.chapterId = chapterid;
            this.downloadLink = $(this.$el).find('.link');

            lkModal.checkEqui(this.downloadLink, 'http://lkoss.motieimg.com/laikan_android/laikan.apk' ,'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader', iswechat, ()=>{
                history.pushState({link: 'download'},'','/wx/links/up/download');
            })
        },
        methods: {
            showControlFont(direction,event){
                if(direction == 'down'){
                    this.$refs['subscribeShow'].show('down');
                } else if(direction == 'up'){
                    this.$refs['fontShow'].show('up');
                }
            },
            lastChapterStaff(){
                bookSundryDialog.show()
            },
            chargeNextChapter(){
                nextChapterid == 0 ? (this.lastChapterStaff()) : ( location.href = '/wx/book/'+ bookid + '/'+ nextChapterid );
            },
            chargePrevChapter(){
                prevChapterid != 0 ? ( location.href = core.website_DOMAIN +'/book/'+ bookId +'/'+ prevChapterid ) : '';
            },
            changeMod(){
                this.$emit('change-status');
            },
            changefont(type){
                if(type == 'plus'){
                    this.$emit('plus');
                    return;
                }else if( type == 'minus' ){
                    this.$emit('minus');
                }

            }
        }
    })
</script>

