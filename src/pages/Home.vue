<template lang="html">
    <section class="hero is-info is-large is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    Welcome to Remote Pad
                </h1>
                <h2 class="subtitle">
                    Ready to play games with your phone?
                </h2>
                <h2 class="subtitle">
                    Click in the Config button to get started.
                </h2>
                <div class="columns">
                    <div class="column">
                        <FullscreenButton :htmlClass="fullscreen" />
                    </div>
                    <div class="column">
                        <router-link to="/config"
                            class="button is-info is-inverted is-large">
                            <span class="icon">
                                <span class="fa fa-cog"></span>
                            </span>
                            <span>Config</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-foot" style="margin-bottom: 20px;">
            <div class="container has-text-centered">
                <p>
                    <router-link to="/about"
                        class="button is-info is-outlined is-inverted">
                        About
                    </router-link>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import FullscreenButton from '../components/FullscreenButton'

export default {
    name: 'HomePage',
    components: {
        FullscreenButton
    },
    data () {
        return {
            fullscreen: {
                'is-inverted': true,
                'is-large': true,
                'is-info': true
            }
        }
    }
}
</script>

<style lang="css">
</style>
