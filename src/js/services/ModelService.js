/**
 * Created by Yinxiong on 15/12/31.
 */

import _ from 'lodash';
import 'whatwg-fetch';
import {paramsEncode} from 'helper.js';
import {BASE_PATH} from '../const/Env';
import {RESPONSE_CODE} from '../const';
import mockjax from 'jquery-mockjax';
mockjax($, window);

//Mock 是覆盖Xhr，无法拦截Fetch
const USE_FETCH = false;

export default class ModelService {
    static get basePath() {
        return `${BASE_PATH}/api`;
    }

    constructor(name, {model=null}={}) {
        this.name = name;
        this.model = model;
        this.base = ModelService.basePath;
        this.url = ModelService.basePath + '/' + this.name;
    }

    /**
     * pageNo=1;
     * pageSize=50;
     * @returns {*}
     */
    fetch(query) {
        let params = ModelService.pageCondition(query);
        return this.send(this.url+'?'+paramsEncode(params))
    }

    get(id) {
        return this.send(this.url + '/' + id);
    }

    create(prop) {
        return this.send(this.url, {
            method: 'POST',
            body: this.postData(prop)
        })
    }

    update(id, prop) {
        return this.send(this.url + '/' + id, {
            method: 'post',
            body: this.postData(prop)
        })
    }

    remove(id) {
        return this.send(this.url + '/' + id, {
            method: 'delete'
        })
    }

    /**
     * @param data
     */
    postData(data){
        return JSON.stringify(data);
    }

    /**
     * @param data
     * @returns {FormData}
     */
    formData(data){
        let fd = new FormData();
        _.forEach(data, (value, key)=>{
            fd.append(key, value)
        });
        return fd
    }

    /**
     * @param url
     * @param params
     * @returns {*}
     */
    send(url, params) {
        return ModelService.send(url, params)
    }

    static send(url, options) {
        if(USE_FETCH){
            return ModelService.fetchAPI(url, Object.assign({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }, options));
        } else {

            options = options || {
                    method: 'get',
                    body: null
                };

            //jquery way
            options.type = options.method;
            options.data = options.body;

            let isFormData = options.data instanceof FormData;

            return ModelService.jqueryAPI(Object.assign({
                url,
                dataType: 'json',
                contentType: isFormData ? false : 'application/json',
                processData: !isFormData
            }, options));
        }
    }

    static fetchAPI(url, options){
        return fetch(url, Object.assign({
            credentials: 'same-origin'
        }, options)).then((response)=>{
            return response.json();
        }).then(ModelService.result);
    }

    static jqueryAPI(options){
        return $.ajax(options).then(ModelService.result)
    }

    static result(data){
        if (data && data.code == RESPONSE_CODE.NORMAL) {
            return data.result;
        }
        return Promise.reject(data);
    }

    static error(data) {
        return {
            code: RESPONSE_CODE.ERROR,
            ...data
        };
    }

    static success(data){
        return {
            code: RESPONSE_CODE.NORMAL,
            result: data
        }
    }

    static pageCondition(query) {
        return Object.assign(Object.assign({
            pageNo: 1,
            pageSize: 50
        }, query));
    }

    status
};