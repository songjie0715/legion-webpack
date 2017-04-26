<template>
    <div :class="[feedbackClass]" ref="main">
        <div class="input-group select-box">
			<span class="hidden value" v-text="model.value"></span>
			<span ref="control"
				   v-text="model.text"
				   class="appearance input form-control"
				   :class="[inputFeedbackClass]"
				   :field-name="name"
				   @click="open = !open"
				   ></span>
			<div class="select appearance"><i class="fa" :class="[open?'fa-caret-up':'fa-caret-down']"></i></div>
        </div>
		<div class="dropdown" :class="{show: open}" ref="dropdown">
			<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
				<input type="text" class="form-control inSearch" @keyup="filterOptions" v-model="input">
				<a class="dropdown-item" :class="{highlight: selectedItem == item}" href="javascript:void(0)" v-for="item in filteredItems" v-text="item.text" @click="selectItem($event, item)"></a>
			</div>
		</div>
    </div>
</template>
<style scoped>
	.dropdown-menu {
		max-height: 300px;
		overflow: scroll;
		width: 100%;
	}

	.select-box .appearance{
		cursor: pointer;
	}

	.input.appearance {
		height: 35px;
	}

	.select.appearance {
		position: absolute;
		right: 0;
		width: 20px;
		line-height: 35px;
		/*font-size: 20px;*/
		z-index: 10;
	}

	.inSearch {
		border-radius: 0;
		height: 30px;
	}
</style>
<script type="text/ecmascript-6">
	import {COMPONENT, INPUT_TYPE} from '../const';
	import {getName} from '../utils';
	import _ from 'lodash';
	import mixin from '../mixins/component';

	export default {
		name: getName(COMPONENT.SEARCH_SELECTOR2),
		Type: COMPONENT.SEARCH_SELECTOR2,
		mixins: [mixin],
		data(){
			return {
				input: '',
				items: [],
				filteredItems: [],
				selectedItem: null,
				selected: true,
				open: false
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

			this.filterOptions = _.debounce(this.filterOptions, 300);
		},
		methods: {
			fillOptions(){
				let items = _.get(this.options, 'items', []);
				if(_.isFunction(items)){
					items.call(this).then(data=>{
						this.filteredItems = this.items = data;
						this.setDefaultValue();
						this.ready();
					});
				} else {
					this.filteredItems = this.items = items;
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
			focusInput(){
				this.open = true;
			},
			selectItem(e, item){
				const el = e.target||e.srcElement;
				this.selectedItem = item;
				this.model = _.clone(this.selectedItem);
				this.input = '';
				this.open = false;
			},
			filterOptions(){
				this.filteredItems = _.filter(this.items, value=>value.text.indexOf(this.input) != -1);
			}
		}
	}
</script>