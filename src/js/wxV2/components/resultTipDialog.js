/**
 * Created by janey on 16/6/20.
 */

import Dialog from "./dialog";

export default new Dialog({
    template: '#template-result-tip-dialog',
    data: {
        content: '',
        isSuccess: true
    },
    created: function(){

    },
    methods: {
        setContent: function(content, status){
            this.content = content;
            this.isSuccess = status; // 成功为true, 失败为false
        }
    }

});