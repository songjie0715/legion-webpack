/**
 * Created by Yinxiong on 2016/10/11.
 */

import _ from 'lodash';
import Events from 'minivents';
import {noop} from 'helper.js';
import {FIELD_DEFAULTS} from './const';

const defaultOptions = {
	container: null,
	fields: [],
	values: {},
    context: null,
	interceptor: {
		setForm: d=>d,
		getForm: d=>d,
        validate: ()=>true
	},
	events: {
		created: noop,
		mounted: noop,
		submit: noop,
		validate: noop,
		destroyed: noop
	}
};

const keys = Object.keys(defaultOptions);

export default class Model {
	constructor(props){
	    this._isMounted = false;

		Events(this);

		props.fields = _.map(_.filter(props.fields, o=>!_.isEmpty(o)), field=>Object.assign({}, FIELD_DEFAULTS, field));
		
		_.merge(this, defaultOptions, _.pick(props, keys));
		_.forEach(this.events, (fn, name)=>{
			this.on(name, fn.bind(this.context || this))
		});
	}

	getFormData(){
        let data = {};
        _.forEach(this.fields, field=>{
            if(field.name && !field.ignore ){
                data[field.name] = field.value || this.values[field.name];
            }
        });
        return this.interceptor.getForm(data);
    }

	mixin(container){
		this.container = container;

		//融合事件
		this.container.shareEvents.forEach(k=>{
			this.container.$on(k, (...rest)=>{
				this.emit(k, ...rest);
			})
		});

		//方法快捷方式
		this.container.shareMethods.forEach(k=>{
			this[k] = this.container[k];
		})
	}

	static create(props){
		return new Model(props);
	}
}