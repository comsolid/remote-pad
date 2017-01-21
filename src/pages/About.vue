<template lang="html">
    <section class="hero is-info is-large is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <figure class="image is-128x128 image-center">
                    <img src="static/img/launcher-icon-4x.png" alt="logo">
                </figure>
                <h1 class="title">
                    Remote Pad is Free Software under GPL license
                </h1>
                <nav class="columns is-mobile">
                    <a href="https://github.com/comsolid/remote-pad"
                        class="column has-text-centered"
                        target="_blank">
                        <p class="title is-4">
                            Checkout the source code on Github
                        </p>
                    </a>
                    <a href="https://github.com/comsolid/"
                        class="column has-text-centered"
                        target="_blank">
                        <p class="title is-4">
                            Meet other projects by COMSOLiD Community
                        </p>
                    </a>
                </nav>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AboutPage'
}
</script>

<style lang="css" scoped>
.image-center {
    margin-left:auto;
    margin-right:auto;
}
</style>
