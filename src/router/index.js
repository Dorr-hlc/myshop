import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import Right from '@/components/right/right'
import Role from '@/components/right/role'
Vue.use(Router)

export default new Router({
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
                    path: 'users',
                    name: 'users',
                    component: Users
                },
                {
                    path: 'right',
                    name: 'right',
                    component: Right
                },
                {
                    path: 'role',
                    name: 'role',
                    component: Role
                }
            ]
        },
    ]
})