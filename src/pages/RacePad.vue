<template lang="html">
    <section class="hero is-primary is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <direction position="left" :turning="isTurningLeft"></direction>
                <buttons :yAxis="acceleration.y">
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
                </buttons>
                <direction position="right" :turning="isTurningRight"></direction>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import Direction from '../components/pad/Direction'
import Buttons from '../components/pad/Buttons'
import PadButton from '../components/pad/PadButton'
import mqtt from 'mqtt'

export default {
    name: 'RacePadPage',
    components: {
        Direction,
        Buttons,
        PadButton
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
                right: false
            },
            interval: null,
            mqtt: {
                client: null,
                topic: '',
                profile: 'race'
            }
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
        this.mqtt.client = mqtt.connect(url)

        // TODO: verificar metodo on('error'...
        this.mqtt.client.on('error', (error) => {
            console.log('Error', error)
            this.$router.push({ path: '/config' })
        })

        this.mqtt.client.on('connect', () => {
            console.log(`Connected to ${url}`)
            this.mqtt.client.subscribe(this.mqtt.topic)
        })

        this.mqtt.client.on('close', function () {
            console.log('disconnected')
        })

        // Setup a 60fps interval - 15
        this.interval = setInterval(() => {
            this.send()
        }, 100)
    },
    methods: {
        touchstart (command) {
            Vue.set(this.keypress, command, true)
        },
        touchend (command) {
            Vue.set(this.keypress, command, false)
        },
        send () {
            if (this.$store.state.pad.enabled) {
                this.mqtt.client.publish(this.mqtt.topic, JSON.stringify(this.keypress))
            }
        }
    },
    computed: {
        isTurningLeft () {
            Vue.set(this.keypress, 'left', this.acceleration.y < -2)
            return this.keypress.left
        },
        isTurningRight () {
            Vue.set(this.keypress, 'right', this.acceleration.y > 2)
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
</style>
