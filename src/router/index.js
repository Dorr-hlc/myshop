import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Right from '@/components/right/right'
import Role from '@/components/right/role'
import Goods from '@/components/goods/goods'
import Report from '@/components/reports/reports'
import goodsadd from '@/components/goods/goodsadd'
import { Message } from 'element-ui';
Vue.use(Router)
const router = new Router({
        mode: 'history',
        routes: [{
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/',
                name: 'home',
                component: Home,
                children: [{
                        path: '/users',
                        name: 'users',
                        component: Users
                    },
                    {
                        path: '/rights',
                        name: 'rights',
                        component: Right
                    },
                    {
                        path: '/roles',
                        name: 'roles',
                        component: Role
                    },
                    {
                        path: '/goods',
                        name: 'goods',
                        component: Goods
                    },
                    {
                        path: '/reports',
                        name: 'reports',
                        component: Report
                    },
                    {
                        path: '/goodsadd',
                        name: 'goodsadd',
                        component: goodsadd
                    },
                ]
            },
        ]
    })
    // 路由配置生效之前，统一判断token;路由守卫
router.beforeEach((to, from, next) => {
    // 如果去的是登录页
    if (to.path === '/login') {
        next()
    } else {
        const token = localStorage.getItem("token");
        if (!token) {
            Message.success('未登录')
            router.push({
                name: 'login'
            })
            return
        }
        next()
    }
})
export default router