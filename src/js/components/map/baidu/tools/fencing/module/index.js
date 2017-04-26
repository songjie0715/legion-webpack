/**
 * Created by Yinxiong on 2017/1/10.
 */

import RadiusFencing from './RadiusFencing';
import RectangleFencing from './RectangleFencing';
import PolygonFencing from './PolygonFencing';
import {FENCING_TYPE} from '../const';

export default {
    [FENCING_TYPE.RADIUS]: RadiusFencing,
    [FENCING_TYPE.RECTANGLE]: RectangleFencing,
    [FENCING_TYPE.POLYGON]: PolygonFencing,
}