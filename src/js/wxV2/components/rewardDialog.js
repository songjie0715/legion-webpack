/**
 * Created by janey on 16/6/20.
 */

import Dialog from "./dialog";
import BookDetailService from "../service/bookDetailService";
import loading from "./loading";
import overlay from "./overlay";
import resultTipDialog from "./resultTipDialog";
import core from "../core/core";


var rewardDialog = new Dialog({
    template: '#template-reward-dialog',
    data: {
        quota: 0,
        balancePrice: '',
        addReward: false,
        rewardItem: [],
        rewardVoid: false,
        rewardText: '确认打赏',
        changeTextBg: '#ffdc2e'
    },
    events: {
        show: function(){
            var self = this;
            switch (this.quota){
                case 100:
                    this.changeTextBg = '#ffdc2e';
                    break;
                case 588:
                    this.changeTextBg = '#ffb92e';
                    break;
                case 1888:
                    this.changeTextBg = '#ff962e';
                    break;
                case 5888:
                    this.changeTextBg = '#ff742e';
                    break;
                case 10000:
                    this.changeTextBg = '#ff4c2f';
                    break;
            }
            this.$emit('changeRewardStatus');
            if( this.balancePrice !== undefined && this.balancePrice !== '' ) return;
            BookDetailService.getBalance(bookId).then(function(data){
                if(data.status == 0){
                    self.balancePrice = data.result.balances;
                    self.$emit('changeRewardStatus');
                }
            });
        },
        changeRewardStatus: function(){
            if( this.quota > this.balancePrice ){
                this.rewardVoid = true;
                this.rewardText = '余额不足';
            } else{
                this.rewardVoid = false;
                this.rewardText = '确认打赏';
            }
        }
    },
    methods: {
        hideDialog: function(){
            this.hide();
        },
        reward: function(){
            var self = this;

            loading.show();
            overlay.isZindex = true;
            BookDetailService.reward(self.bookId, self.quota, self.chapterId).then(function(data){
                loading.hide();
                self.hideDialog();
                overlay.isZindex = false;
                switch (data.status){
                    case 0:
                        resultTipDialog.show();
                        resultTipDialog.setContent("恭喜,打赏成功!", true);
                        setTimeout(function(){
                            resultTipDialog.hide();
                            self.$emit('test',data.result.reward);
                        },500);
                        break;
                    case 1:
                        location.href = data.url;
                        break;
                    case -1:
                        alert(data.valid.msg);
                        break;
                    default:
                        alert('啊哦,出错了');
                }
            });
        }
    }
});

export default function(bookId, rewardNum, chapterId){
    rewardDialog.bookId = bookId;
    rewardDialog.quota = rewardNum;
    rewardDialog.chapterId = chapterId;

    return rewardDialog;
};
