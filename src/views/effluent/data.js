var echarts = require('echarts')
function pxTovh(px) {
    let data;
    if (typeof px == "string") {
        data = px.replace('px', '') / (innerHeight / 100)
    } else {
        data = px / (innerHeight / 100)
    }
    return data

}

function pxTovw(px) {
    let data;
    if (typeof px == "string") {
        data = px.replace('px', '') / (innerWidth / 100)
    } else {
        data = px / (innerWidth / 100)
    }
    return data
}

function vhTopx(vh) {
    let data;
    if (typeof vh == "string") {
        data = vh.replace('vh', '') * innerHeight / 100
    } else {
        data = vh * innerHeight / 100
    }
    return data
}

function vwTopx(vw) {
    let data;
    if (typeof vw == "string") {
        data = vw.replace('vw', '') * innerWidth / 100
    } else {
        data = vw * innerWidth / 100
    }
    return data
}

// 地域分类饼状图(蓝)
function pie3(data) {
    var value = data.total
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


    var dataStyle = {
        normal: {
            formatter: `${value}\n深圳市`,
            position: 'center',
            show: true,
            textStyle: {
                fontSize: vwTopx(0.57),
                fontWeight: 'normal',
                color: 'rgba(255, 255, 255, 0.8)'
            }
        }
    };


    var option = {
        // backgroundColor: '#142058',

        series: [{
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            // radius: ['26%', '31.5%'],
            radius: ['66%', '80%'],
            center: ['50%', '50%'],

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
                value: value,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00f0ff'
                        }, {
                            offset: 1,
                            color: '#009aff'
                        }]),
                    }
                },
                label: dataStyle,
            }, {
                value: 100 - value,
                itemStyle: placeHolderStyle,
            },

            ]
        },


            //外圈的边框
            {
                // name: '总人数',
                type: 'pie',
                hoverAnimation: false, //鼠标经过的特效
                radius: ['77%', '80%'],
                center: ['50%', '50%'],

                labelLine: {
                    normal: {
                        show: false
                    }
                },

                data: [{
                    value: 100,
                    itemStyle: {
                        color: '#33aeff'
                    },
                },

                ]
            },

        ]
    };

    return option
}

// 主要污染物饼状图
function pieLeft(data) {
    // console.log(data, '主要污染物饼状图')
    let value = 100
    let datas = []
    data.value.forEach((item, index) => {
        datas.push({
            value: item.replace('%', '') * value,
            name: data.name[index]
        }, {
            value: '40', // 调整间隔
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
                    // borderColor: 'rgba(0, 0, 0, 0)',
                    // borderWidth: 0
                }
            }
        })
    });
    // console.log(datas,'datas')
    let colors = ["rgb(0,154,255)", "#5fede1", "#fe7d44", "#ffffff"];
    let legendData = [];
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

    // function array2obj(array, key) {
    //     var resObj = {};
    //     for (var i = 0; i < array.length; i++) {
    //         resObj[array[i][key]] = array[i];
    //     }
    //     return resObj;
    // }
    // let objData = array2obj(datas, "name");
    var option = {
        // tooltip: {
        //     trigger: "item",
        //     formatter: "{a} <br/>{b}: {c} ({d}%)",
        //     textStyle: {
        //         fontSize: 12
        //     },
        //     tooltip: {
        //         position: "right"
        //     }
        // },
        // legend: {
        //     orient: "vertical",
        //     top: "center",
        //     left: "70%",
        //     itemGap: 30,
        //     data: legendData,
        //     formatter: function(name) {
        //         return `{title|${name}}{value|${objData[name].value}}{unit|件}{percent|${objData[name].percent}}{unit|%}`;
        //     },
        //     textStyle: {
        //         rich: {
        //             value: {
        //                 color: "#82baff",
        //                 fontSize: 12,
        //                 fontWeight: 600,
        //                 fontFamily: "HuaKang",
        //                 padding: [0, 10, 0, 30]
        //             },
        //             unit: {
        //                 color: "#82baff",
        //                 fontSize: 12,
        //                 fontWeight: 600,
        //                 fontFamily: "HuaKang",
        //                 padding: [0, 50, 0, 0]
        //             },
        //             percent: {
        //                 color: "#82baff",
        //                 fontSize: 12,
        //                 fontWeight: 600,
        //                 fontFamily: "HuaKang",
        //                 padding: [0, 10, 0, 0]
        //             }
        //         }
        //     }
        // },
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
            emphasis: {
                // label: {
                //     show: true,
                //     fontSize: "12",
                //     fontWeight: "bold"
                // }
            },
            labelLine: {
                show: false
            },
            data: datas
        }]
    };

    return option
}

// 污染物企业
function iconogram3(data) {
    let color = ''
    if (data.value < 10) {
        color = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: '#00f0ff'
        }, {
            offset: 1,
            color: '#009aff'
        }])
    } else if (data.value >= 10 && data.value < 30) {
        color = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: '#ffbb00'
        }, {
            offset: 1,
            color: '#ffe300'
        }])
    } else {
        color = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: '#ff2e3f'
        }, {
            offset: 1,
            color: '#ff7645'
        }])
    }

    var option = {
        grid: {
            left: 4,
            // top: 2, // 设置条形图的边距
            // right: 2,
            // bottom: 2,
            // containLabel: true
        },
        xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01],
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category',
            data: ['数据']
        },
        barWidth: 5, // 宽度
        series: [{
            name: data.name,
            type: 'bar',
            data: [{
                value: data.value,
                itemStyle: {
                    normal: {
                        color: color,
                    }
                },
            }]
        }]
    };
    return option
}

// 象型图(橙)
function iconogram1(data) {
    let value = Number(data['消减率'].replace('%', ''))
    let maxValue = Number(data['消减量']) / value
    var category = [{
        name: "管控",
        value: value
    }]; // 类别
    var total = maxValue || 1000; // 数据总数
    var datas = [];
    category.forEach(value => {
        datas.push(value.value);
    });
    var alltotal = [];
    category.forEach(() => {
        alltotal.push(maxValue || 1000);
    });
    var option = {
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
                    color: '#fe7d44'
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

// 象型图(蓝)
function iconogram2(data) {
    let value = Number(data['消减率'].replace('%', ''))
    let maxValue = Number(data['消减量']) / value
    var category = [{
        name: "管控",
        value: value
    }]; // 类别
    var total = maxValue || 1000; // 数据总数
    var datas = [];
    category.forEach(value => {
        datas.push(value.value);
    });
    var alltotal = [];
    category.forEach(() => {
        alltotal.push(maxValue || 1000);
    });
    var option = {
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
                    color: '#009aff'
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

// 饼状图(橙)
function pie1(data) {
    console.log(data, '饼状图(橙)')
    let value = Number(data['消减率'].replace('%', ''));
    let maxValue = Number( data['消减量']) / value;
    // var value = 30
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


    var dataStyle = {
        normal: {
            formatter: '处理前',
            position: 'center',
            show: true,
            textStyle: {
                fontSize: '9',
                fontWeight: 'normal',
                color: 'rgba(255, 255, 255, 0.8)'
            }
        }
    };


    var option = {
        // backgroundColor: '#142058',

        series: [{
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            // radius: ['26%', '31.5%'],
            radius: ['78%', '94%'],
            // center: ['50%', '50%'],
            max: maxValue,
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
                value: value,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(251,128,74)'
                        }, {
                            offset: 1,
                            color: 'rgb(200,68,42)'
                        }]),
                    }
                },
                label: dataStyle,
            }, {
                value: 100 - value,
                itemStyle: placeHolderStyle,
            },

            ]
        },


            //外圈的边框
            {
                // name: '总人数',
                type: 'pie',
                hoverAnimation: false, //鼠标经过的特效
                radius: ['89%', '94%'],
                // center: ['50%', '50%'],

                labelLine: {
                    normal: {
                        show: false
                    }
                },

                data: [{
                    value: 100,
                    itemStyle: {
                        color: 'rgb(254,125,68)'
                    },
                },

                ]
            },

        ]
    };
    return option
}

// 饼状图(蓝)
function pie2(data) {
    let value = data['消减率'].replace('%', '')
    let maxValue = data['消减量'] / value

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


    var dataStyle = {
        normal: {
            formatter: '处理后',
            position: 'center',
            show: true,
            textStyle: {
                fontSize: '9',
                fontWeight: 'normal',
                color: 'rgba(255, 255, 255, 0.8)'
            }
        }
    };


    var option = {
        // backgroundColor: '#142058',

        series: [{
            type: 'pie',
            hoverAnimation: false, //鼠标经过的特效
            // radius: ['26%', '31.5%'],
            radius: ['78%', '94%'],
            // center: ['50%', '50%'],
            max: maxValue,
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
                value: value,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00f0ff'
                        }, {
                            offset: 1,
                            color: '#009aff'
                        }]),
                    }
                },
                label: dataStyle,
            }, {
                value: 100 - value,
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
                        color: '#33aeff'
                    },
                },

                ]
            },

        ]
    };

    return option
}

// 监控上传图
function pieRight(data) {
    let maxValue = data[2].reduce((total, num) => {
        return total * 1 + num * 1;
    });
    let trafficWay = [];
    data[0].forEach((item, index) => {
        trafficWay.push({
            name: item,
            value: data[2][index] * 1
        })
    });
    // console.log('pieRight',data)
    var data = [];
    var innerData=[];
    var color = ['rgb(254,125,68)', 'rgb(0,154,255)', 'rgb(255,255,255)'];
    var colorOpacity = ['rgba(254,125,68,0.3)', 'rgba(0,154,255,0.3)', 'rgba(255,255,255,0.3)']
    for (var i = 0; i < trafficWay.length; i++) {
        data.push({
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
                normal: {
                    borderWidth: vwTopx(0.1),
                    shadowBlur: 1,
                    borderColor: color[i],
                    shadowColor: color[i]
                }
            }
        }, {
            value: '25', // 调整间隔
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
                    // borderColor: 'rgba(0, 0, 0, 0)',
                    // borderWidth: 0
                }
            }
        });
        innerData.push({
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
                normal: {
                    color:colorOpacity[i],
                    // borderWidth: 0,
                    // shadowBlur: 0,
                    // borderColor: colorOpacity[i],
                    // shadowColor: colorOpacity[i]
                }
            }
        }, {
            value: '25', // 调整间隔
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
                    // borderColor: 'rgba(0, 0, 0, 0)',
                    // borderWidth: 0
                }
            }
        });
    }
    var seriesOption = [
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
        data: data
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
    ];
    var option = {

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
        series: seriesOption
    }
    return option
}


export let popTable = [
    {
        name: "序号",
        width: "4vw",
    },
    {
        name: "企业名称",
        width: "12vw",
    },
    {
        name: "水平衡偏差类型",
        width: "8vw",
    },
    {
        name: "预警状态",
        width: "4vw",
        isGrade:true,
        textArr:['一般污染','中度污染','重度污染']
    }
]

export let poptableOption= {
    tableStyle: {
        height: "30vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "30vh"
    },
    tableTrstyle: {},
    isTableHeaderLine: true, // 表头分割线是否使用
    tableHeaderLine: `<div class="siderlist_header1"></div>` // dom字符串
}

export {
    iconogram1,
    iconogram2,
    pie1,
    pie2,
    pieLeft,
    pie3,
    pieRight,
    iconogram3
}
