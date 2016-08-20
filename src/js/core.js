/**
 * Created by Yinxiong on 2016/6/23.
 */

import $ from 'jquery';
import Events from 'minivents';

/** @namespace */
const core = {};

core.globalEvents = {};
Events(core.globalEvents);

core.getById = function (id) {
	return document.getElementById(id);
};

core.error = [];
core.register = function (e, c) {
	var g = e.split(".");
	var f = core;
	var b = core.error;
	var d = null;
	while (d = g.shift()) {
		if (g.length) {
			if (f[d] === undefined) {
				f[d] = {}
			}
			f = f[d]
		} else {
			if (f[d] === undefined) {
				if (typeof c === 'string' && c === 'check') {
					console.log('Property undefined:' + e);
					return $.noop;
				}
				try {
					f[d] = c(core);
				} catch (h) {
					console.warn(h);
					b.push(h)
				}
			} else {
				if (typeof c == 'string' && c == 'check') {
					return f[d]
				}
				console.log('redefined:' + e)
			}
		}
	}
};

core.delay = function (fn, delay) {
	return setTimeout(fn, delay || 0);
};

core.loadImage = function (url, callback, crossDomain) {
	var img = new Image();
	img.src = url;
	if (crossDomain) {
		img.setAttribute('crossOrigin', 'anonymous');
	}
	if (img.complete) {
		callback.call(img, false);
	}
	else {
		img.onload = function () {
			callback.call(img, false);
		};
		img.onerror = function () {
			callback.call(this, true)
		};
		img.src = img.src
	}
};

core.resize = function (name, options) {
	var timer = null, isEnd = false;

	var setting = {
		init: true,
		after: $.noop,
		immediately: $.noop,
		delay: 100
	};

	if (arguments.length == 1) {
		setting.after = name;
		name = 'scroll resize';
	} else {
		name = name || 'scroll resize';
		if (typeof options == 'function') {
			setting.after = options;
		} else {
			setting = $.extend(setting, options);
		}
	}

	core.win.bind(name, function (e) {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		if (isEnd == false) {
			isEnd = true;
			setting.immediately.call(core.win, e)
		}
		timer = core.delay(function () {
			isEnd = false;
			setting.after.call(core.win, e);
		}, setting.delay)
	});

	if (setting.init) {
		core.win.trigger(name.split(' ')[0]);
	}

	return function () {
		core.win.unbind(name);
	};
};

core.resize.unbind = function (name) {
	core.win.unbind(name);
};

core.whenSeenElement = function (name, ele, callback) {
	var name = 'resize.' + name + ' scroll.' + name;
	core.xresize(name, function (e) {
		if (core.win.scrollTop() + core.win.height() < ele.offset().top) return;
		core.xresize.unbind(name);
		(callback || $.noop)();
	})
};

core.animationEnd = function (elem, fn) {
	var name = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	elem.one(name, fn);
	return function () {
		elem.unbind(name)
	}
};

core.transitionEnd = function (elem, fn) {
	var name = 'webkitTransitionEnd oTransitionEnd transitionend';
	elem.one(name, fn);
	return function () {
		elem.unbind(name);
	}
};

core.clickOtherPlace = function(){
	var pending = 0;
	var $document = $(document);

	return (elements, callback) => {

		var els = (!$.isArray(elements) ? [elements] : $.makeArray(elements)).map(function (element) {
			return element && element.jquery ? element[0] : element;
		});

		var len = els.length;

		var name = 'mousedown.clickDocumentHide' + pending++;

		callback = callback || $.noop;

		$document.bind(name, function (e) {
			var target = e.target;
			var r = 0;
			for (var i = 0, el; i < len; i++) {
				el = els[i];
				if (target != el && !$.contains(el, target)) {
					r++;
				} else {
					break;
				}
			}
			if (r == len) {
				callback(e, el);
			}
		});

		return function () {
			$document.unbind(name);
		};
	}
}();

core.lazyLoad = function (options) {
	options = $.extend({
		context: null,
		height: 0
	}, options);

	var win = core.win;
	var context = $(options.context);
	if (!context.length) return;
	var pageTop = function () {
		return document.documentElement.clientHeight
			+ Math.max(document.documentElement.scrollTop, document.body.scrollTop)
			- options.height;
	};
	var imgLoad = function () {
		context.find('img[orgSrc]').each(function () {
			if ($(this).offset().top <= pageTop() && $(this).is(':visible')) {
				var orgSrc = this.getAttribute('orgSrc');
				this.setAttribute('src', orgSrc);
				this.removeAttribute('orgSrc');
			}
		});
	};
	win.bind('lazyload', imgLoad);
	core.xresize('scroll.lazyload', {
		after: imgLoad
	});
};

core.go = function (url, isNewWindow) {
	var local = location, href = '';
	if (url == 'me') {
		href = local.href;
	} else if (/^#/.test(url)) {
		href = local.origin + local.pathname + url;
	} else {
		href = url;
	}
	if (!isNewWindow) {
		local.href = href;
	} else {
		window.open(href)
	}
	return local;
};

core.queryString = function (name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
};

core.ajax = function (options) {
	if (options.debug) {
		var deferred = new $.Deferred();
		var code = options.statusCode || 200;
		var delay = options.delay || 300;
		switch (code) {
			case 200:
				core.delay(function () {
					deferred.resolve({
						code: 1
					});
				}, delay);
				break;
			case 403:
			case 404:
			case 500:
				core.delay(function () {
					deferred.reject({
						code: 0
					});
				}, delay);
				break;
		}
		return deferred;
	} else {
		return $.ajax(options);
	}
};

core.code = function (content, defaultValue) {
	defaultValue = defaultValue || void 0;
	if(!content){
		return defaultValue;
	}
	if (typeof content == 'string') {
		return !!content ? (new Function('return ' + content))() : defaultValue;
	}
	return content;
};

export default core;