<template lang="html">
    <nav class="nav has-shadow  is-inverted">
        <div class="container">
            <div class="nav-left">
                <router-link to="/" class="nav-item">
                    <img src="static/img/launcher-icon-4x.png" alt="logo">
                </router-link>
                <router-link to="/"
                    class="nav-item is-tab"
                    :class="{'is-active': active === ''}">Home</router-link>
                <router-link to="/config"
                    class="nav-item is-tab"
                    :class="{'is-active': active === 'config'}">Configuration</router-link>
                <router-link to="/about"
                    class="nav-item is-tab"
                    :class="{'is-active': active === 'about'}">About</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navigation',
    props: {
        active: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="css" scoped>
.nav-item img {
    max-height: 2.75rem;
}
.is-inverted {
    background-color: #2c3e50;
}
a.nav-item.is-tab {
    font-weight: bold;
    color: #fdfdfd;
}
</style>
