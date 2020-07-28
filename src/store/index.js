import center from '../../public/mapJson/center'

export default {
  namespaced: true,
  state: {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      resizeTimer: null,
      userInfo:'',  //用户信息
      center: [],
      posCode: '',
      mapList: [],
  },
  getters: {
      vw: (state) => state.screenWidth / 100,
      vh: (state) => state.screenHeight / 100,
      getScreenWidth: (state) => state.screenWidth,
      getScreenHeight: (state) => state.screenHeight,
      getVw: (state) => (n) => state.screenWidth / 1920 * n,
      getVh: (state) => (n) => state.screenHeight / 969 * n,
      vwToPx: (state, getters) => (n) => getters.vw * n,
      vhToPx: (state, getters) => (n) => getters.vh * n,
      getUserInfo:(state)=>state.userInfo,
      getMapCenter: (state) => {
          if(sessionStorage.getItem('mapCenter') !== null) {
              return JSON.parse(sessionStorage.getItem('mapCenter'))
          } else {
              return state.center
          }
      },
      getPosCode: (state) => {
          return state.posCode
      },
      getMapList: (state) => {
          return state.mapList
      }
  },
  mutations: {
      setScreenWidth(state, width) {
          state.screenWidth = width;
      },
      setScreenHeight(state, height) {
          state.screenHeight = height;
      },
      setUserInfo(state, params){
          state.userInfo = params;
      },
      setMapCenter(state, params) {
          state.center = params
          sessionStorage.setItem('mapCenter', JSON.stringify(state.center))
      },
      setPosCode(state, params) {
          state.posCode = params
      },
      setMapList(state, params) {
          state.mapList = params
      },

  },
  actions: {
    resizeASync: ({ state, commit }, params) => {
      if (state.resizeTimer) clearTimeout(state.resizeTimer);
      state.resizeTimer = setTimeout(() => {
        commit('setScreenWidth', params.width);
        commit('setScreenHeight', params.height);
      }, 500);
    }
  },
  modules: {}
}
