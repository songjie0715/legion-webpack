/**
 * Created by janey on 16/6/19.
 */

import Vue from "vue";

export default new Vue({
    template: '<div class="loading" :class="{hidden: !isShow}"></div>',
    data: {
        isShow: false
    },
    created: function(){
        this.$mount();
        document.querySelector('body').appendChild(this.$el);
        // this.$mount().$appendTo('body');
    },
    methods: {
        show: function(){
            this.isShow = true;
        },
        hide: function(){
            this.isShow = false;
        }
    }
});