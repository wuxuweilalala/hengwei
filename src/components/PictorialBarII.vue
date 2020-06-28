<template>
    <div class="waterNavRightItem1Content">
        <div>
            <div class="pie">
                <div class="ab_center">
                    <basicPieIII  w="3.2vw" h="3.2vw" :rate="rateVal(chartObj.rate)" :color="color"/>
                </div>
            </div>
            <div>
                <div>
                    <p class="chartLine" :style="{backgroundColor:color}"></p>
                    <div class="text">削减率</div>
                    <div class="val">{{rateVal(chartObj.rate)}}%</div>
                </div>
                <div>
                    <div>削减量</div>
                    <div>{{chartObj.value}}</div>
                </div>
                <div class="iconogram1">
                    <v-chart :options="chartBarOptions" autoresize class="barChart"></v-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ECharts from "vue-echarts";
    import basicPieIII from "./basicPieIII";
    export default {
        name: "PictorialBarII",
        props: {
            color:{
                style: String,
                default: 'rgba(254, 125, 68, 1)'
            },
            chartObj: Object
        },
        components: {
            'v-chart': ECharts,
            basicPieIII
        },
        data() {
            return {
                enterpriseName:'',
                chartPieOptions:null,
                chartBarOptions:null,
                // chartObj: {
                //     rateVal: 50,
                //     barVal:50
                // },
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
            this.chartBarOptions = this.setBarOptions()
        },
        methods: {
            rateVal(val) {
              return String(val).replace('%','')
            },
            setBarOptions() {
                let value = this.chartObj.value
                let maxValue =  value / (this.chartObj.rate/100)
                let category = [{
                    name: "管控",
                    value: value
                }]; // 类别
                let total = maxValue || 1000; // 数据总数
                let datas = [];
                    category.forEach(value => {
                        datas.push(value.value);
                    });
                let alltotal = [];
                    category.forEach(() => {
                        alltotal.push(maxValue || 1000);
                    });
                let option = {
                        // backgroundColor: '#071347',
                        xAxis: {
                            max: total,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        grid: {
                            left: 2,
                            top: 2, // 设置条形图的边距
                            right: 2,
                            bottom: 2
                        },
                        yAxis: [{
                            type: "category",
                            inverse: false,
                            data: category,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            }
                        }],
                        series: [{
                            // 内
                            type: "bar",
                            barWidth: 5,
                            legendHoverLink: false,
                            silent: true,
                            itemStyle: {
                                normal: {
                                    color: this.color
                                }
                            },

                            data: category,
                            z: 1,
                            animationEasing: "elasticOut"
                        },
                            {
                                // 内背景灰色
                                type: "bar",
                                barWidth: 5,
                                barGap: '-100%',
                                legendHoverLink: false,
                                silent: true,
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(255, 255, 255, 0.2)',
                                    }
                                },

                                data: alltotal,
                                z: 1,
                                animationEasing: "elasticOut"
                            },
                            {
                                // 分隔
                                type: "pictorialBar",
                                itemStyle: {
                                    normal: {
                                        color: "#1b1f28"
                                    }
                                },
                                symbolRepeat: "fixed",
                                symbolMargin: 10,
                                symbol: "rect",
                                symbolClip: true,
                                symbolSize: [6, 8],
                                symbolPosition: "start",
                                symbolOffset: [0, 0],
                                symbolBoundingData: total,
                                data: alltotal,
                                z: 2,
                                animationEasing: "elasticOut"
                            },
                            {
                                // 分隔
                                type: "pictorialBar",
                                itemStyle: {
                                    normal: {
                                        color: "#1b1f28"
                                    }
                                },
                                symbolRepeat: "fixed",
                                symbolMargin: 10,
                                symbol: "rect",
                                symbolClip: true,
                                symbolSize: [6, 8],
                                symbolPosition: "start",
                                symbolOffset: [0, 0],
                                symbolBoundingData: total,
                                data: category,
                                z: 2,
                                animationEasing: "elasticOut"
                            },


                        ]
                    };
                    return option
            }
        }
    }
</script>

<style scoped lang="scss">
    .waterNavRightItem1Content {
        /*height: 20.65vh;*/
        width: 18.75vw;
        /*margin: 0 auto;*/
    > div {
        width: 16.46vw;
        /*margin: 0 auto;*/
        display: flex;
        justify-content: space-between;
    /*input {*/
    /*    width: 8.75vw;*/
    /*// height: 2.31vh;*/
    /*    height: 1.5vh;*/
    /*    background: #091d35;*/
    /*    color: #fff;*/
    /*// rgba(255, 255, 255,0.8)*/
    /*border: 0.09vh solid rgba(255, 255, 255, 0.8);*/
    /*    text-indent: 0.3vw;*/
    /*}*/
    /*input::-webkit-input-placeholder {*/
    /*    color: rgba(255, 255, 255, 0.4);*/
    /*    font-size: 1.11vh;*/
    /*}*/
    }
    > div:nth-child(1) {
        /*margin-top: 1.02vh;*/
        height: 2.31vh;
    }
    > div:nth-child(1) {
        /*margin-top: 1.3vh;*/
        height: 6.39vh;
    // pie
       > .pie1 {
           width: 3.59vw;
           height: 6.39vh;
           background: url("../assets/image/effluent/监控上传率圆环装饰@3x.png");
           background-size: 100% 100%;
       }
    // pie右边
       > div:nth-child(2) {
    // 第一行
       > div:nth-child(1) {
           position: relative;
           width: 6.93vw;
           height: 1.85vh;
           background: url("../assets/image/effluent/图例框@3x.png");
           background-size: 100% 100%;
           display: flex;
           justify-content: space-between;
           color: #fff;

       }
    // 第二行
       > div:nth-child(2) {
           display: flex;
           justify-content: space-between;
           color: #fff;
           margin-top: 1vh;

       }
    }
    }
    }
    .chartLine{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0.1vw;
    }
    .text{
        margin-left: 0.89vw;
    }
    .val{
        margin-right: 0.52vw;
    }
    .pie{
        position: relative;
        width: 4.01vw;
        height: 4.01vw;
        /*margin: 0 2.81vw;*/
        background-image: url("../assets/image/effluent/处理前后圆环框@2x.png");
        background-size: 100% 100%;
    }
    .iconogram1 {
        width: 11.35vw;
        height: 0.52vw;
        background: url("../assets/image/effluent/削减量进度框@3x.png");
        background-size: 100% 100%;
        margin-top: 0.74vh;
        .barChart{
            width: 11vw;
            height: 0.52vw;
            margin-left: 0.2vw;
        }
    }
</style>