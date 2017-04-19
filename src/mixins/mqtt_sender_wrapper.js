
export default {
    props: ['mqtt'],
    data () {
        return {
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
    methods: {
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
    mounted () {
        // Setup a 60fps interval - 15
        this.interval = setInterval(() => {
            this.send()
        }, 30)
    },
    beforeDestroy () {
        clearInterval(this.interval)
    }
}
