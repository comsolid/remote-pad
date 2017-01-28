<template lang="html">
    <transition
        enter-active-class="animated slideInDown">
        <div>
            <section class="hero is-info has-text-centered">
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
                                            <option value="directional">Directional</option>
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
                        <p class="control has-addons">
                            <span class="button is-white" v-once>
                                Max: {{accelerationRange.min}}
                            </span>
                            <input type="range" :min="accelerationRange.min"
                                :max="accelerationRange.max"
                                :step="accelerationRange.step"
                                v-model="accelerationSensibility" />
                            <span class="button is-white" v-once>
                                Min: {{accelerationRange.max}}
                            </span>
                            <span class="button is-white">
                                Selected: {{ accelerationSensibility }}
                            </span>
                        </p>

                        <p class="control">
                            <label class="checkbox">
                                <input type="checkbox" v-model="pad.minimalLayout" />
                                Pad - Minimal Layout?
                            </label>
                        </p>

                        <p class="control">
                            <button class="button is-primary is-large"
                                @click.prevent="save">Save</button>
                            <FullscreenButton :htmlClass="{ 'is-pulled-right': true }" />
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </transition>
</template>

<script>
import FullscreenButton from '../components/FullscreenButton'
import PlayerSelect from '../components/PlayerSelect'

export default {
    name: 'ConfigPage',
    components: {
        PlayerSelect,
        FullscreenButton
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
                profile: '',
                minimalLayout: true
            },
            player: '',
            accelerationSensibility: 3.5,
            accelerationRange: {
                min: 2,
                max: 5,
                step: 0.5
            },
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
            this.$router.push({ path: `/${this.pad.type}-pad` })
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
    align-content: space-around;
    align-items: stretch;
    flex-wrap: wrap;
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
