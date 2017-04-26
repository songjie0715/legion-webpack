/**
 * Created by Yinxiong on 2016/10/11.
 */

import Vue from 'vue';

Vue.directive('focus', {
	inserted(el){
		el.focus();
	}
});