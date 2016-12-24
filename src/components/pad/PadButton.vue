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

<style lang="css">
.pad-button {
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    display: flex;
    justify-content: center;
    align-items: center;
}

.pad-button > span {
    font-size: 22px;
}

.sm {
    width: 90px;
    height: 90px;
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
}

.sm--touch {
    background-color: #E6C43E;
}

.md {
    width: 130px;
    height: 130px;
    background-color: #3273dc;
}

.md--touch {
    background-color: #0040A9;
}
</style>
