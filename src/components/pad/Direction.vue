<template lang="html">
    <div class="pad-container__arrows"
        :class="{'is-turning': turning}"
        :style="{'background-color': bgColor, color: fgColor}">
        <div v-once>
            <span class="icon is-medium">
                <i class="fa"
                    :class="[icon]"></i>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Direction',
    props: {
        position: {
            type: String,
            required: true
        },
        turning: {
            type: Boolean,
            required: true
        },
        bgColor: {
            type: String
        },
        fgColor: {
            type: String
        }
    },
    data () {
        let values = {}
        if (this.position) {
            switch (this.position) {
            case 'left':
                values = {
                    icon: 'fa-caret-left'
                }
                break
            case 'right':
                values = {
                    icon: 'fa-caret-right'
                }
                break
            }
        }
        return values
    }
}
</script>

<style lang="css" scoped>
.pad-container__arrows {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-between;
    flex-grow: 1;
    align-self: stretch;
    align-items: stretch;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
}

.pad-container__arrows > div {
    align-self: center;
}

.is-turning {
    background-color: #ff3860 !important;
}
</style>
