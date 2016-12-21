<template>
    <div class="pad-container">
        <div class="pad-container__arrow pad-container__arrow--left">
            <div class="" style="height: 50%">
                1
            </div>
            <div class="" style="height: 50%">
                2
            </div>
        </div>
        <div class="pad-container__buttons">
            <!-- botoes -->
        </div>
        <div class="pad-container__arrow pad-container__arrow--right">
            <div class="" style="height: 50%">
                3
            </div>
            <div class="" style="height: 50%">
                4
            </div>
        </div>
    </div>
</template>

<script>
import Hello from './components/Hello'

export default {
    name: 'app',
    components: {
        Hello
    }
}
</script>

<style>
    .pad-container {
        display: flex;
        width: 100%;
        min-height: 96vh;
        background: #FFD54F;
        padding: 3px;
    }

    .pad-container__arrow {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-between;
        flex-grow: 1;
        align-self: stretch;
        align-items: stretch;
        background: white;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    }

    .pad-container__arrow > div {
        display: inline-block;
        width: 50%;
        height: 50%;
    }

    .pad-container__arrow--left, .pad-container__arrow--right {
        min-height: 50%;
    }

    .pad-container__buttons {
        flex-grow: 6;
    }
</style>
