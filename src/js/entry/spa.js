/**
 * Created by Yinxiong on 2016/8/16.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../controllers/home';

Vue.use(VueRouter);

let router = new VueRouter({
	transitionOnLoad: true
});


let App = Vue.extend({
	data(){
		return {
		}
	}
});

router.map({
	'/': {
		component: home
	},
});


router.beforeEach(function({to, next}){

	if( to.matched ){
		let matched = to.matched;
		let bodyClass = [];
		_.forEach(matched, (o)=>{
			let cls = _.get(o, 'handler.component.options.bodyClass', '');
			if(cls){
				if(_.isArray(cls)){
					bodyClass = bodyClass.concat(cls)
				} else if(_.isString(cls)){
					bodyClass.push(cls);
				}
			}
		});
		router.app.bodyClass = bodyClass;
	}

	next();
});

router.afterEach(function({to}){
	var component = null;
	if( to.matched ){
		component = to.matched[0].handler.component;
	}
	if( !component || (component && !('loaderControl' in component.options)) ){
		globalLoader.hide();
	}
});

router.start(App, '#app');