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
        name: "basicLine",
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
            // console.log('this.yData,this.xData',this.yData,this.xData)
            if (this.yData.length==0)return
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
                    data:this.xData,
                    axisLabel: { // X轴 刻度线 字体
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: { //  X轴 网格线 颜色类型的修改
                        show: true,
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(255, 255, 255,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,0.5)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255, 255, 255,1)'
                                    }
                                ],
                                globalCoord: false,
                            }

                        }
                    },
                    axisTick:{  //刻度
                        show:false
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

                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisLine: { // Y轴 网格线 颜色类型的修改
                        show: true,
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 1,
                                x2: 0,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(255, 255, 255,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,0.5)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255, 255, 255,1)'
                                    }
                                ],
                                globalCoord: false,
                            }
                        }
                    },
                    axisTick: { // y轴线 刻度线
                            show:false
                    },
                    axisLabel: { // y轴 刻度线 字体
                        textStyle: {
                           color:'#fff'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color:'rgba(255,255,255,0.1)'
                        }
                    },
                },
                color: ['rgba(0, 154, 255, 1)', 'rgba(255, 129, 62, 1)'],
                legend: {   //头部的title
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

</style>