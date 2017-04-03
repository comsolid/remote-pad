<template lang="html">
    <transition appear appear-active-class="animated flipInX">
        <v-touch
            @pan="onPan"
            @panend="onPanEnd">
            <div class="directional"
                :style="{'background-color': bgColor}">
                <span class="icon is-medium">
                    <i class="fa fa-caret-up"
                        :class="{pressed: up}"></i>
                </span>
                <div class="left-right">
                    <span class="icon is-medium">
                        <i class="fa fa-caret-left"
                            :class="{pressed: left}"></i>
                    </span>
                    <span class="helper-text">pan</span>
                    <span class="icon is-medium">
                        <i class="fa fa-caret-right"
                            :class="{pressed: right}"></i>
                    </span>
                </div>
                <span class="icon is-medium">
                    <i class="fa fa-caret-down"
                        :class="{pressed: down}"></i>
                </span>
            </div>
        </v-touch>
    </transition>
</template>

<script>
import Hammer from 'hammerjs'

export default {
    name: 'Directional',
    props: {
        left: {
            type: Boolean,
            required: true
        },
        right: {
            type: Boolean,
            required: true
        },
        up: {
            type: Boolean,
            required: true
        },
        down: {
            type: Boolean,
            required: true
        },
        pan: {
            type: Function,
            required: true
        },
        panend: {
            type: Function,
            required: true
        },
        bgColor: {
            type: String,
            required: true
        }
    },
    methods: {
        onPan (e) {
            const { direction } = e
            if (direction === Hammer.DIRECTION_RIGHT) {
                this.pan('right', 'left')
            }

            if (direction === Hammer.DIRECTION_DOWN) {
                this.pan('down', 'up')
            }

            if (direction === Hammer.DIRECTION_LEFT) {
                this.pan('left', 'right')
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
    width: 180px;
    height: 160px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.50);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.fa, .helper-text {
    color: #ecf0f1;
}
.left-right {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.pressed {
    color: #ffdd57;
}
</style>
