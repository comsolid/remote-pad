<template lang="html">
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <transition
            enter-active-class="animated bounceInUp">
            <div v-show="isActive" class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Pad Selector</p>
                    <button class="button is-dark is-outlined"
                        style="margin-right: 20px;"
                        @click.prevent="setDefault">
                        <span class="icon">
                            <i class="fa fa-gamepad"></i>
                        </span>
                        <span>Default</span>
                    </button>
                    <button class="delete"
                        @click.prevent="$emit('close')"></button>
                </header>
                <section class="modal-card-body">
                    <div class="content">
                        <label class="label">Select Layout</label>
                        <p class="control players-list">
                            <layout-selector-item v-for="(value, key) in layouts"
                                :key="key"
                                :value="key"
                                :layout="value.layout"
                                :keyset="value.keyset"
                                :selectedValue="selected"
                                @updateSelected="updateSelected"
                            ></layout-selector-item>
                        </p>
                        <p v-if="layouts.length === 0">
                            No additional layouts found.
                        </p>
                    </div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
import LayoutSelectorItem from './LayoutSelectorItem'
import { mapGetters } from 'vuex'

export default {
    name: 'modal-layout-selector',
    components: {
        LayoutSelectorItem
    },
    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            selected: 0
        }
    },
    methods: {
        updateSelected (value) {
            this.selected = value
            const { layout, keyset } = this.layouts[this.selected]
            this.$emit('updateLayout', layout, keyset)
            setTimeout(() => {
                this.$emit('close')
            }, 500)
        },
        setDefault () {
            this.selected = null
            this.$emit('updateLayout', 'directional-pad-default', [])
            this.$emit('close')
        }
    },
    computed: {
        ...mapGetters([
            'layouts'
        ])
    }
}
</script>

<style lang="css" scoped>
.players-list {
    display: flex;
    justify-content: center;
    align-content: space-around;
    flex-wrap: wrap;
}
</style>
