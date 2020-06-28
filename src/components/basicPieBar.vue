<template>
    <div class="doughnutChartItem">
        <v-chart :options="chartOptions" autoresize class="doughnutChart"></v-chart>
        <div>
            <div v-for="(item, index) in mainObjList" :key="index">
                <div>{{item.label}}</div>
                <div>{{item.value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import "echarts/lib/chart/pictorialBar";
    import ECharts from "vue-echarts";
    export default {
        name: "basicPieBar",
        props: {
            mainObjList:Array
        },
        components: {
            'v-chart': ECharts
        },
        data() {
            return {
                chartOptions:null,
                chartList: [
                    {
                        name:'化学需氧量',
                        value:'15'
                    },
                    {
                        name:'氨氮',
                        value:'25'
                    },
                    {
                        name:'总磷',
                        value:'35'
                    },
                    {
                        name:'PH值',
                        value:'45'
                    }
                ]
            }
        },
        created() {
            let value = 100
            let legendData = []
            let colors = ["rgb(0,154,255)", "#5fede1", "#fe7d44", "#ffffff"];
            let datas = []
            this.mainObjList.forEach((item, index) => {
                datas.push({
                    value: typeof item.value === 'String' ? item.value.replace('%','') : item.value,
                    name: item.label
                }, {
                    value: '1', // 调整间隔
                    name: '',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'rgba(0, 0, 0, 0)',
                        }
                    }
                })
            });
            for (var j = 0; j < datas.length; j++) {
                var data = {
                    name: datas[j].name,
                    icon: "circle",
                    textStyle: {
                        fontSize: 12,
                        color: colors[j]
                    }
                };
                legendData.push(data);
            }
            this.chartOptions = {
                color: colors, // 环的颜色
                series: [{
                    name: "访问来源",
                    type: "pie",
                    radius: ["50%", "70%"], // 环
                    // center: ["72", "50"], // 位置
                    avoidLabelOverlap: false,
                    hoverAnimation: false, // 取消突出
                    label: {
                        show: false,
                        position: "center"
                    },
                    emphasis: {},
                    labelLine: {
                        show: false
                    },
                    data: datas
                }]
            }
        }
    }
</script>

<style scoped lang="scss">
    .doughnutChartItem {
        width: 16.82vw;
        height: 10.56vh;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    .doughnutChart {
        width: 7.5vw;
        height: 10.56vh;
        background: url("../assets/image/effluent/主要污染物图表外框@3x.png"),
        url("../assets/image/mainObj@2x.png");
        background-position: center center;
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%, 20%;
    }
    > div:nth-child(2) {
    > div {
        width: 7.86vw;
        height: 1.85vh;
        background: url("../assets/image/effluent/图例框@3x.png");
        background-size: 100% 100%;
        margin-top: 0.67vh;
        display: flex;
        justify-content: space-between;
        line-height: 2vh;
        color: #fff;
    > div:nth-child(1) {
        font-size: 0.63vw;
        margin-left: 0.4vw;
    }
    > div:nth-child(2) {
        font-size: 0.94vw;
        margin-right: 0.5vw;
    }
    }
    > div:nth-child(1) {
        border-left: 0.1vw solid rgb(0, 154, 255);
    }
    > div:nth-child(2) {
        border-left: 0.1vw solid rgb(0, 255, 255);
    }
    > div:nth-child(3) {
        border-left: 0.1vw solid rgb(254, 125, 68);
    }
    > div:nth-child(4) {
        border-left: 0.1vw solid rgb(255, 255, 255);
    }
    }
    }
</style>