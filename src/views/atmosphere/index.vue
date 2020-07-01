<template>
  <div class="atmosphere">
    <page-layout>
      <div slot="pageLeft" class="pl-container">
<!--        空气质量监测情况-->
        <div class="airQuality bg_c">
            <chart-title :title="'空气质量监测情况'" class="p_0.52" w="30%"/>
            <div class="cityAQI">
                <div class="AQIinfo f_r_between">
                    <div class="AQIval" :class="[`${aqiInfoObj.grade==1?'mild_f':aqiInfoObj.grade==2?'medium_f':'severe_f'}`,'valColor']">{{aqiInfoObj.aQIVal}}</div>
                    <div class="AQItext">
                        <p>当前城市AQI</p>
                        <p :class="[`${aqiInfoObj.grade==1?'mild':aqiInfoObj.grade==2?'medium':'severe'}`,'valColor']">轻度污染</p>
                    </div>
                    <div class="updateTime">
                        <p>时间更新于{{aqiInfoObj.updateTime}}</p>
                        <p :class="['mild','valColor']">首要污染物&nbsp;{{aqiInfoObj.mainObj}}</p>
                    </div>
                </div>
                <ul class="AQI-ul">
                    <template v-for="(item,index) in aqiInfoObj.aqiList">
                        <li class="AQI-li"  :key="index" v-show="index<5">
                            <p>{{item.value}}</p>
                            <p class="liLabel">{{item.label}}<i :class="['lilabelC',`color_${item.grade}`]"></i></p>
                        </li>
                    </template>

                </ul>
            </div>
            <div class="ranking f_r_between f_c_center">
                <div class="left">
                    <div class="dotIcon"></div>
                    <div class="text">监控点污染排名</div>
                </div>
                <div class="right" v-if="aqiInfoObj.selectList">
                    <DropDownComponent
                            :dropdownList="aqiInfoObj.selectList"
                            :dropdownOptionListStyle="dropdownOptionListStyle"
                            :dropdownItem="dropdownItem"
                            @changeSelectItemed="changecity"
                    ></DropDownComponent>
<!--                    因子选择<i class="pullIcon ICON"></i>-->
                </div>
            </div>
            <TableComponent :tableHeaderList="aq_headerList" :tableOption="aq_tableOption" :data="aq_spListList" />
        </div>
<!--         区域预警信息-->
        <div class="areaWarnInfo bg_c">
            <chart-title :title="'区域预警信息'" class="p_0.52" w="30%"/>
            <TableComponent :tableHeaderList="aw_headerList" :tableOption="aw_tableOption" :data="aw_spListList" />
        </div>
      </div>
      <div slot="pageCenter" class="pc-container">
<!--        地图-->
        <div class="map">
            <ToggleMap :id="'atmosphere'" />
        <WarnTips :options="forefcastObj" />
        </div>
<!--        街道、社区、工地空气质量预报-->
        <div class="airForecast bg_c">
            <chart-title :title="'街道、社区、工地空气质量预报'" class="p_0.52" w="30%"/>
            <ul class="flex">
                <li class="chartBg_img AQI-chart-pie " v-for="(item,index) in this.forefcastObj.forecastTable" :key="index">
                    <div class="date">{{item.data}}</div>
                    <div class="chart">
                        <div class="ab_center">
                            <basicPieII w="6.94vh" h="7.04vh" :value="item.rate" :text="item.gradeText" :grade="item.grade" />
                        </div>
                    </div>
                    <div class="chartLine_img"></div>
                    <div class="text">
                        <p>AQI: <span>{{item.aQIVal}}</span></p>
                        <p>首要污染物: <span>{{item.mainObj}}</span></p>
                    </div>
                </li>
            </ul>
        </div>
      </div>
      <div slot="pageRight" class="pr-container">
<!--        AQI日历-->
        <div class="calendar bg_c">
            <chart-title :title="'AQI日历'" class="p_0.52" w="30%"/>
            <div class="changeDate">
                <el-date-picker
                        v-model="currMonth"
                        type="month"
                        format="yyyy-MM"
                        placeholder="选择日期"
                        @change="changeMonth"
                        >
                </el-date-picker>
            </div>
            <div class="colorTips">
                <ul class="flex">
                    <li class="colorItem f_c_center" v-for="(item,index) in colorTips" :key="index">
                        <div class="colorBox" :style="`background-color: ${item.color}`"></div>
                        <div class="text">{{item.text}}</div>
                    </li>
                </ul>
            </div>
            <template v-if="showCalendar">
                <calendar :dateArr="calendarArr.calendarPoList" :nowDay="formatCurrMonth"/>
            </template>
        </div>
<!--        年度各指标变化趋势图-->
        <div class="tendencyChart bg_c">
            <chart-title :title="'年度各月份指标趋势图'" class="p_0.52" w="30%"/>
            <basicBar w="17.5vw" h="23vh" :yDataArr="yDataArr.map" v-if="showTrends"/>
        </div>
<!--        空气质量达标情况-->
        <div class="reachSituation bg_c">
            <chart-title :title="'空气质量达标情况'" class="p_0.52" w="30%"/>
            <div class="sp-content" v-if="showAirReach">
                <div class="selectList">
                    <SelectComponent
                            :selectList="airReach.selectList"
                            :selectOptionStyle="selectOptionStyle"
                            :selectOption="airReach.selectOption"
                            @changeSelectItemed="changeSelectItemed"
                    />
                </div>
                <div class="chartInfo">
                <basicLine v-if="showBasicLine" ref="Chartline" h="22vh" w="17.71vw" :x-data="chartlineXData" :y-data="chartlineYData" />
                </div>
            </div>
        </div>
      </div>
    </page-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartTitle from "../../components/ChartTitle";
import pageLayout from "../../components/pageLayout";
import TableComponent from "../../components/common/TableComponent";
import basicPieII from "../../components/basicPieII";
import calendar from "../../components/calendar";
import basicBar from "../../components/basicBar";
import basicLine from "../../components/basicLine";
import ToggleMap from "../../components/toggleMap";
import {aq_headerList,aw_headerList,aq_tableOption,aw_tableOption,aqiList} from './data.js'
import DropDownComponent from "../../components/common/DropDownComponent";
import SelectComponent from '../../components/common/SelectComponent'
import WarnTips from '../../components/warnTips'
export default {
  name: "Atmosphere",
  components: {
      pageLayout,
      ToggleMap,
      ChartTitle,
      TableComponent,
      basicPieII,
      calendar,
      basicBar,
      basicLine,
      DropDownComponent,
      SelectComponent,
      WarnTips
  },
    data() {
      return {
          aw_spListList:[],
          aq_spListList:[],
          aq_tableOption:aq_tableOption,
          aq_headerList:aq_headerList,
          aw_tableOption:aw_tableOption,
          aw_headerList:aw_headerList,
          aqiList:aqiList,
          chartList: [],
          colorTips:[
              {
                  text:'优',
                  color:'#00ff86'
              },
              {
                  text:'良',
                  color:'#009aff'
              },
              {
                  text:'轻度',
                  color:'#ffe400'
              },
              {
                  text:'中度',
                  color:'#fe7d44'
              },
              {
                  text:'重度',
                  color:'#ff5b5e'
              },
              {
                  text:'严重',
                  color:'#d90a0a'
              }],
          airReach: {},
          currMonth:new Date(),
          dropdownOptionListStyle: {
              marginLeft: '1.2vw'
          },
          dropdownList: [{
              label:'地域分类',
              value:'123'
          },{
              label:'zzz',
              value:'123'
          },{
              label:'zzz',
              value:'123'
          },{
              label:'zzz',
              value:'123'
          }],
          aqiInfoObj:{},
          forefcastObj:{},
          // qualityObj: {},
          yDataArr:{},
          calendarArr: [],
          showCalendar:false,
          showTrends:false,
          showAirReach:false,
          selectOptionStyle: {
              height: "2.31vh",
              lineHeight:"2.31vh",
              width: "7.81vw",
              padding:'0 0.5vw',
              boxSizing:'border-box',
              textAlign:'left'
          }, // 设置宽度和高度
          dropdownItem:{},
          showBasicLine:false
      }
    },
    computed: {
        chartlineXData: {
            get() {
                let obj = this.getMatchArr(this.airReach.lineChart,this.airReach.currentSelected.label)
                console.log(obj)
                return obj ? obj.xData : []
            },
            set(val) {}
        },
        chartlineYData: {
            get() {
                let obj = this.getMatchArr(this.airReach.lineChart, this.airReach.currentSelected.label)
                console.log(123333)
                return obj ? obj.yData : []
            },
            set(val) {}
        },
        formatCurrMonth:{
            get() {
                let str = ''
                let date = new Date(this.currMonth)
                str =  `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                return str
            },
            set(val) {}
        }
    },
    created() {
      this.getData()
    },
    methods: {
        changecity(val) {
            console.log(val.label)
            let label = val.label
            let arr = this.aqiInfoObj.aqiRankList
            for (let i = 0;i<arr.length;i++) {
                if (label===arr[i].label) {
                    this.dataDispose(1,arr[i].aqiRankTable)
                }
            }
        },
        changeMonth(time) {
            let str = ''
            let date = new Date(time)
            str =  `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            this.getCalendar(str)
            console.log('date',str)
        },
        changeSelectItemed(val) {
            this.airReach.currentSelected.label=val.label
            this.showBasicLine = false
            // this.airReach.currentSelected.label='氨氮2'

            this.$nextTick( ()=> {
                this.showBasicLine = true
            })
            console.log(11111,val)
        },
        getData() {
            this.getWatersumaryall()
            this.getWarnForecast()
            this.getCalendar()
            this.getTrends()
            this.getQuality()
        },
        getWatersumaryall() {
            this.$get('/i401AirQualityMonitoring').then(res => {
                if (res.code == 0) {
                    // console.log(1111,res.data)
                    this.aqiInfoObj =  res.data
                    this.dataDispose(1,res.data.aqiRankList[0].aqiRankTable)
                } else {
                    console.log(res.err_msg)
                }
            })
        },
        getWarnForecast() {
            this.$get('/i402AreaWarnForecast').then(res => {
                if (res.code == 0) {
                    this.forefcastObj =  res.data
                    this.dataDispose(2,res.data.warnTable)
                } else {
                    console.log(res.err_msg)
                }
            })
        },
        getCalendar(date) {
            let params = {}
            if (date) {
                params.data = date
            }
            this.$get('/i403AQICalendar',params).then(res => {
                if (res.code == 0) {
                    this.calendarArr =  res.data
                    // console.log('日历',res.data)
                } else {
                    console.log(res.err_msg)
                }
                this.showCalendar=true
            })
        },
        getTrends() {
            this.$get('/i404AnnualTargetsTrends').then(res => {
                if (res.code == 0) {
                    this.yDataArr =  res.data
                } else {
                    console.log(res.err_msg)
                }
                this.showTrends=true
            })
        },
        getQuality() {
            this.$get('/i405AirQualityStandard').then(res => {
                if (res.code == 0) {
                    this.airReach =  res.data
                    this.airReach.selectOption = {
                        placeholder: res.data.currentSelected.label
                    }
                } else {
                    console.log(res.err_msg)
                }
                this.showAirReach=true
                this.showBasicLine=true
            })
        },
        dataDispose(index,data,arr,type) {

            if (index==1||index==2) {
                let newArr=[]
                data.forEach((item,i) => {
                    if (index==1) {
                        let subarr = [i+1,item.province,item.aqiVal,item.pollutant,item.style]
                        newArr.push(subarr)
                    } else if (index==2) {
                        let subarr = [i+1,item.areaName,item.factor,item.avg,item.aimVal,item.totalAvg]
                        newArr.push(subarr)
                    }
                })
                if(index==1) {
                    this.aq_spListList=newArr
                }else if(index==2) {
                    this.aw_spListList=newArr
                }
            }
        },
        getMatchArr(arr,key) {
            console.log(arr,key)
            for (let i = 0;i<arr.length ; i++) {
                if (arr[i].lineLabel === key) {
                    return arr[i]
                }
            }
        },
    }
};
</script>
<style scoped lang="scss">
  .atmosphere{
    width: 100%;
    height: 93.8vh;
    padding: 2.3vh 1vw 2.6vh;
    box-sizing: border-box;
    font-family: SourceHanSansCN-Regular;
  }
  .bg_c{
      padding: 0 1vw;
      box-sizing: border-box;
    background-color: rgba(4, 11, 39, 0.6);
  }
  /*卡片的高度*/
  .airQuality{
    width: 100%;
    height: 58.61vh;
  }
  .areaWarnInfo{
    width: 100%;
    height: 28.43vh;
  }
  .map{
    width: 100%;
    height: 58vh;
      position: relative;

  }
  .airForecast{
    width: 100%;
    height: 24.26vh;
  }
  .calendar{
    position: relative;
    width: 100%;
    height: 29.91vh;
  }
  .tendencyChart{
    width: 100%;
    height: 27.5vh;
  }
  .reachSituation{
    width: 100%;
    height: 29.63vh;
  }
  .pl-container,.pc-container,.pr-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .AQIinfo{
      display: flex;
      color: #fff;
         .AQIval{

             position: relative;
             width: 2.6vw;
             height: 2.6vw;
             font-size: 1.3vw;
             line-height: 2.6vw;
             text-align: center;
             /*color: rgba(252, 225, 0, 1);*/
             background: url("../../assets/image/atmosphere/cityAQI@2x.png");
         }
        .AQItext{
            padding: 0.19vh 0;
            font-size: 1.3vh;
            /*margin: 0 1.09vw 0 0.47vw;*/
            white-space: nowrap;
            .valColor{
                width: 3.96vw;
                height: 1.85vh;
                margin-top: 0.7vh;
                /*background-color: rgba(252, 225, 0, 0.3);*/
                /*background-color: rgba(255, 255, 255, 0.2);*/
            }
        }
      .updateTime{
          width: 8.54vw;
          font-size:1.1vh;
          color: rgba(255,255,255,0.5);
          text-align: center;
          padding: 0.19vh 0;
          p{
              white-space: nowrap;
          }
          .valColor{
              width: 8.54vw;
              height: 1.85vh;
              line-height: 1.85vh;
              font-size: 0.63vw;
              margin-top: 0.7vh;
              color: #fff;
              background-color: rgba(255, 255, 255, 0.2);
          }
      }
  }
    .AQI-ul{
        display: flex;
        flex-flow: wrap;
        /*justify-content: space-between;*/
        .AQI-li{
            margin-left: 1vw;
            &:first-child{
                margin-left: 0;
            }
            p:first-child{
                font-size: 1.04vw;
                line-height: 3.71vh;
                color: #fff;
            }
            .liLabel{
                position: relative;
                width: 2.5vw;
                height: 1.85vh;
                line-height: 1.85vh;
                text-align: center;
                font-size: 0.63vw;
                color: #fff;
                background-color: rgba(255, 255, 255, 0.2);
                .lilabelC{
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top:0;
                    width: 0.1vw;
                    height: 100%;
                    /*background-color: #fff;*/
                }
            }
        }
    }
    .cityAQI{
        margin-bottom: 2vh;
        font-family: SourceHanSansCN-Regular;
    }
    .changeDate{
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(-1vw,3.2vh);
        /*padding-bottom: 0.74vh;*/
        /*margin-bottom: 1vh;*/
        /*border-bottom: 2px solid rgba(255,255,255,0.1);*/
    }
    .ranking {
        position: relative;
        line-height: 3.85vh;
        height: 3.85vh;
        color: #fff;
        border-bottom: 2px solid rgba(255,255,255,0.2);
        margin-bottom:1vh;
        .left{
            .text {
                padding-left: 1.6vw;
            }
        }
        .right{
            color: rgba(255,255,255,0.5);
        }
    }
    .dotIcon{
        margin-top:1vh;
    }
    .AQI-chart-pie{
        width: 5.36vw;
        font-family: SourceHanSansCN-Regular;
        margin-left: 3vw;
        &:first-child{
            margin-left: 0;

        }
        .date{
            position: relative;
            text-align: left;
            margin-bottom: 0.73vh;
            color: #fff;
            &:after{
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                width: 3.39vw;
                height: 0.09vh;
                background-color:rgba(255, 255, 255, 0.3);
            }
        }
        .chart{
            position: relative;
            width: 5.21vw;
            height: 9.6vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .text{
            font-size: 0.63vw;
            color: rgba(255, 255, 255, 0.5);
            p{
                text-align: left;
                margin-top: 0.65vh;
                span{
                    color: #fff;
                }
            }
        }
    }
    .colorTips{
        margin: 1.5vh 0 1.2vh 0.2vw;
        border-top: 2px solid rgba(255,255,255,0.1);
        .colorItem{
            margin-right: 1.25vw;
            color:rgba(255, 255, 255, 0.5);
            padding-top: 0.8vh;
            .colorBox{
                width: 0.52vw;
                height: 0.52vw;
                background-color:#fff;
                margin-right: 0.21vw;

            }
            .text{
                white-space: nowrap;
            }
        }
    }



    /*icon*/
    .pullIcon{
        width: 0.8vw;
        height: 0.8vh;
        margin-left: 0.5vw;
        background-image: url("../../assets/image/atmosphere/pull@3x.png");
    }
    .chartBg_img .chart{
        position: relative;
        width: 9.26vh;
        height: 9.26vh;
        margin-bottom: 0.65vh;
        background-image: url("../../assets/image/atmosphere/pie_box@2x.png");
        background-size: 100% 100%;
    }
    .chartLine_img{
        width: 4.79vw;
        height: 1.3vh;
        margin-bottom: 0.65vh;
        /*background-repeat: no-repeat;*/
        background-image: url("../../assets/image/atmosphere/pie_line@2x.png");
        background-size: 100% 100%;

    }
    .mild{
        /*color: ;*/
        background-color: rgba(252, 225, 0, 0.3);
    }
    .medium{
          background-color: rgba(254, 125, 68, 0.3);
    }
      .severe{
          background-color: rgba(217, 225, 253, 0.3);
      }
    .mild_f{
        color: rgba(252, 225, 0, 1);
    }
  .medium_f{
     color: rgba(254, 125, 68, 1);
  }
  .severe_f{
      color: rgba(217, 225, 253, 1);
  }
    .color_1 {
        background-color: #00ff86;
    }
  .color_2 {
      background-color: #009aff;
  }
  .color_3 {
      background-color: #ffe400;
  }
  .color_4 {
      background-color: #fe7d44;
  }
  .color_5 {
      background-color: #ff5b5e;
  }
  .color_6 {
      background-color: #d90a0a;
  }
</style>
<style scoped lang="scss">
    .el-date-editor{
        width: 4.95vw;
        height: 1.85vh;
        cursor: pointer;
        border-color:  rgba(255, 255, 255, 0.5);
        /deep/ input {
            width: 4.95vw;
            height: 1.85vh;
            padding: 0 0 0 1.63vw;
            color: #fff;
            border-radius: 0;
            background-color: rgba(255,255,255,0.1);
        }
        /deep/ .el-input__icon{
            line-height: 1.85vh;
        }
    }
</style>
