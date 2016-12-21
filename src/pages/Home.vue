<template lang="html">
    <section class="hero is-primary is-fullheight">
        <div class="hero-head">
            <div class="pad-container">
                <direction position="left"></direction>
                <div class="pad-container__buttons">
                    <!-- botoes -->
                </div>
                <direction position="right"></direction>
            </div>
        </div>
    </section>
</template>

<script>
import Direction from '../components/pad/Direction'

export default {
    name: 'HomePage',
    components: {
        Direction
    }
}
</script>

<style lang="css">
.pad-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
}

.pad-container__arrow > div {
    display: inline-block;
    width: 50%;
    height: 50%;
}

.pad-container__arrow--left, .pad-container__arrow--right {
    min-height: 50%;
}

.pad-container__buttons {
    flex-grow: 6;
}
</style>
