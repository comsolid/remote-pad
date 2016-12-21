import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        player: 'alice',
        pad: {
            enabled: true,
            direction: null
        }
    }
})

export default store
