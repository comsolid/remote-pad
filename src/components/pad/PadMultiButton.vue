<template lang="html">
    <transition appear appear-active-class="animated flipInX">
        <v-touch
            @pan="onPan"
            @panend="onPanEnd"
            @tap="onTouchStarts">
            <div class="directional"
                :class="[isTouching ? 'directional--touch' : '']"
                :style="{'background-color': bgColor, color: fgColor}">
                <span class="icon is-medium"
                    :class="{pressed: up}">
                    <i class="fa fa-caret-up"></i>
                </span>
                <div class="main-button">
                    {{label}}
                </div>
                <span class="icon is-medium"
                    :class="{pressed: down}">
                    <i class="fa fa-caret-down"></i>
                </span>
            </div>
        </v-touch>
    </transition>
</template>

<script>
import Hammer from 'hammerjs'

export default {
    name: 'pad-multi-button',
    props: {
        up: {
            type: Boolean,
            required: true
        },
        down: {
            type: Boolean,
            required: true
        },
        keyb: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        bgColor: {
            type: String
        },
        fgColor: {
            type: String
        },
        pan: {
            type: Function,
            required: true
        },
        panend: {
            type: Function,
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
            this.isTouching = true
            this.touchstart(this.keyb)
            setTimeout(() => {
                this.onTouchEnds()
            }, 40)
        },
        onTouchEnds (e) {
            this.isTouching = false
            this.touchend(this.keyb)
        },
        onPan (e) {
            const { direction } = e

            if (direction === Hammer.DIRECTION_DOWN) {
                this.pan('down', 'up')
            }

            if (direction === Hammer.DIRECTION_UP) {
                this.pan('up', 'down')
            }
        },
        onPanEnd () {
            this.panend()
        }
    }
}
</script>

<style lang="css" scoped>
.directional {
    width: 150px;
    height: 130px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.50);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
}
.directional--touch {
    filter: brightness(85%);
}
.fa-2x, .main-button {
    color: #ecf0f1;
}
.main-button {
    font-size: 22px;
}
.pressed {
    color: #ffdd57;
}
</style>
