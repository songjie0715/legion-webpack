<template>
    <div :class="[feedbackClass]">
        <air-datepicker
            ref="datepicker"
            class="form-control"
            :class="[inputFeedbackClass]"
            :field-name="name"
            :disabled="isDisabled"
            :options="datepickerOptions"
            :placeholder="placeholder"
            @select="valueUpdate"
        >
        </air-datepicker>
        <div class="form-control-feedback" v-for="text in feedback" v-text="text"></div>
    </div>
</template>

<script>
    import {COMPONENT} from '../const';
    import {getName} from '../utils';
    import mixin from '../mixins/component';
    import airDatepicker from '../../datepicker/airDatepicker.vue';
    import _ from 'lodash';
    import {thisDay, formatDate, delay} from 'helper.js';
    import moment from 'moment';

    export default {
        name: getName(COMPONENT.DATE),
        Type: COMPONENT.DATE,
        mixins: [mixin],
        data(){
            this.isRange = false;
        	return {
        		model: '',
                placeholder: _.get(this, 'options.placeholder', '选择日期'),
				datepickerOptions:  _.get(this, 'options.datepicker')
            }
        },
        components: {
            airDatepicker
        },
        mounted(){
        	this.datepicker = this.$refs.datepicker;
        	this.isRange = this.datepicker.datepicker.opts.range;
        },
        methods: {
            setValue(value){
                if(!value) return;

                let result;
                if(_.isString(value)){
                    result = moment(value).toDate();
                } else if(_.isArray(value)) {
                    result = value.map(d=>moment(d).toDate());
                }
                this.datepicker.selectDate(result);
                this.model = value;
            },
			valueUpdate(formattedDate, date, inst){
            	this.model = date.map(d=>formatDate(d));
            	this.trigger('valueUpdate', formattedDate)
            },
            validate(){
			    if(!this.model && !this.hidden){
                    delay(()=>{
                        if(!this.isFirstValidate) {
                            this.datepicker.show();
                        }
                    });
			        return false;
                }
                if(this.isFirstValidate) {
                    this.isFirstValidate = false;
                }
                return this._validate();
            }
        }
    }
</script>