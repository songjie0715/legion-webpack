<template>
    <ul class="nav">
        <li class="nav-item" v-for="(item, index) in items">
            <a class="nav-link" :class="{disabled: item.disabled, active: index == activeIndex}" v-text="item.text" @click="click(item, index)"></a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'NavTabs',
        props: {
            items: Array,
            init: {
                type: Boolean,
                default: true
            },
            active: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                activeIndex: 0
            }
        },
        created(){
            this.activeIndex = this.active;
        },
        mounted(){
            if(this.init){
                this.click(this.items[this.activeIndex], this.activeIndex);
            }
        },
        methods: {
            click(item, index){
                this.activeIndex = index;
                this.$emit('on-switch', ...arguments);
                this.$emit('switch', ...arguments);
            }
        }
    }
</script>