/**
 * Created by Administrator on 2016/10/12.
 */

import {COMPONENT} from '../const';
import _ from 'lodash';

let names = {};
let value;

for(let i in COMPONENT){
    value = COMPONENT[i];
    //exp. FormInput
    names[value] = 'F'+_.camelCase('orm'+i);
}

export function getName(type){
    return names[type];
}