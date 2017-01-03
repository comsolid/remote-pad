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
                        <div class="column">
                            <label class="label" for="pad_type">PAD Type</label>
                            <p class="control">
                                <span class="select">
                                    <select id="pad_type" v-model="pad.type">
                                        <option value="race">Race</option>
                                    </select>
                                </span>
                            </p>
                        </div>
                        <div class="column">
                            <label class="label" for="pad_profile">PAD Profile</label>
                            <p class="control">
                                <span class="select">
                                    <select id="pad_profile" v-model="pad.profile">
                                        <option value="snes--top_gear">SNES - Top Gear</option>
                                        <option value="n64--mario_kart">N64 - Mario Kart</option>
                                    </select>
                                </span>
                            </p>
                        </div>
                    </div>

                    <label class="label" for="player">Player</label>
                    <p class="control players-list">
                        <PlayerSelect v-for="obj in players"
                            :value="obj.value"
                            :number="obj.number"
                            :selectedValue="player"
                            @updateSelected="updateSelected"></PlayerSelect>
                    </p>

                    <label class="label" for="acceleration_sensibility">
                        Acceleration Sensibility
                    </label>
                    <p class="control">
                        <input type="range" min="2" max="4" step="0.5"
                            v-model="accelerationSensibility" />
                        <span class="help is-large">
                            <div class="columns is-mobile">
                                <div class="column">
                                    Max: 2, Min: 4
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
                        <button class="button is-info is-large is-pulled-right"
                            @click="goFullscreen">Go Fullscreen</button>
                    </p>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import lockScreen from '../utils/lock_screen'
import PlayerSelect from '../components/PlayerSelect'

export default {
    name: 'ConfigPage',
    components: {
        PlayerSelect
    },
    data () {
        return {
            mqtt: {
                hostname: '',
                port: 0
            },
            pad: {
                type: '',
                enabled: false,
                profile: ''
            },
            player: '',
            accelerationSensibility: 2,
            players: [
                {
                    value: 'alice',
                    number: 1
                },
                {
                    value: 'bob',
                    number: 2
                },
                {
                    value: 'carol',
                    number: 3
                },
                {
                    value: 'david',
                    number: 4
                }
            ]
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
        },
        goFullscreen () {
            lockScreen()
        },
        updateSelected (value) {
            this.player = value
        }
    }
}
</script>

<style lang="css" scoped>
.help.is-large {
    margin-top: 10px;
    font-size: 1rem;
}
.players-list {
    display: flex;
    justify-content: center;
    flex-flow: wrap;
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
