/**
 * Created by languid on 2016/4/4.
 */
import random from 'src/utils/random';

export default {
    data:[{
        name: '新顾客',
        data: [{
            name: '30分钟以下',
            value: random.random(100, 200)
        }, {
            name: '30~60分钟',
            value: random.random(100, 200)
        }, {
            name: '60~120分钟',
            value: random.random(100, 200)
        }, {
            name: '120分钟以上',
            value: random.random(100, 200)
        }]
    }, {
        name: '进店2次',
        data: [{
            name: '30~60分钟',
            value: random.random(40, 300)
        }]
    }, {
        name: '进店3次以上',
        data: [{
            name: '30分钟以下',
            value: random.random(40, 40)
        }, {
            name: '30~60分钟',
            value: random.random(40, 40)
        }, {
            name: '60~120分钟',
            value: random.random(40, 40)
        }]
    }]
}