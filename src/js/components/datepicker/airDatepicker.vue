<template>
    <input type="text" :date-range="isRange" />
</template>

<script>
    import AirDatepiker from 'air-datepicker';
    import 'air-datepicker/src/js/i18n/datepicker.zh';
    import $ from 'jquery';
    import moment from 'moment';

    const DEFAULTS = {
        language: 'zh',
        dateFormat: 'yyyy-mm-dd',
        autoClose: true,
        maxDate: new Date,
        minDate: new Date('2015-01-01'),
        todayButton: true,
        range: false,
        //自定义配置，日期截止为最小单位的结尾
        endOfMinView: true,
        minView: 'days'
    };

    export default {
        name: 'AirDatePicker',
        props: {
            options: Object
        },
        computed: {
            date(){
                return this.datepicker.date
            },
            selectedDates(){
                return this.datepicker.selectedDates;
            }
        },
        data(){
            this.datepicker = null;
            this.datepickerContainer = null;
            this.opts = {};

            return {
                isRange: false
            }
        },
        beforeDestroy(){
            if(this.datepicker){
                this.datepicker.destroy();
                this.datepicker = null;
            }
        },
        mounted(){
            let events = {
                onSelect: (formattedDate, date, inst) => {
                    this.onChange(formattedDate, date, inst)
                },
                onShow: (inst, animationComplete) => {
                    this.$emit('show', inst, animationComplete)
                },
                onHide: (inst, animationComplete) => {
                    if(this.isRange && this.datepicker.selectedDates.length == 1) {
                        this.clear();
                    }
                    this.$emit('hide', inst, animationComplete)
                },
                onChangeMonth: (month, year) => {
                    this.$emit('change-month', month, year)
                },
                onChangeYear: year => {
                    this.$emit('change-year', year)
                },
                onChangeDecade: decade => {
                    this.$emit('change-decade', decade)
                },
                onChangeView: view => {
                    console.log(view);
                    this.$emit('change-view', view)
                },
                onRenderCell: (date, cellType) => {
                    this.$emit('change-cell', date, cellType)
                }
            };

            let options = Object.assign(events, DEFAULTS, this.options);

            switch(options.minView){
                case 'days':
                    options.dateFormat = 'yyyy-mm-dd';
                    break;
                case 'months':
                    options.dateFormat = 'yyyy-mm';
                    break;
                case 'years':
                    options.dateFormat = 'yyyy';
                    break;
            }

            this.$$el = $(this.$el).datepicker(options);

            this.datepicker = this.$$el.data('datepicker');
            this.datepickerContainer = this.datepicker.$datepicker;

            this.opts = this.datepicker.opts;

            this.isRange = this.opts.range;
        },
        methods: {
            show(){
                return this.datepicker.show();
            },
            hide(){
                return this.datepicker.hide();
            },
            prev(){
                return this.datepicker.prev();
            },
            next(){
                return this.datepicker.next();
            },
            selectDate(date){
                if(this.datepicker){
                    return this.datepicker.selectDate(date);
                }
            },
            removeDate(date){
                return this.datepicker.removeDate(data);
            },
            clear(){
                return this.datepicker.clear();
            },
            update(field, value){
                return this.datepicker.update(field, value)
            },
            onChange(formattedDate, date, inst){
                //统一接口
                if(!this.isRange) {
                    this.$emit('select', formattedDate, [date], inst)
                } else if(this.isRange && date.length == 2) {

                    if(this.opts.endOfMinView) {
                        switch(this.opts.minView) {
                            case 'months':
                                date[1] = moment(date[1]).endOf('month').toDate();
                                break;
                            case 'years':
                                date[1] = moment(date[1]).endOf('year').toDate();
                                break;
                        }
                    }

                    this.$emit('select', formattedDate, date, inst)
                }
            }
        }
    }
</script>