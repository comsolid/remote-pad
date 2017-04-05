<template lang="html">
    <a class="button" :class="htmlClass"
        @click.prevent="goFullscreen"
        v-show="showButton">
        <span class="icon">
            <span class="fa fa-expand"></span>
        </span>
        <span v-if="hasText">Go Fullscreen</span>
    </a>
</template>

<script>
import screenfull from 'screenfull'

export default {
    props: {
        htmlClass: '',
        hasText: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            showButton: !screenfull.isFullscreen
        }
    },
    methods: {
        goFullscreen () {
            if (screenfull.enabled) {
                screenfull.request()
                window.screen.orientation.lock('landscape')
            }
        }
    },
    mounted () {
        screenfull.onchange(() => {
            this.showButton = !screenfull.isFullscreen
        })
    }
}
</script>

<style lang="css">
</style>
