// import vue router
import { createRouter, createWebHistory } from 'vue-router'
import Cookie from 'js-cookie'

const getToken = () => {
    return Cookie.get('token')
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// guard navigation
router.beforeEach((to, from, next) => {
    // get token user
    const token = getToken()

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({ name: 'login' })        
    }
    // Jika rute tujuan adalah halaman login atau register tapi pengguna sudah login
    else if ((to.name === 'login' || to.name === 'register') && token) {
        next({ name: 'dashboard'})
    }
    else {
        next()
    }
})

export default router
