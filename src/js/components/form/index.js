/**
 * Created by Yinxiong on 2016/10/12.
 */

export * from './const';
export * from './extends';
export {default as FormModel} from './Model';

export function get(...rest){
    return Object.assign({}, ...rest);
}