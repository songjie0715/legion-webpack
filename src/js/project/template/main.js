/**
 * Created by Yinxiong on 2016/9/28.
 */


import {polyfill} from 'es6-promise';
polyfill();

import Vue from 'vue';
import router from './router';
import store from './store';
import AppView from './layout/App.vue';
import { sync } from 'vuex-router-sync';

sync(store, router);

const app = new Vue({
	router,
	store,
	...AppView
}).$mount('#app');