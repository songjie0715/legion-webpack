/**
 * Created by janey on 16/6/7.
 */

define(['vue'], function(Vue){
    return Vue.extend({
        data: function(){
            return {

            }
        },
        created: function(){

        },
        methods: {
            upfoldEachItem: function(event){
                var $this = $(event.srcElement || event.target);
                var $content = $this.closest('.item').find('.contents');
                var $arrow = $this;
                var status = $arrow.data('upfold');
                if( !status ){
                    $content.removeClass('upfold');
                    $arrow.data('upfold',true);
                    $arrow.removeClass('arrow-down').addClass('arrow-up')
                } else {
                    $content.addClass('upfold');
                    $arrow.data('upfold',false);
                    $arrow.removeClass('arrow-up').addClass('arrow-down');
                }
            }
        }
    });
});

