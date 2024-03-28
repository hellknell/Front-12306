import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/index',
        name: 'Index',

        component: () => import('../views/MainView.vue'),
        children: [
            {
                path: '/index/home',
                name: 'Home',
                component: () => import('../views/LoginView.vue')
            }

        ]
    }]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
