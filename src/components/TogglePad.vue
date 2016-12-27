<template lang="html">
    <button @click.prevent="togglePad"
        class="button is-inverted is-medium">{{ text }}</button>
</template>

<script>
export default {
    name: 'TogglePad',
    computed: {
        text () {
            return (this.$store.state.pad.enabled ? 'On' : 'Off')
        }
    },
    methods: {
        togglePad () {
            this.$store.commit('togglePad')
        }
    }
}
</script>

<style lang="css">
</style>
