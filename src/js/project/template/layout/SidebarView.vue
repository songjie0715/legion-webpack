<template>
    <aside class="primary-sidebar" id="primary-sidebar">
        <div class="logo">
            Logo
        </div>
        <nav>
            <ul class="nav-list" ref="navList">
                <li class="nav-category">Category</li>
                <li class="nav-item">
                    <router-link to="/" exact>
                        <i class="fa fa-home nav-icon"></i>Home Page
                    </router-link>
                </li>
                <li class="nav-item nav-group">
                    <a href="javascript:;"><i class="fa fa-user nav-icon"></i>Nav group</a>
                    <ul class="nav-sub-list">
                        <li class="nav-item">
                            <router-link to="/lazy-view">Lazy view</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/sub-routes">Sub routes</router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-category">Component</li>
                <li class="nav-item">
                    <router-link to="/component">
                       <i class="fa fa-area-chart nav-icon"></i> Component
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>


<script>
    import $ from 'jquery';
    import {delay} from '../../../utils';
    const ACTIVE_LINK_CLASS = 'nav-link-active';
    const ACTIVE_ITEM_CLASS = 'nav-active';

    export default {
        mounted(){
            this.openedMenu = [];

            this.$nav = $(this.$refs.navList);
            this.timer = null;

            this.$nav.on('click', 'a', function(){
                const target = $(this);
                const subList = target.next();
                if(subList.length){
                    const li = target.parent();
                    if(li.hasClass(ACTIVE_ITEM_CLASS)){
                        subList.stop().slideUp('fast', ()=>{
                            li.removeClass(ACTIVE_ITEM_CLASS);
                        })
                    } else {
                        li.addClass(ACTIVE_ITEM_CLASS);
                        subList.stop().slideDown('fast');
                    }
                }
            });

            this.change();
        },
        watch: {
            '$route': 'change'
        },
        methods: {
            change(){
                clearTimeout(this.timer);
                this.timer = delay(()=>{
                    this.activeItem();
                }, 150);
            },
            activeItem(){
                let openedMenu = [];
                let activeItem = this.$nav.find('.'+ACTIVE_LINK_CLASS);
                let parent = activeItem.parent();
                parent.addClass(ACTIVE_ITEM_CLASS);

                openedMenu.push(parent[0]);

                while(true){
                    parent = parent.parent().parent();
                    parent.find(' > .nav-sub-list').slideDown('fast');
                    if(parent.is('li')){
                        openedMenu.push(parent.addClass(ACTIVE_ITEM_CLASS)[0]);
                        parent.parent().slideDown();
                    } else {
                        break;
                    }
                }

                this.openedMenu.forEach(o=>{
                    if(openedMenu.indexOf(o) == -1){
                        let x = $(o);
                        x.find('.nav-sub-list').hide();
                        x.removeClass(ACTIVE_ITEM_CLASS);
                    }
                });
                this.openedMenu = openedMenu;
            }
        }
    }
</script>