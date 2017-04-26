/**
 * Created by Yinxiong on 2016/5/18 0018.
 */

import _ from 'lodash';
import gps from './gps';

function merge(data, precision=4) {
	let result = {};
	_.forEach(data, points=>{
	    _.forEach(points, point=>{
			let [lng, lat, count] = point;
			if( lng == 0 ||lat == 0){
				return;
			}
			let key = lng+'_'+lat;
			if( !(key in result)){
				result[key] = {
					lng: +lng.toFixed(precision),
					lat: +lat.toFixed(precision),
					count: count || 1
				}
			} else {
				result[key]['count'] += 1;
			}
	    })
	});
	return result;
}

export function generate(data, precision = 4) {
	let count = data.count;
	delete data.count;

	let merged = merge(data, precision);
	let arr = _.values(merged);

	return {
		pointCount: arr.length,
		deviceCount: count,
		dataArray: arr
	}
}

export function generateSimple(data, precision = 4) {
	let merged = {};
	_.forEach(data, line=>{
		let [lng, lat] = line.trim().split(',');
		let key = lng + '_' + lat;
		if (key in merged) {
			merged[key]['count'] += 1;
		} else {
			let bd = gps.gpsToBaidu(+lng, +lat);
			merged[key] = {
				count: 1,
				lng: +bd[0].toFixed(precision),
				lat: +bd[1].toFixed(precision)
			}
		}
	});

	let arr = _.values(merged);

	return {
		pointCount: arr.length,
		deviceCount: data.length,
		dataArray: arr
	}
}