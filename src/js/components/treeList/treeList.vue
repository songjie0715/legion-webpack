<template>
    <nav>
        <ul class="tree-list">
            <vue-item
                v-for="item in items"
                :model="item">
            </vue-item>
        </ul>
    </nav>
</template>

<script>
    import $ from 'jquery';
    import vueItem from './item.vue';

    export default {
        name: 'TreeList',
        props: {
            items: Array
        },
        components: {
            vueItem
        }
    }
</script>