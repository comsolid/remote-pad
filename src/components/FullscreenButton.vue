<template lang="html">
    <button class="button is-info is-large" :class="htmlClass"
        @click="goFullscreen">
        <span class="icon">
            <span class="fa fa-expand"></span>
        </span>
        <span>Go Fullscreen</span>
    </button>
</template>

<script>
import lockScreen from '../utils/lock_screen'

export default {
    props: {
        htmlClass: ''
    },
    methods: {
        goFullscreen () {
            lockScreen()
        }
    }
}
</script>

<style lang="css">
</style>
