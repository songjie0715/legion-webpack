/**
 * Created by Yinxiong on 2017/1/10.
 */
import Events from 'minivents';
import _ from 'lodash';
import {
    DEFAULT_LABEL_STYLE,
    DEFAULT_FENCING_STYLE,
    DEFAULT_LINE_STYLE,
    HIGHLIGHT_STYLE
} from '../const'

export default class Fencing {
    constructor(manager, options){
        Events(this);

        this.options = _.merge({}, {
            draggable: true,
            changeable: true,
            deletable: true,
            lineStyle: DEFAULT_LINE_STYLE,
            fencingStyle: DEFAULT_FENCING_STYLE,
            labelStyle: DEFAULT_LABEL_STYLE
        }, options);

        this.points = [];
        this.manager = manager;
        this.map = this.manager.map;
        this.overlay = null;
    }
    renderComplete(){
        this.manager.emit('render', this);
        this.emit('render', this);
    }
    render(){
        this.renderComplete();
    }
    remove(){
        this.manager.emit('remove', this);
        this.emit('remove');

        this.off('remove');
        this.off('render');
        this.off('add');
    }
    getDetail(){
        //获取详细信息
        return {}
    }

    //高亮围栏
    highlight(isHighlight=true){
        if(this.overlay) {
            if(isHighlight) {
                this.overlay.setStrokeColor(HIGHLIGHT_STYLE.strokeColor);
                this.overlay.setFillColor(HIGHLIGHT_STYLE.fillColor);
            } else {
                console.log(1111);
                this.overlay.setStrokeColor(this.options.fencingStyle.strokeColor);
                this.overlay.setFillColor(this.options.fencingStyle.fillColor);
            }
        }
        return this;
    }

    center(){
        //聚焦围栏
    }

    viewport(){
        this.map.setViewport(this.overlay.getPath());
        return this;
    }

    static install(){}
    static uninstall(){}
}