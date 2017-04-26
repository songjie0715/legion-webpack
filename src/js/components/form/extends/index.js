/**
 * Created by Yinxiong on 2016/10/13.
 */

import {COMPONENT} from '../const';
import _ from 'lodash';

export const SUBMIT_BUTTON = {
	name: 'submitBtn',
	type: COMPONENT.BUTTON,
	events: {
		click(){
			this.container.submit();
		}
	},
	options: {
		text: '提交',
		style: 'primary'
	}
};

export const SEARCH_BUTTON = _.merge({}, SUBMIT_BUTTON, {
	options: {
		text: '查询'
	}
});

export const RESET_BUTTON = {
	name: 'resetBtn',
	type: COMPONENT.BUTTON,
	events: {
		click(){
			this.container.reset();
		}
	},
	options: {
		text: '重置',
		style: 'secondary'
	}
};

export const RESTORE_BUTTON = {
	name: 'restoreBtn',
	type: COMPONENT.BUTTON,
	events: {
		click(){
			this.container.restore();
		}
	},
	options: {
		text: '恢复',
		style: 'secondary'
	}
};