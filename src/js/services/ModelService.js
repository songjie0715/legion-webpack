/**
 * Created by Yinxiong on 15/12/31.
 */

import core from '../core';
import $ from 'jquery';
import _ from 'lodash';
import Lang from '../const/Lang';

/**
 * @constructor
 */
class ModalService {
    static get basePath() {
        return core.basePath + '/api/'
    }
    constructor(model) {
        this.model = model;
        this.url = ModalService.basePath + this.model;
    }
    fetch(offset, limit) {
        return this.send({
            url: this.url,
            data: ModalService.pageCondition(offset, limit)
        })
    }
    get(id) {
        return this.send({
            type: 'get',
            url: this.url + '/' + id
        });
    }
    create(prop) {
        return this.send({
            type: 'post',
            url: this.url,
            data: JSON.stringify(prop)
        })
    }
    update(id, prop) {
        return this.send({
            type: 'put',
			url: this.url + '/' + id,
            data: JSON.stringify(prop)
        })
    }
    remove(id) {
        return this.send({
            type: 'delete',
            url: this.url + '/' + id
        })
    }
    send(options){
        return ModalService.send(options)
    }
    ajax(options) {
        return ModalService.ajax(options)
    }
    static ajax(options){
        return core.ajax(options);
    }
    static send(options) {
		return ModalService.ajax(options).then(function (data) {
			if (data && data.code === '0') {
				return data.result;
			}
			return $.Deferred().reject({
				message: Lang.DATA_EMPTY
			});
		});
    }
    static error(e) {
        return $.Deferred().reject(e);
    }
    static pageCondition(offset, limit) {
        var condition = {};
        var page = {
            offset: 1,
            limit: 50
        };
        if (_.isObject(offset)) {
            condition = offset;
        } else if (_.isNumber(offset)) {
            page.offset = offset;
            page.limit = limit || 50;
        }
        return _.assign(page, condition);
    }
}

export default ModalService;


