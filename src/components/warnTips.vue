<template>
    <div class="waring-tips" v-show="options.msgForecast">
        <img src="../assets/image/atmosphere/tips.png" />
        <div>{{options.msgForecast}}</div>
    </div>
</template>

<script>
    export default {
        name: "warnTips",
        props:{
            options:Object
        }
    }
</script>

<style scoped lang="scss">
    .waring-tips{
        width: 100%;
        height: 2.96vh;
        margin-top: 2.4vh;
        display: flex;
        align-items: center;
        padding: 0 0.93vh;
        box-sizing: border-box;
        background-color: rgba(4, 11, 39, 0.3);
    img{
        width: 1.76vh;
        height: 1.48vh;
        margin-right: 0.78vw;
    }
    div{
        color: #fff;
        font-family: SourceHanSansCN-Regular;
    }
    }
</style>