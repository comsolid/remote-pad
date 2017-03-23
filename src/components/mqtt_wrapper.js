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
            lastCommandSent: null,
            message: {
                text: '',
                type: '',
                show: false
            }
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
            this.mqtt.client.subscribe(`message/${player}`)
            this.mqtt.client.subscribe(`profile/${player}`)

            const settings = JSON.stringify({pad: this.$store.state.pad})
            this.mqtt.client.publish(`settings/${player}`, settings)
        })

        this.mqtt.client.on('close', () => {
            console.info('Disconnected')
            this.mqtt.isConnected = false
        })

        this.mqtt.client.on('message', (topic, payload) => {
            if (topic === `message/${player}`) {
                const result = JSON.parse(payload.toString())
                this.message.text = result.message
                this.message.type = result.messageType
                this.message.show = true
            } else if (topic === `profile/${player}`) {
                const result = JSON.parse(payload.toString())
                this.$store.commit('updateProfile', result.profile)
            }
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
        },
        clearMessage () {
            this.message.text = ''
            this.message.type = ''
            this.message.show = false
        }
    },
    beforeDestroy () {
        clearInterval(this.interval)

        if (this.mqtt.client) {
            this.mqtt.client.end()
        }
    }
}
