/**
 * Created by Yinxiong on 2017/1/12.
 */

import _ from 'lodash';
import PolygonFencing from './PolygonFencing';
import {FENCING_TYPE} from '../const';

export default class CityFencing extends PolygonFencing {
    constructor(manager, options){
        super(manager, options);
        this.name = '';
        this.type = FENCING_TYPE.CITY;
        this.overlays = [];
    }

    render(name, options={viewport: false}) {
        this.name = name;
        this.getDistrictBoundary(name).then(data=>{
            if(data.length) {
                data.forEach(bound=>{
                    this.overlays.push(super.renderPolygon(bound));
                });

                this.overlays.forEach(o=>{
                    this.bindContextMenu(o);
                });

                this.overlay = this.overlays[0];

                this.renderComplete();
                if(options.viewport) {
                    this.viewport();
                }
            }
        });

        return this;
    }

    getDistrictBoundary(name){
        return new Promise((resolve, reject)=>{
            let bdary = new BMap.Boundary();
            bdary.get(name, data=> {
                if (!data || _.isEmpty(data)) {
                    reject();
                } else {
                    resolve(data.boundaries);
                }
            });
        });
    }

    remove(){
        this.manager.emit('remove', this);
        this.emit('remove');

        this.overlays.forEach(o=>{
            o.removeContextMenu(this.ctxMenu);
            o.remove();
        })
    }

    getDetail(){
        return {
            type: this.type,
            name: this.name,
            points: this.overlays.map(o=>o.getPath())
        }
    }
}