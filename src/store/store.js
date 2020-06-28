import Vue from "vue";
import Vuex from "vuex";
import index from './index.js';
import effluent from "./effluent";
Vue.use(Vuex);


export const store = new Vuex.Store({
    modules: {
        index,
        effluent
    }
});
