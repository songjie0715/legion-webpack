/**
 * Created by janey on 2017/1/10.
 */

// 加入战队领红包
var dialogGetPosit = new Dialog({
    el: '.dialog-getDeposit' // 弹层类名
});

// 加入战队领红包
var dialogGetPacket = new Dialog({
    el: '.dialog-getRedPacket'
});

//首页领取红包
var dialogGetPacketIndex = new Dialog({
    el: '.dialog-getRedPacket-index'
});

//弹层错误提示
var dialogError = new Dialog({
    el: '.dialog-error'
});


//海报弹层
var dialogPoster = new Dialog({
    el: '.dialog-poster'
});


// 提现
// $('.btn-get-deposit').click(function(){
//     var scrollTop = $(window).scrollTop();
//     dialogGetPosit.show(scrollTop);
// });

// 生成海报弹层
$('.btn-build-poster').click(function(e){
    var scrollTop = $(window).scrollTop();
    dialogPoster.show(scrollTop, true);
    e.stopPropagation();
});


// wap 分享弹层
var dialogWapShare = new Dialog({
   el: '.dialog-wap-share'
});

// 微信站 分享提示弹层
var dialogWxShareTip = new Dialog({
   el: '.dialog-wx-share-tip'
});







