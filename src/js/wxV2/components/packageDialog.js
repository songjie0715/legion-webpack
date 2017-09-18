/**
 * Created by janey on 16/6/20.
 */
import Dialog from "components/dialog";

export default new Dialog({
    template: '#template-book-package-dialog',
    events: {
        hide: function(){
            this.callback();
        }
    },
    methods: {
        showDialog: function(func){
            this.show();
            this.$set('callback', func);
        },
        hideDialog: function(){
            this.hide();
        },
        clickDialog:function(){
            this.hide();
            setTimeout(function(){
                location.href = '/wx/i/mycard';
            },500);
        }
    }
});
