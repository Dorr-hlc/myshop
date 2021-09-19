// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
import myBread from '@/components/cuscom/myBread.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
Vue.config.productionTip = false

// 全局过滤器
Vue.filter('formdata', (v) => {
    v = v * 1000
    return moment(v).format('YYYY-MM-DD')
})
Vue.use(element)
Vue.use(MyHttpServer)
    // 全局组件
Vue.component('myBread', myBread)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})