<template lang="html">
    <div class="pad-container__buttons">
        <div class="row row-1">
            <div class="pad-button pad-button-sm">
                <span>Y</span>
            </div>
            <div class="pad-button pad-button-sm">
                <span>X</span>
            </div>
        </div>
        <div class="row row-2">
            <div class="pad-button pad-button-md">
                <span>B</span>
            </div>
            <div class="pad-button pad-button-md">
                <span>A</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.pad-container__buttons {
    flex-grow: 6;
}

.row {
    display: flex;
    justify-content: space-around;
}

.row-1 {
    flex-direction: row-reverse;
}

.row-2 {

}

.row > div {
    margin: 10px;
}

.pad-button {
    border-radius: 50%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
}

.pad-button > span {
    font-size: 30px;
}

.pad-button-sm {
    width: 200px;
    height: 200px;
    background-color: #ffdd57;
}

.pad-button-md {
    width: 300px;
    height: 300px;
    background-color: #3273dc;
}
</style>
