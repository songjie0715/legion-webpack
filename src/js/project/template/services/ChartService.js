/**
 * Created by Administrator on 2016/10/29.
 */

import ModelService from '../../../services/ModelService';

class Service extends ModelService {
    getType(name){
        return this.send(`${this.url}/${name}`)
    }
}

export default new Service('chart');