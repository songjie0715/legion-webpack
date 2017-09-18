/**
 * Created by janey on 16/6/20.
 */

define([
'components/dialog',
'service/accountService',
'components/resultTipDialog',
], function(Dialog, feedbackService,resultTipDialog){
    return new Dialog({
        template: '#template-feedback-dialog',
        data: {
            feedbackTit: {},
            feedbackContent: ''
        },
        beforeCreate: function(){
            this.submitStatus = false;
        },
        methods: {
            hideDialog: function(){
                this.hide();
            },
            submitFeedback: function(){
                if(this.submitStatus) return;
                this.submitStatus = true;
                var param = {}, self = this;
                param.type = this.feedbackTit.type;
                param.content = this.feedbackContent;
                feedbackService.postFeedback(param).then(function(data){
                    switch (data.status){
                        case 0:
                            $(self.$el).hide();
                            resultTipDialog.show();
                            resultTipDialog.setContent("提交成功", true);
                            self.submitStatus = false;
                            setTimeout(function(){
                                location.reload();
                            }, 1000);

                            break;
                        case 1:
                            location.href = data.url;
                            break;
                        case -1:
                            $(self.$el).hide();
                            resultTipDialog.show();
                            resultTipDialog.setContent("抱歉,提交失败,请重新提交您的问题!", false);
                            setTimeout(function(){
                                resultTipDialog.hide();
                                self.show();
                                $(self.$el).show();
                            }, 1000);
                            break;
                        default:
                            alert('抱歉，服务器好像出了点小问题~~');
                    }
                });
            }
        }
    });
});