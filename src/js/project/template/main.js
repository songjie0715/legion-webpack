/**
 * Created by Yinxiong on 2016/9/28.
 */


import 'babel-polyfill';
import Vue from 'vue';
import VueAsyncData from 'vue-async-data';
import router from './router';
import store from './store';
import AppView from '../../frameworks/basic';
import {routesForNav} from './router/routes';
import { sync } from 'vuex-router-sync';

Vue.use(VueAsyncData);

sync(store, router);

const app = new Vue({
    propsData: {
        routes: routesForNav
    },
	router,
	store,
	...AppView
}).$mount('#app');