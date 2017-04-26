/**
 * Created by Yinxiong on 2016/11/17.
 */

import noty from 'noty';


//doc http://ned.im/noty/
//required animated.css
//required jquery

export default function (text, type, options) {
	return noty({
		text,
		...Object.assign({
			timeout: 3000,
			type: type || 'information', //['information', 'success', 'error', 'warning', 'alert', 'negative', 'positive', 'floating']
			theme: 'relax',
			layout: 'topRight',
			animation: {
				open: 'animated bounceInRight', // Animate.css class names
				close: 'animated bounceOutRight', // Animate.css class names
				easing: 'swing', // unavailable - no need
				speed: 500 // unavailable - no need
			}
		}, options)
	})
}