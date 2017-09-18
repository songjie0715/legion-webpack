/**
 * Created by janey on 16/6/20.
 */

define([
    'vue',
'components/dialogSpeComponent',
    'core'
], function(Vue, dialogSpeComponent, core){
    return Vue.extend({
        components: {
            dialogSpeComponent
        },
        data(){
            return {
            }
        },
        props: {
            detail: Object
        },
        template: `<dialog-spe-component ref="monthlymodal">
                    <div class="dialog-open-month" slot="content">
                        <div class="hd">
                            <h3><span>{{ detail.packname }}</span></h3>
                        </div>
                        <div class="bd">
                            <div>
                                <div class="dialog-open-month-content">
                                    <dl>
                                        <dt><img :src=" detail.imgurl ? detail.imgurl : '' " alt=""></dt>
                                        <dd>
                                            <h4>{{ detail.packname }}(共{{ detail.packnum }}本)</h4>
                                            <p>限时价：{{ detail.pricediscount }} 元/月 <br><span>原价：{{ detail.pricetotal }}元</span></p>
                                        </dd>
                                    </dl>
                                    <p class="tip">包内图书免费读  仅限客户端使用</p>
                                </div>
                                <div class="dialog-footer">
                                    <a href="javaScript:;"  class="lk-app-download-link collect-data-point btn" :data-user-id="detail.userid" data-collect-id="WX-BR-BY-POPS-ACTIVATE">登录客户端&nbsp;&nbsp;立享包月</a>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" class="bun-closed-bt collect-data-point" :data-user-id="detail.userid" data-collect-id="WX-BR-BY-POPS-CLOSE"  @click.prevent="hide()">关闭</a>
                    </div>
                    </dialog-spe-component>`,
        created(){
            this.$mount().$appendTo('body');
        },
        mounted(){
            lkModal.checkEqui('.lk-app-download-link', 'http://lkoss.motieimg.com/laikan_android/laikan.apk' ,'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader', this.detail.iswechat, ()=>{
                history.pushState({link: 'download'},'','/wx/links/up/download');
                $.ajax({
                    url: core.website_DOMAIN + '/ajax/guide/app/download?bookId='+bookId
                })
            });
        },
        methods: {
            show(){
                this.$refs.monthlymodal.show();
            },
            hide(){
                this.$refs.monthlymodal.hide();
            }
        }
    });
});