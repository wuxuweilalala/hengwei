<template>
    <div :class="[{'situation-map':secondsId==='态势地图'},'basic-map']">
        <v-chart v-show="chartShow"
          :options="chartOptions"
          autoresize
          ref="instanceMap"></v-chart>
        <v-chart v-show="situationShow"
          :options="situationOptions"
          autoresize
        ></v-chart>
        <img v-show="!situationShow"
          :class="[data.type=='1'?'pollution-img':currentIndex===index?'controlMax-img':'control-img']"
          :ref='`markImg${index}`'
          :src='setToggle(data)'
          @click.stop="toToggle(data,index)"
          v-for="(data,index) in list"
        />

    </div>


</template>
<script>
    let goodsData = require('../../public/mapJson/shenzhen.json');
    import vECharts from 'vue-echarts';
    import 'echarts/map/js/china';
    import 'echarts-gl/dist/echarts-gl.min';
    import 'echarts/lib/chart/effectScatter';
    import 'echarts/lib/chart/heatmap';
    import 'echarts/lib/component/visualMap'
    import "echarts/extension/bmap/bmap.js";

    export default {
        name: 'basicPie',
        data() {
            return {
                chartShow: true,
                situationShow: false,
                currentIndex: -1,
                chartOptions: '',
                situationOptions: {
                    visualMap: {
                        left: 'right',
                        min: 0.05385164807134505,
                        max: 36.662997695224,
                        dimension: 4,
                        inRange: {
                            color: ['#00a9ff','green', 'yellow', 'red']
                            /*color: ['#0ed490', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#0ed490', '#fdae61', '#f46d43', '#d73027', '#e92f4e']*/
                        },
                        realtime: false,
                        calculable: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    bmap: {
                        // center: [95.97, 29.71],
                        center: [114.06667, 22.61667],//深圳
                        zoom: 10,
                        roam: true,
                        mapStyle: {
                            'styleJson': [{
                                'featureType': 'water',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#102442'
                                }
                            }, {
                                'featureType': 'land',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#1f325d'
                                }
                            }, {
                                'featureType': 'highway',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }, {
                                'featureType': 'arterial',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            }, {
                                'featureType': 'arterial',
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                    'color': '#0b3d51'
                                }
                            }, {
                                'featureType': 'local',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#000000'
                                }
                            }, {
                                'featureType': 'railway',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            }, {
                                'featureType': 'railway',
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                    'color': '#08304b'
                                }
                            }, {
                                'featureType': 'subway',
                                'elementType': 'geometry',
                                'stylers': {
                                    'lightness': -70
                                }
                            }, {
                                'featureType': 'building',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            }, {
                                'featureType': 'all',
                                'elementType': 'labels.text.fill',
                                'stylers': {
                                    'color': '#857f7f'
                                }
                            }, {
                                'featureType': 'all',
                                'elementType': 'labels.text.stroke',
                                'stylers': {
                                    'color': '#000000'
                                }
                            }, {
                                'featureType': 'building',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#022338'
                                }
                            }, {
                                'featureType': 'green',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#062032'
                                }
                            }, {
                                'featureType': 'boundary',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#465b6c'
                                }
                            }, {
                                'featureType': 'manmade',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#022338'
                                }
                            }, {
                                'featureType': 'label',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }]
                        }
                    },
                    series: [{
                        type: 'flowGL',
                        coordinateSystem: 'bmap',
                        data: [],
                        supersampling: 4,
                        particleType: 'line',
                        particleDensity: 128,
                        particleSpeed: 1,
                        // gridWidth: windData.nx,
                        // gridHeight: windData.ny,
                        itemStyle: {
                            opacity: 0.7
                        }
                    }]
                }
            }
        },
        props: {
            inventory: Object,
            list: Array,
            secondsId: String,
        },
        components: {
            'v-chart': vECharts
        },
        computed: {
            // chartOptions() {

            // },
            setToggle() {
                return (data) => {
                    let self = this
                    let symbol = null
                    // var seriesModel = self.$refs.instanceMap.chart.getModel().getSeriesByIndex(0);//获取当前图例
                    // var coordSys = seriesModel.coordinateSystem;//// 获取地理坐标系实例
                    symbol = require(`../assets/image/map/${data.status}.png`)
                    // switch (data.status) {
                    //     case "mild": //一般污染
                    //
                    //         break;
                    //     case "medium": //中级污染
                    //         symbol = require('../assets/image/map/medium.png')
                    //         break;
                    //     case "grave": //高级污染
                    //         symbol = require('../assets/image/map/grave.png')
                    //         break;
                    //     default:  //其他
                    //         symbol = ""
                    //         break;
                    // }
                    return symbol


                }
            },

        },
        methods: {
            setChartOptions() {
                vECharts.registerMap('深圳', goodsData);
                let mapGeoData = [
                    { //第三层
                        top: "11.5%",
                        borderWidth: 10,
                        borderColor: 'rgba(71,192,255,0.2)',
                        areaColor: 'none', //地图背景色
                        shadowBlur: 0,
                        shadowColor: 'none',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        emphasis: {
                            areaColor: 'none',
                        }
                    },
                    {//第2层
                        top: "10.5%",
                        borderWidth: 2,
                        borderColor: 'rgba(71,192,255,0.5)',
                        areaColor: 'none', //地图背景色

                        emphasis: {
                            areaColor: 'none',
                        }
                    },
                    { //border（第一层）
                        top: "8.5%",
                        borderWidth: 2,
                        borderColor: '#47c0ff',
                        areaColor: 'none', //地图背景色
                        shadowBlur: 0,
                        shadowColor: 'rgba(11,139,213,0.24)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        emphasis: {
                            areaColor: 'none',
                        }
                    }, {
                        top: "8.5%",
                        borderWidth: 1,
                        borderColor: 'rgba(31,200,255,0.5)',
                        shadowOffsetX: -4,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        emphasis: {
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(130,225,255,0)' // 0% 处的颜色
                                }, {
                                    offset: 0.9,
                                    color: 'rgba(130,225,255,0.4)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },

                        },
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(130,225,255,0)' // 0% 处的颜色
                            }, {
                                offset: 0.9,
                                color: 'rgba(130,225,255,0.4)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                    }]
                let geoJson = goodsData;
                let seriesData = this.setOptions(this.list)
                let option = {
                    geo: this.mapGeoArray('深圳', geoJson, mapGeoData),
                    visualMap: {
                        show: false,
                        // categories: ['严重污染', '重度污染', '中度污染', '轻度污染', '良', '优'],
                        // inRange: {
                        //     color: ["rgba(0,255,134,1)", "rgba(0,154,255,1)", "rgba(255,228,0,1)", "rgba(254,125,68,1)", "rgba(255,91,94,1)", "rgba(217,10,10,1)"].reverse()
                        // },
                    },
                    series: [seriesData]
                };
                return option
            },
            mapGeoArray(name, mapJson, mapGeoData) {
                let self = this;
                let mapGeo = [];
                for (let i = 0; i < mapGeoData.length; i++) {
                    mapGeo.push({
                        map: name,
                        zoom: 1.2,
                        data: this.initMapData(mapJson),
                        top: mapGeoData[i].top,
                        z: i,
                        emphasis: {
                            label: {
                                show: false,
                            }
                        },
                        regions: [],
                        itemStyle: {
                            normal: {
                                areaColor: mapGeoData[i].areaColor, //地图背景色
                                borderColor: mapGeoData[i].borderColor, //省市边界线
                                borderWidth: mapGeoData[i].borderWidth,
                                shadowBlur: mapGeoData[i].shadowBlur,
                                shadowOffsetX: mapGeoData[i].shadowOffsetX,
                                shadowOffsetY: mapGeoData[i].shadowOffsetY,
                                shadowColor: mapGeoData[i].shadowColor,
                            },
                            emphasis: mapGeoData[i].emphasis,
                        },
                    })
                }
                return mapGeo;
            },
            initMapData(mapJson) {
                let mapData = [];
                for (let i = 0; i < mapJson.features.length; i++) {
                    mapData.push({
                        name: mapJson.features[i].properties.name,
                    })
                }
                return mapData;
            },
            setOptions(data) {
                let self = this;
                let seriesData = [];
                seriesData.push({
                    status: data[0].status,
                    city: data[0].city,
                    provincial: data[0].provincial,
                    value: data[0].position,
                    symbol: null,

                })
                let options = {
                    type: 'effectScatter',
                    name: '触发',
                    coordinateSystem: 'geo',
                    effectType: 'ripple',
                    data: seriesData,
                    symbolSize: [1, 1]
                }
                return options

            },
            setPosition() {
                let self = this;
                var seriesModel = self.$refs.instanceMap.chart.getModel().getSeriesByIndex(0);//获取当前图例
                var coordSys = seriesModel.coordinateSystem;//// 获取地理坐标系实例

                for (let i in this.list) {
                    var point = coordSys.dataToPoint(this.list[i].position); // dataToPoint 相当于 getPosByGeo 把经纬度转为X、Y轴
                    self.$refs[`markImg${i}`][0].style.left = point[0] + 'px';
                    self.$refs[`markImg${i}`][0].style.top = point[1] + 'px';
                    //     document.querySelector('.markImg'+i).style.left=point[0]+'px';
                    //     document.querySelector('.markImg'+i).style.top=point[1]+'px';
                }
            },
            toToggle(item, index) { //污染源弹窗的切换
                console.log('toToggle',item, index)
                let self = this
                this.currentIndex = index
                this.$emit('showPop',item)
                if (item.type === 1) return


                let seriesData = []
                seriesData.push({
                    status: item.status,
                    city: item.position,
                    provincial: item.provincial,
                    value: item.position,
                    // symbol: 'image://data:image/png;base64,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',

                })
                let options = {
                    type: 'effectScatter',
                    name: '触发',
                    coordinateSystem: 'geo',
                    effectType: 'ripple',
                    rippleEffect: { //涟漪特效
                        period: 6, //动画时间，值越小速度越快
                        color: 'rgba(0, 154, 255, 1)',
                        brushType: 'fill', //波纹绘制方式 stroke, fill
                        scale: 15//波纹圆环最大限制，值越大波纹越大
                    },
                    data: seriesData,
                    symbol: "circle",
                    symbolSize: [10, 10]
                }
                // self.$set(this.chartOptions.series,'0' , options)

            },
            changeChart(val,old) {
                let self = this
                console.log('this.secondsId',this.secondsId,2,val,old)
                if (this.secondsId == '色阶统计图') {
                    this.situationShow = false
                    this.chartShow = true
                    let regions = ['罗湖区', '南山区', '龙岗区', '福田区'];
                    let regionsData = [];
                    regions.forEach(e => {
                        regionsData.push({
                            name: e,
                            itemStyle: {
                                areaColor: 'red',
                                color: 'red'
                            }
                        })
                    })
                    for (let i in self.chartOptions.geo) {
                        self.$set(self.chartOptions.geo[i], 'regions', regionsData)
                        // this.chartOptions.geo[i].regions = regionsData
                    }
                    console.log('regionsData',self.chartOptions.geo,regionsData)
                } else if (this.secondsId === '噪声态势图（等值线图）') {
                    let seriesData = {
                        type: 'heatmap',
                        name: '噪声态势图',
                        coordinateSystem: 'geo',
                        data: [['113.92706199999998', '22.542736', 41334],
                            ['113.93299300000001', '22.507888', 50000],
                            ["113.99469899999997", "22.523346", 50000],
                            ["113.99069899999997", "22.723346", 50000],]
                    }
                    // this.chartOptions.series[1]=seriesData
                    self.$set(this.chartOptions.series, '1', seriesData)
                }
                if (this.secondsId == '态势地图') {
                    this.situationShow = true
                    this.chartShow = false
                    //this.chartOptions = this.situationOptions
                }
                if (!this.secondsId) { //只显示透视图，无叠加东西
                    this.situationShow = false
                    this.chartShow = true
                    for (let i in self.chartOptions.geo) {
                        self.$set(self.chartOptions.geo[i], 'regions', [])
                    }
                    if(old=== '噪声态势图（等值线图）') {
                        self.$set(self.chartOptions.series[1], 'data',[] )
                    }
                }
            }
        },
        created() {
            this.$get('https://24e-img.oss-cn-shenzhen.aliyuncs.com/hengwei/situation.js').then(res => {
                // console.log(res);
                this.situationOptions.series[0].data = res
            })
            this.chartOptions = this.setChartOptions();
            console.log('this.chartOptions',this.chartOptions,1)
        },
        watch: {
            secondsId: {
                immediate:true,
                handler(val,old) {
                    this.$nextTick(() => {
                        this.changeChart(val,old)
                    })
                }
            }
        },
        mounted() {
            console.log(this.chartShow);
            console.log(this.situationShow);
            this.setPosition()

        }
    };
</script>
<style lang="scss"
  scoped>
    .basic-map {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -11%;

        img {
            position: absolute;
            cursor: pointer;

        }

        .pollution-img {
            width: 4.17vh;
            height: 5vh;
        }

        .control-img {
            width: 3.8vh;
            height: 5.28vh;
        }

        .controlMax-img {
            width: 4.72vh;
            height: 6.57vh;
            transition: all .3s;
        }
    }

    .echarts {
        height: 125%;
        width: 100%;
        display: flex;
        align-items: center;

        ::v-deep canvas {
            transform: rotateX(55deg);
        }
    }

    .situation-map {
        top: 0 !important;

        .echarts {
            height: 100%;

            ::v-deep canvas {
                transform: unset;
            }
        }
    }

</style>

}

.anchorBL{
display:none;
}
</style>
