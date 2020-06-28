<template>
    <div class="chartToggle">
        <ul class="f_r_between">
            <li class="pointer" v-for="(item,index) in chartList" :key="index" @click="changeIndex(index)">
                <i class="hexagon" :class="[index===currChartIndex ? 'hexagon-active':'']"></i>
                <span class="text">{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    /**
     * @作者: ZouYouWen
     * currChartIndex: 地图索引 0-遥感卫星图 1-交通路线图 2-透视图
     * @时间 2020/06/18 13:35
     */

    export default {
        name: "chartToggle",
        props: {
            currChartIndex:{
                type:Number,
                default:0
            }
        },
        data() {
            return {
                chartList: [
                    {
                        name:'遥感地图',
                        isShow:false
                    },
                    {
                        name:'交通路线图',
                        isShow:false
                    },
                    {
                        name:'透视图',
                        isShow:false
                    }
                ],
                currentIndex:0,
            }
        },
        methods: {
            changeIndex(i) {
                this.$emit('update:currChartIndex',i);
                this.currentIndex=i
            }
        }
    }
</script>

<style scoped lang="scss">
.chartToggle{
    width: 17vw;
    height: 4.26vh;
    padding: 0 1vw;
    margin: 1vh 1vw 0 0;
    background: url("../assets/image/chartToggle_1@2x.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    .hexagon{
        width: 0.89vw;
        height: 0.73vw;
        display: inline-block;
        background-image: url("../assets/image/effluent/chartToggle.png");
        background-size: 100% 100%;
        &-active{
            background-image: url("../assets/image/effluent/chartToggleSelect.png");
            background-size: 100% 100%;
        }
    }

    ul{
        width: 100%;
        height: 100%;
        li{
            display: flex;
            align-items: center;
            .text{
                line-height: 4vh;
                font-size: 0.73vw;
                font-family: SourceHanSansCN-Regular;
                margin: 0 0.78vw 0 0.36vw;
                color: #fff;
            }
        }
    }
}
</style>