<template>
    <div>
        <div class="input-group">
            <span class="input-group-addon" v-for="item in addon.left" v-text="item"></span>
            <select :field-value="model" v-model="model" ref="control" :field-name="name" class="form-control" @change="trigger('change')">
                <option value="emptyValue" v-text="emptyText" v-if="!noEmpty"></option>
                <option v-for="item in items" v-text="item.text" :value="item.value"></option>
            </select>
            <span class="input-group-addon" v-for="item in addon.right" v-text="item"></span>
        </div>
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';
    import _ from 'lodash';
    
    export default {
        name: getName(COMPONENT.SELECT),
        Type: COMPONENT.SELECT,
        mixins: [mixin],
        data(){
            return {
                readyOnMounted: false,
                items: [],
				addon: _.get(this.options, 'addon', {}),
                noEmpty: _.get(this.options, 'noEmpty', true),
                emptyText: _.get(this.options, 'emptyText', 'Please select'),
                emptyValue: _.get(this.options, 'emptyValue', ''),
                includeValues: _.get(this.options, 'includeValues', [])
            }
        },
        computed: {
            filterItems(){
                if(!this.includeValues.length){
                    return this.items;
                }
                return this.items.filter(d=>{
                    return this.includeValues.indexOf(d.value) > -1
                })
            }
        },
        created(){
            this.fillOptions();
        },
        methods: {
            fillOptions(){
                let items = _.get(this.options, 'items', []);
                if(_.isFunction(items)){
                    items.call(this).then(data=>{
                         this.items = data;
                         this.setDefaultValue();
                         this.ready();
                    });
                } else {
                    this.items = items;
                    this.setDefaultValue();
                    this.ready();
                }
            },
            setDefaultValue(){
                if(this.noEmpty && this.value === undefined && this.items.length){
                	//setFormData调用组件的setValue，很可能会先于这里执行，导致赋值错误
                    if(!this.items.find(o=>o.value == this.model)) {
                    	this.model = this.items[0].value;
                        this.trigger('change');
                    }
                }
            },
            updateAfter(name){
                if(name == 'items'){
                    this.setDefaultValue();
                }
            }
        }
    }
</script>