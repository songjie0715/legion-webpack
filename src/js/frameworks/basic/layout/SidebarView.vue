<template>
    <aside class="primary-sidebar">
        <nav ref="sidebar">
            <ul class="nav flex-column" ref="navList">
                <template v-for="item in routes">
                    <li v-if="item.category" class="nav-item nav-category" v-text="item.text"></li>

                    <li v-if="item.group" class="nav-item nav-group">
                        <a class="nav-link" v-if="item.group"><i v-if="item.icon" :class="['fa-'+item.icon]" class="fa nav-icon"></i>{{item.text}}</a>
                        <ul class="nav-sub-list">
                            <li v-for="subItem in item.list">
                                <router-link :to="subItem.linkPath || subItem.path" :exact="subItem.exact" class="nav-link" v-text="subItem.text"></router-link>
                            </li>
                        </ul>
                    </li>

                    <li v-if="!item.group && !item.category" class="nav-item">
                        <router-link :to="item.linkPath || item.path" :exact="item.exact" class="nav-link">
                            <i v-if="item.icon" :class="['fa-'+item.icon]" class="fa nav-icon"></i>{{item.text}}
                        </router-link>
                    </li>

                </template>
            </ul>
        </nav>
    </aside>
</template>

<script>
    import sidebarMixin from '../mixins/sidebar';

    export default {
        name: 'SidebarView',
        props: {
            routes: Array
        },
        mixins: [sidebarMixin]
    }
</script>