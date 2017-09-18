/**
 * Created by janey on 16/6/7.
 */


define([
'vue',
'service/commentService',
'components/dialog',
'mixin/loadingMoreMixin',
'components/legionConfig',
'components/resultTipDialog',
'components/loading'
], function(Vue, commentService,Dialog, loadingMoreMixin, legionConfigVue, resultTipDialog, loading){

    return function(bookId, isLogIn, haveNextPage){

        var commentDialog = new Dialog({
            template: '#template-comment-dialog',
            data: {
                commentTit: '',
                commentDet: '',
                commentLen: 0,
                errorTip: '评论内容最少5个字',
                hasContent: false,
                isErrorTip: false,
                isReply: false,
                noTip: 'true',
                contentPLH: '输入评论详情',
                isFirst: true,
                commentSelf: '评论'
            },
            events:{
                show: function(){

                },
                hide: function(){
                }
            },
            computed: {
                commentLen: function(){
                    return this.commentDet.length;
                }
            },
            methods: {
                hideDialog: function(){
                    this.hide();
                    this.errorTip = '评论内容最少5个字';
                },
                setCommentTit: function(){
                    if( this.commentTit.length != 0 ){
                        this.isErrorTip = false;
                    }
                },
                setComment: function(){
                    if( this.commentDet.length != 0){
                        this.isErrorTip = false;
                    }
                    if(this.commentDet.length > 4){
                        this.isErrorTip = true;
                    }else if($.trim(this.commentDet) == ''){
                        this.isErrorTip = false;
                    }
                    this.hasContent = true;
                },
                review: function(){
                    var self = this;
                    // if( this.commentTit.length == 0 ){
                    //     this.isErrorTip = true;
                    //     this.errorTip = '请输入评论标题';
                    //     return;
                    // }
                    
                    if( this.commentDet.length == 0){
                        this.isErrorTip = false;
                        this.errorTip = '请输入评论详情';
                        return;
                    }else if(this.commentDet.length < 5){
                        this.isErrorTip = false;
                        this.errorTip = '评论内容最少5个字';
                        return;
                    }else if($.trim(this.commentDet) == ''){
                        this.isErrorTip = false;
                        this.errorTip = '评论内容不能是空格';
                        this.commentDet = '';
                        return;
                    }else{
                        this.isErrorTip = true;
                    }
                    loading.show();
                    commentService.review(bookId, self.commentTit, self.commentDet).then(function(data){
                        switch (data.status){
                            case 0:
                                self.commentTit = '';
                                self.commentDet = '';
                                self.hideDialog();
                                loading.hide();
                                resultTipDialog.show();
                                resultTipDialog.setContent('评论成功', true);
                                setTimeout(function(){
                                    resultTipDialog.hide();
                                    reviewVue.isPrivateReview = true;
                                },2000);
                                reviewVue.privateReviewList.unshift(data.result.review);
                                self.isErrorTip = false;
                                break;
                            case 1:
                                location.href = data.url;
                            break;
                            case -1:
                            break;
                            default:
                                alert('啊哦,出错咯');
                        }
                    });
                },
                blurComment: function(){
                    if( this.commentDet.length == 0){
                        this.hasContent = false;
                    }
                },
                reset: function(){
                    this.commentTit = '';
                    this.commentDet = '';
                }
            }
        });

        var reviewVue = new legionConfigVue({
            el: '#app',
            mixins: [loadingMoreMixin],
            data : {
                isTipShow: false,
                isLoading: false,
                hasNoMore: false,
                flag: false,
                noLoading: haveNextPage || false,
                isAjaxLoaded: false,
                ajaxReviewItems: [],
                isPrivateReview: false,
                privateReviewList: [],
                likeFlag: false
            },
            events: {
                scrollBottom : function(){
                    var self = this;
                    if(this.noLoading){
                        this.hasNoMore = true;
                        return;
                    }
                    this.isLoading = true;
                    if(this.flag) return;
                    this.flag = true;
                    commentService.getCommentList(bookId, ++self.pageNum).then(function(data){

                        if( data.status == 1 ){
                            location.href = data.url;
                        } else if( data.status == 0 ){
                            self.isAjaxLoaded = true;
                            self.isLoading = false;
                            self.flag = false;
                            self.ajaxReviewItems = self.ajaxReviewItems.concat(data.result.reviews.items);
                        } else if( data.status == -1 ){
                            self.isLoading = false;
                            self.hasNoMore = true;
                            self.flag = false;
                        }

                        if( !data.result.reviews.haveNextPage ){
                            self.noLoading = true;
                        }
                    });
                }
            },
            beforeCreate: function(){
                this.pageNum = 1;
            },
            mounted:function(){
                var self = this;
                $(window).on('scroll', function(){
                    // 如果 scrollY == 100, 评论浮窗显示
                    if( window.scrollY >= 300){
                        self.isTipShow = true;
                    } else {
                        self.isTipShow = false;
                    }
                })
            },
            methods: {
                showDialog: function(){
                    if( !isLogIn ){
                        location.href = '/wx/accounts/login?backUrl=/wx/review/'+ bookId +'/list';
                        return;
                    }
                    commentDialog.show();
                },
                getLike: function(reviewId,e){
                    if( this.likeFlag) return;
                    var self = this;
                    var $this = $(e.currentTarget);
                    var $likeCount = $this.find('.likeCount');
                    var $dataTypeLike = $this.hasClass('do');
                    this.likeFlag = true;
                    if($dataTypeLike) return;
                    commentService.likeService(bookId, reviewId).then(function(data){
                        switch (data.status){
                            case 0:
                                if( !$dataTypeLike ){
                                    $this.addClass('do');
                                    $this.data('like', !$dataTypeLike);
                                } else {
                                    $this.removeClass('do');
                                    $this.data('like', !$dataTypeLike);
                                }
                                self.doLike = true;
                                $likeCount.html(data.result.likeCount);

                                break;
                            case 1:
                                location.href = data.url;
                                break;
                            case -1:
                                alert('啊哦,出错了哦');
                                break;
                            default:
                                alert('啊哦,出错了哦');
                        }
                        self.likeFlag = false;
                    });
                }
            }
        })
    }
});