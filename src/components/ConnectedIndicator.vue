<template lang="html">
    <span class="tag is-medium"
        :class="color">{{ text }} - {{ currentPlayer }}</span>
</template>

<script>
export default {
    name: 'ConnectedIndicator',
    props: {
        isConnected: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        text () {
            return (this.isConnected ? 'C' : 'D')
        },
        color () {
            return (this.isConnected ? 'is-success' : 'is-danger')
        },
        currentPlayer () {
            return this.$store.state.player
        }
    }
}
</script>

<style lang="css" scoped>
</style>
