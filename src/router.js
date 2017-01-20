import HomePage from './pages/Home'
import AboutPage from './pages/About'
import RacePadPage from './pages/RacePad'
import DirectionalPadPage from './pages/DirectionalPad'
import ConfigPage from './pages/Config'
import VueRouter from 'vue-router'

const routes = [
    { path: '/home', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/race-pad', component: RacePadPage },
    { path: '/directional-pad', component: DirectionalPadPage },
    { path: '/config', component: ConfigPage },
    { path: '/', redirect: '/home' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
