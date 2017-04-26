/**
 * Created by Yinxiong on 2017/1/10.
 */

import PolygonFencing from './PolygonFencing';
import {FENCING_TYPE} from '../const';

export default class RectangleFencing extends PolygonFencing {
    static install(manager){
        manager.drawingManager.addEventListener('rectanglecomplete',overlay=>{
            manager.editingFencing.setOverlay(overlay);
            manager.drawingManager.close();
            manager.editingFencing.renderComplete();

        })
    }
    constructor(manager, options) {
        super(manager, options);

        this.type = FENCING_TYPE.RECTANGLE;
    }
    open(){
        this.manager.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
        this.manager.drawingManager.open();
    }
    render(...rest){
        super.render(...reset);
        return this;
    }
}