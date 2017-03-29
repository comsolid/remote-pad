<template lang="html">
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <transition
            enter-active-class="animated flipInX">
            <div v-show="isActive" class="modal-content">
                <div class="notification" :class="type">
                    {{message}}
                </div>
            </div>
        </transition>
        <button class="modal-close" @click.prevent="close"></button>
    </div>
</template>

<script>
export default {
    name: 'modal-message',
    computed: {
        type () {
            const style = {}
            const { type } = this.$store.state.message
            switch (type) {
            case 'info':
                style['is-info'] = true
                break
            case 'error':
                style['is-danger'] = true
                break
            }
            return style
        },
        isActive () {
            return this.$store.state.message.show
        },
        message () {
            return this.$store.state.message.text
        }
    },
    methods: {
        close () {
            this.$store.commit('clearMessage')
        }
    }
}
</script>

<style lang="css">
</style>
