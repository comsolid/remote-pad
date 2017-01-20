import mqtt from 'mqtt'

export default {
    data () {
        return {
            topic: 'pad',
            interval: null,
            mqtt: {
                client: null,
                topic: '',
                isConnected: false
            },
            lastCommandSent: null
        }
    },
    mounted () {
        const { hostname, port } = this.$store.state.mqtt
        const url = `ws://${hostname}:${port}`
        const player = this.$store.state.player
        this.mqtt.topic = `${this.topic}/${player}`
        const options = {
            username: player,
            password: player
        }
        this.mqtt.client = mqtt.connect(url, options)

        // TODO: verificar metodo on('error'...
        this.mqtt.client.on('error', (error) => {
            console.log('Error', error)
            this.$router.push({ path: '/config' })
        })

        this.mqtt.client.on('connect', () => {
            console.info(`Connected to ${url}`)
            this.mqtt.isConnected = true
            this.mqtt.client.subscribe(this.mqtt.topic)

            const settings = JSON.stringify({pad: this.$store.state.pad})
            this.mqtt.client.publish(`settings/${player}`, settings)
        })

        this.mqtt.client.on('close', () => {
            console.info('Disconnected')
            this.mqtt.isConnected = false
        })

        // Setup a 60fps interval - 15
        this.interval = setInterval(() => {
            this.send()
        }, 30)
    },
    methods: {
        send () {
            const command = JSON.stringify(this.keypress)
            if (this.$store.state.pad.enabled &&
                    command !== this.lastCommandSent) {
                // publishes only if the command change
                this.lastCommandSent = command
                this.mqtt.client.publish(this.mqtt.topic, command)
            }
        }
    },
    beforeDestroy () {
        clearInterval(this.interval)

        if (this.mqtt.client) {
            this.mqtt.client.end()
        }
    }
}
