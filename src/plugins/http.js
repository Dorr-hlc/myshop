//插件模块
const MyHttpServer = {}
import axios from 'axios'
MyHttpServer.install = (Vue) => {
    // 4. 添加实例方法
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    Vue.prototype.$http = axios
}
export default MyHttpServer