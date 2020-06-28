<template>
    <v-chart :options="charOptions"
             ref="waterPolo"
             :style="style"
             class="waterPolo"
             autoresize></v-chart>
</template>

<script>
    import ECharts from "vue-echarts";
    import 'echarts-liquidfill'
    export default {
        name: "WaterPolo",
        components: {
            'v-chart': ECharts
        },
        props: {
            value:{
                type:Number,
                default:0
            },
            w: String,
            h: String
        },
        data() {
            return {
                charOptions: null,
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
            var data = [{
                value: this.value,
                name: '已完成',
                itemStyle: {
                    color: new ECharts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                            offset: 0,
                            // color: '#0C95FF'
                            color: '#6e5dff'
                        },
                            {
                                offset: 1,
                                // color: '#1362eb'
                                color: '#1b57e2'
                            }
                        ]
                    )
                }
            },
                {
                    value: 100 - this.value,
                    name: '进行中',

                    tooltip: {
                        show: false,
                    },
                    itemStyle: {
                        normal: {
                            color: '#e0e0e0'
                        },
                        emphasis: {
                            show: false
                        }
                    },

                }
            ]
// 已完成百分比
            var Filldata = data[0].value / (data[0].value + data[1].value)

            this.charOptions = {
                // backgroundColor: '#fff',
                tooltip: {
                    trigger: 'item',
                    formatter: function(res) {
                        if (res.componentSubType == 'liquidFill') {
                            return ''
                        } else {
                            return '' + res.name + '：' + res.data.value + '项';
                        }
                    }
                },
                title: {
                    text: (Filldata * 100).toFixed(0) + '%',
                    left: 'center',
                    top: '40%',
                    textStyle: {
                        fontSize: 20,
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                },
                series: [{
                    type: 'liquidFill',
                    data: [{
                        value: Filldata,
                    }, {
                        value: Filldata,
                    }],
                    backgroundStyle: {
                        color: "transparent"
                    },
                    color: ['rgba(0, 154, 255, 0.5)', 'rgba(0, 154, 255, 0.8)'],
                    radius: '100%',
                    center: ['50%', '50%'],
                    label: {
                        normal: {
                            formatter: '',
                        }
                    },
                    outline: {
                        show: false
                    }
                }
                ]
            }
        }
    }
</script>

<style scoped>
</style>