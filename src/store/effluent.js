export default {
    namespaced: true,
    state: {
       pieValue:null,//监测区域内监测情况概述选中值
    },
    getters: {
    getPieValue:state=> state.pieValue
    },
    mutations: {
        setPieValue(state, value) {//监测区域内监测情况概述选中值
            state.pieValue = value;
        },
    },
    actions: {

    },
    modules: {}
}