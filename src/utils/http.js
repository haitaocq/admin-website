import axios from 'axios'
import store from '../store'
import * as types from '../store/types'
import router from '../router'

// axios 配置
const timeout = 30000;
const baseURL = (() => {
    const nodeEnv = process.env.NODE_ENV
    if(nodeEnv == 'development') {
        return 'http://localhost/jyfund-web';
    } else if(nodeEnv == 'production'){
        return '';
    } else if(nodeEnv == 'testenv'){
        return '';
    } else {
        throw new Error("NODE_ENV is not defined");
    }
});

const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
instance.interceptors.response.use(
    response => {
        
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response)
    });


const http = {}
/**
 * get:从服务器取回数据（只是取回数据，而不会产生其他的影响）。这是一个幂等的方法
 * @param url
 * @param params
 * @returns {Promise}
 */
http.get = function(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
                params: params
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * POST请求通常用来创建一个实体，也就是一个没有ID的资源。一旦这个请求成功执行了，就会在HTTP请求的响应中，返回这个新创建的实体的id
 * @param url
 * @param data
 * @returns {Promise}
 */
http.post = function(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}

/**
 * PUT请求和POST请求类似，但是一般用来更新一个已有的实体。
 * @param url
 * @param data
 * @returns {Promise}
 */
http.put = function(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.put(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}

/**
 * patch类似PUT，局部更新实体
 * @param url
 * @param data
 * @returns {Promise}
 */
http.patch = function(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.patch(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}

/**
 * DELETE方法用来从服务器上删除资源。
 * @param url
 * @param data
 * @returns {Promise}
 */
http.delete = function(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.delete(url, {params})
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}

export default http
