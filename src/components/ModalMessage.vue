<template lang="html">
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="notification" :class="type">
                {{message}}
            </div>
        </div>
        <button class="modal-close" @click="$emit('close')"></button>
    </div>
</template>

<script>
export default {
    name: 'modal-message',
    props: {
        message: {
            type: String,
            required: true
        },
        messageType: {
            type: String,
            required: false,
            default: ''
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    computed: {
        type () {
            const style = {}
            switch (this.messageType) {
            case 'info':
                style['is-info'] = true
                break
            case 'error':
                style['is-danger'] = true
                break
            }
            return style
        }
    }
}
</script>

<style lang="css">
</style>
