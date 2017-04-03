
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'laf'
        ])
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
        this.$store.commit('updatePadType', 'directional')
    }
}
