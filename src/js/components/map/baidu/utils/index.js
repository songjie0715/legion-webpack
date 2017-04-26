/**
 * Created by Yinxiong on 2016/1/19 0019.
 */

const DEFAULT_OPTIONS = {
    strokeColor: '#4b6a7d',
    strokeStyle: 'dashed',
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: '#fff',
    fillOpacity: .5
};

const PI = Math.PI;
const {sin, cos, atan2, asin} = Math;

export function getCircle(center, radius, options){
    let points = [];
    for (let g = 0; 360 > g; g += 9) {
        points.push(getPointWithDistance(center, radius, g))
    }
    points.push(new BMap.Point(points[0].lng, points[0].lat));
    return new BMap.Polygon(points, Object.assign({}, DEFAULT_OPTIONS, options));
}

export function getLine(from, distance, angle=-90, options={}){
    let points = [from, getPointWithDistance(from, distance, angle)];
    return new BMap.Polygon(points, options);
}

export function getPointWithDistance(from, distance, angle){
    let d = distance / 6378800;
    let e = PI / 180 * from.lat;
    let f = PI / 180 * from.lng;
    let i = PI / 180 * angle;

    let k = asin(sin(e) * cos(d) + cos(e) * sin(d) * cos(i));
    let lng = ((f - atan2(sin(i) * sin(d) * cos(e), cos(d) - sin(e) * sin(k)) + PI) % (2 * PI) - PI) * (180 / PI);
    let lat = k * (180 / PI);

    return new BMap.Point(lng, lat);
}

export function formatDistance(distance){
    if(distance < 1000 ){
        return ~~distance + 'M';
    }
    return (distance/1000).toFixed(2)+'KM'
}
