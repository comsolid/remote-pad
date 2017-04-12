
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'laf'
        ]),
        startEnable () {
            return this.$store.state.pad.startEnable
        }
    },
    methods: {
        touchstart (command) {
            this.keypress[command] = true
        },
        touchend (command) {
            this.keypress[command] = false
        },
        pan (command, opposite) {
            this.keypress[command] = true
            // guarantee that opposite buttons can't be enabled
            // at the same time
            this.keypress[opposite] = false
        },
        panend () {
            this.keypress.up = false
            this.keypress.down = false
            this.keypress.left = false
            this.keypress.right = false
        }
    },
    mounted () {
        // TODO: use $store.state.pad.type instead of hardcoded value!
        this.$store.commit('updatePadType', 'directional')
    }
}
