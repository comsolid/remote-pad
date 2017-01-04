<template lang="html">
    <section class="hero is-light is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <transition appear appear-active-class="animated slideInLeft">
                    <Direction position="left"
                        :turning="isTurningLeft"></Direction>
                </transition>
                <Buttons :yAxis="acceleration.y">
                    <ConnectedIndicator slot="indicator"
                        :isConnected="mqtt.isConnected"></ConnectedIndicator>
                    <PadButton slot="Y" text="Y" size="sm"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <PadButton slot="X" text="X" size="sm"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <PadButton slot="B" text="B" size="md"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <PadButton slot="A" text="A" size="md"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <div slot="up-down-buttons" class="up-down-buttons"
                        v-show="!isMinimalLayout()">
                        <PadButton text="up" size="xs"
                            :touchstart="touchstart"
                            :touchend="touchend"></PadButton>
                        <PadButton text="down" size="xs"
                            :touchstart="touchstart"
                            :touchend="touchend"></PadButton>
                    </div>
                </Buttons>
                <transition appear appear-active-class="animated slideInRight">
                    <Direction position="right" :turning="isTurningRight"></Direction>
                </transition>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import Direction from '../components/pad/Direction'
import Buttons from '../components/pad/Buttons'
import PadButton from '../components/pad/PadButton'
import ConnectedIndicator from '../components/ConnectedIndicator'
import mqtt from 'mqtt'

export default {
    name: 'RacePadPage',
    components: {
        Direction,
        Buttons,
        PadButton,
        ConnectedIndicator
    },
    data () {
        return {
            topic: 'race',
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
            },
            interval: null,
            mqtt: {
                client: null,
                topic: '',
                profile: 'race',
                isConnected: false
            },
            lastCommandSent: null
        }
    },
    mounted () {
        if (window.DeviceMotionEvent !== undefined) {
            window.ondevicemotion = (e) => {
                this.acceleration.y = e.accelerationIncludingGravity.y || 0
            }
        }
        const { hostname, port } = this.$store.state.mqtt
        const url = `ws://${hostname}:${port}`
        const player = this.$store.state.player
        this.mqtt.topic = `${this.mqtt.profile}/${player}`
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
            console.log(`Connected to ${url}`)
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
        touchstart (command) {
            Vue.set(this.keypress, command, true)
        },
        touchend (command) {
            Vue.set(this.keypress, command, false)
        },
        send () {
            const command = JSON.stringify(this.keypress)
            if (this.$store.state.pad.enabled &&
                    command !== this.lastCommandSent) {
                // publishes only if the command change
                this.lastCommandSent = command
                this.mqtt.client.publish(this.mqtt.topic, command)
            }
        },
        isMinimalLayout () {
            return this.$store.state.pad.minimalLayout
        }
    },
    computed: {
        isTurningLeft () {
            const { accelerationSensibility } = this.$store.state
            Vue.set(this.keypress, 'left', this.acceleration.y < accelerationSensibility * -1)
            return this.keypress.left
        },
        isTurningRight () {
            const { accelerationSensibility } = this.$store.state
            Vue.set(this.keypress, 'right', this.acceleration.y > accelerationSensibility)
            return this.keypress.right
        }
    },
    beforeDestroy () {
        clearInterval(this.interval)

        if (this.mqtt.client) {
            this.mqtt.client.end()
        }
    }
}
</script>

<style lang="css">
.pad-container {
    display: flex;
    min-height: 100vh;
}
.up-down-buttons {
    display: flex;
    flex-direction: column;
}
</style>
