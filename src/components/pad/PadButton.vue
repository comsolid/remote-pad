<template lang="html">
    <div class="pad-button"
        :class="[size, isTouching ? size + '--touch' : '']"
        @touchstart.prevent="onTouchStarts"
        @touchend.prevent="onTouchEnds">
        <span v-once>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'PadButton',
    props: {
        text: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        touchstart: {
            type: Function,
            required: true
        },
        touchend: {
            type: Function,
            required: true
        }
    },
    data () {
        return {
            isTouching: false
        }
    },
    methods: {
        onTouchStarts (e) {
            // If there's exactly one finger inside this element
            if (e.targetTouches.length === 1) {
                this.isTouching = true
                this.touchstart(this.text)
            }
        },
        onTouchEnds (e) {
            this.isTouching = false
            this.touchend(this.text)
        }
    }
}
</script>

<style lang="css" scoped>
.pad-button {
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    display: flex;
    justify-content: center;
    align-items: center;
}
.md {
    min-width: 130px;
    min-height: 130px;
    background-color: #3273dc;
    font-size: 22px;
}
.md--touch {
    background-color: #0040A9;
}
.sm {
    width: 90px;
    height: 90px;
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
    font-size: 20px;
}
.xs {
    width: 60px;
    height: 60px;
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
    font-size: 16px;
    margin-top: 5px;
}
.sm--touch, .xs--touch {
    background-color: #E6C43E;
}
</style>
