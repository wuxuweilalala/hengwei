<template>
    <div class="toggleMap">
<!--        右侧按钮-->
        <chartToggle :currChartIndex.sync="currChartIndex"/>
        <!--        左侧切换按钮-->
        <div class="toggle-list"
          v-show="id!='other'">
             <div :class="['toggle-tips', {'box-1':$route.path=='/noise'}]" v-if="$route.path!=='/environment'">
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
              @setWindText="setWindText"
              :secondsId="secondsId"></component>
        </div>
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
                <div class="button-group" v-show="secondsId=='色阶统计图'">
<!--                    <select name="code-list" id="code-list" style="height: 28px;margin-right: 10px;">-->
<!--                        <option value="-1">选择下钻省份</option>-->
<!--                    </select>-->
                    <input id="up-btn" type="button" class="button" value="行政区上浮"/>
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
    import basicMap from "./basicMap";  //基础3d地图
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
                    {name:'网管叠加',isShow:false},{name:'流域叠加',isShow:false}
                ] ,
                flowchart:'',
                showpolluteBar:false,
                showFlowPop:false,
                mapName: ['gaodeMap', 'gaodeMap', 'basicMap'],
                currChartIndex: 0,
                windText:{},
                toggleList: {
                    noise: {value: ['噪声态势图']},
                    environment: {value: ['网管叠加', "流域叠加"]},
                    atmosphere: {
                        value: ['态势地图', '色阶统计图'],
                        detail: {
                            speed: '',
                            direction: '',
                            src: require('../assets/image/atmosphere/windImg.png')
                        }
                    }, other: {}
                },
                currentIndex: -1,
                basicList: [
                    {
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
                    }],
                secondsId: null,//二级选择图
            }
        },
        computed: {
            updateChart: {
                get() {
                    let componentName = ''
                    // console.log('this.$route.path',this.$route.path,this.currChartIndex)
                    if(this.$route.path==='/environment') {
                        // this.currChartIndex = 0
                        componentName = this.currChartIndex==-1?this.mapName[0]:this.mapName[this.currChartIndex]
                    } else {
                        componentName = this.currChartIndex==-1?this.mapName[2]:this.mapName[this.currChartIndex]
                    }
                    if (this.secondsId==='色阶统计图' || this.secondsId==='噪声态势图') {
                        componentName = 'gaodeMap'
                    }
                    return  componentName
                },
                set(val) {}
            }
        },
        components: {
            gaodeMap,
            chartToggle,
            basicMap,
            Popup
        },

        methods: {
            setWindText(val) {
              this.toggleList.atmosphere.detail.speed=val.speed
              this.toggleList.atmosphere.detail.direction=val.direction
            },
            getChartData() {
                this.$get('/i601Perspective').then(res => {
                    if (res.code == 0) {
                        this.basicList =  res.data
                        // console.log('res.data',res.data)
                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            showData(item) {
                this.flowchart = item.popUrl
                this.showFlowPop=true
            },
            changeIndex(item, i) {
                if (this.$route.path==='/environment') {

                } else {
                    this.currentIndex = i
                    this.secondsId = item
                }
                console.log('item, i',item, i)
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
        },
        watch: {
            currChartIndex(val) {//切换地图时初始化按钮
                if (this.$route.path==='/environment'){
                    if (val>0) {
                        this.currentIndex = -1;
                        this.secondsId=null
                    }
                } else {
                    if (val==-1) return
                    this.currentIndex = -1;
                    this.secondsId = null
                }
            },
            currentIndex(val) {
                if(this.secondsId!=='网管叠加'||this.secondsId!=='流域叠加'){
                    if (val>-1) {
                        this.currChartIndex = -1;
                        // console.log('this.currChartIndex',this.currChartIndex)
                    }

                }
            },
        },
        mounted() {
            //设置下钻
            this.setHole()
            this.getChartData()
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

        .polluteBar {
            width: 14.64vw;
            /*height: 6.2vh;*/
            margin: 0 0 1vh 1vw;
            position: absolute;
            color: #fff;
            font-family: SourceHanSansCN-Regular;
            bottom: 0;

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