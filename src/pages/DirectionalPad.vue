<template lang="html">
    <section class="hero is-light is-fullheight">
        <component :is="currentView" :mqtt="mqtt"
            :keyset="keyset">
            <pad-options slot="options"
                @chooseLayout="chooseLayout"></pad-options>
        </component>
        <modal-message></modal-message>
        <modal-layout-selector
            :isActive="selector.isActive"
            @close="selector.isActive = false"
            @updateLayout="updateLayout"></modal-layout-selector>
    </section>
</template>

<script>
import ModalMessage from '../components/ModalMessage'
import PadOptions from '../components/PadOptions'
import DirectionalPadDefault from '../layouts/directional/Default'
import TwoButtonsPad from '../layouts/directional/TwoButtons'
import ThreeButtonsPad from '../layouts/directional/ThreeButtons'
import DirectionalAndTwoButtons from '../layouts/directional/DirectionalAndTwoButtons'
import MqttWrapper from '../components/mqtt_wrapper'
import ModalLayoutSelector from '../layouts/directional/ModalLayoutSelector'

export default {
    name: 'DirectionalPadPage',
    components: {
        ModalMessage,
        PadOptions,
        ModalLayoutSelector,
        'directional-pad-default': DirectionalPadDefault,
        'pad-2btn--touch': TwoButtonsPad,
        'pad-3btn--touch': ThreeButtonsPad,
        'pad-dir-and-2btn--touch': DirectionalAndTwoButtons
    },
    mixins: [
        MqttWrapper
    ],
    data () {
        return {
            currentView: 'directional-pad-default',
            keyset: [],
            selector: {
                isActive: false
            }
        }
    },
    methods: {
        chooseLayout () {
            this.selector.isActive = true
        },
        updateLayout (layout, keyset) {
            this.currentView = layout
            this.keyset = keyset
        }
    }
}
</script>

<style lang="css" scoped>
</style>
