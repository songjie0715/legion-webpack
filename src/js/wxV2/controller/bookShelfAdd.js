/**
 * Created by janey on 16/6/7.
 */


define([
'vue',
'service/bookShelfAddService',
'mixin/loadingMoreMixin',
'components/loading',
'components/dialog',
'core'
],function(Vue,bookShelfAddService, loadingMoreMixin,loading, Dialog, core){

    return function(readRecordItem, bookShelfItem,record, haveRecordNextPage){

        var delDialog = new Dialog({
            template: '#template-del-book-dialog',
            data: {
            },
            events:{
                show: function(){

                },
                hide: function(){
                }
            },
            methods: {
                hideDialog: function(){
                    this.hide();
                },
                comfirmDel: function(){
                    var self = this;
                    loading.show();
                    var bookId = bookShelfVue.delBookId;
                    bookShelfAddService.delBook(bookId).then(function(data){

                        if( data.status == 0 ){
                            loading.hide();
                            bookShelfVue.isDel = true;
                            bookShelfVue.delCurBookIdList.push(bookId);
                            self.hide();
                        }
                    });
                }
            }
        });

        var bookShelfVue = new Vue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                isRecordAjaxLoaded: false,
                ajaxRecordBookItems: [],
                isShelfAjaxLoaded: false,
                ajaxShelfBookItems: [],
                actionType: 'readRecord',
                actionRecord: 0,
                hasReadRecordItem: readRecordItem,
                hasBookShelfItem: bookShelfItem,
                isRecordLoading: false,
                recordFlag: false,
                isShelfLoading: false,
                shelfFlag: false,
                noRecordLoading:  false,
                noShelfLoading: false,
                hasRecordNoMore: false,
                hasShelfNoMore: false,
                isManage: false,
                isDel: false,
                delCurBookIdList: [],
                delBookId: 0
            },
            events: {
                scrollBottom : function(){
                    var self = this;

                    if( this.actionType == 'readRecord' ){

                        if( !haveRecordNextPage ){
                            this.hasRecordNoMore = true;
                            return;
                        }

                        if(this.noRecordLoading){
                            this.hasRecordNoMore = true;
                            return;
                        }
                        this.isRecordLoading = true;
                        if( this.recordFlag ) return;
                        self.recordFlag = true;
                        bookShelfAddService.getMoreRecordBook(++self.recordPageNum).then(function(data){
                            if( !data.result.recentlyBooks.haveNextPage ){
                                self.noRecordLoading = true;
                            }
                            if( data.status == 1 ){
                                location.href = data.url;
                            } else if( data.status == 0 ){
                                self.isRecordAjaxLoaded = true;
                                self.isRecordLoading = false;
                                self.recordFlag = false;
                                self.ajaxRecordBookItems = self.ajaxRecordBookItems.concat(data.result.recentlyBooks.items);
                            }
                        });
                    } else if(this.actionType == 'followItems'){
                        if( this.noShelfLoading ){
                            this.hasShelfNoMore = true;
                            return;
                        }
                        this.isShelfLoading = true;
                        if( this.shelfFlag ) return;
                        this.shelfFlag = true;
                        bookShelfAddService.getMoreShelfBook(++self.shelfPageNum).then(function(data){
                            if( !data.result.followBooks.haveNextPage ){
                                self.noShelfLoading = true;
                            }
                            if( data.status == 1 ){
                                location.href = data.url;
                            } else if( data.status == 0 ){
                                self.isShelfAjaxLoaded = true;
                                self.isShelfLoading = false;
                                self.shelfFlag = false;
                                self.ajaxShelfBookItems = self.ajaxShelfBookItems.concat(data.result.followBooks.items);
                            }
                        });
                    }

                }
            },
            beforeCreate: function(){
                this.recordPageNum = 1;
                this.shelfPageNum = 1;
                
            },
            mounted:function(){
                var actionType = $.cookie("actionType");
                if(actionType){
                    this.actionType = actionType;
                }
                if(record == 1){
                    this.actionType = 'readRecord';
                    document.title="来看阅读";
                }
            },
            methods: {
                changeTab: function(type,record){
                    this.actionType = type;
                    this.actionRecord = record;
                    $.cookie("actionType",type);
                    // location.href = '/wx/i/wxshelf?record='+record;
                },
                manage: function(){
                    if( !this.manageType ){
                        this.isManage = true;
                        this.manageType = true;
                    } else{
                        console.log(location.href);
                        location.reload();
                    }
                },
                showDialog: function (bookId) {
                    delDialog.show();
                    this.delBookId = bookId;
                },
                toJSON(obj){
                    if(obj.chid){
                        return '[{"seatid":"'+ (obj.index+1) +'"},{"bookid":"'+ obj.bookid +'"},{"chid":"'+ obj.chid +'"}]'
                    } else {
                        return '[{"seatid":"'+ (obj.index+1) +'"},{"bookid":"'+ obj.bookid +'"}]'
                    }

                }
            }
        });
    }
});

