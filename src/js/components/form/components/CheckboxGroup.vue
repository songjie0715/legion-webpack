<template>
    <div :class="[feedbackClass]">
        <div v-if="withFilter" class="input-group form-group-filter mb-1">
            <span class="input-group-addon"><input type="checkbox" v-model="isCheckAll"></span>
            <i class="fa fa-remove clear pointer" v-show="search"></i>
            <input type="text" class="form-control form-control" placeholder="输入名称" v-model="search" />
        </div>
        <div class="limit-height-300 list">
            <div class="form-check" v-for="item in filterList" :class="{ disabled: item.disabled }">
                <label class="form-check-label">
                    <input type="checkbox"
                           class="form-check-input"
                           v-model="model"
                           :value="item.value"
                           :field-name="name"
                           :disabled="isDisabled || item.disabled"
                           @change="trigger('change')"
                    />
                    {{item.text}}
                </label>
            </div>
        </div>
        <div class="form-control-feedback" v-for="text in feedback" v-text="text"></div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';

    export default {
        name: getName(COMPONENT.CHECKBOX_GROUP),
        Type: COMPONENT.CHECKBOX_GROUP,
        mixins: [mixin],
        props: {
            value: Array
        },
        computed: {
        	filterList(){
        		let search = this.search.toLowerCase();
        		let result = this.items.filter(o=>o.text.toLowerCase().indexOf(search) > -1);
        		return result;
            }
        },
        data(){
            return {
				search: '',
				isCheckAll: false,
                readyOnMounted: false,
                items: [],
				withFilter: _.get(this.options, 'withFilter', false)
            }
        },
        watch: {
            'options.items'(){
                this.fillOptions();
            },
			isCheckAll(){
            	if(this.isCheckAll){
            		this.model = this.items.map(d=>d.value);
                } else {
            		this.model = [];
                }
            }
        },
        created(){
        	this.model = this.model || [];
            this.fillOptions();
        },
        methods: {
            fillOptions(){
                let items = _.get(this.options, 'items', []);
                if(_.isFunction(items)){
                    items.call(this).then(data=>{
                        this.items = data;
                        this.ready();
                    });
                } else {
                    this.items = items;
                    this.ready();
                }
            }
        }
    }
</script>