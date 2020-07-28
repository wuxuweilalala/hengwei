import Vue from "vue";
import VueRouter from "vue-router";
import {store} from '../store/store'
import de from "element-ui/src/locale/lang/de";
import center from "../../public/mapJson/center";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: '/atmosphere'
    },
    {
        path: '/effluent',
        meta: {
            index: 2,
            name: '企业废水综合监管'
        },
        component: () => import('../views/effluent/index.vue')
    },
    {
        path: '/waste',
        meta: {
            index: 2,
            name: '企业废气综合监管',
        },
        component: () => import('../views/wasteGas/index.vue')
    },
    {
        meta: {
            index: 0,
            name: '大气环境综合监管'
        },
        path: '/atmosphere',
        component: () => import('../views/atmosphere/index.vue')
    },
    {
        meta: {
            index: 1,
            name: '水环境综合监管'
        },

        path: '/environment',
        component: () => import('../views/environment/index.vue')
    },

    {
        meta: {
            index: 3,
            name: '噪声辐射综合监管'
        },
        path: '/noise',
        component: () => import('../views/noise/index.vue')
    },


    {
        meta: {
            name: '表格页面'
        },
        path: '/table',
        component: () => import('../views/table/index.vue')
    },

];
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    // mode: "history",
    mode: "hash",
    // base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    // let params=  window.location.href.split('?')[1]
    let userName = getUrlKey('userName')|| sessionStorage.getItem('userName')
    let password = getUrlKey('password')|| sessionStorage.getItem('password')
    // console.log('store.getters', store.getters['index/getUserInfo'])
    let userInfo =  store.getters['index/getUserInfo']
    // console.log('userInfo',userInfo)
   if (userName && password) {
       // console.log('11111111')
       if(sessionStorage.getItem('isFirstEnter') === null) {
           sessionStorage.setItem('isFirstEnter', JSON.stringify(true))
       }

       if(!userInfo || sessionStorage.getItem('isFirstEnter')){  //如没有用户信息
           let param={
               'param.userName': userName,
               'param.password': password,
           }
           Vue.prototype.$get('/i001login',param).then(res=>{
               // console.log('res', res)
               if(res.code !== 'E01') {
                   sessionStorage.setItem('userName', res.data.userName)
                   sessionStorage.setItem('password',password)
                   store.commit('index/setUserInfo', res.data)
                   // console.log('params', params, center)
                   for (let i = 0; i < center.length; i++) {
                       let c = center[i]
                       if(c.name == res.data.area) {
                           store.commit('index/setMapCenter', c.center)
                       }
                   }
                   sessionStorage.setItem('isFirstEnter', JSON.stringify(false))
                   next();
               } else {
                   alert(res.err_msg)
               }
           })
       }else{ //有则直接跳转
           next();
       }
    } else {
        alert('没有登录')
    }
    // [{adcode:'440303',name:'罗湖区'},{adcode:'440304',name:'福田区'},{adcode:'440305',name:'南山区'},{adcode:'440306',name:'宝安区'},{adcode:'440307',name:'龙岗区'},{adcode:'440308',name:'盐田区'},{adcode:'440309',name:'龙华区'},{adcode:'440310',name:'坪山区'},{adcode:'440311',name:'光明区'}]
    // to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//     const route = ['index', 'list'];
// // 未登录状态；当路由到route指定页时，跳转至login
// //     if (route.indexOf(to.name) >= 0) {
// //         if (isLogin == null) {
// //             router.push({ path: '/login', });
// //         }
// //     }
// // 已登录状态；当路由到login时，跳转至home
//     console.log(to.name)
//     localStorage.setItem('routerName', to.name)
//     if (to.name === 'login') {
//         if (isLogin != null) {
//             router.push({ path: '/HomeMain', });;
//         }
//     }
//     next();
});

function getUrlKey(name) {  //获取url 参数
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export default router;
