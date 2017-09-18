/**
 * Created by janey on 16/6/7.
 */


define([
    'vue',
    'service/accountService',
    'mixin/loadingMoreMixin',
    'core'
],function(Vue,bookHotService, loadingMoreMixin, core){

    return function(type){
        new Vue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                noMore: false,
                BookList: [], //获取的阅读券集合，与原有的集合合并
                page: 1, //页码，默认从1开始
                type:type,
                haveNextPage: true, //如果有下一页则改变状态，默认为有下一页
                loading: true,
                recommendData: null,
                recommendPage: 1
            },
            created: function(){
                var self = this;
                if( type == 2 ){
                    if( history.state != null ){
                        if(JSON.parse(sessionStorage.getItem('haveObj')).BookList != null ){
                            self.page = history.state.page;
                            self.BookList =  JSON.parse(sessionStorage.getItem('haveObj')).BookList;
                            self.noMore = history.state.noMore;
                            self.haveNextPage = history.state.haveNextPage;

                            $('html,body').animate({scrollTop:history.state.scrollY},50);

                            if( this.BookList.length != 0 ){
                                this.loading = !this.loading;
                            }

                            return;
                        }
                    }
                }


                bookHotService.getHotKmBooks(this.page,this.type).then((data)=>{
                    let lists = data.result.list;

                    if (lists.length == 0) {
                        this.noMore = true;
                    }

                    switch (data.status) {
                        case -1:
                            alert('不好意思，服务器开小差了，请重新刷新页面');
                            break;
                        case 0:
                            this.BookList = this.BookList.concat(lists);

                            this.recommendData = data.result.recommend;

                            this.recommendPage = data.result.recommendPage;


                            if( type == 2 ){
                                sessionStorage.setItem('haveObj', JSON.stringify({
                                    BookList: this.BookList
                                }))
                            }

                            this.loading = !this.loading;

                            data.result.page >= data.result.totalPage ? this.haveNextPage = false : this.haveNextPage = true;

                            break;
                        default:
                            ;
                    }

                })
            },
            events: {
                scrollBottom : function(){

                    var self = this;
                    if (!this.haveNextPage) return;
                    if (this.haveNextPage) {
                        self.page = ++this.page;
                        bookHotService.getHotKmBooks(self.page,self.type).then(function(data){
                            console.log(self.page);
                            var lists = data.result.list;
                            switch (data.status) {
                                case -1:
                                    alert('不好意思，服务器开小差了，请重新刷新页面');
                                    break;
                                case 0:
                                    self.BookList = self.BookList.concat(lists);

                                    if( type == 2 ){
                                        sessionStorage.setItem('haveObj', JSON.stringify({
                                            BookList: self.BookList
                                        }))
                                    }

                                    data.result.page >= data.result.totalPage ? self.haveNextPage = false : self.haveNextPage = true;
                                    break;  
                                default:
                                    ;
                            }
                        })
                    }
                }
            },
            methods: {
                directTo(){
                    var self= this;
                    history.pushState({
                        scrollY: window.scrollY,
                        page: self.page,
                        noMore: self.noMore,
                        haveNextPage: self.haveNextPage
                    },'');
                },
                changeRecommend(){
                    $.ajax({
                        url: '/km/collectRecommend?page='+(++this.recommendPage)
                    }).then((data)=>{
                        this.recommendData = data.result.recommend;
                        this.recommendPage = data.result.recommendPage;
                    })
                }
            }
        });
    }
});

