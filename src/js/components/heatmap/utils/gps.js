/**
 * Created by Yinxiong on 2016/5/18 0018.
 */

import coordtransform from 'coordtransform';

export default {
	gpsToBaidu (lng, lat, precision=5){
		let gcj02 = coordtransform.wgs84togcj02(lng, lat);
		let bd = coordtransform.gcj02tobd09(gcj02[0], gcj02[1]);
		return [+bd[0].toFixed(precision), +bd[1].toFixed(precision)];
	}
}