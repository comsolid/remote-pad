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
        },
        showMessage (state, {text, type}) {
            state.message.text = text
            state.message.type = type
            state.message.show = true
        },
        clearMessage (state) {
            state.message.text = ''
            state.message.type = ''
            state.message.show = false
        }
    },
    getters: {
        laf (state) {
            try {
                return require(`./store/laf/${state.pad.type}/${state.profile}`)
            } catch (err) {
                return require(`./store/laf/${state.pad.type}/default`)
            }
        },
        layouts (state) {
            try {
                return require(`./store/layouts/${state.pad.type}/${state.profile}`)
            } catch (e) {
                return []
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
                profile: 'default',
                message: {
                    text: '',
                    type: '',
                    show: false
                }
            }
        })
    ]
})

export default store
