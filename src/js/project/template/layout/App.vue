<template>
    <div id="app" class="wrap">
        <header-view></header-view>
        <sidebar-view></sidebar-view>
        <router-view id="main" class="main"></router-view>
    </div>
</template>

<script>
    import HeaderView from './HeaderView.vue';
    import SidebarView from './SidebarView.vue';
    export default {
        components: {
            HeaderView, SidebarView
        },
        created(){
        }
    }
</script>