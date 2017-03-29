<template lang="html">
    <div class="pad-container">
        <div class="row-1">
            <slot name="options"></slot>
        </div>
        <div class="row-1">
            <PadButton :keyb="laf[keyset[0]].keyb" size="md"
                :label="laf[keyset[0]].label"
                :bgColor="laf[keyset[0]].bgColor"
                :fgColor="laf[keyset[0]].fgColor"
                :touchstart="touchstart"
                :touchend="touchend"
            ></PadButton>

            <PadButton :keyb="laf[keyset[1]].keyb" size="md"
                :label="laf[keyset[1]].label"
                :bgColor="laf[keyset[1]].bgColor"
                :fgColor="laf[keyset[1]].fgColor"
                :touchstart="touchstart"
                :touchend="touchend"
            ></PadButton>

            <PadButton :keyb="laf[keyset[2]].keyb" size="md"
                :label="laf[keyset[2]].label"
                :bgColor="laf[keyset[2]].bgColor"
                :fgColor="laf[keyset[2]].fgColor"
                :touchstart="touchstart"
                :touchend="touchend"
            ></PadButton>
        </div>
        <div class="bottom">
            <ConnectedIndicator slot="indicator"
                :isConnected="mqtt.isConnected"
            ></ConnectedIndicator>
        </div>
    </div>
</template>

<script>
import PadButton from '../../components/pad/PadButton'
import ConnectedIndicator from '../../components/ConnectedIndicator'
import DirectionalPadWrapper from '../../components/DirectionalPadWrapper'
import MqttSenderWrapper from '../../mixins/mqtt_sender_wrapper'

export default {
    name: 'pad-3btn--touch',
    components: {
        PadButton,
        ConnectedIndicator
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
    justify-content: space-around;
}
.row-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
}
.bottom {
    display: flex;
    justify-content: center;
}
</style>
