<template lang="html">
    <div class="pad-container">
        <div class="row-1">
            <PadButton keyb="B" size="sm"
                :label="laf.btnB.label"
                :bgColor="laf.btnB.bgColor"
                :fgColor="laf.btnB.fgColor"
                :touchstart="touchstart"
                :touchend="touchend"></PadButton>
            <div class="row-1-2">
                <slot name="options"></slot>
                <PadButton :keyb="laf.btnStart.keyb" size="xs"
                    :label="laf.btnStart.label"
                    :bgColor="laf.btnStart.bgColor"
                    :fgColor="laf.btnStart.fgColor"
                    :touchstart="touchstart"
                    :touchend="touchend"
                    v-show="startEnable"></PadButton>
            </div>
            <PadButton keyb="X" size="sm"
                :label="laf.btnX.label"
                :bgColor="laf.btnX.bgColor"
                :fgColor="laf.btnX.fgColor"
                :touchstart="touchstart"
                :touchend="touchend"></PadButton>
        </div>
        <div class="row-2">
            <Directional
                :bgColor="laf.directional.bgColor"
                :left="keypress.left"
                :right="keypress.right"
                :up="keypress.up"
                :down="keypress.down"
                :pan="pan"
                :panend="panend" />
            <div class="row-2-right">
                <div class="row-2-helper">
                    <PadButton keyb="Y" size="sm"
                        :label="laf.btnY.label"
                        :bgColor="laf.btnY.bgColor"
                        :fgColor="laf.btnY.fgColor"
                        :touchstart="touchstart"
                        :touchend="touchend"></PadButton>
                    <ConnectedIndicator slot="indicator"
                    :isConnected="mqtt.isConnected"></ConnectedIndicator>
                </div>
                <PadButton keyb="A" size="md"
                    :label="laf.btnA.label"
                    :bgColor="laf.btnA.bgColor"
                    :fgColor="laf.btnA.fgColor"
                    :touchstart="touchstart"
                    :touchend="touchend"></PadButton>
            </div>
        </div>
    </div>
</template>

<script>
import PadButton from '../../components/pad/PadButton'
import Directional from '../../components/pad/Directional'
import ConnectedIndicator from '../../components/ConnectedIndicator'
import DirectionalPadWrapper from '../../components/DirectionalPadWrapper'
import MqttSenderWrapper from '../../mixins/mqtt_sender_wrapper'

export default {
    name: 'directional-pad-default',
    components: {
        PadButton,
        Directional,
        ConnectedIndicator
    },
    mixins: [
        DirectionalPadWrapper,
        MqttSenderWrapper
    ]
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
}
.row-1 {
    padding: 10px 32px;
}
.row-2 {
    padding: 10px 20px;
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
.row-1-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
</style>
