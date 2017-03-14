<template lang="html">
    <div class="pad-options">
        <p class="control">
            <TogglePadButton></TogglePadButton>
            <FullscreenButton
                :htmlClass="{ 'is-medium': true, 'is-inverted': true }"
                :hasText="false" />
            <router-link to="/config"
                class="button is-inverted is-medium">
                <span class="icon">
                    <span class="fa fa-cog"></span>
                </span>
            </router-link>
        </p>
    </div>
</template>

<script>
import TogglePadButton from '../components/TogglePad'
import FullscreenButton from '../components/FullscreenButton'

export default {
    name: 'pad-options',
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
