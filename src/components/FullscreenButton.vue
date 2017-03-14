<template lang="html">
    <a class="button" :class="htmlClass"
        @click.prevent="goFullscreen">
        <span class="icon">
            <span class="fa fa-expand"></span>
        </span>
        <span v-if="hasText">Go Fullscreen</span>
    </a>
</template>

<script>
import lockScreen from '../utils/lock_screen'

export default {
    props: {
        htmlClass: '',
        hasText: {
            type: Boolean,
            default: true
        }
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
