<template>
    <div class="loading-cover" :class="{hide: isHide, vanish: isVanish}">
        <div class="loading-cover-inner">
            <div class="loading-cover-bar rotate-forever" :class="{invisible: status == REQUEST_STATUS.REJECTED}"></div>
            <div class="loading-cover-text" v-html="text"></div>
        </div>
    </div>
</template>

<script>
    import {REQUEST_STATUS} from '../const';
    import {noop} from 'helper.js';
    import $ from 'jquery';

    export default {
    	name: 'LoadingConver',
        props: {
    		initShow: Boolean,
            status: Number,
    		loadingText: {
    			type: String,
                default: '加载中..'
            },
            errorText: {
    			type: String,
                default: '操作失败'
            },
            successText: {
				type: String,
				default: '操作成功'
            }
        },
        computed: {
			REQUEST_STATUS(){
				return REQUEST_STATUS
            },
    		text(){
    			switch(this.status){
                    case REQUEST_STATUS.PENDING:
                    	return this.loadingText;
                    case REQUEST_STATUS.REJECTED:
                    	return this.errorText;
                    case REQUEST_STATUS.RESOLVED:
                    	return this.successText;
                }
                return this.loadingText;
            }
        },
        watch: {
    		status(){
				switch(this.status){
					case REQUEST_STATUS.PENDING:
						this.show();
						break;
					case REQUEST_STATUS.REJECTED:

						break;
					case REQUEST_STATUS.RESOLVED:
						this.hide();
						break;
				}
            }
        },
        data(){
    	    this.offHide = noop;
    		return {
				isHide: this.initShow != true,
                isVanish: this.initShow != true
            }
        },
        mounted(){
            this.$$el = $(this.$el);
        },
        methods: {
    		show(){
                this.offHide();
    			this.isHide = false;
                this.isVanish = false;
            },
            hide(){
                this.offHide = this.onTransitionEnd(e=>{
                    this.isVanish = true;
                    this.offHide();
                });
    			this.isHide = true;
            },
            onTransitionEnd(fn){
                this.$el.addEventListener('transitionend', fn);
                return ()=>{
                    this.$el.removeEventListener('transitionend', fn)
                }
            }
        }
    }
</script>