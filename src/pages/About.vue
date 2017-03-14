<template lang="html">
    <div>
        <navigation active="about"></navigation>
        <section class="hero is-white is-bold is-medium">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <figure class="image is-96x96 image-center">
                        <img src="static/img/launcher-icon-4x.png" alt="logo">
                    </figure>
                    <h4 class="title is-4">
                        Remote Pad is Free Software under GPL license
                    </h4>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container has-text-centered">
                <div class="columns is-mobile">
                    <div class="column">
                        <a href="https://github.com/comsolid/remote-pad"
                            target="_blank"
                            class="is-block-mobile notification is-info">
                            Source code on Github
                        </a>
                    </div>
                    <div class="column">
                        <a href="https://github.com/comsolid/"
                            class="is-block-mobile notification is-info"
                            target="_blank">
                            COMSOLiD Community
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navigation from '../components/Navigation'

export default {
    name: 'AboutPage',
    components: {
        Navigation
    }
}
</script>

<style lang="css" scoped>
.image-center {
    margin-left:auto;
    margin-right:auto;
}
</style>
