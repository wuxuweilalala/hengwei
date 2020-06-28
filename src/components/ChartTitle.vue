<template>
    <div class="waterSituation">
        <h2 class="chartTitle">{{title}}</h2>
        <div class="line">
            <div class="whiteLine" :style="{width:w}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChartTitle",
        props: {
            title:{
                type:String,
                default:''
            },
            w: {
                type:String,
                default: '10%'
            }
        }
    }
</script>

<style scoped lang="scss">
    .waterSituation{
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        .chartTitle{
            font-size: 0.83vw;
            line-height: 4.44vh;
            font-family: SourceHanSansCN-Regular;
            color: #fff;
            margin-right: 0.94vw;
        }
        .line{
            flex: 1;
            position: relative;
            width: 100%;
            height: 0.105vw;
            background-color: rgba(255,255,255,0.5);
            &:after{
                content: '';
                position: absolute;
                right: 0;
                bottom: -50%;
                display: block;
                width: 0.21vw;
                height: 0.21vw;
                background-color: #fff;
            }
            .whiteLine{
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                height: 0.105vw;
                background-color: #fff;
            }
        }
    }
</style>