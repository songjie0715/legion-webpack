/**
 * Created by Yinxiong on 2017/1/10.
 */

import Fencing from './BaseFencing';
import {getLine, formatDistance, getPointWithDistance} from '../../../utils';
import {
    FENCING_TYPE,
    DEFAULT_LABEL_STYLE,
    DEFAULT_FENCING_STYLE,
    DEFAULT_LINE_STYLE,
    DEFAULT_MAX_DISTANCE,
    DEFAULT_MIN_DISTANCE
} from '../const';

export default class RadiusFencing extends Fencing {
    static install(manager){
        manager.on('radius.label.mousedown', fencing=>{
            manager.editingFencing = fencing;
            manager.dragStart();
        });

        manager.on('radius.label.mouseup', fencing=>{
            manager.editingFencing = fencing;
            manager.dragEnd();
        });

        manager.map.addEventListener('mousemove', e=>{
            if(manager.isDragging) {
                let {point} = manager.editingFencing;
                let currentPoint = e.point;
                currentPoint.lat = point.lat;
                let radius = manager.map.getDistance(point, currentPoint);
                manager.editingFencing.setRadius(radius, currentPoint);
            }
        });

        manager.map.addEventListener('mouseup', ()=>{
            if(manager.isDragging){
                manager.dragEnd();
            }
        });
    }

    static uninstall(manager){
        manager.off('radius.label.mousedown');
        manager.off('radius.label.mouseup');
    }

    constructor(manager, options){
        super(manager, Object.assign({}, {
            max: DEFAULT_MAX_DISTANCE,
            min: DEFAULT_MIN_DISTANCE,
            labelOffset:  new BMap.Size(-10, -13)
        }, options));

        this.type = FENCING_TYPE.RADIUS;

        this.marker = null;
        this.point = null;
        this.line = null;
        this.label = null;
        this.radiusText = '';
        this.ctxMenu = null;
        this.isEdge = false;
        this.isEdge = false;

        this.on('label.mouseup', e=>{
            this.manager.emit('radius.label.mousedown', this, e);
        });

        this.on('label.mousedown', e=>{
            this.manager.emit('radius.label.mousedown', this, e);
        });
    }
    render(point, radius=1000){
        this.point = point;
        this.radius = radius;

        this.createMarker()
            .createCircle()
            .createLine()
            .createLabel();

        if(this.options.deletable){
            this.ctxMenu = new BMap.ContextMenu();
            this.ctxMenu.addItem(new BMap.MenuItem('删除', ()=>{
                this.remove();
            }));
            this.marker.addContextMenu(this.ctxMenu);
        }

        this.renderComplete();
        return this;
    }
    remove(){
        super.remove();

        this.off('move');
        this.off('update');
        this.off('remove');
        this.off('label.mousedown');
        this.off('label.mouseup');

        this.overlay.remove();
        this.label.remove();
        this.line.remove();
        this.marker.remove();
        this.marker.removeContextMenu(this.ctxMenu);
    }
    createMarker(){
        if(this.line) {
            this.map.removeOverlay(this.marker);
        }

        this.marker = new BMap.Marker(this.point);
        if(this.options.draggable){
            this.marker.enableDragging();
            this.marker.addEventListener('dragging', ()=>{
                this.point = this.marker.point;
                this.updatePosition();
            })
        }
        this.map.addOverlay(this.marker);
        return this;
    }
    createCircle(){
        if(this.line) {
            this.map.removeOverlay(this.overlay);
        }

        this.overlay = new BMap.Circle(this.point, this.radius, Object.assign({}, DEFAULT_FENCING_STYLE, this.options.fencingStyle));
        this.map.addOverlay(this.overlay);
        return this;
    }
    createLine(){
        if(this.line) {
            this.map.removeOverlay(this.line);
        }

        this.line = getLine(this.point, this.radius, -90, Object.assign({}, DEFAULT_LINE_STYLE, this.options.lineStyle));
        this.map.addOverlay(this.line);
        return this;
    }
    createLabel(){
        if(this.label) {
            this.map.removeOverlay(this.label);
        }

        this.radiusText = formatDistance(this.radius);
        this.label = new BMap.Label(this.radiusText, {
            position: this.line.getPath()[1],
            offset: this.options.labelOffset
        });
        this.label.setStyle(Object.assign({}, DEFAULT_LABEL_STYLE, this.options.labelStyle));
        this.map.addOverlay(this.label);

        if(this.options.changeable) {
            this.label.addEventListener('mousedown', (e)=>{
                this.emit('label.mousedown', e);
            });
            this.label.addEventListener('mouseup', (e)=>{
                this.emit('label.mouseup', e);
            });
        }

        return this;
    }
    setRadius(radius, edgePoint){
        let text = formatDistance(this.radius);

        this.label.setContent(text);

        if(radius > this.options.max){
            radius = this.options.max;
            this.isEdge = true;
        } else if( radius < this.options.min){
            radius = this.options.min;
            this.isEdge = true;
        } else {
            this.isEdge = false;
        }

        this.radius = radius;
        this.radiusText = formatDistance(this.radius);

        this.overlay.setRadius(radius);

        //for performance
        if(!this.isEdge && edgePoint) {
            this.label.setContent(this.radiusText);
            this.label.setPosition(edgePoint);
            this.line.setPath([this.point, edgePoint]);
        } else {
            this.createLine();
            this.createLabel();
        }

        this.emit('update', this.radius, this.radiusText);
        return this;
    }
    updatePosition(){
        let target = getPointWithDistance(this.point, this.overlay.getRadius(), -90);
        this.overlay.setCenter(this.point);
        this.label.setPosition(target);
        this.line.setPath([this.point, target]);
        this.emit('move');
    }
    updateOptions(type, value){
        switch(type){
            case 'draggable':
                if(value){
                    this.marker.enableDragging();
                } else {
                    this.marker.disableDragging();
                }
                break;
            default:
                if(type in this.options){
                    this.options[type] = value;
                }
                break;
        }
    }
    getDetail(){
        let points = this.overlay.getPath();
        return {
            type: FENCING_TYPE.RADIUS,
            radius: this.radius,
            center: {
                lng: this.point.lng,
                lat: this.point.lat
            },
            distance: this.radiusText,
            points
        }
    }
    getRadius(){
        return this.radius;
    }
}