import {get } from './request'
// 地域分类
function getRegion() {
    return new Promise((resolve, reject) => {
        get('/i101inspectsumary', {})
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 监测区域内污染情况一览
function getPollution() {
    return new Promise((resolve, reject) => {
        get('/i102pollsumary', {})
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 污染源预警实时一览
function getRealTimePollutionSource() {
    return new Promise((resolve, reject) => {
        get('/i103pollrealdata', {
                pageSize: 1, // 页数
                pageTotal: 10, // 一页的条数
                totalSize: 10, // 总页数
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 污染削减率
function getPollutionReduction() {
    return new Promise((resolve, reject) => {
        get('/i105pollreducerate', {})
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 任务实时更新列表
function getTaskList() {
    return new Promise((resolve, reject) => {
        get('/i106tasksumary', {})
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 监控点上传率概况
function getMonitorUpload() {
    return new Promise((resolve, reject) => {
        get('/i104uploadrate', {})
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 污染消减率企业搜索
function getEnterpriseList(params) {
    return new Promise((resolve, reject) => {
        get('/i108searchreducecompany', {
                '企业名称': params,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export {
    getRegion,
    getPollution,
    getRealTimePollutionSource,
    getPollutionReduction,
    getTaskList,
    getMonitorUpload,
    getEnterpriseList
}