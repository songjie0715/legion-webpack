/**
 * Created by Yinxiong on 2016/9/26.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../controllers/HomeView.vue';
import ComponentView from '../controllers/ComponentView.vue';
import SubRouteView from '../controllers/subRoute/SubRouteView.vue';
import SubRoute1View from '../controllers/subRoute/SubRoute1View.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    linkActiveClass: 'nav-link-active',
    routes: [{
        path: '/',
        component: HomeView
    }, {
        path: '/component',
        component: ComponentView
    }, {
        path: '/lazy-view',
        component(resolve){
            require.ensure(['../controllers/LazyView.vue'], function () {
                resolve(require('../controllers/LazyView.vue'));
            })
        }
    }, {
        path: '/sub-routes',
        component: SubRouteView,
        children: [{
            path: 'sub-1',
            component: SubRoute1View
        }, {
            path: 'sub-2',
            component(resolve){
                require.ensure(['../controllers/subRoute/SubRoute2View.vue'], function () {
                    resolve(require('../controllers/subRoute/SubRoute2View.vue'));
                })
            }
        }]
    }]
});

export default router;