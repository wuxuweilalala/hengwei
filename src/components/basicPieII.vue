<template>
    <v-chart :options="charOptions"  ref="instance" autoresize  :style="style"></v-chart>
</template>

<script>
    import ECharts from 'vue-echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/gauge'
    export default {
        name: "basicPieII",
        components: {
            'v-chart': ECharts
        },
        props: {
            w: String,
            h: String,
            value:{
                type:String|Number,
                default:0
            },
            text: String,
            grade:Number
        },
        data() {
            return {
                color: {
                    excellent:[ "rgba(0,255,134,1)", "rgba(0,255,134,0.2)"],
                    good:[ "rgba(0,154,255,1)", "rgba(0,154,255,0.2)"],
                    mild:[ "rgba(255,228,0,1)", "rgba(255,228,0,0.2)"],
                    medium:[ "rgba(254,125,68,1)", "rgba(254,125,68,0.2)"],
                    severe:[ "rgba(255,91,94,1)", "rgba(255,91,94,0.2)"],
                    grave:[ "rgba(217,10,10,1)","rgba(217,10,10,0.2)"]
                },
                charOptions:null,
                // value:80,
                bg_img:require('../assets/image/atmosphere/pie_box@3x.png')
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
        methods: {
          setGrade() {
              let color = this.color
              return    this.grade==1?color.excellent:
                        this.grade==2?color.good:
                        this.grade==3?color.mild:
                        this.grade==4?color.medium:
                        this.grade==5?color.severe:color.grave
          }
        },
        created() {
            let _this = this
            // console.log(this.text)
            this.charOptions ={
                // backgroundColor: {
                //     image:this.bg_img
                // },
                // backgroundColor: 'rgba(255,255,255,0)',
                backgroundColor: 'transparent',
                // tooltip: {
                //     trigger: "item"
                // },
                series: [
                    {
                        name: "",
                        type: "gauge",
                        data: [{
                            value: 0,
                            name: ""
                        }],
                        radius: "100%",
                        center: ['50%', '50%'],
                        startAngle: 0,
                        endAngle: 359.9,
                        // splitLine: {
                        //     show: false,
                        // },
                        splitNumber: 24,
                        hoverAnimation: false,
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            length: 5,
                            lineStyle: {
                                width:3,
                                color: "rgba(4, 11, 39, 0.6)"
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        markLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                opacity: 0
                            }
                        },
                        detail: {
                            show: false
                        },
                    },
                    {
                        name: "",
                        hoverAnimation: false,
                        type: "pie",
                        radius: ["90%", "100%"],
                        center: ['50%', '50%'],
                        silent: false,
                        clockwise: true,
                        startAngle:85,
                        z: 0,
                        zlevel: 0,
                        label: {
                            normal: {
                                position: "center",
                            }
                        },
                        data: [
                            {
                            // value:data,
                            name: "",
                            value:this.value,
                            label: {
                                normal: {
                                    formatter: function(param) {
                                        // return param.data.value + '%'
                                        return  _this.text
                                    },
                                    fontSize: 12,
                                    color: '#fff',
                                    fontFamily: 'Microsoft YaHei'
                                }
                            },
                            itemStyle: {
                                borderWidth: 0,

                                normal: {
                                    color: this.setGrade()[0]
                                }
                            }
                        },
                            {
                                value: 100-this.value,
                                name: "",
                                label: {
                                    normal: {
                                        show: false,
                                    }
                                },
                                itemStyle: {
                                    borderWidth: 0,
                                    normal: {
                                        color:  this.setGrade()[1]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>