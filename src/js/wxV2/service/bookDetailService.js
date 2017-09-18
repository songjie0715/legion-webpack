/**
 * Created by janey on 16/6/8.
 */

import core from "../core/core";
export default {
    isAddToShelf: function(bookId){
        return $.ajax({
            type: 'POST',
            data: {
                'favor': 0
            },
            url: core.website_DOMAIN + '/ajax/book/'+ bookId +'/favorite'
        });
    },
    changeBookItems: function(bookId, changeItemSort){
        return $.ajax({
            type: 'GET',
            url: core.website_DOMAIN + '/ajax/book/'+ bookId +'/recommend?sorts=' + changeItemSort
        })
    },
    purchaseChapter: function(chapterNum,chapterId, autoSub){
        return $.ajax({
            type: 'POST',
            url: core.website_DOMAIN + '/buy/chapter/' + chapterId,
            data: {
                'buyCount' : chapterNum,
                'autoSub' : autoSub
            },
            dataType: 'JSON'
        })
    },
    likeService: function(bookId,reviewId){
        return $.ajax({
            url: core.website_DOMAIN + '/ajax/review/' + reviewId +'/like',
            type: 'POST',
            data: {
                bookId: bookId
            },
            dataType: 'JSON'
        });
    },
    reward: function(bookId, quota, chapterId){
        var URL;
        if( chapterId ){
            URL = '/ajax/reward/'+ bookId + '/' + chapterId;
        } else {
            URL = '/ajax/reward/'+ bookId;
        }
        return $.ajax({
            type: 'POST',
            url: core.website_DOMAIN + URL,
            data: {
                'type': 1,
                'quota' : quota,
                'content': ''
            },
            dataType: 'JSON'
        })
    },
    getBalance: function(bookId, chapterId){
        var URL;
        if( chapterId ){
            URL = '/ajax/i/balances?backUrl=/book/'+ bookId + '/' + chapterId;
        } else {
            URL = '/ajax/i/balances?backUrl=/book/'+ bookId;
        }
        return $.ajax({
            url: core.website_DOMAIN + URL,
            dataType: 'JSON'
        })
    },
    getRewardItem: function(bookId){
        return $.ajax({
            url: core.website_DOMAIN + '/ajax/book/'+ bookId +'/reward',
            dataType: 'JSON'
        })
    },
    getDiscount: function(chapterId){
        return $.ajax({
            url: core.website_DOMAIN + '/buy/chapter/trial/' + chapterId,
            dataType: 'JSON'
        })
    }
}