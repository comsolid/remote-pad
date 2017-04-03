<template lang="html">
    <div class="pad-container">
        <div class="row-1">
            <slot name="options"></slot>
            <PadButton :keyb="laf[keyset[1]].keyb" size="sm"
                :label="laf[keyset[1]].label"
                :bgColor="laf[keyset[1]].bgColor"
                :fgColor="laf[keyset[1]].fgColor"
                :touchstart="touchstart"
                :touchend="touchend"
            ></PadButton>
        </div>
        <div class="row-2">
            <Directional
                :bgColor="laf.directional.bgColor"
                :left="keypress.left"
                :right="keypress.right"
                :up="keypress.up"
                :down="keypress.down"
                :pan="pan"
                :panend="panend"
            ></Directional>

            <div class="vertical">
                <ConnectedIndicator slot="indicator"
                    :isConnected="mqtt.isConnected"
                ></ConnectedIndicator>
            </div>

            <PadButton :keyb="laf[keyset[2]].keyb" size="md"
                :label="laf[keyset[2]].label"
                :bgColor="laf[keyset[2]].bgColor"
                :fgColor="laf[keyset[2]].fgColor"
                :touchstart="touchstart"
                :touchend="touchend"
            ></PadButton>
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
    name: 'pad-dir-and-2btn--touch',
    components: {
        PadButton,
        ConnectedIndicator,
        Directional
    },
    props: {
        mqtt: {
            type: Object,
            required: true
        },
        keyset: {
            type: Array,
            required: true
        }
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
.row-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
}
.row-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
}
.vertical {
    display: flex;
    flex-direction: column-reverse;
    height: 50vh;
}
</style>
