/**
 * Created by janey on 16/6/12.
 */

import Vue from "vue";
import overlay from "../components/overlay";

export default Vue.extend({
    data: function(){
        return {
            isShow: false,
            setPos: false
        }
    },
    created: function(){
        this.$mount();
        document.querySelector('body').appendChild(this.$el);
        // this.$mount().$appendTo('body');
    },
    methods: {
        show: function(){
            this.isShow = true;
            this.setPos = true;
            overlay.show();
            $('.container').addClass('ovh');
            this.$emit('show-dialog');
        },
        hide: function(e){
            this.isShow = false;
            this.setPos = false;
            overlay.hide();
            $('.container').removeClass('ovh');
            $('.container').css({'position':'relative'});
            this.$emit('hide-dialog');
        }
    }
});