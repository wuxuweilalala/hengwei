<template>
    <div id="gaodeMap" class="container"></div>
</template>

<script>
    import AMap from 'AMap' // 引入高德地图
    import psRiver from '../assets/mapJson/psRiver.json' //面积
    import psNetwork from '../assets/mapJson/psNetwork.json' //线
    export default {
        props: {
            isSatellite: Boolean,
            secondsId: String,
            index: Number
        },
        data() {
            return {
                mapObj: null,
                mapData:null,
                currentMapName:''
            }
        },
        mounted() {
            if (this.secondsId!=='色阶统计图'&&this.secondsId!=='噪声态势图') {
                if (this.index==-1||this.index==0) {
                    this.setSatelliteMap()
                } else {
                    this.trafficRoute()
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
                    console.log('data',_this.mapData)
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
                            color: ['#0c2c84', '#225ea8', '#225ea8', '#41b6c4', '#7fcdbb', '#c7e9b4', '#ffffcc'],
                            // 无数据区域的颜色填充
                            //blankFill: '#e3e3e3'
                        },
                        selectStyle:false
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
                console.log('33333')
                var map = new AMap.Map('gaodeMap', {
                    mapStyle: 'amap://styles/e2af95ff879c6da6dcc775196455ff52',
                    viewMode: '3D',
                    center: [114.489128,22.59559],//深圳
                    features: ['bg', 'road'],
                    zoom: 9.6,
                    pitch: 56
                });
                // map.setMapStyle('amap://styles/7c01b2af350eaa52182cd83b90922bdc');

                var contourLayer = new Loca.ContourLayer({
                    shape: 'isoline',
                    map: map
                });
                let arr = [{
                    lnglat: "114.489128,22.59559",
                    value: 10
                }]
                if (this.mapData) {
                    contourLayer.setData(this.mapData, {
                        lnglat: 'lnglat',
                        value: 'value'
                    });
                }

                contourLayer.setOptions({
                    smoothNumber: 3,
                    threshold: 3,
                    interpolation: {
                        step: 300,
                        effectRadius: 800,
                    },
                    style: {
                        height: 5 * 1E4,
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
                let geojson = new AMap.GeoJSON({
                    geoJSON: psNetwork,
                    // 还可以自定义getMarker和getPolyline
                    getPolyline: function (geojson, lnglats) {
                        return new AMap.Polyline({
                            path: lnglats,
                            strokeWeight: 10,
                            strokeColor: 'rgba(0, 154, 255, 1)',
                            zoom: 15
                        })
                        console.log(123, geojson, lnglats)
                    }
                });
                geojson.setMap(this.mapObj);
            },
            //设置坪山河流覆盖物
            setShroudArea() {
                let geojson = new AMap.GeoJSON({
                    geoJSON: psRiver,
                    // 还可以自定义getMarker和getPolyline
                    getPolygon: function (geojson, lnglats) {
                        return new AMap.Polygon({
                            path: lnglats,
                            borderWeight: 10,
                            strokeColor: 'rgba(0, 255, 168, 1)',
                            fillColor: 'rgba(0, 154, 255, 1)'
                        })
                    }
                });
                geojson.setMap(this.mapObj);
            },
            //交通路线图
            trafficRoute() {
                this.mapObj = new AMap.Map('gaodeMap', {
                    center: [114.06667, 22.61667],//深圳
                    resizeEnable: true,
                    zoom: 11
                })
            },
            async changeShroudline() {
                if (this.currentMapName!==this.secondsId ){
                    this.currentMapName = this.secondsId
                } else {
                    return
                }
                if (this.secondsId === '流域叠加') {
                     this.setShroudArea()
                } else if (this.secondsId === '网管叠加') {
                    this.setShroudline()
                } else if (this.secondsId === '色阶统计图') {
                    await  this.getData()
                    this.setdistrict()
                } else if (this.secondsId === '噪声态势图') {
                    await  this.getData()
                    this.contourLine()
                }
            },
            async getData() {
                let params = {
                    mapClass:this.secondsId
                }
                await this.$get('/i6035AirColorLevel',params).then( res =>  {
                    if (res.code == 0) {
                        this.mapData = res.data
                        console.log(33)
                    } else {
                        console.log(res.err_msg)
                    }
                })
            }

        },
        watch: {
            isSatellite(val) {
                this.setSatelliteMap()
            },
            index: {
                immediate:true,
                handler(val) {
                    console.log(val,'val',this.secondsId)
                    if (val==-1||val==0) {
                        this.setSatelliteMap()
                    } else {
                        this.trafficRoute()
                    }
                    this.$nextTick(()=> {
                        this.changeShroudline()
                    })
                }
            },
            secondsId(val) {
                this.mapObj.clearMap();
                this.changeShroudline()
            }
        }
    }
</script>
<style>
    #gaodeMap {
        width: 100%;
        height: 100%;
    }
</style>