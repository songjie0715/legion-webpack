/**
 * Created by janey on 2017/5/27.
 */
import Vue from "vue";

export default Vue.extend({
    data(){
        return {
            isOpen: false,
            t: 5000
        }
    },
    template: `<div class="lk-mod" v-show="isOpen" v-cloak>
                    <slot></slot>
                </div>`,
    methods: {
        show(callback){
            this.isOpen = true;
            setTimeout(()=>{
                this.isOpen = false;
            }, this.t);

            if(callback) callback();
        }
    }
})