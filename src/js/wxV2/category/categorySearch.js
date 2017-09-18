$('.slidecontrol').on('click',function(){
        var hasclass = $('#slidectrl').hasClass('slidectrl');
        if (!hasclass) {
            $('#slidectrl').addClass('slidectrl');
            $('.slidecontrol').addClass('slideup');
        }else{
            $('#slidectrl').removeClass('slidectrl');
            $('.slidecontrol').removeClass('slideup');
        }
    
});


var cateSearch = function () {
    var flag=false;
    var pageNo =1;
    var totalPage = $('.totalPage').val();
    var getParams = function () {
        //var category = $('#slidectrl .nbox a.togle').data('type');
        var type = $('#slidectrl .nbox a.togle').data('type');//三级分类
        var finish = $('#cateStatus .nbox a.togle').data('type');//连载
        var free = $('#catePrice .nbox a.togle').data('type');//价格
        var sort = $('.sort').val();//二级分类
        var group = $('.group').val();//一级分类
        return {
            //category:category || '',
            finish:finish,
            free:free ,
            sort:sort,
            type:type,
            group:group,
            pageNo:pageNo
        }
    }
    var listHtml = function () {
        var param = getParams();
        $.get( window.website_DOMAIN + '/ajax/category/detail',param,function(data){
            //console.log(pageNo);
            if (data.status == 0) { 
                var htmls = [];
                if ($.each(data.result.bookList,function(i,obj) {
                    var tags = obj.tags;
                    //console.log(data.result);
                    var singleTags = tags.split(" ");
                    var arr1 = singleTags[0];
                    var arr2 = singleTags[1];
                    var arr3 = singleTags[2];
                    //console.log(data.result.bookList);
                    var html = [];
                    var collectData = '[{"seatid":"'+ (i+1) +'"},{"catid":"'+ obj.group +'"},{"cat2id":"'+ obj.sort +'"},{"bookid":"'+ obj.id +'"}]';
                    html.push('<a class="collect-data-point" data-user-id="${LOGIN_USER_ID}" data-collect-id="WX-FE-CATEGORY_BOOKLIST" ' +
                        'data-collect-data="'+ collectData +'" href="/wx'+obj.url+'">');
                    html.push('<div class="listpic">');
                    html.push('<img src="'+PLACEHOLDER+'" class="lazyload" data-src="'+obj.iconUrlLarge+'" data-sizes="auto" data-srcset="'+ obj.iconUrlLarge +' 2x" alt="'+ obj.name +'"></div>');
                    html.push('<div class="listinfo">');
                    html.push('<span class="title">'+obj.name+'</span>');
                    html.push('<span class="name">'+obj.userVO.name+'</span>');
                    html.push('<p class="digest">'+obj.introduce+'</p>');
                    if(arr1){
                        html.push('<span class="tags">'+arr1+'</span>');
                    }
                    if(arr2){
                        html.push('<span class="tags">'+arr2+'</span>');
                    }
                    if(arr3){
                        html.push('<span class="tags">'+arr3+'</span>');
                    }
                    html.push('</div>');
                    html.push('</a>');

                    htmls.push(html.join(''));
                })){}else{
                    //console.log('123');
                };
                if(data.result.bookList.length == 0 && pageNo ==1){
                        $('.noupdate').show();
                        $('.uploadmore').hide();
                        $(window).off('scroll');
                    //$(window).off('scroll');
                    //console.log('123');
                }else if(data.result.bookList.length >0){
                    if(data.result.bookList.length<10 && pageNo==1){
                        $('.noupdate').show();
                        $('.uploadmore').hide();
                        $('.banklist').append(htmls.join(''));
                        $(window).off('scroll');
                         //console.log('456');
                    }else{
                        $('.uploadmore').show();
                        $('.noupdate').hide();
                        $('.banklist').append(htmls.join(''));
                        pageNo++;
                        //console.log(pageNo);
                    }
                }else {
                    if(pageNo == totalPage){
                        $('.noupdate').show();
                        $('.uploadmore').hide();
                        //$(window).off('scroll');
                        //console.log('zuihou');
                    }else{
                        $('.noupdate').show();
                        $('.uploadmore').hide();
                        //$(window).off('scroll');
                        //console.log('fenlei');
                    }
                    
                }
                
            }
        })
    };
    //listHtml(0);

    $(window).on('scroll', function () { 

        //console.log('456');
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) {  
            listHtml();  

        }
        if($(document).scrollTop() >$('.catetopa').height()){
            $('.lh').show();

        }else{
            $('.lh').show();
            
        }
    });
    $('#cateSearch').on('click',function(){
        $(this).parent('.catetop').addClass('catetopa');
        //$(this).hide();
        //$('.lh').hide();

    });
    $('#slidectrl .nbox a').on('click',function(){
        $(this).siblings().removeClass('togle');
        $(this).addClass('togle');
       //$('.catetop').removeClass('catetopa');
        //listHtml();
    });
    $('#cateStatus .nbox a').on('click',function(){
        $(this).siblings().removeClass('togle');
        $(this).addClass('togle');
        //$('.catetop').removeClass('catetopa');

        //listHtml();
    });

    $('#catePrice .nbox a').on('click',function(){
        $(this).siblings().removeClass('togle');
        $(this).addClass('togle');
        //$('.catetop').removeClass('catetopa');
        //listHtml();
    });
    
    $('.confirm').on('click',function(){
        $(this).parents('.catetop').removeClass('catetopa');
        $('.banklist').html('');
        var cateName = $('#slidectrl .nbox a.togle span').text();
        var statusName = $('#cateStatus .nbox a.togle span').text();
        var priceNme = $('#catePrice .nbox a.togle span').text();
        $('#cateSearch .showcate em').html(cateName);
        $('#cateSearch .showfinish em').html(statusName);
        $('#cateSearch .showfree em').html(priceNme);
        //console.log(cateName);
        //page = 1;
        listHtml();
    });

listHtml();
}
cateSearch();




