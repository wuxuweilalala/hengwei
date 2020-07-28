<template>
    <div class="monitorContent">
        <!-- 图标 -->
        <div class="chartBox pointer" @click.stop="$emit('showPop')">
            <v-chart :options="chartOptions" autoresize class="pieRight"></v-chart>
<!--            <div class="airIcon posi"></div>-->
        </div>

        <!-- 说明 -->
        <div>
            <div v-for="(item, index) in chartList" :key="index" >
                <div class="text" :title="item.scopeText">{{item.scopeText}}</div>
                <div>{{item.currVal}}%</div>
            </div>
        </div>
    </div>
</template>

<script>
    import "echarts/lib/chart/pictorialBar";
    import ECharts from "vue-echarts";
    export default {
        name: "basicPieBarII",
        props: {
            chartList: Array
        },
        components: {
            'v-chart': ECharts
        },
        data() {
            return {
                chartOptions:null,
                // chartList: [
                //     {
                //         name:'化学需氧量',
                //         currVal:'0'
                //     },
                //     {
                //         name:'氨氮',
                //         currVal:'10'
                //     },
                //     {
                //         name:'总磷',
                //         currVal:'30'
                //     }
                // ]
            }
        },
        methods: {
            set() {
                // console.log(123)
            },
            vwTopx(vw) {
                let data;
                if (typeof vw == "string") {
                    data = vw.replace('vw', '') * innerWidth / 100
                } else {
                    data = vw * innerWidth / 100
                }
                return data
            },
          setArr(item,color,style) {
              let obj = {}
              if (style === 1) {
                  obj = {
                      value: item.value,
                          name: item.name,
                      itemStyle: {
                      normal: {
                          borderWidth: this.vwTopx(0.1),
                              shadowBlur: 1,
                              borderColor: color,
                              shadowColor: color
                      }
                  }
                  }
              }else if(style === 2){
                  obj = {
                      value: item.value,
                      name: item.name,
                      itemStyle: {
                          normal: {
                              color: color,
                          }
                      }
                  }
              }
              return obj
          }
        },
        created() {
            let datas = []
            let trafficWay = [];
            let innerData=[];
            // console.log('this.chartList',this.chartList)
            let max = 0
            let maxValue = this.chartList.reduce((sum, obj) => {
                // console.log(Number(obj.currVal.replace('%','')),sum )
                let num =  Number(obj.currVal.replace('%',''))
                max =  num > max ?  num : max
                return sum += num

            },0);
            // console.log('max',max)
            this.chartList.forEach((item, index) => {
                trafficWay.push({
                    name: item.name,
                    value: item.currVal.replace('%','')
                })

            });

            let color = ['rgb(254,125,68)', 'rgb(0,154,255)', 'rgb(255,255,255)'];
            let colorOpacity = ['rgba(254,125,68,0.3)', 'rgba(0,154,255,0.3)', 'rgba(255,255,255,0.3)']

            let optionsObj ={
                value: max>30?'1': max<=30 && max>10 ? '0.5' : '0.1', // 调整间隔
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
            }

            for (var i = 0; i < trafficWay.length; i++) {
                datas.push(this.setArr(trafficWay[i],color[i],1),optionsObj)
                innerData.push(this.setArr(trafficWay[i],colorOpacity[i],2),optionsObj)
                // datas.push({
                //     value: trafficWay[i].value,
                //     name: trafficWay[i].name,
                //     itemStyle: {
                //         normal: {
                //             borderWidth: vwTopx(0.1),
                //             shadowBlur: 1,
                //             borderColor: color[i],
                //             shadowColor: color[i]
                //         }
                //     }
                // }, {
                //     value: '25', // 调整间隔
                //     name: '',
                //     itemStyle: {
                //         normal: {
                //             label: {
                //                 show: false
                //             },
                //             labelLine: {
                //                 show: false
                //             },
                //             color: 'rgba(0, 0, 0, 0)',
                //         }
                //     }
                // });
                // innerData.push({
                //     value: trafficWay[i].value,
                //     name: trafficWay[i].name,
                //     itemStyle: {
                //         normal: {
                //             color:colorOpacity[i],
                //         }
                //     }
                // }, {
                //     value: '25', // 调整间隔
                //     name: '',
                //     itemStyle: {
                //         normal: {
                //             label: {
                //                 show: false
                //             },
                //             labelLine: {
                //                 show: false
                //             },
                //             color: 'rgba(0, 0, 0, 0)',
                //         }
                //     }
                // });
            }

            this.chartOptions = {
                title: {
                    text: '',
                    top: '48%',
                    textAlign: "center",
                    left: "49%",
                    textStyle: {
                        color: '#fff',
                        fontSize: 22,
                        fontWeight: '400'
                    }
                },
                tooltip: {
                    show: false
                },

                toolbox: {
                    show: false
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        clockWise: false,
                        // radius: [105, 109],
                        radius: ["66%", "70%"],
                        // center: ['50%', '50%'],
                        max: maxValue,
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                }
                            }

                        },
                        data: datas
                    },
                    {
                        name: '',
                        type: 'pie',
                        color:colorOpacity,
                        clockWise: false,
                        // radius: [105, 109],
                        radius: ["52%", "60%"],
                        // center: ['50%', '50%'],
                        max: maxValue,
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                }
                            }

                        },
                        data: innerData
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .monitorContent {
        height: 9.96vh;
        display: flex;
        justify-content: space-between;
    > div:nth-child(2) {
    > div {
        width: 10.05vw;
        height: 1.85vh;
        padding-left: 1.2vw;
        background-repeat: no-repeat;
        background-size: 100% 100%, 50%;
        margin-bottom: 1.85vh;
        display: flex;
        justify-content: space-between;
        color: #fff;
        box-sizing: border-box;
        &:nth-child(1) {
            background-image: url("../assets/image/updateBox_2@2x.png");
        }
        &:nth-child(2) {
            background-image: url("../assets/image/updateBox_3@2x.png");
        }
        &:nth-child(3) {
            background-image: url("../assets/image/updateBox_1@2x.png");
        }
    > div:nth-child(1) {
        font-size: 1vh;
        margin-left: 0.6vw;
    }
    > div:nth-child(2) {
        font-size: 1.2vh;
        margin-right: 0.6vw;
    }
    }
    }
    }
    .chartBox{
        position: relative;
        .pieRight {
            // width: 5.05vw;
            width: 8.98vh;
            height: 8.98vh;
            background-image: url("../assets/image/effluent/处理前后圆环框@3x.png"),
            url("../assets/image/updateIcon@3x.png");
            background-position: center center;
            background-repeat: no-repeat, no-repeat;
            background-size: 100% 100%, 30%;
        }
    }
    .posi{
        position:absolute;
        left: 0;
        top: 0;
        transform: translate(1.525vw,1.525vw);
    }
    .text{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 0.5vw;
    }
</style>
