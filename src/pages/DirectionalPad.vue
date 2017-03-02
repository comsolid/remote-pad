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
                    <div class="row-2-right">
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
import PadButton from '../components/pad/PadButton'
import TogglePadButton from '../components/TogglePad'
import Directional from '../components/pad/Directional'
import ConnectedIndicator from '../components/ConnectedIndicator'
import ModalMessage from '../components/ModalMessage'
import MqttWrapper from '../components/mqtt_wrapper'

export default {
    name: 'DirectionalPadPage',
    components: {
        PadButton,
        TogglePadButton,
        Directional,
        ConnectedIndicator,
        ModalMessage
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
            }
        }
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
            this.keypress.left = false
            this.keypress.right = false
        }
    }
}
</script>

<style lang="css" scoped>
.pad-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.row-1, .row-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
}
.row-2-right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.row-2-helper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50vh;
    margin: auto 20px;
}
</style>
