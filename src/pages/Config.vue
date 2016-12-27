<template lang="html">
    <section>
        <section class="hero is-primary has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Configuration</h1>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="content">
                    <label class="label" for="mqtt_hostname">WebSocket Hostname</label>
                    <p class="control">
                        <input type="url" class="input" id="mqtt_hostname"
                            v-model="mqtt.hostname" placeholder="ex. 192.168.0.1">
                    </p>
                    <label class="label" for="mqtt_port">Port</label>
                    <p class="control">
                        <input type="number" class="input" id="mqtt_port"
                            v-model="mqtt.port">
                    </p>
                    <div class="columns is-mobile">
                        <div class="column is-half">
                            <label class="label" for="pad_type">PAD Type</label>
                            <p class="control">
                                <span class="select">
                                    <select id="pad_type" v-model="pad.type">
                                        <option value="race">Race</option>
                                    </select>
                                </span>
                            </p>
                        </div>

                    </div>

                    <label class="label" for="player">Player</label>
                    <p class="control">
                        <label class="radio">
                            <div class="card is-fullwidth"
                                :class="{'radio--selected': player === 'alice'}">
                                <div class="card-image">
                                    <figure class="image is-128x128">
                                        <img src="../assets/img/alice.png" alt="">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content is-medium">
                                        <p class="title">Alice</p>
                                        <p class="subtitle">Player 1</p>
                                    </div>
                                </div>
                            </div>
                            <input type="radio" v-model="player" value="alice">
                        </label>
                        <label class="radio">
                            <div class="card is-fullwidth"
                                :class="{'radio--selected': player === 'bob'}">
                                <div class="card-image">
                                    <figure class="image is-128x128">
                                        <img src="../assets/img/bob.png" alt="">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content is-medium">
                                        <p class="title">Bob</p>
                                        <p class="subtitle">Player 2</p>
                                    </div>
                                </div>
                            </div>
                            <input type="radio" v-model="player" value="bob">
                        </label>
                    </p>

                    <p class="control">
                        <button class="button is-primary"
                            @click.prevent="save">Save</button>
                    </p>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'ConfigPage',
    data () {
        return {
            mqtt: {
                hostname: '',
                port: 1884
            },
            pad: {
                type: 'race',
                enabled: false
            },
            player: 'alice'
        }
    },
    mounted () {
        this.mqtt = this.$store.state.mqtt
        this.pad = this.$store.state.pad
        this.player = this.$store.state.player
    },
    methods: {
        save () {
            this.$store.commit('config', {
                mqtt: this.mqtt,
                pad: this.pad,
                player: this.player
            })
            this.$router.push({ path: '/' })
        }
    }
}
</script>

<style lang="css" scoped>
label.radio > input {
    z-index: -1;
    opacity: 0;
}
.radio--selected {
    border: 2px solid #3273dc;
}
</style>
