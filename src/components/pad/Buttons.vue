<template lang="html">
    <div class="pad-container__buttons">
        <div class="row row-1">
            <slot name="Y"></slot>
            <router-link to="/config"
                class="button is-inverted is-medium">Config</router-link>
            <slot name="X"></slot>
        </div>
        <div class="row row-2">
            <slot name="B"></slot>
            <slot name="A"></slot>
        </div>
        <div class="row row-debug">
            <span>Y axis: {{ Math.round(yAxis) }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Buttons',
    props: {
        yAxis: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="css">
.pad-container__buttons {
    flex-grow: 6;
}

.row {
    display: flex;
}

.row-1 {
    justify-content: space-between;
    align-items: center;
}

.row-2 {
    justify-content: space-around;
}

.row-debug {
    justify-content: center;
}

.row-debug > span {
    font-size: 16px;
}

.row > div {
    margin: 10px;
}

.button.is-xlarge {
    height: 72px;
    font-size: 32px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
