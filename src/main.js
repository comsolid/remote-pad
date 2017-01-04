// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'

import './assets/style.sass'
import 'animate.css'

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue(Vue.util.extend({
    router,
    store
}, App)).$mount('#app')
