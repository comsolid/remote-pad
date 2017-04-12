import mqtt from 'mqtt'

export default {
    data () {
        return {
            mqtt: {
                client: null,
                isConnected: false
            }
        }
    },
    mounted () {
        const { hostname, port } = this.$store.state.mqtt
        const url = `ws://${hostname}:${port}`
        const player = this.$store.state.player
        if (!player) {
            this.$router.push({ path: '/config' })
            return false
        }
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
                this.$store.commit('showMessage', {
                    text: result.message,
                    type: result.messageType
                })
            } else if (topic === `profile/${player}`) {
                const result = JSON.parse(payload.toString())
                this.$store.commit('updateProfile', result.profile)
            }
        })

        window.addEventListener('beforeunload', () => {
            this.closeConnection()
        })
    },
    methods: {
        closeConnection () {
            if (this.mqtt.client) {
                this.mqtt.client.end()
            }
        }
    },
    beforeDestroy () {
        this.closeConnection()
    }
}
