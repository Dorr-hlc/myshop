//插件模块
const MyHttpServer = {}
import axios from 'axios'
MyHttpServer.install = (Vue) => {
    // 除了登录之外的所有的请求都需要请求头部
    // 4. 添加实例方法
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    Vue.prototype.$http = axios

    // 在请求发起之前会先来到下面的回调函数
    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        console.log('拦截器被触发');
        if (config.url !== '/login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers.common["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

}
export default MyHttpServer