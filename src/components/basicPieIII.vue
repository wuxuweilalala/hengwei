<template>
    <v-chart :options="charOptions"
             ref="waterPolo"
             :style="style"
             class="waterPolo"
             autoresize></v-chart>
</template>

<script>
    import ECharts from "vue-echarts";
    import "echarts/lib/chart/pie";
    export default {
        name: "basicPieIII",
        components: {
            'v-chart': ECharts
        },
        props: {
            w: String,
            h: String,
            value: {
                type:Number|String,
                default:0
            },
            maxVal: {
                type:Number,
                default:0
            },
            color: {
                type:String,
                default:"#33aeff"
            },
            valText: {
                type:String,
                default:""
            },
            chartStyle: {
                type:String,
                default:"1"
            },
            areaName: {
                type:String,
                default:""
            },
            rate: {
                type:Number|String,
                default:0
            }
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
        methods: {
            vwTopx(vw) {
                let data;
                if (typeof vw == "string") {
                    data = vw.replace('vw', '') * innerWidth / 100
                } else {
                    data = vw * innerWidth / 100
                }
                return data
            },
          init(){
            var placeHolderStyle = {
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
            };
            let dataStyle = {
              normal: {
                formatter: this.color=='rgba(0, 154, 255, 1)'?'处理前':'处理后',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: this.vwTopx(0.63),
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              }
            };
            let dataStyle_1 = {
              normal: {
                formatter: `${this.value}\n${this.areaName}`,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: this.vwTopx(0.57),
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              }
            };
            this.charOptions = {
              series: [{
                type: 'pie',
                hoverAnimation: false, //鼠标经过的特效
                // radius: ['26%', '31.5%'],
                radius: ['78%', '94%'],
                // center: ['50%', '50%'],
                max: this.maxValue,
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
                  value: this.rate,
                  itemStyle: {
                    normal: {
                      color: this.color === '#33aeff' ? new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#00f0ff'
                      }, {
                        offset: 1,
                        color: '#009aff'
                      }]) : this.color ,
                    }
                  },
                  label: this.chartStyle == 1 ? dataStyle : dataStyle_1,
                }, {
                  value: 100 - this.rate,
                  itemStyle: placeHolderStyle,
                },

                ]
              },
                //外圈的边框
                {
                  // name: '总人数',
                  type: 'pie',
                  hoverAnimation: false, //鼠标经过的特效
                  radius: ['89%', '92%'],
                  // center: ['50%', '50%'],

                  labelLine: {
                    normal: {
                      show: false
                    }
                  },

                  data: [{
                    value: 100,
                    itemStyle: {
                      color: this.color
                    },
                  },

                  ]
                },

              ]
            }
          }
        },
      mounted(){
        this.init()
      },
      watch:{
          rate(){
            this.init();
          }
      },
        created() {
            // console.log(this.chartStyle,this.color)

        }
    }
</script>

<style scoped>

</style>
