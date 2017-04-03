<template lang="html">
    <button @click.prevent="togglePad"
        class="button"
        :class="color">{{ text }}</button>
</template>

<script>
export default {
    name: 'TogglePad',
    computed: {
        text () {
            return (this.$store.state.pad.enabled ? 'On' : 'Off')
        },
        color () {
            return (this.$store.state.pad.enabled ? 'is-success' : 'is-danger')
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
