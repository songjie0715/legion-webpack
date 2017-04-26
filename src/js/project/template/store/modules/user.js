/**
 * Created by Yinxiong on 2016/10/11.
 */

import _ from 'lodash';
import {STORE_USER, ADD_PANEL, REMOVE_PANEL} from '../mutation-types';

const state = {
	user: {}
};

const mutations = {
	[STORE_USER](state, user){
		state.user = user;
	}
};

export default {
	state,
	mutations
}