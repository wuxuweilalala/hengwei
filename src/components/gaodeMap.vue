<template>
    <!--        <div id="gaodeMap"-->
    <!--          class="container">-->
    <!--        </div>-->
    <div class="map">
        <v-chart
          class="vcharts-gaode"
          ref="googleMap"
          :options="chartsOptions"
          autoresize
        ></v-chart>
        <div v-show="showMsg"
          class="tip-name"
          :style="setPos">
            <span class="tip-name-left"></span>
            <span class="tip-name-title">{{ tipMsg }}</span>
        </div>
    </div>
</template>

<script>
    import AMap from 'AMap' // 引入高德地图
    import psRiver from '../assets/mapJson/psRiver.json' //面积
    import psNetwork from '../assets/mapJson/psNetwork.json' //线
    import {mapGetters} from 'vuex';
    import vECharts from 'vue-echarts';
    export default {
        props: {
            isSatellite: Boolean,
            secondsId: String,
            index: Number,
            currSecondsId: String,
            list: Array,
        },
        data() {
            return {
                mapObj: null,
                mapData: null,
                currentMapName: '',
                shroudline: null,
                shroudArea: null,
                isAddArea: false,
                isAddLine: false,
                mapArr: [],
                basicList: [ ],
                lastClickedMarker: '',
                satellite: '',//卫星图
                layers: {},//所有图层
                defaultAmap: { //默认配置
                    // 高德地图中心经纬度
                    echartsLayerZIndex: 2,
                    mapStyle: '',
                    viewMode: '3D',
                    center: [114.06667, 22.61667],//深圳
                    zoom: 11
                },
                chartsOptions: {  //高德地图、echarts配置
                    // 加载 amap 组件
                    amap: this.defaultAmap,
                    tooltip: {
                        trigger: 'item',
                        show: false
                    },
                    animation: false,
                    series: [],
                },
                showMsg: false,
                tipMsg: '',
                msgPos: {
                    left: '',
                    top: '',
                },
                markStatus: true,
            }
        },
        computed: {
            ...mapGetters('index', {
                vwToPx: 'vwToPx',
                userInfo: 'getUserInfo'
            }),
            setPos() {
                return this.msgPos
            }
        },
        components: {
            'v-chart': vECharts
        },
        created() {
            if (sessionStorage.getItem('mapCenter') !== null) {
                this.defaultAmap.center = JSON.parse(sessionStorage.getItem('mapCenter'))
            }
        },
        mounted() {
            this.mapObj = this.$refs.googleMap.chart.getModel().getComponent("amap").getAMap();
            if (this.secondsId !== '色阶统计图' && this.secondsId !== '噪声态势图') {
                if (this.index == -1 || this.index == 0) {
                    this.setSatelliteMap()
                } else {
                    this.trafficRoute()
                }
                if (this.secondsId && this.secondsId.indexOf('流域叠加') > -1) {
                    this.setShroudArea()
                }
                if (this.secondsId && this.secondsId.indexOf('管网叠加') > -1) {
                    this.setShroudline()
                }
            }
        },

        methods: {
            //区面
            setdistrict() {
                let _this = this
                // $.get('https://a.amap.com/Loca/static/mock/tourist_attractions.csv', data => {
                    this.chartsOptions.amap = {
                        mapStyle: '',
                        pitch: 50,
                        features: ['bg', 'road'],
                        // center: [114.06667, 22.61667],//深圳
                        viewMode: '3D'
                    };
                    this.mapObj.setMapStyle('amap://styles/e2af95ff879c6da6dcc775196455ff52')
                    this.layers.layer = new Loca.DistrictLayer({
                        fitView: true,
                        eventSupport: true,
                        drillDown: false,    // 开启鼠标单击下钻功能，前提要求开启 eventSupport 配置来支持鼠标事件
                        map: this.mapObj
                    });
                _this.mapData.forEach(e=>{
                    let lnglat= _this.bd_decrypt( e.lnglat.split(',')[0], e.lnglat.split(',')[1])
                    e.lnglat=`${lnglat.lng},${lnglat.lat}`
                })

                this.layers.layer.setData(_this.mapData, {
                        // type: 'csv',
                        lnglat: 'lnglat',
                        value: 'count'
                    });
                this.layers.layer.setOptions({
                        mode: 'count',
                        adcode: "440300",
                        // 是否显示无数据区域，v1.1.1 开始支持
                        displayBlank: false,
                        style: {
                            color: ['#009aff', '#ffe400', '#fe7d44', '#ff5b5e', '#d90a0a'],
                            // 无数据区域的颜色填充
                            blankFill: '#00ff86'
                        },
                        selectStyle: false
                    });

                    this.layers.layer.render();
                    // $('#up-btn').click(function () {
                    //     layer.goto(-1);
                    // });
                    // $('#code-list').change(function (ev) {
                    //     var target = ev.target;
                    //     var adcode = $(target).val();
                    //     if (adcode != -1) {
                    //         layer.goto(adcode);
                    //     }
                    // });

                // });
            },
            //设置等高线地图
            contourLine() {
                this.$set(this.chartsOptions, 'amap', {
                    viewMode: '3D',
                    center: [114.06667, 22.61667],//深圳
                    features: ['bg', 'road'],
                    pitch: 56
                })
                this.mapObj.setMapStyle('amap://styles/e2af95ff879c6da6dcc775196455ff52')
                this.layers.contourLayer = new Loca.ContourLayer({
                    shape: 'isoline',
                    map: this.mapObj
                });

                if (this.mapData) {
                    this.layers.contourLayer.setData(this.mapData, {
                        lnglat: 'lnglat',
                        value: 'value'
                    });
                }

                this.layers.contourLayer.setOptions({
                    smoothNumber: 3,
                    threshold: 3, //圈数
                    interpolation: {
                        step: 300,
                        effectRadius: 800, //影响的范围
                    },
                    style: {
                        height: 5 * 1E4, //高度
                        color: ["#0c2c84", "#225ea8", "#1d91c0", "#41b6c4", "#7fcdbb", "#c7e9b4", "#ffffcc"]
                    }
                });
                this.layers.contourLayer.render();
            },
            //清除所有图层
            clearLayers() {
                for (let i in this.layers) {
                    this.mapObj.remove(this.layers[i])
                }
                this.mapObj && this.mapObj.setMapStyle("amap://styles/normal")
                this.chartsOptions.amap = this.defaultAmap
            },
            //卫星和路网
            setSatelliteMap() {
                this.layers.Satellite = new AMap.TileLayer.Satellite()
                this.mapObj.add([this.layers.Satellite])
            },
            //设置坪山管网覆盖物
            setShroudline() {
                this.shroudline = new AMap.GeoJSON({
                    geoJSON: psNetwork,
                    extData: {
                        id: 1
                    },
                    // 还可以自定义getMarker和getPolyline
                    getPolyline: function (geojson, lnglats) {
                        return new AMap.Polyline({
                            path: lnglats,
                            strokeWeight: 2,
                            strokeColor: 'rgba(0, 154, 255, 1)',
                            zoom: 15
                        })
                        // console.log(123, geojson, lnglats)
                    }
                });
                // this.mapArr.push(this.shroudline)
                this.mapObj.add(this.shroudline)
                // geojson.setMap(this.mapObj);
            },
            //设置坪山河流覆盖物
            setShroudArea() {
                this.shroudArea = new AMap.GeoJSON({
                    geoJSON: psRiver,
                    extData: {
                        id: 2
                    },
                    // 还可以自定义getMarker和getPolyline
                    getPolygon: function (geojson, lnglats) {
                        return new AMap.Polygon({
                            path: lnglats,
                            borderWeight: 10,
                            strokeColor: 'rgba(0, 255, 168, 1)',
                            fillColor: 'rgba(0, 255, 168, 1)',
                            // fillColor: 'rgba(76, 211, 255, 1)'
                        })
                    }
                });
                let marker = new AMap.Marker({
                    extData: {
                        id: 2
                    },
                });
                // this.mapArr.push(this.shroudArea)
                this.mapObj.add(this.shroudArea)
                // geojson.setMap(this.mapObj);
            },
            //交通路线图
            trafficRoute() {
                if (this.layers.Satellite) {
                    this.mapObj.remove([this.layers.Satellite])
                }

            },
            drawSelected() {
                this.mapObj.plugin([" AMap.Object3DLayer", 'AMap.DistrictSearch'], () => {
                    var object3Dlayer = new AMap.Object3DLayer({zIndex: 15});
                    this.mapObj.add(object3Dlayer);
                    var opts = {
                        subdistrict: 2,
                        extensions: 'all',
                        level: 'district'
                    };
                    //利用行政区查询获取路径
                    var district = new AMap.DistrictSearch(opts);
                    let area = this.userInfo.adcode || this.userInfo.area
                    district.search(area, function (status, result) {
                        var bounds = result.districtList[0].boundaries;
                        var color = '#0055ff';
                        for (var i = 0; i < bounds.length; i += 1) {
                            var line = new AMap.Object3D.MeshLine({
                                path: bounds[i],
                                color: color,
                                width: 3,
                            });
                            object3Dlayer.add(line)
                        }
                    })
                })

            },
            //热力图
            drwaHeatmap() {
                /*热力图数据格式
                * [{lng--经度  lat--纬度   count--总数},{},...]
                * */
                let params = {
                    styleClass: this.$route.path.replace('/', '')
                }
                this.$get('/i605HeatMap', params).then(res => {
                    // console.log('热力图',res.data)
                    this.trafficRoute()
                    AMap.plugin(["AMap.Heatmap"], () => {
                        //初始化heatmap对象
                        this.layers.heatmap = new AMap.Heatmap(this.mapObj, {
                            radius: 40, //给定半径
                            opacity: [0, 0.7]
                        });
                        this.layers.heatmap.setDataSet({
                            data: res.data,
                            max: 10
                            // max:100
                        });
                        this.mapObj.add([this.layers.heatmap])
                    });
                })
            },
            async changeShroudline() {
                if (this.currentMapName !== this.secondsId) {
                    this.currentMapName = this.secondsId
                } else {
                    return
                }
                this.clearLayers();
                if (this.secondsId === '流域叠加') {
                    this.setShroudArea()
                } else if (this.secondsId === '管网叠加') {
                    this.setShroudline()
                } else if (this.secondsId === '色阶统计图') {
                    await this.getData()

                    this.setdistrict()
                } else if (this.secondsId === '噪声态势图') {
                    await this.getData()
                    this.contourLine()
                } else if (this.secondsId === '热力图') {
                    this.drwaHeatmap()
                }
            },
            async getData() {
                let params = {
                    mapClass: this.secondsId
                }
                await this.$get('/i6035AirColorLevel', params).then(res => {
                    if (res.code == 0) {
                        this.mapData = res.data
                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            bd_decrypt(bd_lng, bd_lat) {
                var X_PI = Math.PI * 3000.0 / 180.0;
                var x = bd_lng - 0.0065;
                var y = bd_lat - 0.006;
                var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
                var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
                var gg_lng = z * Math.cos(theta);
                var gg_lat = z * Math.sin(theta);
                return {lng: gg_lng, lat: gg_lat}
            },
            //设置标记
            setMarkers(basicList) {
                let self = this
                basicList.forEach(function (marker) {
                    let size = []
                    if (marker.type === 1) {
                        size = [self.vwToPx(2.34), self.vwToPx(2.81)]
                    } else if (marker.type === 2) {
                        size = [self.vwToPx(2.14), self.vwToPx(2.97)]
                    } else if (marker.type === 3) {
                        size = [self.vwToPx(1.67), self.vwToPx(1.67)]
                    }
                    if (marker.status !== '') {
                        let preIcon = new AMap.Icon({
                            image: require(`@/assets/image/map/${marker.status}.png`),
                            size: new AMap.Size(size[0], size[1]), //图标大小
                            imageSize: new AMap.Size(size[0], size[1]),

                        })
                        let pos = self.bd_decrypt(marker.position[0], marker.position[1])
                        let mapMark = new AMap.Marker({
                            map: self.mapObj,
                            position: [pos.lng, pos.lat],
                            icon: preIcon,
                            cursor: 'pointer',
                            offset: new AMap.Pixel(-size[0]/2, -size[1]/2)
                            // offset: new AMap.Pixel(-0, -37)
                        })
                        mapMark.info = marker
                        mapMark.name = marker.status.split('_')[0]
                        mapMark.on('click', self.showInfoM);
                        mapMark.on('mousemove', self.mapMarkMove)
                        mapMark.on('mouseout', () => {
                            self.showMsg = false
                        })
                        self.mapObj.add(mapMark)
                        if(marker.isShow == true) {
                            mapMark.show()
                        } else {
                            mapMark.hide()
                        }
                    }
                });
            },
            toggleMark(name, bool, mapName) {
                let markers = this.mapObj.getAllOverlays('marker')
                for (let i = 0; i < markers.length; i++) {
                    let mark = markers[i]
                    if(mark.name == name) {
                        if(bool == true) {
                            mark.hide()
                        } else {
                            mark.show()
                        }
                    }
                }
            },
            mapMarkMove(event) {
                this.showMsg = true
                this.tipMsg = event.target.info.city
               let mapView= this.$refs.googleMap.$el.getBoundingClientRect()
                this.msgPos.left =  mapView.left+ event.pixel.x + 'px'
                this.msgPos.top = mapView.top+event.pixel.y + 'px'
            },
            showInfoM(e) {  //标记点击事件
                let info = e.target.info;
                let size;
                //显示弹窗
                this.$emit('showPop', info)
                this.$get('/i606FlowChart',{code:info.code}).then(res => { //流向图接口
                    this.flowDirection(res.data)
                })
                let path = this.$route.path
                let paths = path.split('/')
                let pathName = paths[paths.length - 1]
                if(pathName == 'environment') {
                    this.$store.commit('index/setPosCode', info.code)
                }
                if (info.type === 1) return
                if (info.type === 3) return;
                if (this.lastClickedMarker) {  //判断上一次点击过
                    size = [this.vwToPx(2.14), this.vwToPx(2.97)]
                    this.lastClickedMarker.setIcon(
                        new AMap.Icon({
                            image: require(`../assets/image/map/${this.lastClickedMarker.info.status}.png`),
                            size: new AMap.Size(size[0], size[1]), //图标大小
                            imageSize: new AMap.Size(size[0], size[1])
                        })
                    )
                }

                size = [this.vwToPx(2.97), this.vwToPx(4.48)]
                e.target.setIcon( //把iconSize置大
                    new AMap.Icon({
                        image: require(`../assets/image/map/${info.status}.png`),
                        size: new AMap.Size(size[0], size[1]), //图标大小
                        imageSize: new AMap.Size(size[0], size[1])
                    })
                )
                /*弹窗位置*/
                this.lastClickedMarker = e.target //赋值当前点击的marker
            },
            // 流向地图
            /*数据格式
            * [
            * {cords:[[源目标经纬度],[目的目标经纬度]]},
            * {cords:[[源目标经纬度],[目的目标经纬度]]}]*/
            flowDirection(flyLine) {
                let start=''
                let data=[]
                flyLine&&flyLine.forEach((e,index)=>{
                    let up,end
                    if(!index){
                       up= this.bd_decrypt(e.coords[0][0],e.coords[0][1]) //转百度初始坐标
                        start=[up.lng,up.lat]
                    }
                    let down= this.bd_decrypt(e.coords[1][0],e.coords[1][1])//转 百度终点坐标
                    end=[down.lng,down.lat]
                    data.push({coords:[start,end]})
                })
                // 流线起始点
                    let series = [
                        // 流线
                        {
                            coordinateSystem: "amap", // 该系列使用的坐标系是高德地图的坐标系
                            type: "lines", // 该类型用于地图上路线的绘制
                            zlevel: 130, // 相当于z-index
                            effect: { // 线特效的配置
                                show: true,  // 是否显示特效
                                period: 1.5, // 特效动画的时间
                                trailLength: 0.05, // 特效尾迹的长度 0-1
                                color: "#3437ff", // 特效的颜色
                                symbolSize: 5 // 特效的大小
                            },
                            lineStyle: { // 线的颜色
                                normal: {
                                    color: "rgba(47,68,200,0.1)",
                                    width: 2,
                                    curveness: 0.2
                                }
                            },
                            data: data,
                        },
                    ]
                    this.chartsOptions.series = series
            },
        },
        watch: {
            isSatellite() {
                // this.setSatelliteMap()
            },
            index: {
                immediate: true,
                handler(val) {
                    this.clearLayers();
                    if (val == 0) {
                        this.setSatelliteMap()
                    } else {
                        this.trafficRoute()
                    }
                    this.$nextTick(() => {
                        this.changeShroudline()
                    })
                }
            },
            secondsId(val, old) {
                if (this.$route.path !== '/environment') {
                    this.changeShroudline()
                } else {
                    if (val && val.indexOf(this.currSecondsId) > -1) {
                        if (this.currSecondsId === '流域叠加') {
                            this.setShroudArea()
                        }
                        if (this.currSecondsId === '管网叠加') {
                            this.setShroudline()
                        }
                    } else {
                        if (this.currSecondsId === '流域叠加') {
                            this.mapObj.remove(this.shroudArea)
                        }
                        if (this.currSecondsId === '管网叠加') {
                            this.mapObj.remove(this.shroudline)
                        }
                        if (this.currSecondsId == '') {  //切换右侧按钮
                            this.shroudline && this.mapObj.remove(this.shroudline)
                            this.shroudArea && this.mapObj.remove(this.shroudArea)
                        }
                    }
                }
            },
            mapObj() {
                this.setMarkers(this.list)
                this.drawSelected()
            },
        }
    }
</script>
<style lang="scss">

    .map {
        width: 100%;
        height: 100%;

        .vcharts-gaode {
            width: 100%;
            height: 100%;
        }

        .tip-name {
            position: fixed;
            display: flex;
            transform: translateY(-100%);
            pointer-events: none;
            z-index: 99;

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


    #gaodeMap {
        width: 100%;
        height: 100%;
    }
</style>
