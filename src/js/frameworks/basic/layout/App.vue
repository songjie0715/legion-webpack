<template>
    <div id="app" class="app wrap" :class="responseClass">
        <header-view @toggle-nav="toggleNav"></header-view>
        <sidebar-view :routes="routes"></sidebar-view>
        <router-view id="main" class="main"></router-view>
    </div>
</template>

<script>
    import HeaderView from './HeaderView.vue';
    import SidebarView from './SidebarView.vue';
    import {lazyResize, delay} from 'helper.js';
    import response from '../mixins/response';

    export default {
        name: 'AppView',
        components: {
            HeaderView,
            SidebarView
        },
        mixins: [response],
        props: {
            routes: Array
        },
        created(){
            this.timer = null;
        }
    }
</script>