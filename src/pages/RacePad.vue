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

export default {
    name: 'RacePadPage',
    components: {
        Direction,
        Buttons,
        PadButton
    },
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
                right: false
            },
            interval: null
        }
    },
    mounted () {
        if (window.DeviceMotionEvent !== undefined) {
            window.ondevicemotion = (e) => {
                this.acceleration.y = e.accelerationIncludingGravity.y || 0
            }
        }

        // Setup a 60fps interval - 15
        this.interval = setInterval(() => {
            this.send()
        }, 500)
    },
    methods: {
        touchstart (command) {
            Vue.set(this.keypress, command, true)
        },
        touchend (command) {
            Vue.set(this.keypress, command, false)
        },
        send () {
            // sends the data to the server
            console.log(JSON.stringify(this.keypress))
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
    }
}
</script>

<style lang="css">
.pad-container {
    display: flex;
    min-height: 100vh;
}
</style>
