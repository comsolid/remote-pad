import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        player: 'alice',
        pad: {
            enabled: false,
            type: 'race',
            profile: 'snes--top_gear',
            minimalLayout: true
        },
        mqtt: {
            hostname: window.location.hostname,
            port: 1884
        },
        accelerationSensibility: 2
    },
    mutations: {
        config (state, payload) {
            state.player = payload.player
            state.mqtt = payload.mqtt
            state.pad = payload.pad
            state.accelerationSensibility = payload.accelerationSensibility
        },
        togglePad (state) {
            state.pad.enabled = !state.pad.enabled
        }
    }
})

export default store
