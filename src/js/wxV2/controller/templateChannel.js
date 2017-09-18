/**
 * Created by janey on 16/6/7.
 */

import Vue from "vue";
import appDownload from "../components/app-download-component";
import headerComponent from "../components/header-component";
import footerComponent from "../components/footer-component";

export default new Vue({
    el: '#app',
    data : {},
    components: {
        'app-download': appDownload,
        'footer-component': footerComponent,
        'head-component': headerComponent
    },
    mounted(){
        if($('#ad_banner1 .bd li').length > 1){
            TouchSlide({
                slideCell:"#ad_banner1",
                titCell : ".hd ul",
                mainCell : ".bd ul",
                effect : "leftLoop",
                autoPage : true,
                autoPlay : true,
                interTime:4000
            })
        }else{
            $('.hd ul.book_ul').hide();
        }
    },
    methods: {
        stringify(content){
            return JSON.stringify(content);
        }
    }
});
