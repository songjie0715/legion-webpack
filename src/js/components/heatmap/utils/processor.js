/**
 * Created by Yinxiong on 2016/5/17 0017.
 */

import _ from 'lodash';
import gps from './gps';
import {generate, generateSimple} from './toJson';
import hamsters  from 'hamsters.js';
import {
FILTER_TYPE,
} from '../const';

const TIME_START_VALUE = 0;
const TIME_END_VALUE = 23;

function filterStay(content, config) {

	let {timeType, start, end, ignore} = getConfigValue(config);
	let minStayCount = _.get(config, 'stayFilter', 0);
	let result = [];

	if (
		(start == TIME_START_VALUE && end == TIME_END_VALUE) ||
		(start == TIME_END_VALUE && end == TIME_START_VALUE) &&
		(timeType == FILTER_TYPE.ALL)) {

		return content;
	}

	_.forEach(content, line => {
		let [, coordStr,] = line.split(/\s/);
		let timeFrame = getTimeFrame(coordStr, timeType);
		_.some(timeFrame, frame => {
			if (frame && filterTimeStay(frame, start, end, minStayCount, ignore)) {
				result.push(line);
				return true;
			}
		})
	});

	return result;
}

function filterAppear(content, config) {
	let {timeType, start, end, ignore} = getConfigValue(config);
	let result = {};
	let deviceCount = 0;
	let timeFrame;

	_.forEach(content, function (line) {

		let [deviceId, coordStr] = line.split(/\s+/);
		let arr = [];

		timeFrame = getTimeFrame(coordStr, timeType);

		_.forEach(timeFrame, frame => {
			if (frame == '') {
				return;
			}
			let r = filterTimeAppear(frame, start, end, ignore);
			arr = arr.concat(r)
		});

		if (arr.length > 0) {
			if (deviceId in result) {
				result[deviceId] = result[deviceId].concat(arr);
			} else {
				deviceCount += 1;
				result[deviceId] = arr;
			}
		}
	});

	result.count = deviceCount;
	return result;
}

function filterTimeStay(frame, start, end, minStayCount = 0, ignore = []) {
	let point;
	let [hour, points] = frame.split(':');
	hour = +hour;

	if (inTimePeriod(start, end, hour, ignore)) {
		points = points.split(',');
		for (let i = 0, len = points.length; i < len; i++) {
			point = points[i];
			let [,, count] = point.split('_');
			count = count ? +count : 0;
			if (count >= minStayCount) {
				return true;
			}
		}
	}
	return false;
}


function filterTimeAppear(frame, start, end, ignore = []) {
	let arr = [];
	let [hour, points] = frame.split(':');
	hour = +hour;

	if (inTimePeriod(start, end, hour, ignore)) {
		points = points.split(',');
		_.forEach(points, point => {
			let [lat, lng, count] = point.split('_');
			arr.push(gps.gpsToBaidu(+lng, +lat).concat([+count]));
		});
	}
	return arr;
}

function inTimePeriod(start, end, hour, ignore = []) {
	let isNormal = start <= hour && hour <= end;
	let isAcrossDay = end < start && (hour >= end || hour <= start);

	if (isNormal || isAcrossDay) {
		return !(ignore.length > 0 && ignore.indexOf(+hour));
	}
	return false;
}

function getTimeFrame(coordStr, stayType = FILTER_TYPE.ALL) {
	let timeFrameStr;
	switch (stayType) {
		case FILTER_TYPE.WORK:
			timeFrameStr = coordStr.split('|')[0];
			break;
		case FILTER_TYPE.WEEKEND:
			timeFrameStr = coordStr.split('|')[1];
			break;
		default:
			timeFrameStr = coordStr.split('|').join(';');
			break;
	}
	return timeFrameStr.split(';');
}

function formatIgnore(ignore) {
	if (_.isArray(ignore)) {
		return ignore.map(i => parseInt(i))
	}

	return [];
}

function getConfigValue(config) {
	let timeType = _.get(config, 'type', FILTER_TYPE.ALL);
	let start = _.get(config, 'start', TIME_START_VALUE);
	let end = _.get(config, 'end', TIME_END_VALUE);
	let ignore = formatIgnore(_.get(config, 'ignore', []));
	return {timeType, start, end, ignore};
}

function extract(line, config){
	console.log(this);
}

global.__heatmapExtract = extract;

export default function (lines, config) {
	return new Promise((resolve, reject)=>{
		let options = {
			operator: extract,
			array: lines,
			threads: 4
		};
		hamsters.tools.loop(options, function(output){
			resolve(output);
		})
	});

	// let stayData = filterStay(content, config.stay);
	// let filterData = filterAppear(stayData, config.filter);
	// return generate(filterData);
}