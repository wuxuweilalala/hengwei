<template>
    <v-chart :options="charOptions"
             ref="instance"
             :style="style"
             class="instance"
             autoresize></v-chart>
</template>

<script>
    import ECharts from 'vue-echarts';
    import 'echarts/lib/chart/line';

    export default {
        name: "ChartLine.vue",
        components: {
            'v-chart': ECharts
        },
        props: {
            // charOptions: Object,
            w: String,
            h: String,
            xData: {
                type:Array,
                default:[]
            },
            yData: {
                type:Array,
                default:[]
            }
        },
        data() {
            return {
                charOptions: null
            }
        },
        computed: {
            style() {
                let str = ''
                if (this.w) {
                    str += `width:${this.w};`
                }
                if (this.h) {
                    str += `height:${this.h};`
                }
                return str
            }
        },
        created() {
            // console.log(this.yData,this.xData)
            // return
            //渐变色
            let gradientColor = new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 255, 255, 1)'
            }, {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)'
            }])

            this.charOptions = {
                grid: {
                    x: 40,
                    y: 40,
                    x2: 10,
                    y2: 20,
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    data:this.xData,
                    axisLine: { // X轴 网格线 颜色类型的修改
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color: gradientColor
                        }
                    },
                    axisTick: { // X轴线 刻度线
                        lineStyle: {
                            color: '#fff',
                            type: 'solid',
                            width: 2
                        },
                    },
                    axisLabel: { // X轴 刻度线 字体
                        textStyle: {
                            color: '#fff'
                        }
                    },
                },
                yAxis: {
                    name: 'μg/m3',
                    type: 'value',
                    lineStyle: {
                        color: '#fff',
                        type: 'solid',
                        width: 2
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: { // Y轴 网格线 颜色类型的修改
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color: gradientColor
                        }
                    },
                    axisTick: { // y轴线 刻度线
                        lineStyle: {
                            ccolor: '#fff',
                            type: 'solid',
                            width: 2
                        },
                    },
                    axisLabel: { // y轴 刻度线 字体
                        textStyle: {
                            color: '#fff'
                        }
                    },
                },
                color: ['rgba(0, 154, 255, 1)', 'rgba(255, 129, 62, 1)'],
                legend: {   //头部的title
                    // data: ['污水厂A', '污水厂B'],
                    data:[this.yData[0].name,this.yData[1].name],
                    textStyle: {
                        color: '#fff'
                    },
                    right: '1%',
                    top: '1%',
                    icon: 'rect',
                    itemWidth: 20,
                    itemHeight: 2,
                },
                series: [{
                    // name:'污水厂A',
                    // data: [1.8, 1.5, 2.9, 2.2, 2.4, 2.1,2.6],
                    name:this.yData[0].name,
                    data:this.yData[0].data,
                    type: 'line',
                    lineStyle:{
                        color:['#009aff']
                    },
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 154, 255, 1)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,0,0,0)'
                            }])
                        }
                    },
                },
                    {
                        // name:'污水厂B',
                        // data: [2, 1, 2.1, 0.5, 1.2, 1.4,2.1],
                        name:this.yData[1].name,
                        data:this.yData[1].data,
                        type: 'line',
                        symbol: 'none',
                        lineStyle:{
                            color:['rgba(255, 129, 62, 1)']
                        },
                    }]
            }
        }
    }
</script>

<style scoped>
    /*.instance{*/
    /*    width: 50px;*/
    /*    height: 50px;*/
    /*}*/
</style>