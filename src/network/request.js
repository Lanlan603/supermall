// Promise
import axios from 'axios'

export function request(config) {
    // 创建axios 实例 
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2. axios的拦截器

    instance.interceptors.request.use(config => {
        return config
    }, err => {})

    // 2.2 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)

}