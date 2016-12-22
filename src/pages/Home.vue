<template lang="html">
    <section class="hero is-primary is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <direction position="left"></direction>
                <buttons></buttons>
                <direction position="right"></direction>
            </div>
        </div>
    </section>
</template>

<script>
import Direction from '../components/pad/Direction'
import Buttons from '../components/pad/Buttons'

export default {
    name: 'HomePage',
    components: {
        Direction,
        Buttons
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
