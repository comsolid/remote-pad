<template lang="html">
    <div class="pad-options">
        <div class="field is-grouped">
            <p class="control">
                <TogglePadButton></TogglePadButton>
            </p>
            <p class="control">
                <FullscreenButton
                    :htmlClass="{ 'is-inverted': true }"
                    :hasText="false"></FullscreenButton>
            </p>
            <div class="field has-addons">
                <p class="control">
                    <router-link to="/config"
                        class="button is-inverted">
                        <span class="icon">
                            <span class="fa fa-cog"></span>
                        </span>
                    </router-link>
                </p>
                <p class="control" v-if="showChooseLayoutBtn">
                    <button class="button"
                        @click.prevent="$emit('chooseLayout')">
                        <span class="icon">
                            <span class="fa fa-gamepad"></span>
                        </span>
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import TogglePadButton from '../components/TogglePad'
import FullscreenButton from '../components/FullscreenButton'

export default {
    name: 'pad-options',
    props: {
        showChooseLayoutBtn: {
            type: Boolean,
            default: true
        }
    },
    components: {
        TogglePadButton,
        FullscreenButton
    }
}
</script>

<style lang="css" scoped>
.pad-options {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}
</style>
