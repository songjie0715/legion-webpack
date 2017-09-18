//点击签到
// function checkSign(){
    var signBool = $('.signBool').val();
    if(signBool == 1){
        $('.checkCircle .btn').off('click').addClass('void').text('已签到');
        // return;
    }
    $('.checkCircle .btn').on('click',function(){
        var conText = this;
        checkBtn(conText);
    });

    function checkBtn(t){
        var self = $(t);
        var checkMod = $('.checkBg');
        var checkUserId = $('.checkUserId').val();
        $.ajax({
            type:'get',
            url: window.website_DOMAIN + '/user/sign/signin?userId=' + checkUserId,
            dataType:'json',
            success:function(data){
                var signResult = data.signinResult;
                var checkResult = signResult.signinResult; // 签到结果有无连续
                var signCount = signResult.signCount; // 累计签到的数量
                var signAward = Number(signResult.signAwawd); //第五天的额外奖励
                var signDay = signResult.signList[signCount - 1].day; // 累计签到至第几天
                var theDayAward = Number(signResult.signList[signCount - 1].award); //当天获取的阅读券
                var theDay = $('.checkTable li').eq(signCount - 1);
                switch (checkResult){
                    case 1:
                        tipMod('恭喜您，签到成功！');
                        self.next().show();
                        checkMod.find('.checkNum').text(signCount);
                        theDay.find('p.day').addClass('on');
                        theDay.find('p.status').removeClass('status').addClass('statusOn').find('span').html('+<i>'+ (theDayAward + signAward) +'</i><br>阅读券');
                        self.off('click').addClass('void').text('已签到');

                        if(signDay == 5){
                            tipMod('恭喜您,额外获取' + signAward +'阅读券!');
                        }
                        break;
                    default:;
                }
            }
        });
    }


    //dialog
    function tipMod(message){
        var scrollY = $(window).scrollTop();
        var wh = $(window).height();
        popMod.show(scrollY+wh/2-22);
        popMod.render(message);
        setTimeout(function(){
            popMod.hide();
        },2000);
    }

    var popMod = (function(){
        var $popMod = $('.popMod');
        return {
            show: function(scrollT){
                this.pos(scrollT);
                shadow.show();
                $popMod.show();
            },
            hide: function(){
                $popMod.hide();
                shadow.hide();
            },
            pos: function(scrollT){
                $popMod.css({
                    'top': scrollT+'px'
                })
            },
            render: function(html){
                $popMod.find('span').html(html);
            }
        }
    })();

    var shadow = (function(){
        var $shadow = $('.shadowMod');
        return {
            show: function(){
                this.pos();
                $shadow.show();
            },
            hide: function(){
                $shadow.hide();
            },
            pos: function(){
                var dh = $(document).height();
                $shadow.height(dh);
            }
        }
    })();
// }
// checkSign();

   