/**
 * Created by janey on 16/6/7.
 */


define([
    'vue',
    'service/accountService',
    'mixin/loadingMoreMixin',
    'components/liveBigImgComponent',
    'components/app-download-component',
    'components/header-component',
    'core'
],function(Vue,bookHotService, loadingMoreMixin, liveBigImgComponent, appDownload, headerComponent, core){

    return new Vue({
            el: '#app',
            components: {
                'live-big-img-component': liveBigImgComponent,
                'app-download': appDownload,
                'head-component': headerComponent
            },
            mixins: [loadingMoreMixin],
            data : {
                noMore: false,
                BookList: [], //获取的阅读券集合，与原有的集合合并
                page: 1, //页码，默认从1开始
                haveNextPage: true, //如果有下一页则改变状态，默认为有下一页
                loading: true
            },
            watch: {
                BookList(){
                    if(this.$refs.items) {
                        this.$refs.items.filter(ref=>ref.book.type == '3').forEach(ref=>{
                            let j = ref.$refs.bigimg;
                            let imgWidth = j.clientWidth;
                            j.style.height = imgWidth * 0.472 + 'px';
                        })
                    }
                }
            },
            created: function(){},
            events: {
                scrollBottom : function(){

                    this.loading = !this.loading;
                    bookHotService.getHotBooks(++this.page).then(data=>{

                        let lists = data.result.liveList;
                        switch (data.status) {
                            case -1:
                                alert('不好意思，服务器开小差了，请重新刷新页面');
                                break;
                            case 0:
                                this.BookList = this.BookList.concat(lists);

                                sessionStorage.setItem('haveObj', JSON.stringify({
                                    BookList: this.BookList
                                }))
                                this.loading = !this.loading;
                                this.page = data.result.page;
                                break;
                            default:;
                        }
                    })
                }
            },
            mounted:function(){

                if( history.state != null ){

                    if(JSON.parse(sessionStorage.getItem('haveObj')).BookList != null ){
                        this.loading = true;
                        console.log(this.loading);
                        this.page = history.state.page;
                        this.BookList =  JSON.parse(sessionStorage.getItem('haveObj')).BookList;

                        $('html,body').animate({scrollTop:history.state.scrollY},50);
                        this.loading = !this.loading;
                        return;
                    }
                }


                bookHotService.getHotBooks(this.page).then(data=>{
                    var list = data.result.liveList;
                    if (list.length == 0) {
                        this.noMore = true;
                    }

                    switch (data.status) {
                        case -1:
                            alert('不好意思，服务器开小差了，请重新刷新页面');
                            break;
                        case 0:
                            this.BookList = this.BookList.concat(list);

                            sessionStorage.setItem('haveObj', JSON.stringify({
                                BookList: this.BookList
                            }))
                            this.loading = !this.loading;
                            this.page = data.result.page;

                            break;
                        default:;
                    }

                });
            },
            methods: {
                directTo: function(){
                    history.pushState({
                        scrollY: window.scrollY,
                        page: this.page
                    },'');
                },
                stringify(content){
                    return JSON.stringify(content);
                }
            }
        });
});

