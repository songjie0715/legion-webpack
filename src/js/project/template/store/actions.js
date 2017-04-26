/**
 * Created by Yinxiong on 2016/10/11.
 */

import * as types from './mutation-types';

export const storeUser = ({commit}, user)=>{
	commit(types.STORE_USER, user)
};