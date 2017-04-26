/**
 * Created by Yinxiong on 2016/10/10.
 */

import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap';

Vue.directive('tooltip', {
    inserted(el, binding){
        $(el).tooltip(Object.assign({}, binding.value));
    },
    unbind(el){
        $(el).tooltip('dispose');
    }
});