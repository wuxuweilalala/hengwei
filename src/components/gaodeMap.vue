<template>
    <div id="gaodeMap"
      class="container"></div>
</template>

<script>
    import AMap from 'AMap' // 引入高德地图
    import psRiver from '../assets/mapJson/psRiver.json' //面积
    import psNetwork from '../assets/mapJson/psNetwork.json' //线
    import {mapGetters} from 'vuex';

    export default {
        props: {
            isSatellite: Boolean,
            secondsId: String,
            index: Number,
            currSecondsId: String,
            list:Array
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
                basicList: [
                    {
                        city: "坪山区",
                        // code: "130100",
                        code: "PS100000040109",
                        popUrl: "http://share.howaycloud.com:9091/test/A.html",
                        position: [114.350849, 22.708725],
                        provincial: "广东",
                        provincialCode: "4004300",
                        status: "mild",
                        type: 1,
                    }, {
                        city: "坪山区",
                        code: "PS100000010033",
                        popUrl: "http://share.howaycloud.com:9091/test/A.html",
                        position: [114.300849, 22.708725],
                        provincial: "广东",
                        provincialCode: "4004300",
                        status: "grave",
                        type: 1,
                    }, {
                        city: "坪山区",
                        code: "PS100000010033",
                        popUrl: "http://share.howaycloud.com:9091/test/A.html",
                        position: [114.200849, 22.700725],
                        provincial: "广东",
                        provincialCode: "4004300",
                        status: "medium",
                        type: 1,
                    }, {
                        city: "坪山区",
                        code: "PS100000010033",
                        popUrl: "http://share.howaycloud.com:9091/test/A.html",
                        position: [114.000849, 22.658725],
                        provincial: "广东",
                        provincialCode: "4004300",
                        status: "city",
                        type: 2,
                    }, {
                        city: "坪山区",
                        code: "PS100000010033",
                        popUrl: "http://share.howaycloud.com:9091/test/A.html",
                        position: [113.900849, 22.705725],
                        provincial: "广东",
                        provincialCode: "4004300",
                        status: "area",
                        type: 2,
                    }, {
                        city: "坪山区",
                        code: "PS100000010033",
                        popUrl: "http://share.howaycloud.com:9091/test/A.html",
                        position: [114.000849, 22.625725],
                        provincial: "广东",
                        provincialCode: "4004300",
                        status: "country",
                        type: 2,
                    }],
                lastClickedMarker: '',
            }
        },
        computed: {
            ...mapGetters('index', {
                vwToPx: 'vwToPx',
            }),
        },
        mounted() {
            console.log('this.secondsId',this.secondsId)
            if (this.secondsId !== '色阶统计图' && this.secondsId !== '噪声态势图') {
                if (this.index == -1 || this.index == 0) {
                    this.setSatelliteMap()
                } else {
                    this.trafficRoute()
                }
                if (this.secondsId&&this.secondsId.indexOf('流域叠加')>-1) {
                    this.setShroudArea()
                }
                if (this.secondsId&&this.secondsId.indexOf('管网叠加')>-1) {
                    this.setShroudline()
                 }
            }
        },
        methods: {
            //区面
            setdistrict() {
                let _this = this
                $.get('https://a.amap.com/Loca/static/mock/tourist_attractions.csv', function (data) {
                    var map = new AMap.Map('gaodeMap', {
                        mapStyle: 'amap://styles/e2af95ff879c6da6dcc775196455ff52',
                        pitch: 50,
                        features: ['bg', 'road'],
                        center: [107.4976, 32.1697],
                        zoom: 4,
                        viewMode: '3D'
                    });

                    var layer = new Loca.DistrictLayer({
                        fitView: true,
                        eventSupport: true,
                        drillDown: true,    // 开启鼠标单击下钻功能，前提要求开启 eventSupport 配置来支持鼠标事件
                        map: map
                    });
                    // console.log('data',_this.mapData[0].lnglat.split(','))
                    layer.setData(_this.mapData, {
                        // type: 'csv',
                        lnglat: 'lnglat',
                        value: 'value'
                    });

                    layer.setOptions({
                        mode: 'count',
                        // 是否显示无数据区域，v1.1.1 开始支持
                        displayBlank: true,
                        style: {
                            color: ['#009aff', '#ffe400', '#fe7d44', '#ff5b5e', '#d90a0a'],
                            // 无数据区域的颜色填充
                            blankFill: '#00ff86'
                        },
                        selectStyle: false
                    });

                    layer.render();

                    $('#up-btn').click(function () {
                        layer.goto(-1);
                    });

                    $('#code-list').change(function (ev) {
                        var target = ev.target;
                        var adcode = $(target).val();
                        if (adcode != -1) {
                            layer.goto(adcode);
                        }
                    });

                });
            },
            //设置等高线地图
            contourLine() {
                var map = new AMap.Map('gaodeMap', {
                    mapStyle: 'amap://styles/e2af95ff879c6da6dcc775196455ff52',
                    viewMode: '3D',
                    center: [114.489128, 22.59559],//深圳
                    features: ['bg', 'road'],
                    zoom: 9.6,
                    pitch: 56
                });
                // map.setMapStyle('amap://styles/7c01b2af350eaa52182cd83b90922bdc');

                var contourLayer = new Loca.ContourLayer({
                    shape: 'isoline',
                    map: map
                });

                if (this.mapData) {
                    contourLayer.setData(this.mapData, {
                        lnglat: 'lnglat',
                        value: 'value'
                    });
                }

                contourLayer.setOptions({
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
                contourLayer.render();
            },
            //卫星和路网
            setSatelliteMap() {
                let layers = [new AMap.TileLayer.Satellite()]
                if (this.isSatellite) {
                    //是否加上路网
                    layers.push(new AMap.TileLayer.RoadNet())
                }
                this.mapObj = new AMap.Map('gaodeMap', {
                    center: [114.06667, 22.61667],//深圳
                    // center:[114.085947,22.547],//深圳
                    // center:[114.350849,22.708725],//坪山
                    layers: layers,
                    zoom: 11
                });
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
                // debugger
                console.log('设置坪山河流覆盖物')
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
                var marker = new AMap.Marker({
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
                this.mapObj = new AMap.Map('gaodeMap', {
                    center: [114.06667, 22.61667],//深圳
                    resizeEnable: true,
                    zoom: 11
                })
            },
            //热力图
            drwaHeatmap() {
                /*热力图数据格式
                * [{lng--经度  lat--纬度   count--总数},{},...]
                * */
                let heatmapData = [
                    {
                        "lng": 113.92706199999998,
                        "lat": 22.542736,
                        "count": 41334
                    },
                    {
                        "lng":113.92706199999998,
                        "lat": 22.542736,
                        "count": 41334
                    },
                    {
                        "lng":113.93299300000001,
                        "lat":22.507888,
                        "count":  7883
                    },
                    {
                        "lng":113.99469899999997,
                        "lat":22.523346,
                        "count":5598
                    },
                    {
                        "lng":113.99408900000003,
                        "lat":22.52308,
                        "count":16346
                    },
                    {
                        "lng":113.87163800000008,
                        "lat":22.474423,
                        "count":11346
                    },
                    {
                        "lng":98.277304,
                        "lat":39.786529,
                        "count":2686
                    },
                    {
                        "lng":114.017382,
                        "lat":22.604341,
                        "count":2468
                    },
                    {
                        "lng":113.99033800000007,
                        "lat":22.62961,
                        "count":11202
                    },
                    {
                        "lng":113.99033800000007,
                        "lat":22.72961,
                        "count":6202
                    },
                    {
                        "lng":113.91535099999999,
                        "lat":22.483534,
                        "count":1036
                    },
                    {
                        "lng":113.90857800000003,
                        "lat":22.478785,
                        "count":11936
                    },
                    {
                        "lng":113.92434300000002,
                        "lat":22.529534,
                        "count":21713
                    },
                    {
                        "lng":113.95341200000007,
                        "lat":22.556386,
                        "count":702
                    },
                    {
                        "lng":114.204648,
                        "lat":22.601526,
                        "count":702
                    },
                ];
                // let styleClass = this.$route.path==='/atmosphere' ? 'atmosphere': this.$route.path==='/noise' ? 'noise': ''
                let params = {
                    styleClass:this.$route.path.replace('/','')
                }
                this.$get('/i605HeatMap',params).then(res => {
                    // console.log('热力图',res.data)
                    let heatmap;
                    this.mapObj.plugin(["AMap.Heatmap"], () => {
                        //初始化heatmap对象
                        heatmap = new AMap.Heatmap(this.mapObj, {
                            radius: 40, //给定半径
                            opacity: [0, 0.7]
                            /*,
                            gradient:{
                                0.5: 'blue',
                                0.65: 'rgb(117,211,248)',
                                0.7: 'rgb(0, 255, 0)',
                                0.9: '#ffea00',
                                1.0: 'red'
                            }
                             */
                        });
                        //设置数据集：该数据为北京部分“公园”数据
                        heatmap.setDataSet({
                            data: res.data,
                            max: 10
                            // max:100
                        });
                    });
                })


            },
            async changeShroudline() {
                if (this.currentMapName !== this.secondsId) {
                    this.currentMapName = this.secondsId
                } else {
                    return
                }
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
                }
            },
            async getData() {
                let params = {
                    mapClass: this.secondsId
                }
                await this.$get('/i6035AirColorLevel', params).then(res => {
                    if (res.code == 0) {
                        this.mapData = res.data
                        console.log(33)
                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            //设置标记
            setMarkers(basicList) {
                let self = this
                basicList.forEach(function (marker) {
                    let size
                    if (marker.type === 1) {
                        size = [self.vwToPx(2.34), self.vwToPx(2.81)]
                    } else {
                        size = [self.vwToPx(2.14), self.vwToPx(2.97)]
                    }
                    let preIcon = new AMap.Icon({
                        image: require(`../assets/image/map/${marker.status}.png`),
                        size: new AMap.Size(size[0], size[1]), //图标大小
                        imageSize: new AMap.Size(size[0], size[1])
                    })
                    let mapMark = new AMap.Marker({
                        map: self.mapObj,
                        position: [marker.position[0], marker.position[1]],
                        icon: preIcon,
                        // offset: new AMap.Pixel(-0, -37)
                    })

                    mapMark.info = marker
                    mapMark.on('click', self.showInfoM);
                    // new AMap.Marker({
                    //     map: self.mapObj,
                    //     icon: require(`../assets/image/map/${marker.status}.png`),
                    //     // iconSize: new AMap.Size(size[0], size[1]),
                    //     position: [marker.position[0], marker.position[1]],
                    // });
                });

            },
            showInfoM(e) {  //标记点击事件
                let info = e.target.info;
                let size;
                //显示弹窗
                this.$emit('showPop',info)

                if (info.type === 1) return
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
            }
        },
        watch: {
            isSatellite(val) {
                this.setSatelliteMap()
            },
            index: {
                immediate: true,
                handler(val) {
                    // console.log(val,'val',this.secondsId)
                    if (val == -1 || val == 0) {
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
                console.log(val, old)
                if (this.$route.path !== '/environment') {
                    this.mapObj.clearMap();
                    this.changeShroudline()
                } else {
                    if (val.indexOf(this.currSecondsId) > -1) {
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
                    }
                    console.log(this.currSecondsId, val)
                }
            },
            mapObj() {
                console.log('this.basicList',this.basicList)
                this.setMarkers(this.basicList)
                this.drwaHeatmap()
            },
        }
    }
</script>
<style>
    #gaodeMap {
        width: 100%;
        height: 100%;
    }
</style>