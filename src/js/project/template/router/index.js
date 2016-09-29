/**
 * Created by Yinxiong on 2016/9/26.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../controllers/HomeView.vue';
import ComponentView from '../controllers/ComponentView.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	linkActiveClass: 'nav-link-active',
	routes: [
	    { path: '/', component: HomeView },
	    { path: '/component', component: ComponentView },
    ]
});

export default router;