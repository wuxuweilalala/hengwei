import axios from "axios";

const BASEURL = process.env.NODE_ENV === 'production' ? 'http://silo.howaycloud.com:8801/company/dlv/' : '/devApi';
const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000
});

service.interceptors.request.use(function(config) {
    // config.headers={
    //     // Authorization:sessionStorage.getItem('Authorization'),
    //     'Content-Type':'application/json;charset=UTF-8',
    // };
    return config;
}, function(error) {
    return Promise.reject(error);
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function changeParams(params) {
    let param = {}
    let userName = sessionStorage.getItem('userName')
    let password = sessionStorage.getItem('password')
    for (let i in params) {
        param[`param.${i}`] = params[i]
    }
    param['param.userName'] = userName
    param['param.password'] = password
    return param
}

function get(url, params = {}) {
    if(url !== '/i001login') {
        params = changeParams(params)
    }
    return new Promise((resolve, reject) => {
        service
            .get(url, {
                params: {
                    ...params,
                    t: Date.now()
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function del(
    url,
    data = {
        data: {}
    }
) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            data
        }).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}
export {
    get,
    post,
    patch,
    put,
    del,
    service
}
