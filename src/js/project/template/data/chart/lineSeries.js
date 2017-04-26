/**
 * Created by languid on 2016/4/4.
 */

import random from 'src/utils/random';
import moment from 'moment';

let today = moment();

let categories = ['王府井丹耀店', '北京利生体育商厦', '北京王府井百货大楼'];
var t = 1456934400208;

var getData = function(max, offset){
    max = max || 30;
    offset = offset || 3600*1000*24;
    var data = [];
    var count = 0;
    while(count < max){
        data.push([t + offset*count, random.random(100, 100)]);
        count++;
    }
    return data;
};

export default {
    turbo: true,
    categories: categories,
    series: [{
		name: categories[0],
		data: getData()
	}, {
		name: categories[1],
		data: getData()
	}, {
		name: categories[2],
		data: getData()
	}]
}



