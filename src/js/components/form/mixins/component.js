/**
 * Created by Yinxiong on 2016/10/12.
 */

import _ from 'lodash';
import Vue from 'vue';
import {validator as CommonValidator} from 'helper.js';

export default {
	props: {
		container: Vue,
		name: {
			type: String,
			required: true
		},
		//初始值,会在restore时回归
		value: [Object, String, Number, Array, Boolean, Function],
		//默认值，当调用reset时赋值
		defaultValue: [Object, String, Number, Array, Boolean, Function],
		hint: String,
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		hidden: {
			type: Boolean,
			default: false
		},
		//辅助数据，FormData中存在
		assist: {
			type: Boolean,
			default: false
		},
		//静态数据，不会重置
		static: {
			type: Boolean,
			default: false
		},
		//组件配置
		options: {
			type: Object,
			default(){
				return {}
			}
		},
		//组件事件
		events: Object,
		//忽略数据，FormData中不存在
		ignore: {
			type: Boolean,
			default: false
		},
		rules: Object,
		//立即验证
		validateImmediately: Boolean,
		//外部单独验证
		validator: Object
	},
	computed: {
		inputFeedbackClass(){
			return {
				'form-control-success': this.needValidate && this.isValid,
				'form-control-warning': this.needValidate && !this.isValid
			}
		},
		feedbackClass(){
			return {
				'': this.needValidate && this.isValid,
				'has-warning': this.needValidate && !this.isValid
			}
		}
	},
	watch: {
		value(){
			this.model = this.value;
        },
        isReady(){
			if (this.isReady) {
				this.$emit('ready');
				this.trigger('ready');
			}
		}
	},
	data(){
	    this.isFirstValidate = true;

		return {
		    readyOnMounted: true,
		    isReady: false,
			isHidden: this.hidden,
			isReadonly: this.readonly,
			isDisabled: this.disabled,
			model: this.value !== undefined ? this.value : this.defaultValue || null,
            isValid: true,
			feedback: [],
			needValidate: !_.isEmpty(this.rules),
			myValidator: {}
		}
	},
	created(){
		_.forEach(this.events, (fn, key)=>{
			this.$on('f'+key, fn);
		});

        let value = _.get(this, 'value');
        if(value !== undefined){
            if(_.isFunction(value)){
                value.call(this).then(data=>{
                    this.model = data;
                });
            }
        }
	},
	mounted(){
		this.$control = this.$refs.control;
		if(this.readyOnMounted){
            this.ready();
        }
	},
	methods: {
	    ready(){
	        this.isReady = true;
        },
		getValue() {
			if(_.isString(this.model)){
				return this.model.trim();
			}
			return this.model;
		},
		setValue(value) {
			this.model = value;
			return this;
		},
		//更新实例数据
		update(name, value){
			if(name in this){
				this[name] = value;
				this.updateAfter(name, value);
			}
		},
		//组件自己实现之后的操作
		updateAfter(name, value){},
		trigger(type, targetValue=null) {
            this.container.requireTrigger(()=>{
                this._trigger(type, targetValue)
            });
		},
        _trigger(type, ...rest){
            this.validate();
            this.$emit('f'+type, this.model, ...rest);
        },
        _validate(){
            let errorCount = 0;
            if (this.needValidate) {
                let feedbacks = [];
                let validator = _.get(this, 'validator', this.myValidator);
                _.each(this.rules, (condition, type)=>{
                    if (type in validator) {
                        if (!validator[type](condition)) {
                            errorCount++;
                        }
                    } else {
                        let rule = CommonValidator[type];
                        if (rule && !rule.validate(this.model, condition)) {
                            feedbacks.push(rule.message(condition, this.value));
                            errorCount++;
                        }
                    }
                });
                this.feedback = feedbacks;
            }
            return this.isValid = errorCount == 0;
        },
        validate(){
			return this._validate();
        },
		restore(){
			this.model = this.value !== undefined ? this.value : this.defaultValue || this.getEmptyValue();
		},
		reset(){
			if(this.defaultValue){
				this.model = this.defaultValue;
			} else if(!this.static){
				this.model = this.getEmptyValue();
			}
		},
		getEmptyValue(){
			if(_.isString(this.value)){
				return '';
			}

			if(_.isObject(this.value)){
				return {};
			}

			if(_.isNumber(this.value)){
				return -1;
			}

			if(_.isArray(this.value)){
				return [];
			}

			if(_.isBoolean(this.value)){
				return false;
			}
		},
		focus(){
			if(this.$control){
				this.$control.focus();
			}
		},
		blur(){
			if(this.$control){
				this.$control.blur();
			}
		}
	}
}