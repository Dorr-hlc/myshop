import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import M from 'minimatch'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/login',
        name: 'login',
        component: Login
    }]
})