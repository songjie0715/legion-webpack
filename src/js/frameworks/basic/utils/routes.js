/**
 * Created by Yinxiong on 2016/10/28.
 */
import _ from 'lodash';

function navStructure(obj) {
    let isArray = _.isArray(obj);
    let result = isArray ? [] : {};

    if(obj.navIgnore){
        return null;
    }

    _.forEach(obj, (value, key)=> {
        if (key == 'component') {
            return;
        }
        let item = _.isObjectLike(value) ? navStructure(value) : value;
        if (isArray) {
            result.push(item);
        } else {
            result[key] = item;
        }
    });

    return isArray ? result.filter(o=>!!o) : result;
}

export function makeNavRoutes(list) {
    return navStructure(list);
}

export function makeVueRoutes(list) {
    let routes = [];

    _.forEach(list, o=> {
        if (o.path && _.get(o, 'vueIgnore', false) === false) {
            routes.push(o)
        }
        _.forEach(o.list, x=> {
            if (x.path) {
                routes.push(x);
            }
        })
    });

    return routes;
}