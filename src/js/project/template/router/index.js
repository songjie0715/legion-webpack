/**
 * Created by Yinxiong on 2016/9/26.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import {routesForVue} from './routes';
import {NAV_ACTIVE_LINK_CLASS} from '../../../frameworks/basic/const';

Vue.use(VueRouter);

const router = new VueRouter({
	linkActiveClass: NAV_ACTIVE_LINK_CLASS,
	routes: routesForVue
});

export default router;