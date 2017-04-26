/**
 * Created by Yinxiong on 2017/1/10.
 */

import _ from 'lodash';
import Fencing from './BaseFencing';
import {FENCING_TYPE} from '../const';
import GeoUtils from '../../../utils/GeoUtils';

export default class PolygonFencing extends Fencing {
    static install(manager){
        manager.drawingManager.addEventListener('polygoncomplete', overlay=>{
            manager.editingFencing.setOverlay(overlay);
            manager.drawingManager.close();
            manager.editingFencing.renderComplete();
        })
    }
    constructor(manager, options) {
        super(manager, _.merge({
            changeable: false
        }, options));

        this.isEditing = false;
        this.type = FENCING_TYPE.POLYGON;
        this.createContextMenu();
        this.overlays = [];
    }
    open(){
        this.manager.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
        this.manager.drawingManager.open();
    }
    renderPolygon(points, fencingStyle){
        fencingStyle = fencingStyle || this.options.fencingStyle;
        if(_.isArray(points)) {
            points = points.map(p=>new BMap.Point(p[1], p[0]));
        }
        let polygon = new BMap.Polygon(points, fencingStyle);
        this.map.addOverlay(polygon);
        return polygon;
    }
    render(points, options){
        let overlay = this.renderPolygon(points, _.get(options, 'fencingStyle'));
        this.setOverlay(overlay);
        this.renderComplete();
        return this;
    }
    setOverlay(overlay){
        this.overlay = overlay;
        this.bindContextMenu(overlay);
    }
    createContextMenu(){
        this.ctxMenu = new BMap.ContextMenu();

        //编辑有bug
        this.editMenuItem = new BMap.MenuItem('编辑', ()=>{
            this.isEditing = !this.isEditing;
            if(this.isEditing) {
                this.overlay.enableEditing();
                this.editMenuItem.setText('完成');
            } else {
                this.overlay.disableEditing();
                this.editMenuItem.setText('编辑');
            }
        });

        this.removeMenuItem = new BMap.MenuItem('删除', ()=>{
            this.remove();
        });

        if(this.options.changeable) {
            this.ctxMenu.addItem(this.editMenuItem);
        }

        if(this.options.deletable) {
            this.ctxMenu.addItem(this.removeMenuItem);
        }
    }
    bindContextMenu(overlay){
        overlay.addContextMenu(this.ctxMenu);
    }
    remove(){
        super.remove();
        this.overlay.removeContextMenu(this.ctxMenu);
        this.overlay.remove();
    }
    getDetail(){
        let points = this.overlay.getPath();
        let area = GeoUtils.getPolygonArea(points);
        return {
            type: this.type,
            area: area,
            points
        }
    }
}