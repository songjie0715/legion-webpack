/**
 * Created by languid on 2016/4/4.
 */

import random from 'src/utils/random';

export default {
    categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    data: [{
        name: '新顾客',
        data: random.randomList(7, 1000, 200)
    }, {
        name: '进店2次',
        data: random.randomList(7, 400, 100)
    }, {
        name: '进店3~5次',
        data: random.randomList(7, 300, 100)
    }, {
        name: '进店5次以上',
        data: random.randomList(7, 200, 50)
    }]
}
