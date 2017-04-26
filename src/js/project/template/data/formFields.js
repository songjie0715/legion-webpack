/**
 * Created by Yinxiong on 2016/10/14.
 */

import {
	COMPONENT,
	SUBMIT_BUTTON,
	RESET_BUTTON,
	RESTORE_BUTTON,
	get
} from '../../../components/form';

export const baseFields = [{
	name: 'input',
	type: COMPONENT.INPUT,
	value: 'languid',
	label: 'Input'
}, {
	name: 'select',
	type: COMPONENT.SELECT,
	value: 1,
	label: 'Select',
	options: {
		emptyText: 'Select Type',
		items: [{
			text: 'A',
			value: 1
		}, {
			text: 'B',
			value: 2
		}, {
			text: 'C',
			value: 3
		}, {
			text: 'D',
			value: 4
		}]
	}
}, {
	name: 'date',
	type: COMPONENT.DATE,
	label: 'Date',
}, {
	type: COMPONENT.DIVIDER,
	options: {
		text: 'Group'
	}
}, {
	name: 'checkbox',
	type: COMPONENT.CHECKBOX,
	label: 'Checkbox',
	options: {
		text: 'Highcharts'
	}
}, {
	name: 'checkboxGroup',
	type: COMPONENT.CHECKBOX_GROUP,
	value: [2],
	label: 'Checkbox Group',
	options: {
		items: [{
			text: 'A',
			value: 1,
			disabled: true
		}, {
			text: 'B',
			value: 2
		}, {
			text: 'C',
			value: 3
		}, {
			text: 'D',
			value: 4
		}, {
			text: 'E',
			value: 5
		}]
	}
}, {
	name: 'radioGroup',
	type: COMPONENT.RADIO_GROUP,
	label: 'Radio Group',
	value: 1,
	options: {
		items: [{
			text: 'A',
			value: 1,
			disabled: true
		}, {
			text: 'B',
			value: 2
		}, {
			text: 'C',
			value: 3
		}]
	}
}, {
    name: 'uploader',
    type: COMPONENT.UPLOADER,
    label: 'Uploader'
}, {
    name: 'searchSelectorE',
    type: COMPONENT.SEARCH_SELECTOR,
    label: 'Search Selector',
    value: {
        text: 'A',
        value: 1
    },
    options: {
        emptyText: 'Select Type',
        items: [{
            text: 'A',
            value: 1
        }, {
            text: 'B',
            value: 2
        }, {
            text: 'C',
            value: 3
        }, {
            text: 'D',
            value: 4
        }]
    }
}, {
    name: 'fu',
    type: COMPONENT.SEARCH_SELECTOR2,
    label: 'Search Selector2',
    value: {
        text: 'A',
        value: 1
    },
    options: {
        emptyText: 'Select Type',
        items: [{
            text: 'A',
            value: 1
        }, {
            text: 'B',
            value: 2
        }, {
            text: 'C',
            value: 3
        }, {
            text: 'D',
            value: 4
        }]
    }
}, {
	name: 'hidden',
	type: COMPONENT.HIDDEN,
	value: 1234
}, {
	name: 'actions',
	type: COMPONENT.BUTTON_GROUP,
    class: ['d-flex', 'justify-content-end'],
	options: {
		items: [
			get(RESTORE_BUTTON),
			get(RESET_BUTTON, {
                class: 'ml-2'
            }),
			get(SUBMIT_BUTTON, {
			    class: 'ml-2'
            })
		]
	}
}];

export const baseFieldsData = {
	input: 'Test input value',
	select: 3,
	checkbox: true,
	checkboxGroup: [3,4,5],
	radioGroup: 3,
	date: '2016-01-01'
};