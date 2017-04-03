<template lang="html">
    <section class="hero is-light is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <transition appear appear-active-class="animated slideInLeft">
                    <Direction position="left"
                        :bgColor="laf.left.bgColor"
                        :fgColor="laf.left.fgColor"
                        :turning="isTurningLeft"></Direction>
                </transition>
                <Buttons :yAxis="acceleration.y">
                    <ConnectedIndicator slot="indicator"
                        :isConnected="mqtt.isConnected"></ConnectedIndicator>
                    <PadButton slot="Y" keyb="Y" size="sm"
                        :label="laf.btnY.label"
                        :bgColor="laf.btnY.bgColor"
                        :fgColor="laf.btnY.fgColor"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <PadButton slot="X" keyb="X" size="sm"
                        :label="laf.btnX.label"
                        :bgColor="laf.btnX.bgColor"
                        :fgColor="laf.btnX.fgColor"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <PadButton slot="B" keyb="B" size="md"
                        :label="laf.btnB.label"
                        :bgColor="laf.btnB.bgColor"
                        :fgColor="laf.btnB.fgColor"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <pad-multi-button slot="A" keyb="A"
                        :label="laf.btnA.label"
                        :bgColor="laf.btnA.bgColor"
                        :fgColor="laf.btnA.fgColor"
                        :up="keypress.up"
                        :down="keypress.down"
                        :touchstart="touchstart"
                        :touchend="touchend"
                        :pan="pan"
                        :panend="panend">
                    </pad-multi-button>
                </Buttons>
                <transition appear appear-active-class="animated slideInRight">
                    <Direction position="right"
                        :turning="isTurningRight"
                        :bgColor="laf.right.bgColor"
                        :fgColor="laf.right.fgColor"></Direction>
                </transition>
            </div>
        </div>
        <modal-message></modal-message>
    </section>
</template>

<script>
import Direction from '../components/pad/Direction'
import Buttons from '../components/pad/Buttons'
import PadButton from '../components/pad/PadButton'
import ConnectedIndicator from '../components/ConnectedIndicator'
import ModalMessage from '../components/ModalMessage'
import MqttWrapper from '../components/mqtt_wrapper'
import RacePadWrapper from '../components/RacePadWrapper'
import PadMultiButton from '../components/pad/PadMultiButton'
import { mapGetters } from 'vuex'

export default {
    name: 'race-pad',
    components: {
        Direction,
        Buttons,
        PadButton,
        ConnectedIndicator,
        PadMultiButton,
        ModalMessage
    },
    mixins: [
        MqttWrapper,
        RacePadWrapper
    ],
    computed: {
        ...mapGetters([
            'laf'
        ])
    }
}
</script>

<style lang="css" scoped>
.pad-container {
    display: flex;
    height: 100vh;
}
</style>
