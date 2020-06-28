<template>
    <div class="waste">
        <page-layout>
            <div slot="pageLeft" class="pl-container">
                <!--        监测区域内监测情况概述-->
                <div class="areaMonitor bg_c lineshadow">
                    <chart-title :title="'监测区域内监测情况概述'" w="50%"/>
                    <TerritoryClass v-if="inspectsumary" :airQualityObj="inspectsumary"/>
                </div>
                <!--         监控点上传率概况-->
                <div class="monitoryPoint bg_c lineshadow">
                    <chart-title :title="'监控点上传率概况'" w="40%"/>
                    <basicPieBarII v-if="pollutionWarnObj.uploadRate" @showPop="showUploadPop=true" :chartList="pollutionWarnObj.uploadRate"/>
                </div>
                <!--         污染源企业占比-->
                <div class="pollutionEnterprise bg_c lineshadow">
                    <chart-title :title="'污染源企业占比'" w="40%"/>
                    <div class="pollutionPie f_r_between">
                        <div class="chartBox">
                            <basicPie
                                    :inventory="{value:getVal(pollutionPieObj.reachVal)}"
                                    chartStype="basicPie_ii"
                                    doneColor="#009aff"
                                    linearGradient_ii="rgba(0, 154, 255)"
                                    linearGradient_i="rgba(0, 154, 255)"
                            />
                            <div class="text">达标率</div>
                        </div>
                        <div class="rateChart">
                            <div class="text ab_center">达标率</div>
<!--                            <div class="reachIcon ab_center"></div>-->
                        </div>
                        <div class="chartBox">
                            <basicPie
                                    :inventory="{value:getVal(pollutionPieObj.noReachVal)}"
                                    doneColor="#009aff"
                                    linearGradient_ii="rgba(254, 125, 68)"
                                    linearGradient_i="rgba(254, 125, 68)"
                                    chartStype="basicPie_ii"/>
                            <div class="text">不达标率</div>
                        </div>
                    </div>
                    <div class="pictorialBar">
                        <div class="subTitle">
                            <div class="dotIcon"></div>不达标污染企业详情
                        </div>
                        <ul>
                            <li class="pictorialBarItem" v-for="(item,index) in pollutionPieObj.noReachList" :key="index">
                                <div class="f_r_between">
                                    <div>{{item.name}}</div>
                                    <div>{{item.dBVal}}dB</div>
                                </div>
                                <PictorialBar :val="item.value|percentage" :grade="item.grade"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div slot="pageCenter" class="pc-container">
                <!--        地图-->
                <div class="map">
                    <toggleMap />

                </div>
                <!--        污染源预警实时一览-->
                <div class="warnReal bg_c lineshadow">
                    <chart-title :title="'污染源预警实时一览'" w="20%"/>
                    <TableComponent :tableHeaderList="wr_headerList" :tableOption="wr_tableOption" :data="wr_spListList" />
                </div>
            </div>
            <div slot="pageRight" class="pr-container">
                <!--        污染削减率-->
                <div class="reductionRate bg_c lineshadow">
                    <chart-title :title="'污染削减率'" w="30%"/>
                    <div class="content">
                        <div class="slectBox f_r_between">
                            <input
                                    type="text"
                                    v-model="enterpriseName"
                                    placeholder="企业搜索"
                                    @change="search"
                                    class="waterNavRightItem1Input"
                            />
                            <SelectComponent
                                    v-if="showSelectList"
                                    :selectList="abatementObj.selectList"
                                    :selectOptionStyle="selectOptionStyle"
                                    :selectOption="abatementObj.selectOption"
                                    @changeSelectItemed="changeSelectItemed"
                            />
                        </div>
                        <div class="bar mt_top" v-if="abatementObj.beforeDispose">
                            <PictorialBarII :chartObj="abatementObj.beforeDispose" />
                        </div>
                        <div class="bar mt_top" v-if="abatementObj.afterDispose">
                            <PictorialBarII :chartObj="abatementObj.afterDispose":color="'rgba(0, 154, 255, 1)'"/>
                        </div>
                    </div>
                </div>
                <!--        任务实时更新状态表-->
                <div class="taskStyleChart bg_c lineshadow">
                    <chart-title :title="'任务实时更新状态表'" w="30%"/>
                    <div class="pieList">
                        <div class="colorTips f_c_center">
                            <div class="color"></div>已完成
                            <div class="color red"></div>已完成
                        </div>
                        <ul class="mt-ul f_r_between">
                            <li class="mt_item pointer" v-for="(item,index) in mt_pieList" :key="index"  @click="toTable">
                                <basicPie
                                        :inventory="item.pieOptions"
                                        linearGradient_i="rgba(254, 125, 68, 1)"
                                        linearGradient_ii="rgba(254, 125, 68, 1)"
                                        undoneColor="rgba(0, 154, 255, 1)"
                                />
                                <span class="text">{{item.label}}</span>
                                <i :class="[item.icon, 'ICON mt_icon ab_center']"></i>
<!--                                <div class="airIcon ab_center"></div>-->

                            </li>
                        </ul>
                    </div>
                </div>
                <!--        任务实时更新状态表-->
                <div class="taskRealChart bg_c lineshadow">
                    <chart-title :title="'实时污染物分析'" w="30%"/>
<!--                    主要污染物-->
                    <div class="taskStylePie">
                        <div class="subTitle">
                            <div class="dotIcon"></div>主要污染物
                        </div>
                        <div class="chartPie" v-if="tasksumaryObj.mainObjList">
                            <basic-pie-bar :mainObjList="tasksumaryObj.mainObjList"/>
                        </div>
                        <div class="mainObjIcon posi"></div>
                    </div>
<!--                    占比情况-->
                    <div class="situation">
                        <div class="subTitle">
                            <div class="dotIcon"></div>不同等级占比情况
                        </div>
                        <div class="barChart">
                            <ul class="data">
                                <li class="f_c_center" v-for="(item,index) in tasksumaryObj.gradeTask" :key="index">
                                    <div class="title">{{item.gradeText}}</div>
                                    <div class="line">
                                        <div :style="{width:item.value}"></div>
                                    </div>
                                    <div class="value">{{item.value}}</div>
                                </li>
                            </ul>
                            <ul class="rule flex">
                                <li v-for="(item,i) in [1,1,1,1,1]"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </page-layout>
        <Popup :isShow.sync="showUploadPop" w="22.45vw" h="28.52vh" title="监控点上传率概况">
            <ul class="upload-popContainer">
                <li class="p-areaList f_r_between" v-for="(item,index) in pollutionWarnObj.popUploadRate" :key="index">
                    <div class="left f_c_center">
                        <div class="dot"></div>
                        <div class="text">
                            {{item.label}}
                        </div>
                    </div>
                    <div class="right">{{getVal(item.value)}}%</div>
                </li>
            </ul>
        </Popup>
    </div>
</template>
<script>
    import ChartTitle from "../../components/ChartTitle";
    import pageLayout from "../../components/pageLayout";
    import basicPie from "../../components/basicPie";
    import TableComponent from "../../components/common/TableComponent";
    import TerritoryClass from "../../components/TerritoryClass";
    import PictorialBar from "../../components/PictorialBar";
    import PictorialBarII from "../../components/PictorialBarII";
    import basicPieBar from "../../components/basicPieBar";
    import {wr_headerList,wr_tableOption} from './data.js'
    import BasicPieBar from "../../components/basicPieBar";
    import basicPieBarII from "../../components/basicPieBarII";
    import SelectComponent from "../../components/common/SelectComponent";
    import Popup from "../../components/Popup";
    import {getEnterpriseList} from "../../utils/api";
    import toggleMap from "../../components/toggleMap";

    // @ is an alias to /src
    export default {
        name: "Waste",
        filters: {
            percentage(val) {
                return val.replace('%','')
            }
        },
        components: {
            BasicPieBar,
            basicPie,
            pageLayout,
            ChartTitle,
            TableComponent,
            TerritoryClass,
            PictorialBar,
            basicPieBar,
            basicPieBarII,
            PictorialBarII,
            SelectComponent,
            Popup,
            toggleMap
        },
        data() {
            return {
                showSelectList:false,
                showUploadPop:false,
                wr_headerList:wr_headerList,
                wr_tableOption:wr_tableOption,
                wr_spListList:[],
                mt_pieList: [
                    {
                        label:'应急响应',
                        icon:'emergency_icon',
                        pieOptions: {
                            value:0
                        }
                    },
                    {
                        label:'日常运维',
                        icon:'operation_icon',
                        pieOptions: {
                            value:0
                        }
                    },
                    {
                        label:'质量控制',
                        icon:'quality_icon',
                        pieOptions: {
                            value:0
                        }
                    }
                ],
                barChartList: [
                    {name:'理想',value:12},
                    {name:'理想',value:12},
                    {name:'理想',value:12},
                    {name:'理想',value:12},
                    {name:'严重污染',value:12}
                ],
                enterpriseName:'',
                wastePolluteObj: {
                    selectList:[{
                        label:'zyw',
                        value:123
                    },{
                        label:'zyw',
                        value:123
                    },{
                        label:'zyw',
                        value:123
                    }],
                    currentSelected:{
                        label: 'zyw',
                        value:123
                    }
                },
                // selectOption: {
                //     placeholder:''
                // },
                selectOptionStyle: {
                    width: "7.81vw",
                    height: "2.31vh",
                    lineHeight:"2.31vh",
                    padding:'0 0.5vw',
                    boxSizing:'border-box',
                    textAlign:'left'
                }, // 设置宽度和高度
                pollutionPieObj:{
                    label:'应急响应',
                    icon:'emergency_icon',
                    pieOptions: {
                        value:30
                    }
                },
                pollutionWarnObj: {},
                abatementObj:{},
                tasksumaryObj:{},
                inspectsumary:null
            }
        },
        created() {
            this.getData()
        },
        methods: {
            changeSelectItemed(val) {
                // console.log('11111',val.label)
                this.getAbatement(val.label)
            },
            // 搜索企业
            search(item) {
                // console.log(item.target.value)
                this.getAbatement(null,item.target.value)
            },
            toTable() {
                    this.$router.push({
                        path:'/table',
                        query:{
                            style:'waste'
                        }
                    })
            },
            getVal(val) {
                return val ? String(val).replace('%',''): '0'
            },
            search(item) {
                // console.log(item.target.value)
                this.getAbatement(null,item.target.value)
            },
            getData() {
                this.getInspectsumary()
                this.getPollutionWarn()
                this.getAbatement()
                this.getTasksumary()
            },
            getInspectsumary() {
                this.$get('/i301inspectsumary').then(res => {
                    if (res.code == 0) {
                        this.inspectsumary = res.data
                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            getPollutionWarn() {
                this.$get('/i30234uploadPollutionWarn').then(res => {
                    if (res.code == 0) {
                        this.pollutionPieObj =  res.data.pollutionRate
                        this.wr_spListList = this.dataDispose(res.data.warnTable,1)
                        this.pollutionWarnObj =  res.data
                        // console.log('this.pollutionPieObj',this.pollutionPieObj)
                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            getAbatement(factor,enterprise) {
                // console.log('factor,enterprise',factor,enterprise)
                let params = {}
                if (factor) {
                    params.factor = factor
                }
                if (enterprise) {
                    params.enterprise = enterprise
                }
                this.$get('/i305polluteAbatement',params).then(res => {
                    if (res.code == 0) {
                        this.abatementObj=res.data
                        this.abatementObj.selectOption = {
                            placeholder: res.data.currentSelected.label
                        }
                        // console.log('this.selectOption',this.abatementObj)
                    } else {
                        console.log(res.err_msg)
                    }
                    this.showSelectList=true
                })
            },
            getTasksumary() {
                this.$get('/i3067tasksumary').then(res => {
                    if (res.code == 0) {

                        this.tasksumaryObj =  res.data
                        this.dataDispose(res.data.realStyle,2)

                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            getPopupTable() {
                this.$get('/i309PopupTable',{popName:'waste'}).then(res => {
                    if (res.code == 0) {
                        // this.airQualityObj =  res.data
                        // this.dataDispose(1,res.data.aqiRankTable)

                    } else {
                        console.log(res.err_msg)
                    }
                })
            },
            dataDispose(arr,i) {
                let newArr = []
                arr.forEach((item,index) => {
                    // console.log(item)
                    if (i==1){
                        let subarr = [index+1,item.name,item.stance,item.factor,item.description,item.style,item.startTime,item.endTime]
                        newArr.push(subarr)
                    }else if(i==2) {
                        this.mt_pieList.forEach(sub => {
                            if (item.name === sub.label) {
                                sub.pieOptions.value = this.getVal(item.value)
                            }
                        })
                    }
                })
                return  newArr
            }
        }
    };
</script>

<style scoped lang="scss">
    .waste{
        width: 100%;
        height: 93.8vh;
        padding: 2.3vh 1vw 2.6vh;
        box-sizing: border-box;
    }
    .bg_c{
        padding: 0 1vw;
        box-sizing: border-box;
        background-color: rgba(4, 11, 39, 0.6);
    }
    /*卡片的高度*/
    .areaMonitor{
        width: 100%;
        height: 23.52vh;
    }
    .monitoryPoint{
        width: 100%;
        height: 16.85vh;
    }
    .pollutionEnterprise{
        width: 100%;
        height: 44.81vh;
    }
    .map{
        width: 100%;
        height: 60vh;
        position: relative;
    }
    .warnReal{
        width: 100%;
        height: 25.83vh;
    }
    .reductionRate{
        width: 100%;
        height: 25.46vh;
    }
    .taskStyleChart{
        width: 100%;
        height: 19.54vh;
    }
    .taskRealChart{
        width: 100%;
        height: 40.19vh;
    }
    .pl-container,.pc-container,.pr-container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .pictorialBarItem{
        margin-top: 0.48vh;
        color:#fff
    }
    .pictorialBar,.taskStylePie,.situation{
        position: relative;
        .subTitle{
            height: 3vh;
            line-height: 3vh;
            text-align: left;
            color: #fff;
            padding-left: 1.5vw;
            border-bottom: 1px solid rgba(255,255,255,0.5);
            margin-bottom: 1vh;
            .dotIcon{
                margin-top: 0.7vh;
            }
        }
    }
    .pieList{
        .colorTips{
            /*flex-direction: row-reverse;*/
            justify-content: flex-end;
            color: rgba(255, 255, 255, 0.5);
            padding-bottom: 0.8vh;
            border-bottom: 1px solid rgba(255,255,255,0.5);

            .color{
                width: 0.52vw;
                height: 0.52vw;
                margin-right: 0.5vw;
                background-color: rgba(0, 154, 255, 1);
            }
            .red{
                margin-left: 1.15vw;
                background-color: rgba(254, 125, 68, 1);
            }
        }
    }
    .mt-ul{
        position: relative;
        margin-top: 1.85vh;
        .mt_item{
            position: relative;
            width: 3.65vw;
            height: 3.65vw;
            .text{
                font-size: 0.63vw;
                line-height: 3vh;
                color:#fff;
            }
            /*width: 40vw;*/
            /*height: 40vw;*/
        }
    }
    .situation{
        margin-top: 2vh;
        .barChart{
            position: relative;
            height: 13.5vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .data {
                color: #fff;
                font-size: 0.73vw;
                li{
                    margin-top: 0.83vh;
                }

                .title{
                    width: 4vw;
                    text-align: center;
                }
                .line{
                    width: 11.3vw;
                    div{
                        width: 100%;
                        height: 0.37vh;
                        background-image: linear-gradient(90deg,
                                rgba(0, 154, 255, 1) 0%,
                                rgba(0, 247, 255, 1) 100%);
                    }
                }
                .value{
                    position: relative;
                    width: 1.51vw;
                    height: 1.39vh;
                    line-height: 1.39vh;
                    margin-left: 1vw;
                    background-color: rgba(255, 255, 255, 0.1);
                    &:before{
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 1px;
                        height: 100%;
                        background-color: #fff;
                    }
                }
            }
            .rule{
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(3.8vw,0);
                li{
                    position: relative;
                    width: 0.05vw;
                    height: 13.43vh;
                    background-color: rgba(255, 255, 255, 0.2);
                    margin-right: 2.6vw;
                    &:after{
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 0.37vh;
                        background-color: #fff;
                        z-index: 9;
                    }
                }

                /*width: 100;*/
            }
        }
    }
    .reductionRate{
        .mt_top {
            margin-top: 2vh;
        }
        .waterNavRightItem1Input{
            width: 8.75vw;
            height: 2.31vh;
            background: #091d35;
            color: #fff;
            border: 0.09vh solid rgba(255, 255, 255,1);
            text-indent: 0.3vw;
            box-sizing: border-box;
            &::-webkit-input-placeholder {
                color: rgba(255, 255, 255, 0.4);
                font-size: 0.63vw;
            }
        }
    }
    .pollutionEnterprise{
        .pollutionPie{
            position: relative;
            margin-bottom: 1vh;
            padding: 1.5vh 1vw 0;
            .chartBox{
                width: 3.65vw;
                height: 3.65vw;
                padding-bottom: 3vh;
                .text{
                    color: #fff;
                    margin-top: 0.83vh;
                }
            }

        }
    }
    .rateChart{
        position: relative;
        width: 9.63vh;
        height: 7.69vh;
        background-image: url("../../assets/image/waste/rate@2x.png");
        background-size: 100% 100%;
        .text{
            color: #fff;
            font-size: 0.63vw;
        }
        &:before{
            position: absolute;
            left: 0;
            top: 3.7vh;
            display: inline-block;
            content: '';
            width: 0.21vw;
            height: 0.21vw;
            border-radius: 50%;

            background-color: rgba(0, 154, 255, 1);
            z-index: 99;
        }
        &:after{
            position: absolute;
            right: 0;
            top: 3.7vh;
            display: inline-block;
            content: '';
            width: 0.21vw;
            height: 0.21vw;
            border-radius: 50%;
            /*box-shado:1px 2px 3px 4px #333;*/
            background-color: rgba(254, 125, 68, 1);
            z-index: 99;
        }
    }
    .mt_icon{
        width: 1.88vw;
        height: 1.88vw;
    }
    .emergency_icon{
        background-image: url("../../assets/image/waste/emergency.png");
    }
    .operation_icon{
        background-image: url("../../assets/image/waste/operation.png");
    }
    .quality_icon{
        background-image: url("../../assets/image/waste/quality.png");
    }

    .upload-popContainer{
        display: flex;
        flex-flow: wrap;
        padding: 0.13vh 1.04vw;
        .p-areaList{
            width: 7.71vw;
            height: 2.59vh;
            line-height: 2.59vh;
            font-size:0.73vw;
            color: #fff;
            margin-right: 4.95vw;
            margin-top: 1.67vh;
            padding: 0 0.52vw;
            border-radius: 0.37vh;
            background-color: rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            &:nth-child(even){
                margin-right: 0;
            }
            .left {
                .dot {
                    position: relative;
                    width: 0.42vw;
                    height: 0.42vw;
                    margin-right: 0.52vw;
                    background-color: rgba(255, 255, 255, 0.2);
                    border-radius: 0.1vw;
                    &:before{
                        content: '';
                        display: inline-block;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        width: 0.21vw;
                        height: 0.21vw;
                        background-color: #fff;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
.posi{
    position: absolute;
    left: 0;
    top: 50%;
    /*transform: translate(2.75vw, 0.3vh);*/
    /*transform: translate(2.75vw, 0.3vh);*/
    transform: translate(1.4vw, -2.4vh);
}
</style>