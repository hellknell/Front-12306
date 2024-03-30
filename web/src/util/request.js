import axios from 'axios'
import store from "@/store";
import {notification} from "ant-design-vue";
import router from "@/router";

// 创建可一个新的axios对象
const request = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,   // 后端的接口地址  ip:port
    timeout: 30000                          // 30s请求超时
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let token = JSON.parse(localStorage.getItem('member'));
    config.headers.token = token.token;
    return config
}, error => {
    console.error('request error: ' + error) // for debug
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;

        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        const response = error.response;
        const data = response.status;
        if (data === 401) {
            store.commit("setMember", {});
            notification.error({
                message: '错误',
                description: '登录已过期，请重新登录',
            })
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export default request