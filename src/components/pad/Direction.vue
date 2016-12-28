<template lang="html">
    <div class="pad-container__arrows" :class="{'is-turning': turning}">
        <div v-once>
            {{ val1 }}
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
        }
    },
    data () {
        let values = {}
        if (this.position) {
            switch (this.position) {
            case 'left':
                values = {
                    val1: 'L'
                }
                break
            case 'right':
                values = {
                    val1: 'R'
                }
                break
            }
        }
        return values
    }
}
</script>

<style lang="css">
.pad-container__arrows {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-between;
    flex-grow: 1;
    align-self: stretch;
    align-items: stretch;
    background: #3273dc;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
}

.pad-container__arrows > div {
    align-self: center;
    color: #fff;
}

.is-turning {
    background-color: #ff3860 !important;
}
</style>
