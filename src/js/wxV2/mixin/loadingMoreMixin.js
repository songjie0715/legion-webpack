/**
 * Created by janey on 16/6/19.
 */

define(function(){
    return {
        created: function () {

        },
        mounted:function(){
            var self = this;

            $(window).on('scroll', function(){
                // 如果滚动条滑到页面底部, 加载更多数据
                if( window.innerHeight + window.scrollY == $(document).height()){
                    self.$emit('scrollBottom');
                }
            })
        }
    }
});