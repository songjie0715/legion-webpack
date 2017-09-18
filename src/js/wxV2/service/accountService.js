/**
 * Created by janey on 16/6/8.
 */

define(['core'], function(core){
    return {
        getTickets: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/ticket',
                data: {
                    page: page
                }
            });
        },
        getPackageTickets: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/mycard',
                data: {
                    page: page
                }
            });
        },
        getHotBooks: function(page){
            var ajaxUrl='';
            if(page == 1){
                ajaxUrl = core.website_DOMAIN + '/live/top';
            }else{
                ajaxUrl = core.website_DOMAIN + '/live/uprefresh?random=1&page='+page;
            }
            return $.ajax({
                url: ajaxUrl
            });
        },
        postFeedback: function(param){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/question/add',
                type: 'POST',
                data: {
                    type: param.type,
                    content: param.content
                }
            })
        },
        getMoreFeedback: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/question/more?page='+page,
            })
        },
        getHotKmBooks: function(page,type){
            return $.ajax({
                url: '/km/ajax/list?random=1&page=' + page + '&type=' + type
            });
        }
    }
});