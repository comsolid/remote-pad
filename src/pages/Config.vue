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
                    <label class="label" for="acceleration_sensibility">
                        Acceleration Sensibility
                    </label>
                    <p class="control">
                        <input type="range" min="2" max="4" step="0.5"
                            v-model="accelerationSensibility" />
                        <span class="help">
                            <div class="columns is-mobile">
                                <div class="column">
                                    Min: 2, Max: 4
                                </div>
                                <div class="column">
                                    Selected: {{ accelerationSensibility }}
                                </div>
                            </div>


                        </span>
                    </p>

                    <p class="control">
                        <button class="button is-primary is-large"
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
            player: 'alice',
            accelerationSensibility: 2
        }
    },
    mounted () {
        this.mqtt = this.$store.state.mqtt
        this.pad = this.$store.state.pad
        this.pad.enabled = false
        this.player = this.$store.state.player
        this.accelerationSensibility = this.$store.state.accelerationSensibility
    },
    methods: {
        save () {
            this.$store.commit('config', {
                mqtt: this.mqtt,
                pad: this.pad,
                player: this.player,
                accelerationSensibility: this.accelerationSensibility
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
input[type=range] {
    /*removes default webkit styles*/
    -webkit-appearance: none;
    /*fix for FF unable to apply focus style bug */
    border: 1px solid white;
    /*required for proper track sizing in FF*/
    width: 300px;
}
input[type=range]::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #3273dc;
    margin-top: -8px;
}
input[type=range]:focus {
    outline: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ccc;
}

input[type=range]::-moz-range-track {
    width: 300px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
}
input[type=range]::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #3273dc;
}

/*hide the outline behind the border*/
input[type=range]:-moz-focusring{
    outline: 1px solid white;
    outline-offset: -1px;
}
</style>
