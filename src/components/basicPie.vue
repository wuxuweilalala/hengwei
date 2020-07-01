<template>
    <v-chart :options="charOptions"  ref="instance" autoresize></v-chart>
</template>
<script>
    import ECharts from 'vue-echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'

    export default {
        name: 'basicPie',
        data() {
            return {
                placeHolderStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0
                    },
                    emphasis: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0
                    }
                },
               useValue: 90
            }
        },
        props:{
            inventory:Object,
            chartStype: {
                type: String,
                default:'basicPie_i'
            },
            //未完成的颜色
            undoneColor:{
                type:String,
                default:'rgba(176, 212, 251, 0.3)'
            },
            //已完成的颜色
            linearGradient_i: {
                type:String,
                default:'rgba(0, 154, 255)'
            },
            //已完成的颜色
            linearGradient_ii: {
                type:String,
                default:'rgba(0, 247, 255)'
            },
            //百分之一百分三级
            rateGrade: {
                type:Boolean,
                default:false
            }
        },
        components: {
            'v-chart': ECharts
        },
        computed: {
            charOptions() {
                let list = this.inventory;
                var incomplete = this.calculate(list.value)
                let option = {
                    //  tooltip: {
                    //     trigger: 'item',
                    //     formatter: '{b}: {c-35}%`
                    // },
                    title: {
                        "x":  this.chartStype === 'basicPie_i' ? '20%':"45%",
                        "y":  this.chartStype === 'basicPie_i' ? '2%':"40%" ,
                        textAlign: "center",
                        text: `${list.value}%`,
                        "textStyle": {
                            "color": '#FFF',
                            "fontSize": '12',
                        },
                    },
                        legend: {
                        show: false,
                            selected: {
                                // 选中'系列1'
                                '未完成': true,
                                // 不选中'系列2'
                                '已完成': true
                            }

                    },
                    //第一个图表
                    series: [
                        {
                            type: 'pie',
                            radius: ['90%', '100%'],
                            center: ['50%', '50%'],
                            startAngle: 90,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [{
                                value: 135,
                                itemStyle: {
                                    normal: {
                                        color: this.undoneColor
                                    }
                                },
                            }, {
                                value: this.chartStype === 'basicPie_i' ? 35:0,
                                itemStyle: this.placeHolderStyle,
                            },

                            ]
                        },
                        //上层环形配置
                        {
                            type: 'pie',
                            hoverAnimation: false, //鼠标经过的特效
                            radius: ['90%', '100%'],
                            center: ['50%', '50%'],
                            startAngle: 90,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [{
                                value: this.doneVal(this.inventory.value),
                                name: '已完成',
                                "itemStyle": {
                                    "normal": {
                                        color: this.rateGrade?this.setColor(this.inventory.value):
                                        {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops:  [
                                                {offset: 0, color: this.linearGradient_i},
                                                {offset: 1, color: this.linearGradient_ii},
                                            ],
                                            globalCoord: false,
                                        }
                                    }
                                },
                                label: {show: false},
                            }, {
                                name: '未完成',
                                value: this.chartStype==='basicPie_i'?incomplete:135 - this.doneVal(this.inventory.value),
                                itemStyle: this.placeHolderStyle,
                            },
                            ]
                        },
                    ]
                };
                return option

            }
        },
        methods: {
            calculate(use) {
                if (use >= 100) {
                    return 35
                } else {
                    return Number(100 - use) + 35
                }
            },
            doneVal(val) {
                return (val/100)*135
            },
            setColor(val) {
                return  val <= 33&& val >0 ? '#fe7d44' :  val <= 66&& val > 33 ? '#ffe400' : '#009aff'
            }
        }
    };
</script>
<style   lang="scss" scoped>
    .echarts {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
</style>