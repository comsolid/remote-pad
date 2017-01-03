<template lang="html">
    <label class="radio">
        <div class="card is-fullwidth"
            :class="isSelected">
            <div class="card-image">
                <figure class="image is-128x128">
                    <img :src="image()" :alt="value">
                </figure>
            </div>
            <div class="card-content">
                <div class="content is-medium">
                    <p class="title capitalize">{{ value }}</p>
                    <p class="subtitle">Player {{ number }}</p>
                </div>
            </div>
        </div>
        <input type="radio" :value="value" @click="updateSelected">
    </label>
</template>

<script>
export default {
    name: 'PlayerSelect',
    props: {
        value: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        selectedValue: {
            type: String,
            required: true
        }
    },
    computed: {
        isSelected () {
            return {
                'radio--selected': this.value === this.selectedValue
            }
        }
    },
    methods: {
        image () {
            return `static/img/${this.value}.png`
        },
        updateSelected () {
            this.$emit('updateSelected', this.value)
        }
    }
}
</script>

<style lang="css">
label.radio > input {
    z-index: -1;
    opacity: 0;
}
.radio--selected {
    border: 2px solid #3273dc;
}
.capitalize {
    text-transform: capitalize;
}
</style>
