// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import router from './router'
import store from './store'

import 'bulma'
import 'animate.css'
import './assets/custom-fonts/style.css'

Vue.use(VueRouter)
Vue.use(VueTouch, {name: 'v-touch'})

/* eslint-disable no-new */
new Vue(Vue.util.extend({
    router,
    store
}, App)).$mount('#app')
