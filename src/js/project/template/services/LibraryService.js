/**
 * Created by Yinxiong on 2016/10/29.
 */

import $ from 'jquery';
import ModelService from '../../../services/ModelService';

class Service extends ModelService {};

//mock data

$.mockjax({
    url: /\/api\/library/,
    response(setting, done){
        this.responseText = ModelService.success([{
            name: 'Highcharts',
            id: 1
        }, {
            name: 'echarts',
            id: 2
        }, {
            name: 'd3',
            id: 3
        }, {
            name: 'chartist',
            id: 4
        }, {
            name: 'chartjs',
            id: 5
        }]);
        done();
    }
});

export default new Service('library');