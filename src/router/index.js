// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
//商品
import Product from '@/views/product/Product'
//品牌
import BrandMana from '@/views/product/BrandMana'
//属性
import Attributes from '@/views/product/Attributes'
//分类 Category
import Category from '@/views/product/Category'
//属性分类
import AttributeCate from '@/views/product/AttributeCate'
// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [
        {
            path: '/product/Product',
            name: '商品管理',
            component: Product,
            meta: {
                requireAuth: true
            },
        },
        {
            path: '/product/BrandMana',
            name: '品牌管理',
            component: BrandMana,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/product/Attributes',
            name: '属性管理',
            component: Attributes,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/product/Category',
            name: '商品分类',
            component: Category,
            meta: {
                requireAuth: true
            },
        },{
            path: '/product/AttributeCate',
            name: '属性分类',
            component: AttributeCate,
            meta: {
                requireAuth: true
            },
        }
    ]
    }]
})