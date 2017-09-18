/**
 * Created by janey on 16/6/19.
 */

define([
    'http://lkres.motieimg.com/legionSundry/js/jwsjs-2.0.js',
    'http://lkres.motieimg.com/legionSundry/js/jws-3.3.js',
    'http://lkres.motieimg.com/legionSundry/js/jsrsasign-latest-all-min.js',
    'http://lkres.motieimg.com/legionSundry/js/wx-octopus.js'
    ],function(){
    return {
        created: function () {

        },
        mounted:function(){
            //埋点
            $('body').on('click','.collect-data-point',function(){
                var $this=$(this),
                    userId = $this.data('user-id'),
                    collectId = $this.data('collect-id'),
                    dataArr = $this.data('collect-data');
                if(collectId != undefined){
                    sendMessage(userId,collectId,dataArr);
                }
            });
        }
    }
});