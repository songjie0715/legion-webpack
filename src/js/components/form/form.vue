<template>
    <div class="form">
        <vue-form-group
            :filter-name="item.name"
            v-for="item in model.fields"
            ref="items"
            :label="item.label"
            :options="groupLayout"
            :type="item.type"
            :hidden="item.hidden"
            :class="[getClassName(item.type)]"
            :hint="item.hint"
            :container="self"
        >
            <component
                slot="control"
                ref="fields"
                :is="reference[item.type]"
                :default-value="item.defaultValue"
                :value="item.value"
                :ignore="item.ignore"
                :assists="item.assists"
                :name="item.name"
                :static="item.static"
                :readonly="item.readonly"
                :disabled="item.disabled"
                :validate-immediately="item.validateImmediately || validateImmediately"
                :validator="item.validator"
                :rules="item.rules"
                :hidden="item.hidden"
                :options="item.options"
                :class="[item.class, {disabled: item.disabled}, 'form-item']"
                :container="self"
                :events="item.events"
                @ready="readyCount+=1"
            ></component>
        </vue-form-group>

    </div>
</template>

<script>
    import {components, reference} from './components';
    import vueFormGroup from './layout/Group.vue';
    import {COMPONENT} from './const';
    import Model from './Model';
    import helper from './mixins/helper';
    import _ from 'lodash';

    const SHARE_EVENTS = ['created', 'mounted', 'destroyed', 'submit', 'validate', 'ready'];
    const SHARE_METHODS = [
    	'submit',
        'reset',
        'restore',
        'validate',
        'setFormData',
        'getFormData',
        'setValue',
        'getValue',
        'getFieldItem',
        'getFieldByType',
        'getField',
        'setField',
        'hiddenField',
        'readonlyField',
        'disableField'
    ];
    const NOT_MODEL_TYPE = [COMPONENT.BUTTON_GROUP, COMPONENT.BUTTON, COMPONENT.DIVIDER];

    export default {
        name: 'FormComponent',
        mixins: [helper],
        components: {
            vueFormGroup,
            ...components
        },
        props: {
            model: Model,
            layout: Object,
            values: Object,
            //整体验证器
            validator: Object,
            //是否初始化就验证
            validateImmediately: Boolean
        },
        watch: {
            readyCount(){
                if(this.readyCount == this.fieldsLength){
                    this.isReady = true;
                    this.$emit('ready');
                }
            }
        },
        data(){
            this.triggerQueue = [];
            this.fieldsLength = this.model.fields.length;

            return {
                COMPONENT,
                reference,
                readyCount: 0,
                isReady: false,
                isValid: true,
                self: this,
                groupLayout: Object.assign({
                    grid: false,
                    labelSize: 4,
                    controlSize: -1
                }, this.layout)
            }
        },
        created(){
            this.$models = {};
            this.$modelList = [];
            this.shareMethods = SHARE_METHODS;
            this.shareEvents = SHARE_EVENTS;

            this.fd = {};

            this.model.mixin(this);

            this.$emit('created');
        },
        mounted(){
            this.$modelList = _.filter(this.$refs.fields, o=> {
                let isModel = NOT_MODEL_TYPE.indexOf(o.constructor.options.Type) == -1;
                if (isModel) {
                    this.$models[o.name] = o;
                }
                return isModel
            });

            this.$once('ready', ()=>{

                if (_.isObject(this.values)) {
                    this.setFormData(this.values);
                } else if (_.isObject(this.model.values)) {
                    this.setFormData(this.model.values);
                }

                if(this.validateImmediately){
                    this.validate();
                }

                this.model._isMounted = true;
                this.triggerQueue.map(fn=>fn());

				this.$emit('mounted', this.getFormData());
            });
        },
        destroyed(){
            this.$emit('destroyed');
        },
        methods: {
            submit(){
                if( this.validate() ){
                    this.$emit('submit', this.getFormData());
                }
                return this.fd;
            },
            reset(){
                this.$modelList.forEach(o=>o.reset());
                return this;
            },
            restore(){
                this.$modelList.forEach(o=>o.restore());
                return this;
            },
            validate() {
                let errorCount = 0;

                this.$modelList.forEach(o=> {
                    if (!o.ignore && !o.validate()) {
                        errorCount++;
                    }
                });

                return errorCount == 0 && this.model.interceptor.validate.call(this, this.getFormData());
            },
            setFormData(props) {
                _.forEach(this.model.interceptor.setForm.call(this, props), (value, key)=> {
                    if (key in this.$models) {
                        this.$models[key].setValue(value);
                    }
                });
                return this;
            },
            getFormData() {
                let prop = {};
                _.each(this.$refs.fields, o=> {
                    if (NOT_MODEL_TYPE.indexOf(o.constructor.options.Type) == -1 && !o.ignore) {
                        prop[o.name] = o.getValue();
                    }
                });
                this.fd = this.model.interceptor.getForm.call(this, prop);
                
                return this.fd;
            },
            getFieldByType(type){
            	return this.$refs.fields.filter(o=>o.$options.Type == type);
            },
            getField(name){
                return this.$refs.fields.find(o=>o.name == name);
            },
            getFieldItem(name){
                return this.model.fields.find(o=>o.name == name);
            },
            getFieldItemIndex(name){
                return this.model.fields.findIndex(o=>o.name == name);
            },
            setValue(name, value){
                let component = this.getField(name);
                if(component){
                    component.setValue(value);
                }
                return this;
            },
            getValue(name){
				let component = this.getField(name);
				if(component){
					return component.getValue();
				}
            },
            getClassName(type){
                if(!type){
                    return '';
                }

                let name = reference[type].replace(/([A-Z])([^A-Z]+)/g, function ($1, $2, $3) {
                    return $2.toLowerCase() + $3 + '-';
                });
                name = name.substr(0, name.length - 1);

                return name;
            },
            setField(name, key, value){
                let field = this.getFieldItem(name);

                if(field){
                	field[key] = value;
                }
            },
            hiddenField(name, isHidden){
                this.setField(name, 'hidden', isHidden);
            },
            disableField(name, isDisabled){
                this.setField(name, 'disabled', isDisabled);
            },
            readonlyField(name, isReadonly){
                this.setField(name, 'readonly', isReadonly);
            },
            requireTrigger(fn){
                if(this.isReady){
                    fn();
                } else {
                    this.triggerQueue.push(fn)
                }
            }
        }
    }
</script>