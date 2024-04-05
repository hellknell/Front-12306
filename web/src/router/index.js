import {createRouter, createWebHistory} from 'vue-router'
import {notification} from "ant-design-vue";
import store from "@/store";


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/',
        name: 'Index',
        redirect: '/welcome',
        meta: {requiresAuth: true}, // 添加该字段，表示需要认证
        component: () => import('../views/MainView.vue'),
        children: [
            {
                path: 'welcome',
                name: 'Welcome',
                component: () => import('../views/main/WelComeView.vue')
            },
            {
                path: 'passenger',
                name: 'Passenger',
                component: () => import('../views/main/PassengerView.vue')
            }]
    }]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some((item) => {
        return item.meta?.requiresAuth;
    })) {
        console.log(store.state.member)
        let token = JSON.parse(localStorage.getItem("member")).token
        if (!token) {
            notification.error({description: "未登录或token已过期，请重新登录"})
            next('/login');
        } else {
            next()
        }
    } else {
        next();
    }
})


export default router
