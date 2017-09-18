/**
 * Created by janey on 16/6/8.
 */

define(['core'], function(core){
    return {
        delBook: function(bookId){
            return $.ajax({
                type: 'POST',
                data: {
                    'favor': -1
                },
                url: core.website_DOMAIN + '/ajax/book/'+ bookId +'/favorite'
            })
        },
        getMoreRecordBook: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/reading',
                data: {
                    page: page,
                    pageSize: 10
                }
            })
        },
        getMoreShelfBook: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/shelf',
                data: {
                    sorts: 0,
                    page: page,
                    pageSize: 10
                }
            })
        }
    }
});