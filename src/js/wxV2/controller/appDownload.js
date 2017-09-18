function appDownload(bookId){
    if(bookId==0){
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader';
    }else{
        $.ajax({
            type:'post',
            url:website_DOMAIN + '/ajax/book/'+ bookId +'/favorite',
            data:{"backUrl": website_DOMAIN+"/book/"+bookId},
            success:function(data){
                switch (data.status){
                    case 1:
                        location.href = data.url;
                        return;
                    break;
                    case -1:
                        location.href = location.href;
                    break;
                    case 0:
                        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader';
                    break;
                    default:
                    alert('抱歉,出错了哦');      
                }
            }
        });
    }    
}

