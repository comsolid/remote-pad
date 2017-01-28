<template lang="html">
    <section class="hero is-light is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <div class="row-1">
                    <PadButton text="B" size="sm"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <div>
                        <TogglePadButton></TogglePadButton>
                        <router-link to="/config"
                            class="button is-inverted is-medium">
                            <span class="icon">
                                <span class="fa fa-cog"></span>
                            </span>
                            <span>Config</span>
                        </router-link>
                    </div>
                    <PadButton text="X" size="sm"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                </div>
                <div class="row-2">
                    <Directional
                        :left="keypress.left"
                        :right="keypress.right"
                        :up="keypress.up"
                        :down="keypress.down"
                        :pan="pan"
                        :panend="panend" />
                    <div class="row-2-helper">
                        <PadButton slot="Y" text="Y" size="sm"
                            :touchstart="touchstart"
                            :touchend="touchend"></PadButton>
                        <ConnectedIndicator slot="indicator"
                            :isConnected="mqtt.isConnected"></ConnectedIndicator>
                    </div>
                    <PadButton text="A" size="md"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import PadButton from '../components/pad/PadButton'
import TogglePadButton from '../components/TogglePad'
import Directional from '../components/pad/Directional'
import ConnectedIndicator from '../components/ConnectedIndicator'
import MqttWrapper from '../components/mqtt_wrapper'

export default {
    name: 'DirectionalPadPage',
    components: {
        PadButton,
        TogglePadButton,
        Directional,
        ConnectedIndicator
    },
    extends: MqttWrapper,
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
                down: false
            },
            mqtt: {
                client: null,
                topic: '',
                profile: 'race',
                isConnected: false
            }
        }
    },
    methods: {
        touchstart (command) {
            Vue.set(this.keypress, command, true)
        },
        touchend (command) {
            Vue.set(this.keypress, command, false)
        },
        pan (command, opposite) {
            Vue.set(this.keypress, command, true)
            // guarantee that opposite buttons can't be enabled
            // at the same time
            Vue.set(this.keypress, opposite, false)
        },
        panend () {
            Vue.set(this.keypress, 'up', false)
            Vue.set(this.keypress, 'down', false)
            Vue.set(this.keypress, 'left', false)
            Vue.set(this.keypress, 'right', false)
        }
    }
}
</script>

<style lang="css" scoped>
.pad-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.row-1, .row-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
}
.row-2-helper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 50vh;
}
</style>
