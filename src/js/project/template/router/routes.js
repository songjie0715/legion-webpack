/**
 * Created by Yinxiong on 2016/10/28.
 */

import {makeNavRoutes, makeVueRoutes} from '../../../frameworks/basic/utils/routes';

export const routes = [{
    category: true,
    text: '布局'
}, {
    path: '/',
    text: '仪表盘',
    icon: 'dashboard',
    exact: true,
    component: require('../controllers/HomeView.vue')
}, {
    path: '/typography',
    text: '文字',
    icon: 'font',
    component: require('../controllers/Typography.vue')
}, {
    group: true,
    text: '层级菜单',
    icon: 'group',
    list: [{
        path: '/lazy-view',
        text: '异步页面',
        component: ()=>System.import('../controllers/LazyView.vue')
    }, {
        path: '/sub-routes',
        linkPath: '/sub-routes/sub-1',
        text: '子页面',
        component: require('../controllers/subRoute/SubRouteView.vue'),
        children: [{
            path: 'sub-1',
            component: require('../controllers/subRoute/SubRoute1View.vue')
        }, {
            path: 'sub-2',
            component: ()=>System.import('../controllers/subRoute/SubRoute2View.vue')
        }]
    }]
}, {
    category: true,
    text: '基础元素'
}, {
    group: true,
    text: 'UI组件',
    icon: 'list',
    list: [{
        path: '/component/card',
        text: 'Card',
        component: require('../controllers/components/Card.vue')
    }, {
        path: '/component/nav',
        text: 'Nav',
        component: require('../controllers/components/Nav.vue')
    }, {
        path: '/component/tree',
        text: 'Tree List',
        component: require('../controllers/components/Tree.vue')
    }, {
        path: '/component/form',
        text: 'Form',
        component: require('../controllers/components/Form.vue')
    }, {
        path: '/component/chart',
        text: 'Chart',
        component: require('../controllers/components/Chart.vue')
    }, {
        path: '/component/modal',
        text: 'Modal',
        component: require('../controllers/components/Modal.vue')
    }, {
        path: '/component/flyout',
        text: 'Flyout',
        component: require('../controllers/components/Flyout.vue')
    }, {
        path: '/component/pagination',
        text: 'Pagination',
        component: require('../controllers/components/Pagination.vue')
    }, {
        path: '/component/notify',
        text: 'Notify',
        component: require('../controllers/components/Notify.vue')
    }]
}, {
    group: true,
    text: '复合组件',
    icon: 'list',
    list: [
        {
            path: '/map/baidu',
            text: '地图',
            icon: 'map',
            component: require('../controllers/Map.vue')
        }
    ]
}];

export const routesForNav = makeNavRoutes(routes);
export const routesForVue = makeVueRoutes(routes);