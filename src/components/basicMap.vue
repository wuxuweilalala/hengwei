<template>
    <div class="basic-map">
        <div v-show="chartShow"
          ref="instanceMap"
          class="map3d"
          style="width: 100%;height: 100%"></div>
        <template style="width: 100%; height: 100%;" v-if="showEchart">
            <v-chart ref="bmap" class="bmap" v-show="situationShow"
                     :options="optionShow"
                     :key="optionKey"
                     @click="markClickEvent"
                     @mousemove="markMoveEvent"
                     @mouseout="markOutEvent"
                     autoresize
            ></v-chart>
        </template>
        <template style="width: 100%; height: 100%;" v-else>
            <v-chart ref="bmap" class="bmap" v-show="situationShow"
                     :options="optionHide"
                     :key="optionKey"
                     @click="markClickEvent"
                     @mousemove="markMoveEvent"
                     @mouseout="markOutEvent"
                     autoresize
            ></v-chart>
        </template>
<!--        <img v-show="situationShow"-->
<!--             :class="[data.type=='1'?'pollution-img':currentIndex===index?'controlMax-img':'control-img', 'img']"-->
<!--             :ref='`markImg${index}`'-->
<!--             :src='setToggle(data)'-->
<!--             @click.stop="toToggle(data,index)"-->
<!--             v-for="(data,index) in array"-->
<!--        />-->

        <div v-show="showMsg"
          class="tip-name"
          :style="setStyle"
          ref="tipName"><span class="tip-name-left"></span>
            <span class="tip-name-title">{{ tipName }}</span>
        </div>
    </div>


</template>
<script>
    import {mapGetters} from "vuex";
    // import AMap from 'AMap' // 引入高德地图
    let goodsData = require('../../public/mapJson/shenzhen.json');
    import vECharts from 'vue-echarts';
    import 'three-orbitcontrols'
    import 'echarts/map/js/china';
    import 'echarts-gl/dist/echarts-gl.min';
    import 'echarts/lib/chart/effectScatter';
    import 'echarts/lib/chart/heatmap';
    import 'echarts/lib/component/visualMap'
    import "echarts/extension/bmap/bmap.js";
    import GeoMap from '../utils/map'


    export default {
        name: 'basicPie',
        data() {
            return {
                chartShow: true,
                situationShow: false,
                currentIndex: -1,
                situationOptions: {
                    visualMap: {
                        left: 'right',
                        min: 0.05385164807134505,
                        max: 36.662997695224,
                        dimension: 4,
                        inRange: {
                            color: ['#00a9ff', 'green', 'yellow', 'red']
                            /*color: ['#0ed490', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#0ed490', '#fdae61', '#f46d43', '#d73027', '#e92f4e']*/
                        },
                        realtime: false,
                        calculable: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    bmap: {
                        center: [114.05, 22.55],//深圳
                        zoom: 11,
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
                        },
                        key: this.uuid(),
                    },
                    series: [{
                        type: 'flowGL',
                        coordinateSystem: 'bmap',
                        data: [],
                        supersampling: 4,
                        // renderItem: function(param, api) {
                        //     console.log('param, ', param, api)
                        // },
                        particleType: 'line',
                        particleDensity: 128,
                        particleSpeed: 1,
                        // gridWidth: windData.nx,
                        // gridHeight: windData.ny,
                        itemStyle: {
                            opacity: 0.7
                        }
                    }, {
                        type: 'custom',
                        renderItem: this.renderItemFirst,
                        coordinateSystem: 'bmap',
                        itemStyle: {
                            opacity: 0.5
                        },
                        animation: false,
                        data: [0],
                        z: 9999,
                        clickable: true,
                        legendHoverLink: true,
                        silent: false,
                    }, {
                        type: 'custom',
                        coordinateSystem: 'bmap',
                        renderItem: '',
                        itemStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        },
                        animation: false,
                        silent: true,
                        data: [0],
                    }, {  //流向图点
                        coordinateSystem: "bmap", // 该系列使用的坐标系是百度的坐标系
                        type: "lines", // 该类型用于地图上路线的绘制
                        zlevel: 1, // 相当于z-index
                        effect: { // 线特效的配置
                            show: true,  // 是否显示特效
                            period: 3, // 特效动画的时间
                            trailLength: 0.5, // 特效尾迹的长度 0-1
                            color: "#3437ff", // 特效的颜色
                            symbolSize: 5 // 特效的大小
                        },

                        lineStyle: { // 线的颜色
                            normal: {
                                width: 0,
                                curveness: 0.2
                            }
                        },
                        data: [],
                    },{ //流向线
                        coordinateSystem: "bmap", // 该系列使用的坐标系是百度的坐标系
                        type: "lines", // 该类型用于地图上路线的绘制
                        zlevel: 2, // 相当于z-index
                        lineStyle: {
                            normal: {
                                color: "rgba(47,68,200,1)",
                                width: 1,
                                opacity: 0.4,
                                curveness: 0.2
                            }
                        },
                        data: [],
                    }]
                },
                geoMap: '',
                basicList: [
                    {position: ['113.93299300000001', '22.507888'], status: 'city', type: 2, name: '站位名称11111站位'},
                    {position: ['113.99469899999997', '22.523346'], status: 'province', type: 2, name: '省级控点'},
                    {position: ['113.99069899999997', '22.723346'], status: 'mild', type: 1, name: '中级处理'},
                ],
                bmapObj: null,
                array: [{
                    city: "坪山区",
                    code: "130100",
                    position: [114.350849, 22.708725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "mild",
                    type: 1,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [114.300849, 22.708725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "grave",
                    type: 1,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [114.200849, 22.700725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "medium",
                    type: 1,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [114.000849, 22.658725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "city",
                    type: 2,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [113.900849, 22.705725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "area",
                    type: 2,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [114.000849, 22.625725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "country",
                    type: 2,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [115.000849, 22.625725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "workCondition_normal",
                    type: 3,
                }, {
                    city: "坪山区",
                    code: "130100",
                    position: [116.000849, 22.625725],
                    provincial: "广东",
                    provincialCode: "4004300",
                    status: "burnFactory_normal",
                    type: 3,
                },],
                showMsg: false,
                tipName: '',
                pointsList: '',
                canLoad: false,
                statusObj: [],
                updateResult: false,
                lists: this.list,
                isClick: false,
                showEchart: true,
                optionShow: {},
                optionHide: {},
                optionKey: this.uuid(),
                markPoints: [],
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
            ...mapGetters('index', {
                vwToPx: 'vwToPx',
            }),
            setToggle() {
                return (data) => {
                    let symbol = null
                    // var seriesModel = self.$refs.instanceMap.chart.getModel().getSeriesByIndex(0);//获取当前图例
                    // var coordSys = seriesModel.coordinateSystem;//// 获取地理坐标系实例
                    symbol = require(`../assets/image/map/${data.status}.png`)
                    return symbol
                }
            },
            setStyle() {
                return this.geoMap.tipStyle
            },
            ...mapGetters('index', {
                userInfo: 'getUserInfo',
                mapList: 'getMapList',
            })
        },
        methods: {
            renderItemFirst(params, api) {
                let result = []
                let list = this.mapList
                for (var i = 0; i < list.length; i++) {
                    let pos = list[i].position
                    let status = list[i].status
                    let type = list[i].type
                    let size = []
                    if (type === 1) {
                        size = [this.vwToPx(2.34), this.vwToPx(2.81)]
                    } else if (type === 2) {
                        size = [this.vwToPx(2.14), this.vwToPx(2.97)]
                    } else if (type === 3) {
                        size = [this.vwToPx(1.67), this.vwToPx(1.67)]
                    }
                    let point = api.coord(pos)
                    // console.log('status', status, this.statusObj, point)
                    if(status !== '' && list[i].isShow == true && !this.findName(status.split('_')[0])) {
                        // console.log('status', status, this.statusObj, point)
                        result.push({
                            type: 'image',
                            style: api.style({
                                image: require(`@/assets/image/map/${status}.png`),
                                x: point[0],
                                y: point[1],
                                width: size[0],
                                height: size[1],
                            }),
                            info: list[i],
                            name: status.split('_')[0],
                        })
                    }
                }
                // console.log('result ********', result)
                this.updateResult = true
                return {
                    type: 'group',
                    children: result,
                }
            },

            getAirSituationData() {
                this.$get('/i604AirPosture').then(res => {
                    if (res.code == 0) {
                        // this.airQualityObj =  res.data
                        // this.dataDispose(1,res.data.aqiRankTable)
                        // this.airGradeList = res.data
                        this.situationOptions.series[0].data = res.data.windDataList
                        // console.log(res.data.windDataList)
                        this.situationShow = true
                        this.chartShow = false
                        this.$emit('setWindText', res.data.windText)
                        // this.getBoundary()
                        // console.log(data)
                    } else {
                        // console.log(res.err_msg)
                    }
                })
            },
            toToggle(item, index) { //污染源弹窗的切换
                // console.log('toToggle', item, index)
                this.currentIndex = index
                this.$emit('showPop', item)
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
            changeChart(val, old) {
                if (this.secondsId == '态势地图') {
                    this.chartShow = false
                    this.getAirSituationData()
                    // this.setMarkers(this.testList)
                }
                if (!this.secondsId) { //只显示透视图，无叠加东西
                    this.situationShow = false
                    this.chartShow = true
                }
            },
            getData() {
                let bdary = new BMap.Boundary();
                let name = this.userInfo.area || '';
                let pointList = []
                bdary.get(name, (rs) => {//获取行政区域
                    let count = rs.boundaries.length; //行政区域的点有多少个
                    if (count === 0) {
                        return;
                    }
                    for (let i = 0; i < count; i++) {
                        let point = rs.boundaries[i].split(';')
                        for (let j = 0; j < point.length; j++) {
                            let xy = point[j].split(',')
                            let list = new BMap.Point(xy[0], xy[1])
                            pointList.push([list['lng'], list['lat']])
                        }
                    }
                    this.pointsList = pointList
                })
            },
            renderItem(params, api) {
                let points = [];
                let pointList = this.pointsList
                for (let i = 0; i < pointList.length; i++) {
                    points.push(api.coord(pointList[i]));
                }
                let color = '#0055ff';
                return {
                    type: 'polygon',
                    shape: {
                        points: vECharts.graphic.clipPointsByRect(points, {
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        })
                    },
                    style: api.style({
                        fill: 'none',
                        stroke: color,
                        lineWidth: 3,
                    })
                }
            },
            markMoveEvent(event) {
                let mapView= this.$refs.bmap.$el.getBoundingClientRect()
                let tipMsg = event.info.city
                this.tipName = tipMsg
                this.showMsg = true
                let left =   mapView.left+event.event.offsetX
                let top = mapView.top+ event.event.offsetY
                this.$refs.tipName.style.left = left + 'px'
                this.$refs.tipName.style.top = top + 'px'
            },
            markClickEvent(event) {
                //显示弹窗
                this.$get('/i606FlowChart', {code: event.info.code}).then(res => { //流向图接口
                    this.flowDirection(res.data)
                })
                this.$emit('showPop', event.info)
                let path = this.$route.path
                let paths = path.split('/')
                let pathName = paths[paths.length - 1]
                if(pathName == 'environment') {
                    this.$store.commit('index/setPosCode', event.info.code)
                }
            },
            markOutEvent(event) {
                this.showMsg = false
            },
            // 流向图
            flowDirection(flyLine) {
                // // let flyLine = [].concat.apply([], data.map(function (busLine, idx) {
                // //     var prevPt;
                // //     var points = [];
                // //     for (var i = 0; i < busLine.length; i += 2) {
                // //         var pt = [busLine[i], busLine[i + 1]];
                // //         if (i > 0) {
                // //             pt = [
                // //                 prevPt[0] + pt[0],
                // //                 prevPt[1] + pt[1]
                // //             ];
                // //         }
                // //         prevPt = pt;
                // //
                // //         points.push([pt[0] / 1e4, pt[1] / 1e4]);
                // //     }
                // //     return {
                // //         coords: points,
                // //
                // //     };
                // // }));
                // debugger
                // let series = {
                //     coordinateSystem: "bmap", // 该系列使用的坐标系是百度的坐标系
                //     type: "lines", // 该类型用于地图上路线的绘制
                //     zlevel: 1, // 相当于z-index
                //     polyline: true,
                //     effect: { // 线特效的配置
                //         show: true,  // 是否显示特效
                //         period: 5, // 特效动画的时间
                //         trailLength: 0.05, // 特效尾迹的长度 0-1
                //         color: "#3437ff", // 特效的颜色
                //         symbolSize: 50 // 特效的大小
                //     },
                //     lineStyle: { // 线的颜色
                //         normal: {
                //             color: "rgba(47,68,200,0.1)",
                //             width: 2,
                //             curveness: 0.2
                //         }
                //     },
                //     data: flyLine,
                // }
                this.situationOptions.series[3].data = flyLine
                this.situationOptions.series[4].data = flyLine
                this.optionKey=this.uuid()
            },
            findName(name) {
                for (let i = 0; i < this.statusObj.length; i++) {
                    let status = this.statusObj[i]
                    if(status == name) {
                        return true
                    }
                }
                return false
            },
            removeName(name) {
                for (let i = 0; i < this.statusObj.length; i++) {
                    let status = this.statusObj[i]
                    if(status == name) {
                        this.statusObj.splice(i, 1)
                    }
                }
            },
            uuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
            },
            toggleMark(name, bool, mapName) {
                if(mapName == '态势地图') {
                    console.log('this.statusObj', this.statusObj, bool, this.markPoints)
                    this.isClick = true
                    if(bool == true) {
                        this.statusObj.push(name)
                        this.situationOptions.bmap.zoom = 11
                        this.optionHide = this.situationOptions
                        this.optionKey = this.uuid()
                        this.showEchart = false
                        this.key = this.uuid()
                    } else {
                        console.log('this.statusObjddddddddddd', this.statusObj)
                        this.removeName(name)
                        this.situationOptions.bmap.zoom = 11
                        this.optionShow = this.situationOptions
                        this.optionKey = this.uuid()
                        this.showEchart = true
                        this.key = this.uuid()
                    }
                    this.bmapObj.panBy(1000, 0)
                    this.bmapObj.zoomIn()
                    this.bmapObj.setZoom(12)
                    document.querySelector('.bmap').click()
                    document.querySelector('.bmap').click()
                    this.$nextTick(() => {
                        document.querySelector('.bmap').click()
                        document.querySelector('.bmap').click()
                    })
                } else {
                    let children = this.geoMap.mapGroup.children
                    for (let i = 0; i < children.length; i++) {
                        let c = children[i]
                        if(c.name == name) {
                            if(bool == true) {
                                c.material.opacity = 0
                            } else {
                                c.material.opacity = 1
                            }
                        }
                    }
                }
            },
        },
        created() {
            // this.$get('https://24e-img.oss-cn-shenzhen.aliyuncs.com/hengwei/situation.js').then(res => {
            //     // console.log(res);
            //     this.situationOptions.series[0].data = res
            //     console.log('this this.situationOptions', this.situationOptions.series[0].data)
            // })
            this.optionShow = this.situationOptions
            if (sessionStorage.getItem('mapCenter') !== null) {
                this.situationOptions.bmap.center = JSON.parse(sessionStorage.getItem('mapCenter'))
            }
            this.getData()
        },
        beforeCreate() {

        },
        watch: {
            secondsId: {
                immediate: true,
                handler(val, old) {
                    this.$nextTick(() => {
                        this.changeChart(val, old)
                    })
                }
            },
            'geoMap.mapGroup'(val) {
                if (val && val.name) {
                    this.geoMap.drawMarker(this.list);
                    // if(this.canLoad) {
                    //     this.geoMap.drawMarker(this.list);
                    // }
                    // this.canLoad = true
                }
            },
            list(val) {
                if (val) {
                    this.geoMap.drawMarker(this.list);
                    // if(this.canLoad) {
                    //     this.geoMap.drawMarker(this.list);
                    // }
                    // this.canLoad = true
                }
            },
            'geoMap.tipName'(val) {
                if (val) {
                    this.tipName = val
                    this.showMsg = true
                } else {
                    this.showMsg = false
                }
            },
            pointsList() {
                this.situationOptions.series[2].renderItem = this.renderItem
            },
            'geoMap.isClick'(val) {
                if (val) {
                    this.$emit('showPop', val)
                }
            }
        },
        mounted() {
            // this.initMap()
            if(this.showEchart) {
                this.bmapObj = this.$refs.bmap.chart.getModel().getComponent("bmap").getBMap()
            }
            // console.log('this ', this.$refs.bmap.chart)
            this.geoMap = new GeoMap();
            this.geoMap.init();
        }
    };
</script>
<style lang="scss"
  scoped>
    .basic-map {
        width: 100%;
        height: 100%;
        position: absolute;

        .BMap_mask {
            width: 100%;
            height: 100%;

            div {
                width: 100%;
                height: 100%;
            }
        }

        .tip-name {
            position: fixed;
            display: flex;
            transform: translateY(-100%);
            pointer-events: none;

            &-left {
                display: inline-block;
                width: 2.78vh;
                height: 5.83vh;
                background: url("../assets/image/map/tip-line.png") no-repeat;
                background-size: 100% 100%;

            }

            &-title {
                display: inline-block;
                padding: 0 0.9vh;
                height: 1.35vw;
                line-height: 1.35vw;
                font-family: SourceHanSansCN-Regular;
                box-sizing: border-box;
                font-size: 1.11vh;
                color: #fff;
                background-image: url("../assets/image/map/tip-title.png");
                background-size: 100% 100%;
            }
        }

    }

    .echarts {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

    }

    .main {
        width: 100%;
        height: 100%;
    }

    .img {
        position: absolute;
    }


</style>

.anchorBL{
display:none;
}
</

style

>
