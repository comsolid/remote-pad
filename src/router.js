import HomePage from './pages/Home'
import AboutPage from './pages/About'
import VueRouter from 'vue-router'

const routes = [
    { path: '/home', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
