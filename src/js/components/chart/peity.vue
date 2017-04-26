<template>
    <span class="peity-wrap">
        <i ref="peity" v-text="data"></i>
    </span>
</template>

<script>
	import $ from 'jquery';
	import 'peity';

    export default {
    	name: 'PeityChart',
        props: {
    		type: {
    			type: String,
                default: 'pie'
            },
    		data: String,
            options: Object
        },
        watch: {
    		data(){
				this.peity.change();
            }
        },
        mounted(){
    		this.peity = $(this.$refs.peity).peity(this.type, this.options);
        },
        methods: {
        	change(){
				this.peity.change();
            }
        }
    }
</script>