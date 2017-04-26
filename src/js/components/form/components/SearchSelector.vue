<template>
	<div :class="[feedbackClass]" ref="main">
		<!--<input type="file" ref="file" @change="trigger('selectFile',$event)" class="hidden" />-->
		<div class="input-group" :class="{selected: selected}">
			<input type="text" ref="control" class="form-control" readonly :value="model.text" v-if="selected" @focus="selected = false">
			<input v-else ref="control"
				   type="text"
				   v-model="model.text"
				   class="form-control"
				   :class="[inputFeedbackClass]"
				   :field-name="name"
				   :readonly="readonly"
				   :disabled="isDisabled"
				   :placeholder="options.placeholder"
				   @keyup.enter="searchOptions"
			/>
			<span class="input-group-addon"><i class="fa fa-check" v-if="selected"></i><i class="fa fa-list" v-else></i></span>
			<input type="hidden" v-model="model.value">
		</div>
		<div class="dropdown" :class="{show: !selected}" ref="dropdown">
			<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
				<a class="dropdown-item" :class="{highlight: selectedItem == item}" href="javascript:void(0)" v-for="item in items" v-text="item.text" @click="selectItem($event, item)"></a>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.dropdown-menu {
		max-height: 300px;
		overflow: scroll;
	}
</style>
<script type="text/ecmascript-6">
	import {COMPONENT, INPUT_TYPE} from '../const';
	import {getName} from '../utils';
	import _ from 'lodash';
	import mixin from '../mixins/component';

	export default {
		name: getName(COMPONENT.SEARCH_SELECTOR),
		Type: COMPONENT.SEARCH_SELECTOR,
		mixins: [mixin],
		data(){
			return {
				items: [],
				selectedItem: null,
				selected: true
			}
		},
		computed: {
			inputFeedbackClass(){
				return {
					'form-control-success': this.needValidate && this.isValid,
					'form-control-warning': this.needValidate && !this.isValid
				}
			},
		},
		created(){
			this.fillOptions();
			this.selectedItem = _.clone(this.model);
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
			},
			selectItem(e, item){
				const el = e.target||e.srcElement;
				this.selectedItem = item;
				this.model = _.clone(this.selectedItem);
				this.items = [];
				this.selected = true;
			},
			searchOptions(){
				this.trigger('keyup');
			}
		}
	}
</script>