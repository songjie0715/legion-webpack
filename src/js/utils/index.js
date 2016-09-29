/**
 * Created by Yinxiong on 2016/9/28.
 */

export function noop(){}

export function delay(fn, time){
	return setTimeout(fn, time || 0);
}

export function queryString(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function go(url, isNewWindow){
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
}