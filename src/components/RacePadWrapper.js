
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
                down: false,
                start: false
            },
            lastCommandSent: null,
            interval: null
        }
    },
    mounted () {
        if (window.DeviceMotionEvent !== undefined) {
            window.addEventListener('devicemotion', this.onDeviceMotion, true)
        }
        // TODO: use $store.state.pad.type instead of hardcoded value!
        this.$store.commit('updatePadType', 'race')
        // Setup a 60fps interval - 15
        this.interval = setInterval(() => {
            this.send()
        }, 30)
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
        },
        isMinimalLayout () {
            return this.$store.state.pad.minimalLayout
        },
        onDeviceMotion (e) {
            this.acceleration.y = e.accelerationIncludingGravity.y || 0
        },
        send () {
            const command = JSON.stringify(this.keypress)
            if (this.mqtt.client &&
                this.$store.state.pad.enabled &&
                    command !== this.lastCommandSent) {
                // publishes only if the command change
                this.lastCommandSent = command
                const { player } = this.$store.state
                this.mqtt.client.publish(`pad/${player}`, command)
            }
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
        clearInterval(this.interval)
    }
}
