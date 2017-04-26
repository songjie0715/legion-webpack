<template>
    <input type="text" readonly :mode="mode" />
</template>

<script>
    import {thisDay} from 'helper.js';
	import Flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.min.css';
	import 'flatpickr/dist/themes/confetti.css';


	Flatpickr.localize({
		weekdays: {
			shorthand: ["日", "一", "二", "三", "四", "五", "六"],
			longhand: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
		},
		months: {
			shorthand: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			longhand: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
		},
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		firstDayOfWeek: 0,
		ordinal: function ordinal(nth) {
			let s = nth % 100;
			if (s > 3 && s < 21) return "th";
			switch (s % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		},
		weekAbbreviation: "Wk",
		scrollTitle: "Scroll to increment",
		toggleTitle: "Click to toggle"
	});

	export default {
		name: 'Flatpickr',
        props: {
            options: {
				type: Object,
                default(){
					return {}
                }
            }
        },
        data(){
			return {
				mode: 'single'
            }
        },
        beforeDestroy(){
			this.flatpickr && this.flatpickr.destroy();
        },
        mounted(){

			this.flatpickr = new Flatpickr(this.$el, {
                ...this.options,
                onReady: (...rest)=>{
					this.$emit('on-ready', ...rest)
				},
                onOpen: (selectedDates, dateStr, instance)=>{
					this.$emit('on-open', selectedDates, dateStr, instance)
                },
				onChange: (selectedDates, dateStr, instance)=>{
					this.$emit('on-change', selectedDates, dateStr, instance)
				},
				onClose: (selectedDates, dateStr, instance)=>{
					this.$emit('on-close', selectedDates, dateStr, instance)
				},
				onValueUpdate: (selectedDates, dateStr, instance)=>{
					this.$emit('on-value-update', selectedDates, dateStr, instance)
				}
			});

			this.mode = this.flatpickr.instanceConfig.mode;
        },
        methods: {
            open(){
                this.flatpickr.open();
                return this;
            },
			close(){
				this.flatpickr.close();
				return this;
			},
			setDate(value){
				this.flatpickr.setDate(value);
				return this;
            }
        }
    }
</script>