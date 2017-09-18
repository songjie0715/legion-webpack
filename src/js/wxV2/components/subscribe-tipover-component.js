/**
 * Created by janey on 2017/5/27.
 */

import Vue from "vue";
import tipoverComponent from "./tipover-component";

export default Vue.extend({
    data(){
        return {
        }
    },
    components: {
        'tip-over': tipoverComponent
    },
    props: {
        mustHide: Boolean
    },
    watch: {
        mustHide: function (val) {
            if(!val){
                this.hide();
            }
        }
    },
    template: `<tip-over ref="subscribeTipOver">
                    <div slot="content" class="chapterAuto" bookid="6109"><label>自动购买下一章<input type="hidden" name="bookId" value="6109"></label></div>
                </tip-over>`,
    mounted(){

    },
    methods: {
        show(direction){
            this.$refs.subscribeTipOver.show(direction);
        },
        hide(){
            this.$refs.subscribeTipOver.hide();
        }
    }
})