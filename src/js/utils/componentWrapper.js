/**
 * Created by languid on 2016/5/5.
 */


import Vue from 'vue';

const caches = {};

export default function( com, props ){
    if( !com || !com.name ){
        console.error('component name is empty');
        return;
    }
    if( !(com.name in caches) ){
        caches[com.name] = Vue.extend(com);
    }

    if(arguments.length == 2){
        return new caches[com.name](props)
    }

    return caches[com.name];
}