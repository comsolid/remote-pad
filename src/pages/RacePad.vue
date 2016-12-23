<template lang="html">
    <section class="hero is-primary is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <direction position="left" :turning="isTurningLeft"></direction>
                <buttons :yAxis="acceleration.y"></buttons>
                <direction position="right" :turning="isTurningRight"></direction>
            </div>
        </div>
    </section>
</template>

<script>
import Direction from '../components/pad/Direction'
import Buttons from '../components/pad/Buttons'

export default {
    name: 'RacePadPage',
    components: {
        Direction,
        Buttons
    },
    data () {
        return {
            acceleration: {
                y: 0
            }
        }
    },
    mounted () {
        if (window.DeviceMotionEvent !== undefined) {
            window.ondevicemotion = (e) => {
                this.acceleration.y = e.accelerationIncludingGravity.y || 0
            }
        }
    },
    computed: {
        isTurningLeft () {
            return this.acceleration.y < -2
        },
        isTurningRight () {
            return this.acceleration.y > 2
        }
    }
}
</script>

<style lang="css">
.pad-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
}
</style>
