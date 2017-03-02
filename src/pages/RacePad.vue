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
        <modal-message
            :message="message.text"
            :messageType="message.type"
            :isActive="message.show"
            @close="clearMessage"
        ></modal-message>
    </section>
</template>

<script>
import Vue from 'vue'
import Direction from '../components/pad/Direction'
import Buttons from '../components/pad/Buttons'
import PadButton from '../components/pad/PadButton'
import ConnectedIndicator from '../components/ConnectedIndicator'
import ModalMessage from '../components/ModalMessage'
import MqttWrapper from '../components/mqtt_wrapper'

export default {
    name: 'RacePadPage',
    components: {
        Direction,
        Buttons,
        PadButton,
        ConnectedIndicator,
        ModalMessage
    },
    extends: MqttWrapper,
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
            Vue.set(this.keypress, command, true)
        },
        touchend (command) {
            Vue.set(this.keypress, command, false)
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
        window.removeEventListener('devicemotion', this.onDeviceMotion, true)
    }
}
</script>

<style lang="css" scoped>
.pad-container {
    display: flex;
    min-height: 100vh;
}
.up-down-buttons {
    display: flex;
    flex-direction: column;
}
</style>
