<template>
    <div class="pictorialBar f_c_center">
        <!--               100-2% -->
        <div :class="['line',gradeColor]" :style="{width:`${val-2}%`}"></div>
    </div>
</template>

<script>
    export default {
        name: "PictorialBar",
        props: {
            val: {
                style:Number,
                default: 2
            },
            grade: {
                style:Number,
                default: 0
            }
        },
        computed: {
            gradeColor: {
                get() {
                    return this.grade==0?'mild_color':this.grade==1?'moderate':'severe'
                },
                set(val) {}
            }
        }
    }
</script>

<style scoped lang="scss">
    .pictorialBar{
        width: 16.67vw;
        height: 1.2vh;
        margin-top: 0.65vh;
        padding: 0 0.2vw;
        background: url("../assets/image/effluent/污染物排名框@3x.png")
        no-repeat;
        background-size: 98% 100%; // 防止滚动条挡住背景
        .line{
            width: 98%;
            height:0.56vh;
        }
    }
    .mild_color{
        background-image: linear-gradient(90deg,
                rgba(0, 154, 255, 1) 0%,
                rgba(0, 247, 255, 1) 100%);
    }
    .moderate{
        background-image: linear-gradient(90deg,
                rgba(255, 228, 0, 1) 0%,
                rgba(255, 186, 0, 1) 100%);
    }
    .severe{
        background-image: linear-gradient(90deg,
                rgba(255, 119, 69, 1) 0%,
                rgba(255, 46, 63, 1) 100%);
    }
</style>