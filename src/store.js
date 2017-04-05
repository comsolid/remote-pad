import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import { mutations } from './store/mutations'
import { getters } from './store/getters'
import initialState from './store/state'

Vue.use(Vuex)

const store = new Vuex.Store({
    mutations,
    getters,
    plugins: [
        createPersist({
            namespace: 'remote-pad',
            initialState
        })
    ]
})

export default store
