<template>
    <div class="toggleMap">
<!--        <MapIcon/>-->
<!--        右侧按钮-->
        <chartToggle :currChartIndex.sync="currChartIndex"/>
        <!--        左侧切换按钮-->
        <div class="toggle-list"
          v-show="id!='other'">
             <div :class="['toggle-tips']"
                  :style="{width:$route.path==='/atmosphere'?'16vw':''}"
                  v-if="$route.path!=='/environment'">
                <ul>
                    <li v-for="(item,index) in toggleList[id].value"
                      :key="index"
                      @click="changeIndex(item,index)">
                        <i class="hexagon"
                          :class="[index===currentIndex ? 'hexagon-active':'']"></i>
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
            <div :class="['toggle-tips']" v-else>
                <ul>
                    <li v-for="(item,index) in environmentMapToggle"
                        :key="index"
                        @click="changeMapToggleIndex(item,index)">
                        <i class="hexagon"
                           :class="[item.isShow ? 'hexagon-active':'']"></i>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="toggle-lines"
                 v-show="secondsId=='态势地图'"></div>
            <div class="toggle-menu f_c_center"
                 v-show="secondsId=='态势地图'">
                <img :src="toggleList['atmosphere'].detail.src"/>
                <div>
                    <span>{{toggleList['atmosphere'].detail.speed}}</span>
                    <span>{{toggleList['atmosphere'].detail.direction}}</span>
                </div>
            </div>
        </div>
        <div class="allMap"
          :class="[mapName[currChartIndex]==='basicMap'?'basicMap':'']">
            <component :is="updateChart"
              :index="currChartIndex"
              :list="basicList"
              :environmentMapToggle="environmentMapToggle"
              :currSecondsId="currSecondsId"
              @showPop="showData"
              ref="mapComponent"
              @setWindText="setWindText"
              :secondsId="secondsId"></component>
        </div>
        <div class="legends">
            <!--        污染显示条-->
            <div class="polluteBar">
                <div class="polluteBar-top">
                    <span>一般污染</span>
                    <span>中度污染</span>
                    <span>严重污染</span>
                </div>
                <div class="polluteBar-bottom">
                    <div class="polluteBar-bottom-bar"></div>
                    <div class="polluteBar-bottom-text">
                        <span>优</span>
                        <span>良</span>
                    </div>
                </div>
            </div>
            <div class="legend-cells" :key="i"
                 v-for="(items, i) in legends"
                 :style="{ width: items.width,}">
                <div class="legend-list" :style="{ width: items.width,}">
                    <div class="line"></div>
                    <div class="legend-cell" :style="{ width: item.width,}" v-for="(item, j) in items.cells" :key="`${i}-${j}`">
                        <img :src="item.img" @click="legendClickEvent($event, item.clickName, i, j, item.imgStatus)">
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>
                <div class="button-group" v-show="secondsId=='色阶统计图'">
<!--                    <select name="code-list" id="code-list" style="height: 28px;margin-right: 10px;">-->
<!--                        <option value="-1">选择下钻省份</option>-->
<!--                    </select>-->
<!--                    <input id="up-btn" type="button" class="button" value="行政区上浮"/>-->
                </div>
        <Popup :isShow.sync="showFlowPop" w="28.85vw" h="33.61vh" title="污染源企业">
            <div class="flow-popContainer">
                <div class="title">
                    <div class="dotIcon"></div>流程图
                </div>
                <div class="content">
                    <iframe :src="flowchart"></iframe>
                </div>
                <div class="btnBox f_r_center">
                    <div class="cancel pointer" @click="showFlowPop=!showFlowPop">取消</div>
                    <div class="affirm pointer" @click="showFlowPop=!showFlowPop">确认</div>
                </div>
            </div>
        </Popup>
    </div>
</template>

<script>
    import Popup from "./Popup";
    import gaodeMap from "./gaodeMap"; //高德地图
    import chartToggle from "./chartToggle"; //地图选择
    import basicMap from "./basicMap";
    import MapIcon from "./MapIcon";
    import mapLegends from './mapLegend';   // 图例的数据
    export default {
        name: "toggleMap",
        props: {
            id: {
                type: String,
                default: 'other'
            },
        },
        data() {
            return {
                currSecondsId:'',
                environmentMapToggle:[
                    {name:'管网叠加',isShow:false},{name:'流域叠加',isShow:false}
                ] ,
                flowchart:'',
                showpolluteBar:false,
                showFlowPop:false,
                mapName: ['gaodeMap', 'gaodeMap', 'basicMap'],
                currChartIndex: 2, //右侧三大地图下标
                windText:{},
                toggleList: {
                    noise: {value: ['噪声态势图','热力图']},
                    environment: {value: ['管网叠加', "流域叠加"]},
                    atmosphere: {
                        value: ['态势地图', '色阶统计图','热力图'],
                        detail: {
                            speed: '',
                            direction: '',
                            src: require('../assets/image/atmosphere/windImg.png')
                        }
                    }, other: {}
                },
                currentIndex: -1, //二级图选择下标
                basicList: [],
                secondsId: null,//二级选择图
                legends: [{
                    width: '17.97vw',
                    cells: [{
                        name: '废水',
                        img: require('../assets/image/map/wasteWater_legend.png'),
                        width: 15.4 / 3 + 'vw',
                        clickName: 'wasteWater',
                        imgStatus: true,
                    }, {
                        name: '水平衡',
                        img: require('../assets/image/map/waterBalance_legend.png'),
                        width: 15.4 / 3 + 'vw',
                        clickName: 'waterBalance',
                        imgStatus: true,
                    }, {
                        name: '工况',
                        img: require('../assets/image/map/workCondition_legend.png'),
                        width: 15.4 / 3 + 'vw',
                        clickName: 'workCondition',
                        imgStatus: true,
                    }, {
                        name: '医疗机构',
                        img: require('../assets/image/map/medical_legend.png'),
                        width: 15.4 / 3 + 'vw',
                        clickName: 'medical',
                        imgStatus: true,
                    }, {
                        name: '干洗店',
                        img: require('../assets/image/map/clean_legend.png'),
                        width: 15.2 / 3 + 'vw',
                        clickName: 'clean',
                        imgStatus: true,
                    }, {
                        name: '农业污染源',
                        img: require('../assets/image/map/pollute_legend.png'),
                        width: 15.8 / 3 + 'vw',
                        clickName: 'pollute',
                        imgStatus: true,
                    },],
                }, {
                    width: '16.03vw',
                    cells: [{
                        name: '焚烧厂',
                        img: require('../assets/image/map/burnFactory_legend.png'),
                        width: 12 / 2 + 'vw',
                        clickName: 'burnFactory',
                        imgStatus: true,
                    }, {
                        name: '污水处理厂',
                        img: require('../assets/image/map/sewageFactory_legend.png'),
                        width: 12 / 2 + 'vw',
                        clickName: 'sewageFactory',
                        imgStatus: true,
                    }, {
                        name: '视频站位',
                        img: require('../assets/image/map/video_legend.png'),
                        width: 12 / 2 + 'vw',
                        clickName: 'video',
                        imgStatus: true,
                    },],
                }],
            }
        },
        computed: {
            updateChart: {
                get() {
                    let componentName = ''
                    // console.log('this.$route.path',this.$route.path,this.currChartIndex)
                    if(this.$route.path==='/environment') {
                        componentName = this.currChartIndex==-1?this.mapName[0]:this.mapName[this.currChartIndex]
                    } else {
                        componentName = this.currChartIndex==-1?this.mapName[2]:this.mapName[this.currChartIndex]
                    }
                    if (this.secondsId==='色阶统计图' || this.secondsId==='噪声态势图' || this.secondsId==='热力图') {
                        componentName = 'gaodeMap'
                    }
                    return  componentName
                },
                set(val) {}
            }
        },
        components: {
            MapIcon,
            gaodeMap,
            chartToggle,
            basicMap,
            Popup
        },

        methods: {
            setWindText(val) {
                if(val['speed'] != undefined && val['direction'] != undefined) {
                    this.toggleList.atmosphere.detail.speed=val.speed
                    this.toggleList.atmosphere.detail.direction=val.direction
                }
            },
            getChartData() {
                let params = {
                    styleClass: this.$route.path.replace('/','')
                }
                this.$get('/i601Perspective',params).then(res => {
                    if (res.code == 0) {
                        this.basicList =  res.data
                        this.setListValue()
                        this.$store.commit('index/setMapList', this.basicList)
                        // console.log('res.data', res.data)
                    } else {
                        // console.log(res.err_msg)
                    }
                })
            },
            showData(item) {
                this.flowchart = item.popUrl
                this.showFlowPop=true
                //削减率的code 动态更新数据
                this.$emit('updateRate',item.code)
            },
            changeIndex(item, i) {
                if (this.$route.path==='/environment') {

                } else {
                    this.currentIndex = i
                    this.secondsId = item
                }
                // console.log('item, i',item, i)
            },
            setHole() {
                var optArr = $.map(adcodes, function (item) {
                    return '<option value="' + item.adcode + '">' + item.name + '</option>'
                });
                $('#code-list').append(optArr.join(''));
            },
            changeMapToggleIndex(item) {
                this.currChartIndex=0
                // if (this.currChartIndex!==0) return
                item.isShow=!item.isShow
                if (this.secondsId&&this.secondsId.indexOf(item.name)>-1) {
                    let str = item.name+','
                    this.secondsId = this.secondsId.replace(str,'')
                } else {
                    let str = this.secondsId?this.secondsId:''
                    this.secondsId = str + item.name+','
                }
                this.currSecondsId = item.name
            },
            // 更换每个地图的图例
            changeMapLegend() {
                let path = this.$route.path
                let paths = path.split('/')
                let pathName = paths[paths.length - 1]
                if(pathName == 'effluent') {
                    this.legends = mapLegends.effluent
                } else if(pathName == 'waste') {
                    this.legends = mapLegends.waste
                } else if(pathName == 'atmosphere') {
                    this.legends = mapLegends.atmosphere
                } else if(pathName == 'environment') {
                    this.legends = mapLegends.environment
                } else if(pathName == 'noise') {
                    this.legends = mapLegends.noise
                }
            },
            setListValue() {
                let len =  this.basicList.length
                for (let i = 0; i < len; i++) {
                    let list = this.basicList[i]
                    let legend_len = this.legends.length
                    let status = list.status.split('_')[0]
                    for (let j = 0; j < legend_len; j++) {
                        let cell_len = this.legends[j].cells.length
                        for (let k = 0; k < cell_len; k++) {
                            let cell = this.legends[j].cells[k]
                            if(status == cell.clickName) {
                                list.isShow = cell.imgStatus
                            }
                        }
                    }
                }
            },
            // 图例点击事件
            legendClickEvent(event, name, i, j, bool) {
                if(bool === true) {
                    this.legends[i].cells[j].img = require(`../assets/image/map/${name}_hide.png`)
                } else {
                    this.legends[i].cells[j].img = require(`../assets/image/map/${name}_legend.png`)
                }
                this.legends[i].cells[j].imgStatus = !bool
                this.setListValue()
                this.$refs.mapComponent.toggleMark(name, bool, this.secondsId)
            }
        },
        watch: {
            currChartIndex(val) {//切换地图时初始化按钮
                if (val>-1){
                    this.secondsId=null
                    this.currentIndex = -1;
                    this.currSecondsId=''
                    this.environmentMapToggle.forEach((e)=>{
                        e.isShow=false
                    })
                }
            },
            currentIndex(val) {
                if(this.secondsId!=='管网叠加'||this.secondsId!=='流域叠加'){
                    if (val>-1) {
                        this.currChartIndex = -1;
                        // console.log('this.currChartIndex',this.currChartIndex)
                    }

                }
            },
        },
        created() {
            this.getChartData()
        },
        mounted() {
            // console.log('this.legends', mapLegends, this.$route.path)
            this.changeMapLegend()
            //设置下钻
            this.setHole()
        }
    }
</script>

<style scoped
  lang="scss">
    .toggleMap {
        width: 100%;
        height: 100%;

        .allMap {
            width: 100%;
            height: 100%;
            position: relative;
            top:0
        }

        .chartToggle {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 9;

        }

        .basicMap {
            position: absolute;
        }
        display: flex;
        .legends {
            bottom: 0;
            position: absolute;
            display: flex;
            justify-content: center;
            width: 58.28vw;
            height: 6.51vw;
            color: #fff;
            font-family: SourceHanSansCN-Regular;
            background-image: linear-gradient(180deg,
                    rgba(4, 11, 39, 0) 0%,
                    rgba(4, 11, 39, 0.8) 100%);

            .legend-cells {
                width: 17.97vw;
                margin-top: 1.1vw;
                .legend-list {
                    text-align: left;
                }
                .line {
                    border-right: 0.01vw solid rgba(255, 255, 255, 0.2);
                    width: 0.05vw;
                    height: 2.45vw;
                    display: inline-block;
                    float: left;
                    margin: 1.4vw 0.99vw 0 1.35vw;
                }
                .legend-cell {
                    width: 5vw;
                    margin-top: 0.57vw;
                    text-align: left;
                    display: inline-block;
                    height: 1.67vw;
                    line-height: 1.67vw;
                    img {
                        width: 1.67vw;
                        height: 1.67vw;
                        line-height: 1.67vw;
                    }
                    span {
                        height: 1.67vw;
                        line-height: 1.67vw;
                        vertical-align: top;
                        margin-left: 0.42vw;
                    }
                }
            }

            .polluteBar {
                width: 14.64vw;
                /*height: 6.2vh;*/
                margin-top: 1.67vw;
                &-top {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    span {
                        display: block;
                        position: relative;
                        margin-left: 1.04vw;

                        &::before {
                            content: '';
                            width: 1.02vh;
                            height: 1.02vh;
                            position: absolute;
                            border-radius: 50%;
                            top: 25%;
                            left: -40%;
                        }

                        &:nth-child(1)::before {
                            background-color: rgba(255, 228, 0, 1);
                        }

                        &:nth-child(2)::before {

                            background-color: rgb(254, 125, 68);
                        }

                        &:nth-child(3)::before {

                            background-color: rgb(217, 71, 83);
                        }

                    }
                }

                &-bottom {
                    width: 100%;
                    margin-top: 2.2vh;

                    &-bar {
                        width: 100%;
                        height: 0.93vh;
                        background-image: linear-gradient(90deg,
                                rgba(0, 154, 255, 1) 0%,
                                rgba(14, 212, 144, 1) 20%,
                                rgba(234, 217, 27, 1) 46%,
                                rgba(233, 47, 78, 1) 100%);
                    }

                    &-text {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 0.55vh
                    }

                }
            }
        }



        .toggle-list {
            position: absolute;
            left: 0;
            z-index: 9;
            margin: 1vh 0 0 1vw;
            .toggle-tips {
                width: 12.24vw;
                height: 3.98vh;
                background-image: url("../assets/image/chartToggle_2@2x.png");
                background-size: 100% 100%;

                ul {
                    padding: 0 1.2vw;
                    display: flex;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    box-sizing: border-box;
                    color: #fff;

                    .hexagon {
                        width: 0.89vw;
                        height: 0.73vw;
                        display: inline-block;
                        margin-right: 0.74vh;
                        background-image: url("../assets/image/effluent/chartToggle.png");
                        background-size: 100% 100%;

                        &-active {
                            background-image: url("../assets/image/effluent/chartToggleSelect.png");
                            background-size: 100% 100%;
                        }
                    }

                    li {
                        flex-grow: 1;
                        display: flex;
                        cursor: pointer;
                        align-items: center;
                        font-size: 0.7vw;
                        span {
                            display: inline-block;
                        }
                    }
                }
            }
            .box-1{
                width: 7.24vw;
                height: 3.98vh;
                background-image: url("../assets/image/box-1.png");
                background-size: 100% 100%;
            }
            .toggle-lines {
                width: 3.6vw;
                height: 0.1vh;
                background-color: rgba(255, 255, 255, 0.5);
                margin: 1vh 0;
            }

            .toggle-menu {
                width: 7.19vw;
                height: 3.7vh;
                line-height: 3.7vh;
                /*background-image: url("../assets/image/atmosphere/wind.png");*/
                background-size: 100% 100%;
                display: flex;
                justify-content: space-between;
                font-family: SourceHanSansCN-Regular;
                font-size: 1.11vh;
                color: rgba(255, 255, 255, 0.5);
                box-sizing: border-box;
                padding: 0 0.93vh;
                background-color: rgba(17, 27, 43, 0.6);
                border: 1px solid #fff;
                img {
                    width: 0.83vw;
                    height: 0.73vw;
                    /*margin-top: 0.83vh;*/
                }

                div {
                    display: flex;
                    span:nth-child(1) {
                        color: #fff;
                        margin-left: 0.5vw;
                    }
                    span:nth-child(2) {
                        color: rgba(255,255,255,0.5);
                        margin-left: 0.5vw;
                    }
                    /*flex-direction: column;*/
                    /*justify-content: center;*/
                }
            }
        }

        .flow-popContainer{
            color: #fff;
            padding: 1vh  1.25vw 0;
            .title{
                position: relative;
                width: 100%;
                height: 3.5vh;
                line-height: 3.5vh;
                text-align: left;
                padding-left: 1.5vw;
                border-bottom: 2px solid rgba(255,255,255,0.2);
                box-sizing: border-box;
                .dotIcon{
                    margin-top: 0.8vh;
                }
            }
            .content{
                width: 100%;
                height: 19.81vh;
                background-color:  rgba(255, 255, 255, 0.5);
                >iframe{
                    width: 100%;
                    height: 100%;
                }
            }
            .btnBox{
                width: 100%;
                margin-top: 1.2vh;
                >div{
                    width: 3.65vw;
                    height: 2.59vh;
                    line-height: 2.59vh;
                }
                .cancel{
                    margin-right: 2.76vw;
                    background-image: url("../assets/image/cancel@2x.png");
                }
                .affirm{
                    background-image: url("../assets/image/affirm@2x.png");
                }
            }
        }

    }
    .button-group{
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 0 1vw 1vh 0;
    }
</style>
