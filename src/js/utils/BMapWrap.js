/**
 * Created by Yinxiong on 15/9/16.
 */

import _ from 'lodash';
import loader from '../utils/loader';


export default loader.load('bmap').then(function(){
    return function(elem, options){
        if( !elem ){
            return ;
        }
        options = _.extend({
            center: '北京',
            level: 14,
            enableContinuousZoom: true,
            enableScrollWheelZoom: true,
            ScaleControl: {
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT
            },
            NavigationControl: {
                anchor: BMAP_ANCHOR_TOP_RIGHT
            },
            mapConfig: {
                //关闭地图可点功能 避免点取POI时混淆
                enableMapClick: false
            }
        }, options);

        var map = new BMap.Map(elem.jquery ? elem[0] : elem, options.mapConfig);

        //添加比例尺
        options.ScaleControl && map.addControl(new BMap.ScaleControl(options.ScaleControl));

        //添加平移缩放控件
        options.NavigationControl && map.addControl(new BMap.NavigationControl(options.NavigationControl));

        //启用滚轮缩放
        options.enableScrollWheelZoom && map.enableScrollWheelZoom();

        //启用连续缩放
        options.enableContinuousZoom && map.enableContinuousZoom();

        return map;
    }
});
