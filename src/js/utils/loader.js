/**
 * Created by Yinxiong on 2016/5/4 0004.
 */

import $script from 'scriptjs';
import Promise from 'bluebird';
import core from 'src/core';
import paths from '../const/paths';
import _ from 'lodash';

const prefix = core.STATIC_PATH;
let cssCache = {};

$script.path(prefix);

function parsePath(name) {
	if (!name) {
		return null;
	}

	let result = name;
	let isMain = true;
	let uri;
	let pkg;
    
    uri = name.split('/');

	if (uri.length > 1) {
		name = uri.shift();
		uri = uri.join('/');
		isMain = false;
	}

	if (name in paths) {
		pkg = paths[name];
	}

	if (typeof pkg == 'string') {
		result = paths[name];
	} else if (typeof pkg == 'object') {
		if (isMain) {
			result = pkg.dir + '/' + pkg.main;
		} else {
			result = pkg.dir + '/' + uri;
		}
	}

	return {
		path: result,
		pkg: pkg
	};
}

export default {
	$script: $script,
	//TODO performance
	series: function () {
		const self = this;
		let scripts = _.filter(arguments, function(n){
		    return !!n;
		});

		return Promise.mapSeries(scripts, function (name) {
			return self.load(name).catch(function(e){
				console.error(e)
			});
		});
	},
	css: function (url) {
		let link;
		let head;
		let mainCss;

		url = url.indexOf('http') == 0 ? url : (prefix + url);
		if( url in cssCache ){
			return;
		}

		cssCache[url] = true;

		link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = url;

		head = document.getElementsByTagName("head")[0];
		mainCss = document.getElementById('mainCss');

		if( mainCss ){
			head.insertBefore(link, mainCss)
		} else {
			head.appendChild(link);
		}
	},
	load: function () {
		const self = this;
		let names = arguments;
		return new Promise(function (resolve, reject) {
			let scripts = [];
			let csses = [];
			let pkgs = [];

			_.forEach(names, function (name) {
				let n;
                if( typeof name == 'string' ){
                    n = parsePath(name);
                }
				if (n) {
					pkgs.push(n);
					if( /.css$/.test(n.path) ){
						csses.push(n.path);
					} else {
						scripts.push(n.path);
					}
				}
			});

			if( csses.length ){
				csses.forEach(function(uri){
				    self.css(uri);
				});
			}

			if( scripts.length ){
				$script(scripts, function () {
					_.forEach(pkgs, function(o){
						if(o.pkg && _.isFunction(o.pkg.init) && !o.pkg.inited) {
							o.pkg.init();
							o.pkg.inited = true;
						}
					});
					resolve();
				}, function (depsNotFound) {
					console.error(depsNotFound);
					reject(depsNotFound);
				})
			} else {
				resolve();
			}
		})
	}
}
