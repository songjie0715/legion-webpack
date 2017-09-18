/**
 * Created by janey on 2017/2/22.
 */
var lkModal = {
    getCookie(c_name){
        let c_start, c_end;
        if (document.cookie.length>0){
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1){
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    },
    setCookie(c_name,value,expiredays){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    },
    //app下载条通用 && 所有引导下载app 操作
    checkEqui(target, andriodLink, iosLink, isWechat, callback) {

        var $target = $(target);
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Adr') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var bookId = $target.data('bookId');

        $target.on('touchend',function () {
            if (isAndroid) {
                if( isWechat ){
                    $('body').append('<div class="andriod-download-tips"><span></span></div>');
                    callback();
                    return;
                } else {

                    if( bookId ){
                        $.ajax({
                            type:'post',
                            url:website_DOMAIN + '/ajax/book/'+ bookId +'/favorite',
                            data:{"backUrl": website_DOMAIN+"/book/"+bookId}
                        }).then(data=>{
                            switch (data.status){
                                case 1:
                                    setTimeout(()=>{
                                        location.href = data.url;
                                    },1000);
                                    break;
                                case -1:
                                    alert('收藏操作好像没成功，再试一下哦');
                                    setTimeout(()=>{
                                        location.href = location.href;
                                    },1000);
                                    break;
                                case 0:
                                    location.href = andriodLink+'?version=20170621001';
                                    break;
                                default:
                                    alert('抱歉,出错了哦');
                            }
                        });
                    } else {
                        location.href = andriodLink+'?version=20170621001';
                    }
                }
            }

            if (isIOS) {
                // 如果元素本身绑定bookid属性，则需要把该本书加入收藏
                if( bookId ){
                    $.ajax({
                        type:'post',
                        url:website_DOMAIN + '/ajax/book/'+ bookId +'/favorite',
                        data:{"backUrl": website_DOMAIN+"/book/"+bookId}
                    }).then(data=>{
                        // alert(data.status)
                        switch (data.status){
                            case 1:
                                setTimeout(()=>{
                                    location.href = data.url;
                                },1000);
                                break;
                            case -1:
                                setTimeout(()=>{
                                    location.href = location.href;
                                },1000);
                                break;
                            case 0:
                                setTimeout(()=>{
                                    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader';
                                },1000);
                                break;
                            default:
                                alert('抱歉,出错了哦');
                        }
                    });
                } else {
                    setTimeout(()=>{
                        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader';
                    },1000);
                }

            }

        });
    }
};