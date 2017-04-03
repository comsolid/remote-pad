
export const getters = {
    laf (state) {
        try {
            return require(`./laf/${state.pad.type}/${state.profile}`)
        } catch (err) {
            return require(`./laf/${state.pad.type}/default`)
        }
    },
    layouts (state) {
        try {
            return require(`./layouts/${state.pad.type}/${state.profile}`)
        } catch (e) {
            return []
        }
    }
}
