/**
 * Created by Yinxiong on 2016/9/26.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import * as getters from './getters';
import * as actions from './actions';
import createLogger from 'vuex/dist/logger';


const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
	getters,
	actions,
	modules: {
		user
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
});

export default store;