/**
 * Created by janey on 16/6/12.
 */

define(['vue','components/overlay'], function(Vue,overlay){
    return Vue.extend({
        template: `<div class="dialog dialog-pos" :class="{'hidden': !isShow, 'dialog-pos': setPos}">
                        <slot name="content"></slot>
                        <a href="javascript:;" class="bun-closed" @click="hide()">关闭</a>
                    </div>`,
        data: function(){
            return {
                isShow: false,
                setPos: false
            }
        },
        methods: {
            show: function(){
                this.isShow = true;
                this.setPos = true;
                overlay.show();
                $('body').addClass('ovh');
                this.$emit('show');
            },
            hide: function(e){
                this.isShow = false;
                this.setPos = false;
                overlay.hide();
                $('body').removeClass('ovh');
                $('body').css({'position':'relative'});
                this.$emit('hide');
            }
        }
    });
});