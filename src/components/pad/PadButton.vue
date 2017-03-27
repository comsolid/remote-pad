<template lang="html">
    <transition appear appear-active-class="animated zoomIn">
        <div class="pad-button"
            :class="[size, isTouching ? 'pad-button--touch' : '']"
            :style="{'background-color': bgColor, color: fgColor}"
            @touchstart.prevent="onTouchStarts"
            @touchend.prevent="onTouchEnds">
            <span>{{ label }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PadButton',
    props: {
        keyb: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        bgColor: {
            type: String
        },
        fgColor: {
            type: String
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
                this.touchstart(this.keyb)
            }
        },
        onTouchEnds (e) {
            this.isTouching = false
            this.touchend(this.keyb)
        }
    }
}
</script>

<style lang="css" scoped>
.pad-button {
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.50);
    display: flex;
    justify-content: center;
    align-items: center;
}
.pad-button--touch {
    filter: brightness(85%);
}
.md {
    width: 130px;
    height: 130px;
    font-size: 22px;
}
.sm {
    width: 90px;
    height: 90px;
    font-size: 20px;
}
.xs {
    width: 60px;
    height: 60px;
    font-size: 16px;
    margin-top: 5px;
}
</style>
