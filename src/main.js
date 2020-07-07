import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import {Pagination,DatePicker} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/css/_reset.scss'
import '../src/assets/css/base.scss'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import {get, post, patch, put, del } from './utils/request'

Vue.config.productionTip = false;
import axios from "axios";
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$del = del
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios).use(Pagination).use(DatePicker).use(VueAwesomeSwiper)
new Vue({
    router,
    store,
    // App,
    render: h => h(App)
}).$mount("#app");