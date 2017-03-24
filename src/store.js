import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

const store = new Vuex.Store({
    mutations: {
        config (state, payload) {
            state.player = payload.player
            state.mqtt = payload.mqtt
            state.pad = payload.pad
            state.accelerationSensibility = payload.accelerationSensibility
        },
        togglePad (state) {
            state.pad.enabled = !state.pad.enabled
        },
        updateProfile (state, profile) {
            state.profile = profile
        },
        updatePadType (state, type) {
            state.pad.type = type
        }
    },
    getters: {
        laf (state) {
            switch (state.profile) {
            case 'n64--default':
                return require(`./store/laf/${state.pad.type}/n64--default`)
            case 'psx--default':
                return require(`./store/laf/${state.pad.type}/psx--default`)
            case 'snes--default':
                return require(`./store/laf/${state.pad.type}/snes--default`)
            default:
                return require(`./store/laf/${state.pad.type}/default`)
            }
        }
    },
    plugins: [
        createPersist({
            namespace: 'remote-pad',
            initialState: {
                player: 'alice',
                pad: {
                    enabled: false,
                    type: 'race'
                },
                mqtt: {
                    hostname: window.location.hostname,
                    port: 1884
                },
                accelerationSensibility: 4,
                profile: ''
            }
        })
    ]
})

export default store
