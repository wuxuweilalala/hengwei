import Vue from "vue";
import VueRouter from "vue-router";

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
    mode:"hash",
    // base: process.env.BASE_URL,
    routes
});

export default router;
