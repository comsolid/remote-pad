
export const mutations = {
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
    },
    toggleStart (state) {
        state.pad.startEnable = !state.pad.startEnable
    }
}
