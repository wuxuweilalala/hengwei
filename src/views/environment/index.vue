<template>
  <div class="environment">
    <div class="environment-left">
      <div class="waterDescribe chart_bg">
        <chart-title :title="'水环境概况描述'" w="0"/>
        <div class="wd-content">
          <div class="waterInfo">
            <div class="waterPolo flex">
              <div class="polo" v-if="waterInfoObj.waterChartVal">
                <div class="poloBox">
                  <WaterPolo w="4.06vw" h="4.06vw" :value="waterInfoObj.waterChartVal"/>
                </div>
                <div class="bg_img"></div>
                <div class="gradeText">{{waterInfoObj.waterGrade}}</div>
              </div>
              <div class="area f_column">
                <span class="text">{{waterInfoObj.waterArea}}km²</span>
                <span>流域面积</span>
              </div>
              <div class="source f_column">
                <span class="text">{{waterInfoObj.waterSource}}个</span>
                <span>饮用水源地</span>
              </div>
            </div>
            <ul class="wl-ul f_wrap">
              <li class="wl-item flex" v-for="(item,index) in waterInfoList" :key="index">
                <i :class="['ICON','wl-icon',`${item.icon}_icon`]"></i>
                <div class="text f_r_between">
                  <span class="item-label">{{item.label}}</span>
                  <span class="value">{{item.value}}个</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="monitoring chart_bg">
        <chart-title :title="'监测点位达标率'" w="0"/>
        <div class="mt-content">
          <ul class="mt-ul f_r_between">
            <li class="mt_item " v-for="(item,index) in mt_pieList" :key="index">
              <basicPie :inventory="item.pieOptions" :rateGrade="true"/>
              <span class="text">{{item.label}}</span>
              <i :class="[item.icon, 'ICON mt_icon ab_center']"></i>
<!--              <div class="airIcon ab_center"></div>-->
            </li>
          </ul>
        </div>
      </div>
      <div class="waterQuality chart_bg">
        <chart-title :title="'地表水水质实时一览表'" w="0"/>
        <div class="mq-content">
          <div class="mq-listData">
            <TableComponent v-if="mq_spListList" :tableHeaderList="mq_headerList" :tableOption="mq_tableOption" :data="mq_spListList" :showNum="10"/>
          </div>
        </div>
      </div>
    </div>
    <div class="environment-center ">
      <div class="map">
        <toggleMap :id="'environment'"/>
        <div class="mapWarnTips">
          <Swiper :options="swiperOption"  v-if="[1,1,1,1,1,1]">
            <template v-for="(item, index) in ['1','1','1','1','1','1']">
              <swiper-slide :key="index">
                <WarnTips :msgForecast="item" />
              </swiper-slide>
            </template>
          </Swiper>
        </div>
      </div>
      <div class="riverPollution chart_bg">
        <chart-title :title="'河流断面、污水厂、水污染源预警预报轮播一览'" w="0"/>
        <div class="rp-content">
          <div class="tab-container">
            <div class="tab" @click="isSatellite=!isSatellite"></div>
            <ul class="tab-ul">
              <li :class="['tab-li', {activeLine:activeIndex===index}]" v-for="(item,index) in tabList" :key="index" @click="activeIndex=index">
                {{item}}</li>
            </ul>
          </div>
          <div class="rp-listData">
            <TableComponent v-if="rp_spListList" :tableHeaderList="rp_headerList" :tableOption="rp_tableOption" :data="rp_spListList" :showNum="5" />
          </div>
        </div>
      </div>
    </div>
    <div class="environment-right ">
      <div class="sewagePlant chart_bg">
        <chart-title :title="'污水厂进出水水质达标情况'" w="0"/>
        <div class="sp-content" v-if="waterweekObj.selectList">
          <div class="selectList">
            <SelectComponent
                    :selectList="waterweekObj.selectList"
                    :selectOptionStyle="selectOptionStyle"
                    :selectOption="waterweekObj.selectOption"
                    @changeSelectItemed="changeSelectItemed"
            />
          </div>
          <div class="chartInfo" v-if="chartlineXData">
            <basicLine  v-if="showBasicLine"  ref="Chartline" h="22vh" w="17.71vw" :x-data="chartlineXData" :y-data="chartlineYData" />
<!--            <component :is="Chartline"></component>-->
          </div>
        </div>
      </div>
      <div class="sewagePlant2 chart_bg">
        <chart-title :title="'污水厂进出水质达标情况'" class="p_0.52" w="0"/>
        <div class="sp2-content">
          <div class="selectBox">
            <div class="selectList f_r_between" v-if="waterquanlityObj.selectArr">
              <SelectComponent
                      :selectList="companyName"
                      :selectOptionStyle="selectOptionStyle"
                      :selectOption="companyName.selectOption"
                      @changeSelectItemed="changeSelectFactor"
                      />
              <SelectComponent
                      :selectList="kmNum"
                      :selectOptionStyle="selectOptionStyle"
                      :selectOption="kmNum.selectOption"
                      @changeSelectItemed="changeSelectRange"
              />
            </div>
          </div>
          <div class="sp-listData">
            <TableComponent v-if="sp_spListList" :tableHeaderList="sp_headerList" :tableOption="sp_tableOption" :data="sp_spListList" :showNum="12"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import basicMap from "../../components/basicMap";
  import ChartTitle from "../../components/ChartTitle";
  import basicLine from "../../components/basicLine";
  import WaterPolo from "../../components/WaterPolo";
  import SelectComponent from '../../components/common/SelectComponent'
  import TableComponent from "../../components/common/TableComponent";
  import basicPie from "../../components/basicPie";
  import ToggleMap from "../../components/toggleMap";
  import WarnTips from '../../components/warnTips'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import {forecast_swiperOption} from '../../components/common/swiperOption'
  import {
    rp_headerList_warn,rp_spListList,rp_tableOption,rp_headerList_forecast,
    mq_headerList,mq_spListList,mq_tableOption,
    sp_headerList,sp_spListList,sp_tableOption,
  } from './data.js'

  export default {
    name: "Environment",
    components: {
      ToggleMap,
      ChartTitle,
      basicLine,
      TableComponent,
      basicPie,
      WaterPolo,
      SelectComponent,
      WarnTips,
      Swiper,
      SwiperSlide
    },
    data() {
      return{
        swiperOption:JSON.parse(JSON.stringify(forecast_swiperOption)),
        activeIndex:0,
        tabList:['预警','预报'],
        // rp_headerList:rp_headerList_warn,
        rp_spListList:null,
        rp_tableOption:rp_tableOption,
        mq_headerList:mq_headerList,
        mq_spListList:null,
        mq_tableOption:mq_tableOption,
        sp_headerList:sp_headerList,
        sp_spListList:null,
        sp_tableOption:sp_tableOption,
        waterInfoObj: {}, //水环境概况描述
        waterInfoList:[],
        waterList: {},
        mt_pieList:[],
        waterweekSelect:[],
        selectItem: {},
        waterweekObj:{},
        wateralerttable:null,
        selectOptionStyle: {
          height: "2.31vh",
          lineHeight:"2.31vh",
          width: "7.81vw",
          padding:'0 0.5vw',
          boxSizing:'border-box',
          textAlign:'left'
        }, // 设置宽度和高度
        isSatellite:true,//切换卫星图和路网
        waterweekSelected:null,
        waterquanlityObj:{},
        companyName: [],
        kmNum:[],
        showBasicLine:false,
        factor:null,
        range:null
      }
    },
    computed: {
      rp_headerList: {
        get() {
          return this.rp_headerList = this.activeIndex === 0 ? rp_headerList_warn:rp_headerList_forecast
        },
        set(val) {}
      },
      chartlineXData: {
        get() {
          let obj = this.getMatchArr(this.waterweekObj.lineChart,this.waterweekSelected.label)
          return obj ? obj.xData : []
        },
        set(val) {}
      },
      chartlineYData: {
        get() {
          let obj = this.getMatchArr(this.waterweekObj.lineChart,this.waterweekSelected.label)
          return obj ? obj.yData : []
        },
        set(val) {}
      }
    },
    watch: {
      // activeIndex
      // waterweekSelected(val) {
      //   console.log('val',val)
      //   this.waterweekObj
      // },
      activeIndex(val) {
        console.log('val',val)
        if ( val === 0 ){
          if (!this.wateralerttable.earlyWarn) return
          //预警
          this.dataDispose(4,this.wateralerttable.earlyWarn,null,'warn')
        } else {
          if (!this.wateralerttable.prediction) return
          //预报
          console.log('this.wateralerttable',this.wateralerttable)
          this.dataDispose(4,this.wateralerttable.prediction,null,'forecast')
        }
      }
    },
    created() {
      this.initData()
      console.log()
      console.log(rp_tableOption);
      this.waterInfoList = [
        {
          label:'管网',
          icon:'pipeNetwork'
        },
        {
          label:'污水厂',
          icon:'sewagePlant'
        },
        {
          label:'入河排口',
          icon:'waterInlet'
        },
        {
          label:'污染源',
          icon:'source'
        }
      ]
      this.mt_pieList = [
        {
          label:'污水厂',
          icon:'mt_sewagePlant',
          pieOptions: {
            value:0
          }
        },
        {
          label:'江河',
          icon:'mt_river',
          pieOptions: {
            value:0
          }
        },
        {
          label:'饮用水',
          icon:'mt_waterInlet',
          pieOptions: {
            value:0
          }
        }
      ]
    },
    methods: {
      changeSelectItemed(val) {
          this.waterweekObj.currentSelected.label=val.label
          this.showBasicLine = false
          // this.waterweekObj.currentSelected.label='氨氮'

          this.$nextTick( ()=> {
            this.showBasicLine = true
          })
      },
      changeSelectFactor(val) {
        console.log(val)
        this.factor = val.value
        this.getWaterquanlitytable()
      },
      changeSelectRange(val) {
        console.log(val)
        this.range = val.value
        this.getWaterquanlitytable()
      },
      initData() {
        this.getWatersumaryall()
        this.getMonitoring()
        this.getWaterQuality()
        this.getWateralerttable()
        this.getWaterquanlitytable()
        this.getWaterweekchart()
      },
      getWatersumaryall() { //水环境概况描述
        this.$get('/i201watersumaryall').then(res => {
          if (res.code == 0) {
            this.waterInfoObj = res.data
            this.dataDispose(1,res.data.waterInfoList,this.waterInfoList)
          } else {
            console.log(res.err_msg)
          }
        })
      },
      getMonitoring() { //监测点位达标率
        this.$get('/i202inspectpassrate').then(res => {
          if (res.code == 0) {
            this.dataDispose(2,res.data.monitorList,this.mt_pieList)
          } else {
            console.log(res.err_msg)
          }
        })
      },
      getWaterQuality() {//地表水水质实时一览表
        this.$get('/i203waterquanlityreal').then(res => {
          if (res.code == 0) {
            // console.log(1)
            this.dataDispose(3,res.data)
          } else {
            console.log(res.err_msg)
          }
        })
      },
      getWateralerttable() {//河流断面、污水厂、水污染源预警预报轮播一览
        this.$get('/i204wateralerttable').then(res => {
          if (res.code == 0) {
            // console.log('轮播',res.data)
            this.wateralerttable = res.data
            if (!res.data.earlyWarn) return
            this.dataDispose(4,res.data.earlyWarn,null,'warn')
          } else {
            console.log(res.err_msg)
          }
        })
      },
      getWaterweekchart() { //污水厂进出水水质达标情况
        this.$get('/i205waterweekchart').then(res => {
          if (res.code == 0) {
            // console.log('水质达标情况',res.data)
            this.waterweekObj = res.data
            this.waterweekSelected = res.data.currentSelected
            this.waterweekObj.selectOption = {
              placeholder: res.data.currentSelected.label
            }
          } else {
            console.log(res.err_msg)
          }
          this.showBasicLine=true

        })
      },
      getWaterquanlitytable() { //污水厂进出水水质达标情况
        let params = {}
        if (this.factor) {
          params.factor = this.factor
        }
        if (this.range) {
          params.range = this.range
        }
        this.$get('/i206waterquanlitytable',params).then(res => {
          if (res.code == 0) {
            // console.log('res.data',res.data)
            this.waterquanlityObj = res.data
            this.companyName = res.data.selectArr[0].selectList
            this.kmNum = res.data.selectArr[1].selectList
            this.companyName.selectOption = {
              placeholder:  res.data.selectArr[0].currentSelected.label
            }
            this.kmNum.selectOption = {
              placeholder:  res.data.selectArr[1].currentSelected.label
            }
            this.dataDispose(6,res.data.quanlitytable)
          } else {
            console.log(res.err_msg)
          }
        })
      },
      //数据结构处理
      dataDispose(index,data,arr,type) {
        if (index==1||index==2) {
          data.forEach(item => {
            arr.forEach(subItem => {
              if (item.label===subItem.label&&index==1) {
                subItem.value = item.value
              }
              if (item.label===subItem.label&&index==2) {
                subItem.pieOptions.value = item.value
              }
            })
          })
        }else if(index==3||index==4||index==6) {
          let newArr = []
          data.forEach((item,i) => {
            if(index==3) {
              let subarr = [i+1,item.name,item.waterStyle,item.aimStyle,item.isReach]
              newArr.push(subarr)
            } else if(index==4){
              let subarr
              if (type==='warn'){
                subarr = [i+1,item.name,item.factor,item.description,item.style,item.startTime,item.endTime]
              }else if(type==='forecast') {
                subarr = [i+1,item.name,item.factor,item.style,item.startTime,item.endTime,item.executor,item.taskStyle,item.taskLevel]
              }
              newArr.push(subarr)
            } else if(index==6) {
              let subarr = [i+1,item.name,item.pollutionGrade,item.drainOutletGrade,item.feature,item.mainThing]
              newArr.push(subarr)
            }
          })
          if(index==3) {
            this.mq_spListList = newArr
          } else if(index==4) {
            this.rp_spListList = newArr
          } else if(index==6) {
            this.sp_spListList = newArr
          }
        }
      },
      getMatchArr(arr,key) {
        // console.log(arr)
        for (let i = 0;i<arr.length ; i++) {
          if (arr[i].lineLabel === key) {
            return arr[i]
          }
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .environment{
    display: flex;
    justify-content: space-between;
    height: 93.8vh;
    padding: 2.31vh 1.04vw 2.56vh;
    box-sizing: border-box;
    font-family: SourceHanSansCN-Regular;
    &-basicMap{
      width: 100%;
      height: 100%;
      position: absolute;
      top: -9.5%;
    }
    .chartInfo{
      padding-top: 1.67vh;
    }
  }
  .environment-left,.environment-right{
    display: flex;
    flex-direction: column;
    width: 18.75vw;
  }
  .environment-center{
    position: relative;
    width: 58.28vw;
    .map{
      position: relative;
      width: 100%;
      height: 52vh;
      .chartNav{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 9;
      }
      .mapWarnTips{
        height: 2.96vh;
        margin-top: 2vh;
      }
    }
    .riverPollution{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 1.85vh 1vw 0;
      background-color: rgba(4, 11, 39, 0.6);
      box-sizing: border-box;
    }
  }
  .waterDescribe,.monitoring,.sewagePlant{

    margin-bottom: 1.85vh;
    box-sizing: border-box;
  }
  /*卡片的高度*/
  .waterDescribe{
    height: 25.28vh;
  }
  .monitoring{
    height: 16.3vh;
  }
  .waterQuality{
    height: 43.61vh;
  }
  .riverPollution{
    height: 30.09vh;
  }
  .sewagePlant{
    height: 31.48vh;
  }
  .sewagePlant2{
    height: 55.56vh;
  }

  .chart_bg{
    padding: 0 1.04vw;
    background-color: rgba(4, 11, 39, 0.6);
  }
  .tab-container{
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    .tab{
      position: absolute;
      left: 0;
      bottom: 0;
      margin-bottom: 0.83vh;
      width: 0.89vw;
      height: 0.89vw;
      border: solid 0.05vw rgba(255, 255, 255, 1);
      opacity: 0.5;
      &:before{
        content: '';
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width: 0.21vw;
        height: 0.21vw;
        background-color: rgba(255, 255, 255, 1);
      }
    }
    .tab-ul {
      display: flex;
      .tab-li{
        margin-left: 1.67vw;
        line-height: 3.2vh;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5);
      }
      .activeLine{
        position:relative;
        color: #fff;
        &:after{
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 1.41vw;
          height: 2px;
          background-color: rgba(0, 154, 255, 1);
        }
      }
    }
  }

  .waterInfo{
    .wl-ul{
      .wl-item{
        margin-right:  2.83vw;
        margin-bottom: 2.22vh;
        color: #fff;
        &:nth-child(2),&:nth-child(4){
          margin-right:0;
        }
        &:nth-child(3),&:nth-child(4){
          margin-bottom:2.04vh
        }
        .text{
          width: 5.1vw;
          height: 1.35vw;
          margin-left: 0.47vw;
          border-bottom: solid 0.2vh rgba(255,255,255,0.3);
        }
      }
    }
    .waterPolo{
      display: flex;
      justify-content: space-between;
      font-size: 0.63vw;
      line-height: 1.02vh;
      color: rgba(255, 255, 255, 0.5);

      .polo{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6vw;
        height: 9vh;
        margin-bottom: 2.04vh;
        /*background-color: rgba(15, 19, 32, 0.8);*/
        .poloBox{
          width: 4.06vw;
          height: 4.06vw;
          background-size: 100% 100%;
          margin: 1vh 0 0 1vw;
          background-repeat: no-repeat;
          background-image: url("../../assets/image/environment/circle@2x.png");
        }
        .gradeText{
          position: absolute;
          right: 0;
          top: 0;
          width: 2vw;
          height: 3vh;
          line-height: 3vh;
          text-align: left;
          transform: translate(2.4vw, 2.8vh);
          color: #fff;
          font-size: 0.63vw;
          &:before{
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-0.36vw,1.2vh);
            content:'';
            display: inline-block;
            width: 0.36vw;
            height: 0.19vh;
            background-color: rgba(0, 154, 255, 1);
          }
        }
      }
      .bg_img{
        position: absolute;
        right: -0.25vw;
        top: -0.2vh;
        width: 3.9vw;
        height: 9.5vh;
        background-size: 100%;
        background-repeat: no-repeat;
        background-image: url("../../assets/image/environment/scale@3x.png");
      }
      .text{
        font-size: 1vw;
        line-height: 4.44vh;
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .mt-content{
    margin-top: 1.5vh;
    .mt-ul{
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
  }

  /*设置列表的间隔颜色*/
  /*.mq-listData{*/
  /*  background: red;*/
  /*  .proportionTableTr{*/
  /*    background: blue;*/
  /*  }*/
  /*}*/

  /*base*/
  /*.p_lr{*/
  /*  padding: 0 1.04vw;*/
  /*}*/
  .sewagePlant{
    padding:0 0.52vw;
    .waterSituation{
      padding: 0 0.52vw;
      box-sizing: border-box;
    }
    .sp-content .selectList{
      padding: 0 0.52vw;
    }
  }
  .sewagePlant2{
    padding: 0 0.5vw;
    .waterSituation{
      padding: 0 0.52vw;
      box-sizing: border-box;
    }
    .sp2-content .selectBox{
      padding: 0 0.52vw;
      box-sizing: border-box;
    }
  }
  /*  icon*/
  .wl-icon{
    width: 1.35vw;
    height: 1.35vw;
  }
  .pipeNetwork_icon{
    background-image: url("../../assets/image/environment/pipeNetwork@3x.png");
  }
  .sewagePlant_icon{
    background-image: url("../../assets/image/environment/sewagePlant@3x.png");
  }
  .waterInlet_icon{
    background-image: url("../../assets/image/environment/waterInlet@3x.png");
  }
  .source_icon{
    background-image: url("../../assets/image/environment/source@3x.png");
  }
  .mt_icon{
    width: 1.88vw;
    height: 1.88vw;
  }
  .mt_river{
    background-image: url("../../assets/image/environment/mt_river.png");
  }
  .mt_sewagePlant{
    background-image: url("../../assets/image/environment/mt_sewagePlant.png");
  }
  .mt_waterInlet{
    background-image: url("../../assets/image/environment/mt_waterInlet.png");
  }
  .ab_center{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>

<style scoped lang="scss">
  .swiper-container{
    height: 100%;
    .swiper-slide{
      display: flex;
      align-items: center;
    }
  }
</style>