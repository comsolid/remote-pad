<template lang="html">
    <label class="radio">
        <div class="card is-fullwidth"
            :class="isSelected">
            <div class="card-content">
                <div class="content layouts">
                    <div class="layouts-item" v-for="item in keyset"
                        :key="item"
                        :style="{
                            'background-color': laf[item].bgColor,
                            color: laf[item].fgColor
                        }">
                        <div v-if="laf[item].icon">
                            <span class="icon is-medium">
                                <i class="fa" :class="[laf[item].icon]"></i>
                            </span>
                        </div>
                        <div v-else>
                            {{laf[item].label}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="radio" :value="value" @click="updateSelected">
    </label>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'layout-selector-item',
    props: {
        value: {
            type: Number,
            required: true
        },
        layout: {
            type: String,
            required: true
        },
        keyset: {
            type: Array,
            required: true
        },
        selectedValue: {
            type: Number
        }
    },
    computed: {
        isSelected () {
            return {
                'radio--selected': this.value === this.selectedValue
            }
        },
        ...mapGetters([
            'laf'
        ])
    },
    methods: {
        updateSelected () {
            this.$emit('updateSelected', this.value)
        }
    }
}
</script>

<style lang="css" scoped>
label.radio {
    margin-bottom: 10px;
}
label.radio > input {
    z-index: -1;
    opacity: 0;
}
.radio--selected {
    border: 2px solid #3273dc;
}
.layouts {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.layouts-item {
    width: 50px;
    height: 40px;
    margin: 5px;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.50);
    border-radius: 5px;
    align-items: center;
}
</style>
