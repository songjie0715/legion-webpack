/**
 * Created by janey on 2017/5/27.
 */

<template>
    <tip-over ref="subscribeTipOver">
        <div slot="content" class="chapterAuto" :class=" isAutoFeed ? 'on' : '' "><label @touchend="autoBuy()">自动购买下一章<input type="hidden" name="bookId" value="6109"></label></div>
    </tip-over>
</template>

<script>
    import Vue from "vue";
    import tipoverComponent from "./tipover-component.vue";

    export default Vue.extend({
        data(){
            return {
                isAutoFeed: false
            }
        },
        components: {
            'tip-over': tipoverComponent
        },
        props: {
            detail: Object
        },
        watch: {
            detail: {
                handler: function (val) {
                    if(!val.mustHide){
                        this.hide();
                    }
                    if( val.autofeed ){
                        this.isAutoFeed = true;
                    }
                },
                deep: true
            }
        },
        template: ``,
        mounted(){

        },
        methods: {
            show(direction){
                this.$refs.subscribeTipOver.show(direction);
            },
            hide(){
                this.$refs.subscribeTipOver.hide();
            },
            autoBuy(){

                $.ajax({
                    type:'POST',
                    url : '/ajax/i/autofeed',
                    data :  {"bookId" : bookid,"backUrl":'/book/' + bookid + '/' + chapterid},
                    dataType : 'json'
                }).then(function (result) {
                    if(result.status == 1){
                        location.href = result.url;
                        return;
                    }
                    if(result.status == 0){
                        this.isAutoFeed = !this.isAutoFeed;
                    }
                });
            }
        }
    })
</script>

