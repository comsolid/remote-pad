
export default {
    data () {
        return {
            acceleration: {
                y: 0
            },
            keypress: {
                Y: false,
                X: false,
                B: false,
                A: false,
                left: false,
                right: false,
                up: false,
                down: false
            }
        }
    },
    mounted () {
        if (window.DeviceMotionEvent !== undefined) {
            window.addEventListener('devicemotion', this.onDeviceMotion, true)
        }
    },
    methods: {
        touchstart (command) {
            this.keypress[command] = true
        },
        touchend (command) {
            this.keypress[command] = false
        },
        isMinimalLayout () {
            return this.$store.state.pad.minimalLayout
        },
        onDeviceMotion (e) {
            this.acceleration.y = e.accelerationIncludingGravity.y || 0
        }
    },
    computed: {
        isTurningLeft () {
            const { accelerationSensibility } = this.$store.state
            this.keypress.left = this.acceleration.y < accelerationSensibility * -1
            return this.keypress.left
        },
        isTurningRight () {
            const { accelerationSensibility } = this.$store.state
            this.keypress.right = this.acceleration.y > accelerationSensibility
            return this.keypress.right
        }
    },
    beforeDestroy () {
        window.removeEventListener('devicemotion', this.onDeviceMotion, true)
    }
}
