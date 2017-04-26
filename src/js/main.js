/**
 * Created by Yinxiong on 2016/6/23.
 */

const STATIC_PATH = global['STATIC_PATH'] || '';
const DEBUGGING = global['DEBUGGING'] || true;
if(!DEBUGGING){
    __webpack_public_path__ = __webpack_require__.p = STATIC_PATH;
}
