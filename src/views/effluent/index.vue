<template>
  <div class="home">
    <div class="waterNavLeft">
      <!-- 监测区域内监测情况概述 -->
      <div class="waterNavLeftItem1">
        <div class="waterNavLeftItem1Title">监测区域内监测情况概述</div>
        <div class="territoryBox">
          <TerritoryClass  v-if="airQualityObj" :airQualityObj="airQualityObj" />
        </div>
      </div>
      <div class="summarizeClass lineshadow">
        <div class="waterNavTitle">达标企业占比</div>
<!--        <chart-title :title="'达标企业占比'" w="50%"/>-->
<!--        <ul class="f_wrap">-->
<!--          <li class="classItem flex" v-for="(item,index) in summarizeClass" :key="index">-->
<!--            <div class="icon_box f_center">-->
<!--              <i :class="['ICON summarizeIcon',item.icon]"></i>-->
<!--            </div>-->
<!--            <div class="text">123个</div>-->
<!--          </li>-->
<!--        </ul>-->
        <MonitorCard :styleObj="{marginTop:'2vh'}" :classObj="monitorObj" :subclassObj="monitorObj" :isWork="false"/>
      </div>
      <!-- 排污总量监管 -->
      <div class="waterNavLeftItem2">
        <div class="waterNavLeftItem2Title">排污总量监管</div>
        <div class="waterNavLeftItem2Content">
          <div class="mainPollutants">
            <div>主要污染物</div>
          </div>
          <div class="chartPie" v-if="charOptions5Obj">
            <basic-pie-bar :mainObjList="charOptions5Obj[1]"/>
            <div class="mainObjIcon posi_main iconPosi_main"></div>
          </div>

          <!-- 图表1 -->
          <div class="pollutantEnterprises">
            <div>
              污染物企业
              <div>
                <div class="box"></div>
                <div>占比量</div>
              </div>
            </div>
          </div>
          <div class="pollutantEnterprisesList" v-if="charOptions5Obj">
            <Swiper :options="swiperOption"  v-if="charOptions5Obj[0].name.length>4">
              <template v-for="(item, index) in charOptions5Obj[0].name.length">
                <swiper-slide>
                  <div

                          :key="index"
                          class="pollutantEnterprisesListItem"
                  >
                    <div class="pollutantEnterprisesListItemTop">
                      <div>{{charOptions5Obj[0].name[index]}}</div>
                      <div>{{Math.floor(charOptions5Obj[0].value[index]*100)}}%&nbsp;|
                        &nbsp;{{Math.floor(charOptions5Obj[0].value[index]*100)}}%</div>
                    </div>
                    <!-- <div class="pollutantEnterprisesListContent"></div> -->
                    <!-- 柱形图 -->
                    <vChart
                            :options="charOPtions8[index]"
                            autoresize
                            class="pollutantEnterprisesListContent"
                    ></vChart>
                  </div>
                </swiper-slide>
              </template>
            </Swiper>
            <template v-else>
                <div
                        v-for="(item, index) in charOptions5Obj[0].name.length"
                        :key="index"
                        class="pollutantEnterprisesListItem"
                >
                  <div class="pollutantEnterprisesListItemTop">
                    <div>{{charOptions5Obj[0].name[index]}}</div>
                    <div>{{Math.floor(charOptions5Obj[0].value[index]*100)}}%&nbsp;|
                      &nbsp;{{Math.floor(charOptions5Obj[0].value[index]*100)}}%</div>
                  </div>
                  <!-- <div class="pollutantEnterprisesListContent"></div> -->
                  <!-- 柱形图 -->
                  <vChart
                          :options="charOPtions8[index]"
                          autoresize
                          class="pollutantEnterprisesListContent"
                  ></vChart>
                </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 污染源预警实时一览" -->
    <div class="waterNavCenter">
      <div class="map">
        <toggleMap @updateRate="updateRate"/>
      </div>
      <div class="proportionList">
        <div class="proportionListTitle">污染源预警实时一览</div>
        <!-- table组件 strat -->
        <TableComponent v-if="tableList" :tableHeaderList="tableHeaderList" :tableOption="tableOption" :data="tableList" :showNum="5"/>
        <!-- table组件 end -->
      </div>
    </div>

    <div class="waterNavRight">
      <!-- 污染削减率 -->
      <div class="waterNavRightItem1">
        <div class="waterNavRightItem1Title">污染削减率</div>
        <div class="waterNavRightItem1Content" v-if="updateAbatement">
          <div class="slectBox f_r_between">
            <input
              type="text"
              v-model="enterpriseName"
              placeholder="企业搜索"
              @change="search"
              class="waterNavRightItem1Input"
            />
            <!-- select框 -->
            <SelectComponent
                    v-if="showSelectList"
              :selectList="abatementObj.selectList"
              :selectOptionStyle="selectOptionStyle"
              :selectOption="abatementObj.selectOption"
              @changeSelectItemed="changeSelectComponent"
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
      <!-- 任务实时更新状态表 -->
      <div class="waterNavRightItem2">
        <div class="waterNavRightItem2Title">任务实时更新状态表</div>
        <div class="waterNavRightItem2Content">
          <div class="charOPtions9List">
            <div class="pointer" v-for="(item, index) in charOPtions9List" :key="index" @click="showWarnPop=true">
              <div>{{item.name}}</div>
              <div>{{item.value}}</div>
            </div>
          </div>
          <div class="pieList">
            <div class="colorTips f_c_center">
              <div class="color"></div>已完成
              <div class="color red"></div>未完成
            </div>
            <ul class="mt-ul f_r_between">
              <li class="mt_item pointer" v-for="(item,index) in mt_pieList" :key="index" @click="toTable">
                <basicPie
                        :inventory="item.pieOptions"
                        linearGradient_i="rgba(254, 125, 68, 1)"
                        linearGradient_ii="rgba(254, 125, 68, 1)"
                        undoneColor="rgba(0, 154, 255, 1)"
                />
                <span class="text">{{item.label}}</span>
                <i :class="[item.icon, 'ICON mt_icon ab_center']"></i>
<!--                <div class="airIcon ab_center"></div>-->
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 监控点上传率概况 -->
      <div class="waterNavRightItem3">
        <div class="waterNavRightItem3Title">监控点上传率概况</div>
        <div class="waterNavRightItem3Content">
          <div class="monitorTitle">
            <div>监控上传率</div>
          </div>
          <div class="monitorContent">
            <!-- 图标 -->
            <vChart :options="charOPtions7" autoresize class="pieRight"></vChart>

            <!-- 说明 -->
            <div>
              <div v-for="(item, index) in charOPtions7List[0]" :key="index">
                <div :title="item">{{item|strLength(10)}}</div>
                <div>{{charOPtions7List[2][index]}}%</div>
              </div>
            </div>
<!--            <div class="airIcon posi"></div>-->
          </div>
          <div class="monitorTitle">
            <div>地域详情</div>
          </div>
          <div class="monitorList">
            <div v-for="(item, index) in charOPtions7List[1]" :key="index" class="f_c_center">
              <div class="f_c_center"><div class="dot"></div>{{item[0]}}</div>
              <div>{{item[1]}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup :isShow.sync="showWarnPop" w="28.85vw" h="33.61vh" title="水系统平衡分析不同等级预警占比">
      <template v-if="showWarnPop">
        <div class="warn-popContainer">
          <TableComponent v-if="popData" :tableHeaderList="popTable" :tableOption="poptableOption" :data="popData" :showNum="9"/>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartTitle from "../../components/ChartTitle";
import basicPie from "../../components/basicPie"
import TableComponent from "../../components/common/TableComponent";
import SelectComponent from "../../components/common/SelectComponent";
import DropDownComponent from "../../components/common/DropDownComponent";
import toggleMap from "../../components/toggleMap";
import PictorialBarII from "../../components/PictorialBarII";
import Popup from "../../components/Popup";
import TerritoryClass from "../../components/TerritoryClass";
import basicPieBar from "../../components/basicPieBar";
import MonitorCard from '../../components/MonitorCard'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import {effluent_swiperOption} from '../../components/common/swiperOption'
import {
  getRegion,
  getPollution,
  getRealTimePollutionSource,
  getPollutionReduction,
  getTaskList,
  getMonitorUpload,
  getEnterpriseList
} from "../../utils/api.js";
// 图标数据
import {
  iconogram1,
  iconogram2,
  pie1,
  pie2,
  pieLeft,
  pie3,
  pieRight,
  iconogram3,
  poptableOption,
  popTable
} from "./data.js";
// import  from './data'
// 组件配置
import {DropDownConfig, SelectConfig} from '../../components/common/ComponentConfig.js'
import vChart from "vue-echarts";
import "echarts/lib/chart/pictorialBar";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import {mapGetters} from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      swiperOption:JSON.parse(JSON.stringify(effluent_swiperOption)),
      airQualityObj: null,
      showWarnPop:false,
      showFlowPop:false,
      popTable:popTable,
      poptableOption:poptableOption,
      poptableList:[],
      mt_pieList:[],
      tableOption: {
        // isTableStyle: false, // 是否使用
        tableStyle: {
          height: "22.78vh",
          width: "56.09vw",
          margin: "0 auto"
        }, // 表格样式
        // isTableHeaderStyle: false, // 表头样式是否使用
        tableHeaderStyle: {},
        // isTableTbodyStyle: false, // 表体的样式是否使用
        tableTbodyStyle: {
          width: "56.09vw",
          height: "16.11vh"
        },
        // isTableTrstyle: false, // 行高的样式是否使用
        tableTrstyle: {},
        isTableHeaderLine: true, // 表头分割线是否使用
        tableHeaderLine: `<div class="hr"></div>` // dom字符串
      },
      summarizeClass:[
        {icon:'guo_icon'},
        {icon:'sheng_icon'},
        {icon:'shi_icon'},
        {icon:'qu_icon'},
        {icon:'chang_icon'},
        {icon:'qi_icon'},
      ],
      // 表头单元格
      tableHeaderList: [
        {
          name: "序号",
          width: "3vw",
          style: {
            width: "1vw",
          }
        },
        {
          name: "公司名称",
          width: "10.88vw",
          style: {
            width: "8.5vw",
          }
        },
        {
          name: "站位名称",
          width: "10vw",
          style: {
            width: "8.5vw",
          }
        },
        {
          name: "可疑因子",
          width: "5vw",
          style: {
            marginLeft:'1vw',
            width: "4vw",
          }
        },
        {
          name: "可疑数据描述",
          width: "7.08vw",
          // isWarnSyle:true,
          style: {
            width: "4vw",
          }
        },
        {
          name: "预警状态",
          width: "6.46vw",
          height: "",
          iconClass: "icon-xiaoxi",
          isWarnSyle:true,
          style: {
            marginLeft:'1vw',
            width: "4.5vw",
          }
        },
        {
          name: "处理状态",
          width: "6.03vw",
          isDispose:true,
          style: {
            marginLeft:'1.5vw',
            width: "4vw",
          }
        },
        {
          name: "可疑开始时间",
          width: "8.03vw",
          style: {
            width: "7vw",
          }
        },
        {
          name: "可疑结束时间",
          width: "10.18vw",
          style: {
            width: "7vw",
          }
        }
      ],
      ...DropDownConfig(),
      // Select配置项
      ...SelectConfig(),
      enterpriseName: "", // 企业名称
      tableList: null,
      charOptions1: {},
      charOptions1List: [],
      charOptions2: {},
      charOptions3: {}, // 削减前
      charOPtions3Obj: {}, // 削减前
      charOPtions4: {}, // 削减后
      charOPtions4Obj: {}, // 削减后
      charOPtions5: [],
      charOptions5Obj: null,
      charOPtions6: {},
      charOptions6List: [],
      charOPtions7: {},
      charOPtions7List: {},
      charOPtions9List: [],
      charOPtions8: [],
      dropdownList:[],
      dropdownItem: {}, // 选中option的值
      dropdownOptionListStyle: {
        marginLeft: '1.2vw'
      }, // 设置宽度和高度
      dropdownOptionListItemStyle: {}, // 设置宽度和高度
      dropdownOption: {
        icon: '', // 背景图
        left: '', // 定位left
        top: '' // 定位top
      },
      monitorObj: {},
      selectOption: {
        placeholder:'zyw'
      },
      selectOptionStyle: {
        width: "6.67vw",
        height: "2.31vh",
        lineHeight:"2.31vh",
        padding:'0 0.5vw',
        boxSizing:'border-box',
        textAlign:'left',
        // backgroundColor:'rgba(0,0,0,0.1)'
      },
      popData:null,
      selectItemed:null,
      abatementObj:{},
      showSelectList:false,
      updateAbatement:true,
      enterprise:null,
      factor:null,
      rateCode:''
    };
  },
  created() {
    this.mt_pieList= [
      {
        label:'应急响应',
        icon:'emergency_icon',
        pieOptions: {
          value:100
        }
      },
      {
        label:'日常运维',
        icon:'operation_icon',
        pieOptions: {
          value:10
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
    this.getAllDate(); // 获取所有数据
    this.getPopData()
    this.getAbatement()
    this.getNoiseOverview()
    this.getTaskList()
  },
  computed:{
...mapGetters('effluent',{
    pieValue:'getPieValue'
}),
  },
  components: {
    ChartTitle,
    Popup,
    PictorialBarII,
    TerritoryClass,
    basicPieBar,
    TableComponent,
    vChart,
    SelectComponent,
    DropDownComponent,
    toggleMap,
    basicPie,
    MonitorCard,
    Swiper,
    SwiperSlide
  },
  methods: {
    getNoiseOverview() {
      this.$get('/i101inspectsumary').then(res => {
        if (res.code == 0) {
          this.airQualityObj =  res.data
          // console.log('res.data',res.data)
        } else {
          console.log(res.err_msg)
        }
        this.showAQI=true
      })
    },
    updateRate(code) {
      this.rateCode=code
      this.getAbatement()
    },
    changeSelectComponent(val) {
      // console.log('11111',val.label)
      this.factor = val.label
      this.getAbatement()
    },
    changeSelectItemed(val) {
      // console.log(val)
      this.charOPtions6 = val
      this.charOptions6List = val.value
      // this.selectItemed = val
    },
    toTable() {
      this.$router.push({
        path:'/table',
        query:{
          style:'effluent'
        }
      })
    },
    getPopData() {
      this.$get('/i308PopupWarnTable').then(res => {
        if (res.code == 0) {
          let newArr = []
          res.data.forEach((item,i) => {
            // console.log(item)
            let arr = [i+1,item.name,item.classType,item.style]
            newArr.push(arr)
          })
          this.popData = newArr
        } else {
          console.log(res.err_msg)
        }
      })
    },
    getAbatement() {
      let params = {}
      if (this.factor) {
        params.factor = this.factor
      }
      if (this.enterprise) {
        params.enterprise = this.enterprise
      }
      if(this.rateCode) {
        params.code = this.rateCode
      }
      this.$get('/i105pollreducerate',params).then(res => {
        console.log(11111,res.data)
        this.updateAbatement=false
        if (res.code == 0) {
          this.abatementObj=res.data
          this.abatementObj.selectOption = {
            placeholder: res.data.currentSelected.label
          }
          this.abatementObj.beforeDispose = {
            value:res.data['处理前']['消减量'],
            rate:res.data['处理前']['消减率']
          }
          this.abatementObj.afterDispose = {
            value:res.data['处理前']['消减量'],
            rate:res.data['处理前']['消减率']
          }
        } else {
          console.log(res.err_msg)
        }
        this.$nextTick(() => {
          this.updateAbatement=true
        })
        this.showSelectList=true
      })
    },
    getTaskList() {
      this.$get('/i106tasksumary').then(res => {
        // console.log('123',res.data)
        if (res.code == 0) {
          this.charOPtions9List = res.data["预警状态"];
          // this.mt_pieList = res.data['占比'].realStyle
          // let newArr = []
          res.data['占比'].realStyle.forEach((item,i) => {
            this.mt_pieList.forEach(sub => {
              if (item.name===sub.label){
                sub.pieOptions.value=item.value
              }
            })
          })
          // console.log('123',this.mt_pieList)

          // // this.popData = newArr
        } else {
          console.log(res.err_msg)
        }
      })
    },
    getAllDate() {
      let self=this

      // 主要污染物 和 污染企业
      getPollution().then(data => {
        this.charOptions5Obj = {}
        let arr = []
        data["主要污染物"].name.forEach(item => {
          arr.push({label:item})
        })
        data["主要污染物"].value.forEach((item,i) => {
          arr[i].value=item
        })
        // console.log(arr)
        this.charOptions5Obj[1] = arr;
        this.charOptions5Obj[0] = data["污染源企业"];
        // 列表的图形配置
        self.charOptions5Obj[0].name.forEach((item, index) => {
          self.charOPtions8.push(
            iconogram3({
              name: item,
              value: self.charOptions5Obj[0].value[index]*100
            })
          );
        });
        console.log(this.charOptions5Obj[0])
      });

      // 污染源预警实时一览
      getRealTimePollutionSource().then(data => {
        this.tableList = [];
        // console.log('data',data);
        data.dataList.forEach((item,i) => {
          this.tableList.push([
            i + 1,
            item.companyName,
            item.siteName,
            item.paramName,
            item.flag,
            item.warningState,
            item.disposeStyle,
            item.beginTime,
            item.endTime
          ]);
        });
      });

      // 监控点上传率概况
      getMonitorUpload().then(data => {
        // console.log('data',data)
        this.charOPtions7List[0] = data["监控上传率"]; // 监控上传率
        this.charOPtions7List[1] = Object.entries(data["地域详情"]); // 地域详情
        this.charOPtions7List[2] = data["list"];
        this.charOPtions7 = pieRight(this.charOPtions7List); // 监控上传图
        // console.log(this.charOPtions7List, "监控点上传率概况",Object.entries(data["地域详情"]));
      });
    },
    // 搜索企业
    search(item) {
      this.enterprise = item.target.value
      this.getAbatement()
    }
  },
  filters:{
    strLength:function(str,length){
      if(str.length>length) {
        return str.substr(0,10) + '...'
      } else {
        return str
      }
      }
    },
  watch:{
    pieValue(){
      this.charOPtions6 = pie3(this.pieValue); // 地域分类
      this.charOptions6List =this.pieValue.value;
    }
  }
};
</script>
<style lang="scss">
@import "../../components/common/common.scss";
.home {
  height: 93.8vh;
  box-sizing: border-box;
  position: relative;
  padding: 2.31vh 1.04vw 2.56vh;
  display: flex;
  justify-content: space-between;
  font-family: SourceHanSansCN-Regular;
  // 左侧
  .waterNavLeft {
    width: 18.75vw;
    height: 88.98vh;
    // 监测区域内监测情况概述
    .waterNavLeftItem1 {
      width: 18.75vw;
      height: 22.96vh;
      background-color: rgba(4, 11, 39, 0.6);

      /*background: url("../../assets/image/effluent/监测区域情况概述内容框@3x.png");*/
      /*background: url("../../assets/image/effluent/削减率内容框@3x.png");*/
      background-size: 100% 100%;
      .waterNavLeftItem1Title {
        width: 18.75vw;
        height: 3.24vh;
        // background: rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        // border-left: 0.16vw solid #009aff;
        font-style: SourceHanSansCN-Regular;
        font-size: 1.48vh;
        line-height: 4.24vh;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: left;
        text-indent: 1.04vw;
      }
      .waterNavLeftItem1Content {
        height: 20.65vh;
        width: 18.75vw;
        margin: 0 auto;
        .regionTitle {
          width: 18.75vw;
          margin: 0.93vh 0 0 0;
          position: relative;
          > div:nth-child(1) {
            width: 16.82vw;
            height: 2.41vh;
            display: flex;
            margin: 0 auto;
            font-size: 1.3vh;
            font-weight: normal;
            font-stretch: normal;
            color: #ffffff;
            // background: url("../../assets/image/effluent/标题装饰 1@3x.png");
            background: url("../../assets/image/effluent/标题装饰 1@3x.png");
            background-size: 100% 100%;
            // text-indent: 1.4vw;
            line-height: 1.8vh;
            // &::after {
            //   content: "";
            //   position: absolute;
            //   display: block;
            //   width: 0.63vw;
            //   height: 0.56vh;
            //   background: url("../../assets/image/effluent/下标拷贝2@3x.png");
            //   background-size: 100%;
            //   left: 5.5vw;
            //   top: 0.5vh;
            //   z-index: 2;
            // }
          }
        }
        > div:nth-child(2) {
          width: 16.82vw;
          height: 16.34vh;
          margin: 0 auto;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          // 分5块
          // 左边1
          > div:nth-child(1) {
            width: 16.82vw;
            height: 16.34vh;
            font-size: 0.63vw;
            position: absolute;
            display: flex;
            margin: 0 auto;
            > div {
              width: 16.82vw;
              height: 16.34vh;
              display: flex;
              flex-wrap: wrap;
              align-content: center;
              // 每一项
              > div {
                height: 1.5vh;
                width: 50%;
                line-height: 1.5vh;
                position: relative;
                margin: 0.3vh 0;
                &:nth-child(2n) {
                  > div {
                    right: 1.5vw;
                  }
                }
                &:nth-child(2n-1) {
                  > div {
                    left: 1.5vw;
                  }
                }
                > div {
                  width: 3vw;
                  display: flex;
                  position: absolute;
                  > div:nth-child(1) {
                    margin-right: 0.06vw;
                  }
                }
              }
            }
          }
          // 左边2
          > div:nth-child(2) {
            width: 1.56vw;
            height: 12.41vh;
            background: url("../../assets/image/effluent/左@3x.png");
            background-size: 100% 100%;
          }
          // 中间
          > .pie3 {
            // width: 4.01vw;
            width: 7.13vh;
            height: 7.13vh;
            background: url("../../assets/image/effluent/地域分类图表装饰@3x.png");
            background-size: 100% 100%;
          }
          // 右边2
          > div:nth-child(4) {
            width: 1.56vw;
            height: 12.41vh;
            background: url("../../assets/image/effluent/右@3x.png");
            background-size: 100% 100%;
          }
          // 右边1
          // > div:nth-child(5) {
          //   width: 3.18vw;
          //   height: 12.41vh;
          //   font-size: 0.63vw;
          //   > div {
          //     display: flex;
          //     justify-content: space-between;
          //     margin: 0.5vh 0;
          //     > div {
          //       height: 1.5vh;
          //       line-height: 1.5vh;
          //     }
          //   }
          // }
        }
      }
    }
    // 监测区域内污染情况一览
    .waterNavLeftItem2 {
      width: 18.75vw;
      height: 45.74vh;
      background-color: rgba(4, 11, 39, 0.6);

      /*background: url("../../assets/image/effluent/监测区域内污染情况一览内容框@3x.png");*/
      /*background-size: 100% 100%;*/
      margin-top: 0.74vh;
      .waterNavLeftItem2Title {
        width: 18.75vw;
        height: 3.24vh;
        // background: rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        // border-left: 0.16vw solid #009aff;
        font-style: SourceHanSansCN-Regular;
        font-size: 1.48vh;
        line-height: 4.24vh;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: left;
        text-indent: 1.04vw;
      }
      .waterNavLeftItem2Content {
        height: 20.65vh;
        width: 18.75vw;
        margin: 0 auto;
        .mainPollutants {
          width: 18.75vw;
          margin: 0.93vh 0;
          div {
            width: 16.82vw;
            height: 2.41vh;
            display: flex;
            margin: 0 auto;
            font-size: 1.3vh;
            font-weight: normal;
            font-stretch: normal;
            color: #ffffff;
            background: url("../../assets/image/effluent/标题装饰 1@3x.png");
            background-size: 100% 100%;
            text-indent: 1.4vw;
            line-height: 1.8vh;
          }
        }
        .doughnutChartItem {
          position: relative;
          width: 16.82vw;
          height: 10.56vh;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          .doughnutChart {
            width: 7.5vw;
            height: 10.56vh;
            background: url("../../assets/image/effluent/主要污染物图表外框@3x.png"),
              url("../../assets/image/effluent/质量控制_1@3x.png");
            background-position: center center;
            background-repeat: no-repeat, no-repeat;
            background-size: 100% 100%, 20%;
          }
          > div:nth-child(2) {
            > div {
              width: 7.86vw;
              height: 1.85vh;
              background: url("../../assets/image/effluent/图例框@3x.png");
              background-size: 100% 100%;
              margin-top: 0.67vh;
              display: flex;
              justify-content: space-between;
              line-height: 2vh;
              color: #fff;
              > div:nth-child(1) {
                font-size: 0.63vw;
                margin-left: 0.4vw;
              }
              > div:nth-child(2) {
                font-size: 0.94vw;
                margin-right: 0.5vw;
              }
            }
            > div:nth-child(1) {
              border-left: 0.1vw solid rgb(0, 154, 255);
            }
            > div:nth-child(2) {
              border-left: 0.1vw solid rgb(0, 255, 255);
            }
            > div:nth-child(3) {
              border-left: 0.1vw solid rgb(254, 125, 68);
            }
            > div:nth-child(4) {
              border-left: 0.1vw solid rgb(255, 255, 255);
            }
          }
        }
        .pollutantEnterprises {
          width: 18.75vw;
          margin: 2.69vh 0 1.11vh 0;
          > div:nth-child(1) {
            width: 16.82vw;
            height: 2.41vh;
            display: flex;
            margin: 0 auto;
            font-size: 1.3vh;
            font-weight: normal;
            font-stretch: normal;
            color: #ffffff;
            background: url("../../assets/image/effluent/标题装饰 1@3x.png");
            background-size: 100% 100%;
            text-indent: 1.4vw;
            line-height: 1.8vh;
            position: relative;
            > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              right: 0;
              position: absolute;
              width: 5vw;
              height: 0.63vw;
              top: 0.05vh;
              > .box {
                width: 0.63vw;
                height: 0.63vw;
                background-image: linear-gradient(
                  90deg,
                  #009aff 0%,
                  #00f7ff 100%
                );
                margin-left: 0.5vw;
              }
              > div {
                text-indent: 0;
                margin-right: 0.8vw;
              }
            }
          }
        }
        .pollutantEnterprisesList {
          width: 16.67vw;
          height: 20.33vh;
          margin: 0 auto;
          .pollutantEnterprisesListItem {
            width: 16.67vw;
            /*height: 2.69vh;*/
            margin-bottom: 1.3vh;
            .pollutantEnterprisesListItemTop {
              // width: 16.67vw;
              width: 16vw;
              height: 1.49vh;
              display: flex;
              justify-content: space-between;
              font-family: SourceHanSansCN-Regular;
              margin: 0 auto;
              color: #ffffff;
              > div:nth-child(1) {
                font-size: 1.11vh;
                line-height:  1.11vh;
                letter-spacing: 0vh;
              }
              > div:nth-child(2) {
                font-size: 1.67vh;
                line-height: 1.67vh;
              }
            }
            .pollutantEnterprisesListContent {
              width: 16.67vw;
              height: 1.2vh;
              margin-top: 0.65vh;
              background: url("../../assets/image/effluent/污染物排名框@3x.png")
                no-repeat;
              background-size: 98% 100%; // 防止滚动条挡住背景
            }
          }
        }
      }
    }
  }
  .waterNavCenter{
    width:58.28vw;
    position: relative;
    .map{
      position: relative;
      width: 100%;
      height: 61vh;
    }
  }
  /* 污染源预警实时一览 */
  .proportionList {
    width: 58.33vw;
    height: 26.02vh;
    position: absolute;
    left: 0;
    bottom: 0 ;
    background: url("../../assets/image/effluent/污染源预警实时一览内容框@3x.png");
    background-size: 100% 100%;
    .proportionListTitle {
      height: 3.24vh;
      // border-left: 0.26vw solid rgb(0, 154, 255);
      // background: #42444b;
      font-size: 0.83vw;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0vw;
      color: #fff;
      text-align: left;
      line-height: 4.24vh;
      text-indent: 1.04vw;
    }
    // 已封装为组件
    // .proportionListContent {
    //   height: 22.78vh;
    //   // 4.07vh 2.69vh
    //   width: 56.09vw;
    //   margin: 0 auto;
    //   .proportionTableHeader {
    //     display: flex;
    //     .tableHeader {
    //       text-align: left;
    //       height: 4.07vh;
    //       color: #fff;
    //       font-family: SourceHanSansCN-Regular;
    //       font-size: 0.73vw;
    //       font-weight: normal;
    //       font-stretch: normal;
    //       line-height: 4.07vh;
    //     }
    //   }
    //   .proportionTableDate {
    //     width: 56.09vw;
    //     height: 16.11vh;
    //   }
    //   .proportionTableTr {
    //     display: flex;
    //     &:nth-child(odd) {
    //       height: 4.07vh;
    //       line-height: 4.07vh;
    //       color: #fff;
    //       //   background: lightcoral;
    //     }
    //     &:nth-child(even) {
    //       height: 2.59vh;
    //       line-height: 2.59vh;
    //       //   background: lightcyan;
    //       color: #fff;
    //     }
    //     .proportionTableTd {
    //       display: flex;
    //       align-items: center;
    //     }
    //   }
    // }
  }
  // 右侧
  .waterNavRight {
    width: 18.75vw;
    height: 88.98vh;
    // 污染削减率
    .waterNavRightItem1 {
      width: 18.75vw;
      height: 23.98vh;
      background-color: rgba(4, 11, 39, 0.6);

      /*background: url("../../assets/image/effluent/削减率内容框@3x.png");*/
      background-size: 100% 100%;
      .waterNavRightItem1Title {
        width: 18.75vw;
        height: 3.24vh;
        // background: rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        // border-left: 0.16vw solid #009aff;
        font-family: SourceHanSansCN-Regular;
        font-size: 1.48vh;
        line-height: 4.24vh;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: left;
        text-indent: 1.04vw;
      }
      .waterNavRightItem1Content {
        height: 20.65vh;
        width: 18.75vw;
        margin: 0 auto;
        > div {
          width: 16.46vw;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          input {
            width: 8.75vw;
            // height: 2.31vh;
            height: 2.31vh;
            line-height: 2.31vh;
            /*background: #091d35;*/
            color: #fff;
            // rgba(255, 255, 255,0.8)
            border: 0.09vh solid rgba(255, 255, 255, 1);
            text-indent: 0.3vw;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.1);
          }
          input::-webkit-input-placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-size: 1.11vh;
          }
        }
        > div:nth-child(1) {
          margin-top: 1.02vh;
          height: 2.31vh;
        }
        > div:nth-child(2) {
          margin-top: 1.3vh;
          height: 6.39vh;
          // pie
          > .pie1 {
            position: relative;
            width: 3.59vw;
            height: 6.39vh;
            background: url("../../assets/image/effluent/处理前后圆环框@2x.png");
            background-size: 100% 100%;
            .chart{
              width: 2.71vw;
              height:  4.91vh;
            }
          }
          // pie右边
          > div:nth-child(2) {
            // 第一行
            > div:nth-child(1) {
              width: 6.93vw;
              height: 1.85vh;
              background: url("../../assets/image/effluent/图例框@3x.png");
              background-size: 100% 100%;
              display: flex;
              justify-content: space-between;
              color: #fff;
            }
            // 第二行
            > div:nth-child(2) {
              display: flex;
              justify-content: space-between;
              color: #fff;
              margin-top: 1vh;
            }
            // 第三行
            > .iconogram1 {
              width: 11.35vw;
              height: 0.52vw;
              background: url("../../assets/image/effluent/削减量进度框@3x.png");
              background-size: 100% 100%;
              margin-top: 0.74vh;
            }
          }
        }
        > div:nth-child(3) {
          margin-top: 1.3vh;
          height: 6.39vh;
          // pie
          > .pie2 {
            position: relative;
            width: 3.59vw;
            height: 6.39vh;
            background: url("../../assets/image/effluent/处理前后圆环框@2x.png");
            background-size: 100% 100%;
            .chart{
              width: 2.71vw;
              height:  4.91vh;
            }
          }
          // pie右边
          > div:nth-child(2) {
            // 第一行
            > div:nth-child(1) {
              width: 6.93vw;
              height: 1.85vh;
              background: url("../../assets/image/effluent/图例框@3x.png");
              background-size: 100% 100%;
              display: flex;
              justify-content: space-between;
              color: #fff;
            }
            // 第二行
            > div:nth-child(2) {
              display: flex;
              justify-content: space-between;
              color: #fff;
              margin-top: 1vh;
            }
            // 第三行
            > .iconogram2 {
              width: 11.35vw;
              height: 0.52vw;
              background: url("../../assets/image/effluent/削减量进度框@3x.png");
              background-size: 100% 100%;
              margin-top: 0.74vh;
            }
          }
        }
        .regionTitle {
          width: 18.75vw;
          margin: 0.93vh;
          div {
            width: 16.82vw;
            height: 2.41vh;
            display: flex;
            margin: 0 auto;
            font-size: 0.73vw;
            font-weight: normal;
            font-stretch: normal;
            color: #ffffff;
            background: url("../../assets/image/effluent/标题装饰 1@3x.png");
            background-size: 100% 100%;
            // text-indent: 1.4vw;
            line-height: 1.8vh;
          }
        }
      }
    }
    // 任务实时更新状态表
    .waterNavRightItem2 {
      width: 18.75vw;
      height: 24.44vh;
      margin-top: 0.65vh;
      background-color: rgba(4, 11, 39, 0.6);

      // background: url("../../assets/image/effluent/任务实时更新状态表@3x.png");
      /*background: url("../../assets/image/effluent/削减率内容框@3x.png");*/
      background-size: 100% 100%;
      .waterNavRightItem2Title {
        width: 18.75vw;
        height: 3.24vh;
        // background: rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        // border-left: 0.16vw solid #009aff;
        font-style: SourceHanSansCN-Regular;
        font-size: 1.48vh;
        line-height: 4.24vh;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: left;
        text-indent: 1.04vw;
      }
      .waterNavRightItem2Content {
        height: 20.65vh;
        width: 18.75vw;
        margin: 0 auto;
        >.pieList{
          padding: 0 1.3vw;
          .colorTips{
            /*flex-direction: row-reverse;*/
            justify-content: flex-end;
            color: rgba(255, 255, 255, 0.5);
            padding-bottom: 0.4vh;
            border-bottom: 1px solid rgba(255,255,255,0.5);
            /*margin-right: 1.76vh;*/
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
        > .charOPtions9List {
          width: 16.46vw;
          height: 6.7vh;
          margin: 1vh auto 0;
          > div {
            width: 16.46vw;
            display: flex;
            justify-content: space-between;
          }
          > div:nth-child(1) {
            height: 1.67vh;
            > div:nth-child(1) {
              width: 12.81vw;
              background-color: rgba(0, 154, 255, 0.4);
              border-left: 0.1vw solid rgba(255, 255, 255, 0.1);
              font-size: 0.63vw;
              color: #fff;
              text-align: left;
              text-indent: 0.6vw;
              line-height: 1.9vh;
            }
            > div:nth-child(2) {
              width: 3.65vw;
              border-left: 0.1vw solid rgba(0, 154, 255, 1);
              font-size: 0.83vw;
              color: #fff;
              text-align: left;
              text-indent: 0.6vw;
              line-height: 1.9vh;
              background-color: rgba(255, 255, 255, 0.05);
            }
          }
          > div {
            height: 1.67vh;
            margin-top: 0.5vh;
            > div:nth-child(1) {
              width: 5vw;
              background-color: rgba(254, 125, 68, 0.4);
              border-left: 0.1vw solid rgba(255, 255, 255, 0.1);
              font-size: 0.63vw;
              color: #fff;
              text-align: left;
              text-indent: 0.6vw;
              line-height: 1.9vh;
            }
            > div:nth-child(2) {
              width: calc(16.64vw - 5vw);
              border-left: 0.1vw solid rgba(254, 125, 68, 1);
              font-size: 0.83vw;
              color: #fff;
              text-align: left;
              text-indent: 0.6vw;
              line-height: 1.9vh;
              background-color: rgba(255, 255, 255, 0.05);
            }
          }

          > .pie4 {
            height: 12vh;
            margin-top: 1.39vh;
          }
        }
      }
    }
    // 监控点上传率概况
    .waterNavRightItem3 {
      width: 18.75vw;
      height: 39.26vh;
      margin-top: 0.74vh;
      background-color: rgba(4, 11, 39, 0.6);

      /*background: url('../../assets/image/effluent/监控点上传率概况内容框@3x.png');*/
      /*background-size: 100% 100%;*/
      .waterNavRightItem3Title {
        width: 18.75vw;
        height: 3.24vh;
        // background: rgba(255, 255, 255, 0.3);
        box-sizing: border-box;
        // border-left: 0.16vw solid #009aff;
        font-style: SourceHanSansCN-Regular;
        font-size: 1.48vh;
        line-height: 4.24vh;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: left;
        text-indent: 1.04vw;
      }
      .waterNavRightItem3Content {
        margin: 0 auto;
        height: 20.65vh;
        width: 18.75vw;
        margin: 0 auto; // 12.69
        > div {
          width: 16.46vw;
          margin: 0 auto;
        }
        .monitorTitle {
          width: 18.75vw;
          margin: 0.93vh 0;
          div {
            width: 16.82vw;
            height: 2.41vh;
            display: flex;
            margin: 0 auto;
            font-size: 1.3vh;
            font-weight: normal;
            font-stretch: normal;
            color: #ffffff;
            background: url("../../assets/image/effluent/标题装饰 1@3x.png");
            background-size: 100% 100%;
            text-indent: 1.4vw;
            line-height: 1.8vh;
          }
        }
        .monitorContent {
          position: relative;
          height: 12.96vh;
          display: flex;
          justify-content: space-between;
          > .pieRight {
            // width: 5.05vw;
            width: 8.98vh;
            height: 8.98vh;
            background-image: url("../../assets/image/effluent/处理前后圆环框@3x.png"),
              url("../../assets/image/updateIcon@3x.png");
            background-position: center center;
            background-repeat: no-repeat, no-repeat;
            background-size: 100% 100%, 30%;
          }
          > div:nth-child(2) {
            > div {
              width: 10.05vw;
              height: 1.85vh;
              background-repeat: no-repeat;
              background-size: 100% 100%, 50%;
              margin-bottom: 1.85vh;
              display: flex;
              justify-content: space-between;
              color: #fff;
              /*margin-left: 1.2vw;*/
              &:nth-child(1) {
                background-image: url("../../assets/image/updateBox_2@2x.png");
              }
              &:nth-child(2) {
                background-image: url("../../assets/image/updateBox_3@2x.png");
              }
              &:nth-child(3) {
                background-image: url("../../assets/image/updateBox_1@2x.png");
              }
              > div:nth-child(1) {
                font-size: 1vh;
                margin-left: 1.2vw;
                /*background-image: url("../../assets/image/effluent/图例框 1@3x.png");*/

              }
              > div:nth-child(2) {
                font-size: 1.2vh;
                margin-right: 0.6vw;
                /*background-image: url("../../assets/image/effluent/图例框 1@3x.png");*/

              }
            }
          }
        }
        .monitorList {
          display: flex;
          flex-wrap: wrap;
          height: 14vh;
          align-content: flex-start;
          > div {
            width: 7.71vw;
            height: 2.59vh;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 0.21vw;
            display: flex;
            justify-content: space-between;
            color: #fff;
            line-height: 2.59vh;
            margin-bottom: 0.46vh;
            > div:nth-child(1) {
              margin-left: 0.52vw;
            }
            > div:nth-child(2) {
              margin-right: 0.52vw;
            }
          }
          > div:nth-child(2n-1) {
            margin-right: 0.8vw;
          }
        }
      }
    }
  }
}
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


/*.pieList{*/
/*  padding: 0 1.3vw;*/
/*}*/
.mt-ul{
  margin-top: 0.5vh;
  /*margin-left: 1.85vh;*/
  /*margin-right: 1.85vh;*/
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
.chartPie{
  position: relative;
  /*.mainObjIcon{*/
  /*  position: absolute;*/
  /*  left: 0;*/
  /*  top: 0;*/
  /*  !*margin-top: 1vw;*!*/
  /*  !*margin-left: 1vw;*!*/
  /*}*/
}
.mt_icon{
  width: 1.88vw;
  height: 1.88vw;
}
.emergency_icon{
  background-image: url("../../assets/image/waste/emergency.png");
}
// ../../assets/image/waste/operation@2x.png
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
.warn-popContainer{
    padding: 0 1vw;
}
  .posi_main{
    position: absolute;
    left: 0;
    top: 0;
    /*transform: translate(1.4vw, 2.5vh);*/
    /*transform: translate(1.5vw, 2.7vh);*/

  }
  .iconPosi_main {
    transform: translate(2.25vw, 0.8vh);
  }
  .territoryBox{
    padding: 0 1vw;
  }

.ab_center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
  .summarizeClass{
    position: relative;
    width: 18.75vw;
    height: 19.17vh;
    padding: 0 1vw;
    box-sizing: border-box;
    margin-top: 0.65vh;
    background-color: rgba(4, 11, 39, 0.6);
    .waterNavTitle{
      width: 18.75vw;
      height: 3.24vh;
      // background: rgba(255, 255, 255, 0.3);
      box-sizing: border-box;
      // border-left: 0.16vw solid #009aff;
      font-style: SourceHanSansCN-Regular;
      font-size: 1.48vh;
      line-height: 4.24vh;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: left;
      /*text-indent: 1.04vw;*/
    }
    .classItem{
      position: relative;
      width: 5.68vw;
      height: 2.41vh;
      background-color: rgba(255, 255, 255, 0.1);
      font-size: 0.73vw;
      color: #fff;
      text-align: center;
      margin-top: 1.85vh;
      .icon_box{
        width: 1.35vw;
        height: 1.35vw;
        background-color: rgba(0, 126, 255, 0.6);
      }
      .text{
        width: 100%;
        height: 2.41vh;
        line-height: 2.41vh;
      }
      &:nth-child(even){
        margin-left: 3.13vw;
      }
      .summarizeIcon{
        width: 1.04vw;
        height: 1.04vw;
      }
      .guo_icon{
        background-image: url("../../assets/image/国@2x.png");
      }
      .sheng_icon{
        background-image: url("../../assets/image/省@2x.png");
      }
      .shi_icon{
        background-image: url("../../assets/image/市@2x.png");
      }
      .qu_icon{
        background-image: url("../../assets/image/区@2x.png");
      }
      .chang_icon{
        background-image: url("../../assets/image/常规@2x.png");
      }
      .qi_icon{
        background-image: url("../../assets/image/其他@2x.png");
      }
    }
  }
</style>
<style scoped lang="scss">
  .swiper-container{
    height: 100%;
    .swiper-slide{
      display: flex;
      align-items: center;
      &:nth-child(odd) {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
</style>