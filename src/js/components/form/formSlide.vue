<template>
    <div class="form-slide mod" :class="{show: !isHide}">
        <div class="hd">
            <i class="fa fa-angle-right pointer close" @click="hide()"></i>
            <h5 v-html="title"></h5>
        </div>
        <div class="bd">
            <vue-form ref="form" :model="model" :layout="layout"></vue-form>
        </div>
        <div class="ft actions">
            <slot name="form-action"></slot>
            <button @click="submit" class="btn btn-primary">查询</button>
        </div>
    </div>
</template>

<script>
    import vueForm from './form.vue';
    import {FormModel, COMPONENT} from './';
    import {documentClick, noop} from 'helper.js';

    export default {
    	name: 'SlideForm',
        props: {
    		layout: Object,
    		model: FormModel,
            initShow: Boolean,
            handle: HTMLElement,
            hideOnSubmit: {
    			type: Boolean,
                default: true
            },
            title: {
    			type: String,
                default: '配置'
            }
        },
        components: {
			vueForm
        },
        data(){
    		this.offDocumentClick = noop;
    		this.datePickers = [];

    		return {
    			isHide: this.initShow != true
            }
        },
        mounted(){
			this.datePickers = this.model.getFieldByType(COMPONENT.DATE).map(o=>o.datepicker.datepickerContainer)
        },
		beforeDestroy(){
        	this.offDocumentClick();
        },
		methods: {
    		show(){
    			this.isHide = false;

				this.offDocumentClick = documentClick([
					this.$el,
                    this.handle,
                    ...this.datePickers
                ].filter(Boolean), ()=>{
					this.hide();
				})
            },
            hide(){
    			this.isHide = true;
				this.offDocumentClick();
            },
            submit(){
            	let fd = this.model.submit();
            	this.$emit('submit', fd);
            	if(this.hideOnSubmit){
            		this.hide();
                }
            }
        }
    }
</script>