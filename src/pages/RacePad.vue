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
                <div class="pad-container__buttons">
                    <div class="row row-1">
                        <PadButton :keyb="laf.btnY.keyb" size="sm"
                            :label="laf.btnY.label"
                            :bgColor="laf.btnY.bgColor"
                            :fgColor="laf.btnY.fgColor"
                            :touchstart="touchstart"
                            :touchend="touchend"
                        ></PadButton>
                        <div class="row-1-2">
                            <pad-options :showChooseLayoutBtn="false"></pad-options>
                            <PadButton :keyb="laf.btnStart.keyb" size="xs"
                                :label="laf.btnStart.label"
                                :bgColor="laf.btnStart.bgColor"
                                :fgColor="laf.btnStart.fgColor"
                                :touchstart="touchstart"
                                :touchend="touchend"
                                v-show="startEnable"
                            ></PadButton>
                        </div>
                        <PadButton :keyb="laf.btnX.keyb" size="sm"
                            :label="laf.btnX.label"
                            :bgColor="laf.btnX.bgColor"
                            :fgColor="laf.btnX.fgColor"
                            :touchstart="touchstart"
                            :touchend="touchend"
                        ></PadButton>
                    </div>
                    <div class="row row-2">
                        <PadButton :keyb="laf.btnB.keyb" size="md"
                            :label="laf.btnB.label"
                            :bgColor="laf.btnB.bgColor"
                            :fgColor="laf.btnB.fgColor"
                            :touchstart="touchstart"
                            :touchend="touchend"
                        ></PadButton>
                        <pad-multi-button :keyb="laf.btnA.keyb"
                            :label="laf.btnA.label"
                            :bgColor="laf.btnA.bgColor"
                            :fgColor="laf.btnA.fgColor"
                            :up="keypress.up"
                            :down="keypress.down"
                            :touchstart="touchstart"
                            :touchend="touchend"
                            :pan="pan"
                            :panend="panend"
                        ></pad-multi-button>
                    </div>
                    <transition appear appear-active-class="animated slideInUp">
                        <div class="row row-debug">
                            <ConnectedIndicator slot="indicator"
                                :isConnected="mqtt.isConnected"></ConnectedIndicator>
                            <span class="tag is-dark">
                                Y axis: {{ Math.round(acceleration.y) }}
                            </span>
                        </div>
                    </transition>
                </div>
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
import PadButton from '../components/pad/PadButton'
import ConnectedIndicator from '../components/ConnectedIndicator'
import ModalMessage from '../components/ModalMessage'
import MqttWrapper from '../components/mqtt_wrapper'
import RacePadWrapper from '../components/RacePadWrapper'
import PadMultiButton from '../components/pad/PadMultiButton'
import { mapGetters } from 'vuex'
import PadOptions from '../components/PadOptions'

export default {
    name: 'race-pad',
    components: {
        Direction,
        PadButton,
        ConnectedIndicator,
        PadMultiButton,
        ModalMessage,
        PadOptions
    },
    mixins: [
        MqttWrapper,
        RacePadWrapper
    ],
    computed: {
        ...mapGetters([
            'laf'
        ]),
        startEnable () {
            return this.$store.state.pad.startEnable
        }
    }
}
</script>

<style lang="css" scoped>
.pad-container {
    display: flex;
    height: 100vh;
}
.pad-container__buttons {
    display: flex;
    flex-direction: column;
    flex-grow: 8;
    justify-content: center;
}
.row {
    display: flex;
}
.row-1 {
    justify-content: space-between;
    align-items: center;
}
.row-2 {
    justify-content: space-around;
}
.row-debug {
    justify-content: space-around;
}
.row-debug > span {
    font-size: 14px;
}
.row > div {
    margin: 10px;
}
.button.is-xlarge {
    height: 72px;
    font-size: 32px;
    padding-left: 20px;
    padding-right: 20px;
}
.row-1-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
</style>
