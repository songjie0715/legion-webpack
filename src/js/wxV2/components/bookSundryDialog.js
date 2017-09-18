/**
 * Created by janey on 16/6/20.
 */

import Dialog from "./dialog";

export default new Dialog({
    template: '#template-book-sundry-dialog',
    methods: {
        hideDialog: function(e){
            this.hide();
        },
        stopStuff: function(e){
            e.stopPropagation();
        }
    }
});