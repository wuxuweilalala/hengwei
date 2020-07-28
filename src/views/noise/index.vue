<template>
  <div class="noise" >
    <page-layout :height_l="'61.11vh'" :height_c="'61.11vh'" :height_r="'61.11vh'">
      <div slot="pageLeft" class="pl-container">
        <!--        监测区域内噪声监测整体概况-->
        <div class="airQuality bg_c lineshadow" v-if="showAQI">
          <chart-title :title="'超标工地占比情况'" w="60%"/>
          <div class="waterPolo flex">
            <div class="polo">
              <div class="poloBox">
                <WaterPolo w="4.06vw" h="4.06vw" :value="airQualityObj.noiseChartVal" :text="airQualityObj.noiseGrade"/>
              </div>
              <div class="bg_img"></div>
              <div class="gradeText">{{airQualityObj.noiseGrade}}</div>
            </div>
            <div class="area f_column">
              <span class="text">{{airQualityObj.noiseChartVal}}dB</span>
              <span>超标工地数量</span>
            </div>
            <div class="source f_column">
              <span class="text">{{airQualityObj.noiseRealVal}}dB</span>
              <span>已做信访数量</span>
            </div>
          </div>
          <TerritoryClass  v-if="airQualityObj"  :airQualityObj="airQualityObj" />
        </div>
        <!--         监测区域内噪声等级占比情况-->
        <div class="areaWarnInfo bg_c lineshadow">
          <chart-title :title="'监测区域内噪声等级占比情况'" w="60%"/>
          <ul v-if="airGradeList" class="areaWarn-ul">
            <Swiper :options="swiperOption"  v-if="airGradeList.length>5">
              <template v-for="(item,index) in airGradeList">
                <swiper-slide>
                  <li class="pictorialBarItem"  :key="index">
                    <div class="f_r_between">
                      <div>{{item.areaName}}</div>
                      <div>{{item.valDB}}</div>
                    </div>
                    <PictorialBar :val="item.rate" :grade="item.grade"/>
                  </li>
                </swiper-slide>
              </template>
            </Swiper>
            <template v-else>
                <li class="pictorialBarItem"  v-for="(item,index) in airGradeList" :key="index">
                  <div class="f_r_between">
                    <div>{{item.areaName}}</div>
                    <div>{{item.valDB}}</div>
                  </div>
                  <PictorialBar :val="item.rate" :grade="item.grade"/>
                </li>
            </template>
          </ul>
        </div>
      </div>
      <div slot="pageCenter" class="pc-container">
        <!--        地图-->
          <toggleMap   :id="'noise'"/>
      </div>
      <div slot="pageRight" class="pr-container" v-if="showTable">
        <!--        噪声监测实时数据-->
        <div class="noisedata_real bg_c lineshadow">
          <chart-title :title="'噪声监测实时数据'" w="40%"/>
          <TableComponent :tableHeaderList="nr_headerList" :tableOption="tableOption_2" :data="nr_spListList" :showNum="6"/>
        </div>
        <!--        功能区噪声标准及实际监测情况对照-->
        <div class="noiseContrast bg_c lineshadow">
          <chart-title :title="'功能区噪声标准及实际监测情况对照'" w="40%"/>
          <TableComponent :tableHeaderList="nc_headerList" :tableOption="tableOption_1" :data="nc_spListList" :showNum="5"/>
        </div>
      </div>
    </page-layout>
    <div class="noise-bottom f_r_between" v-if="showTable">
      <div class="warnInfo bg_c lineshadow">
        <!--        噪声超标预警信息-->
        <chart-title :title="'噪声超标预警信息'" w="10%"/>
        <TableComponent :tableHeaderList="wi_headerList" :tableOption="tableOption" :data="wi_spListList" :showNum="5"/>
      </div>
      <div class="forecastInfo bg_c lineshadow">
        <!--        噪声超标响应信息-->
        <chart-title :title="'噪声超标响应信息'" w="10%"/>
        <TableComponent :tableHeaderList="fi_headerList" :tableOption="tableOption" :data="fi_spListList" :showNum="5"/>
      </div>
    </div>
    <Loading :requst-num="3" :loadings="loadings"></Loading>
  </div>
</template>

<script>
// @ is an alias to /src
import pageLayout from "../../components/pageLayout";
import ChartTitle from "../../components/ChartTitle";
import TableComponent from "../../components/common/TableComponent";
import WaterPolo from "../../components/WaterPolo";
import {
  fi_headerList,wi_headerList,nc_headerList,nr_headerList,tableOption,tableOption_1,tableOption_2
} from './data'
import TerritoryClass from "../../components/TerritoryClass";
import PictorialBar from "../../components/PictorialBar";
import Popup from "../../components/Popup";
import toggleMap from "../../components/toggleMap";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import {noise_swiperOption} from '../../components/common/swiperOption'
import Loading from '../../components/loading';


export default {
  name: "Noise",
  components: {
    PictorialBar,
    TerritoryClass,
    pageLayout,
    ChartTitle,
    TableComponent,
    WaterPolo,
    Popup,
    toggleMap,
    Swiper,
    SwiperSlide,
    Loading,
  },
  data() {
    return {
      swiperOption:JSON.parse(JSON.stringify(noise_swiperOption)),
      fi_headerList:fi_headerList,
      wi_headerList:wi_headerList,
      nc_headerList:nc_headerList,
      nr_headerList:nr_headerList,
      tableOption:tableOption,
      tableOption_1:tableOption_1,
      tableOption_2:tableOption_2,
      nr_spListList:[],
      nc_spListList:[],
      wi_spListList:[],
      fi_spListList:[],
      airQualityObj: null,
      airGradeList:null,
      airQualityTable:null,
      showAQI:false,
      showTable:false,
      loadings: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.getNoiseOverview()
      this.getProportion()
      this.getEarlyWarning()
    },
    getNoiseOverview() {
      this.$get('/i501NoiseOverview').then(res => {
        // console.log(res)
        if (res.code == 0) {
          this.airQualityObj =  res.data
          this.loadings.push(true)
          // this.dataDispose(1,res.data.aqiRankTable)
          console.log('res.data',res.data)
        } else {
          // console.log(res.err_msg)
        }
        this.showAQI=true
      })
    },
    getProportion() {
      this.$get('/i502NoiseGradeProportion').then(res => {
        if (res.code == 0) {
          this.loadings.push(true)

            // this.airQualityObj =  res.data
          // this.dataDispose(1,res.data.aqiRankTable)
          this.airGradeList = res.data
          // console.log('this.airGradeList',this.airGradeList)
        } else {
          console.log(res.err_msg)
        }
      })
    },
    getEarlyWarning() {
      this.$get('/i503NoiseEarlyWarning').then(res => {
        if (res.code == 0) {
          this.loadings.push(true)

          this.airQualityTable =  res.data
          this.dataDispose()
          this.showTable = true

          console.log(this.airQualityTable)
        } else {
          console.log(res.err_msg)
        }
      })
    },
    dataDispose() {
      let nr = this.airQualityTable.noiseRealTable
      let nc = this.airQualityTable.noiseContrastTable
      let wi = this.airQualityTable.noiseWarnTable
      let fi = this.airQualityTable.noiseForecastTable

      this.nr_spListList = this.matchArr(nr,0)
      this.nc_spListList = this.matchArr(nc,1)
      this.wi_spListList = this.matchArr(wi,2)
      this.fi_spListList = this.matchArr(fi,3)
      // console.log('this.nr_spListList ',this.wi_spListList )
    },
    matchArr(arr,index) {
      let newarr = []
      arr.forEach((item,i) => {
        // console.log('item',item)
        if (index==0) {
            let subArr = [i+1,item.name,item.value,item.humidity,item.startTime]
            newarr.push(subArr)
        } else if (index==1) {
            let subArr =[i+1,item.classType,item.standard,item.realVal,item.isStandard]
            newarr.push(subArr)
        } else if (index==2) {
            let subArr = [i+1,item.name,item.factor,item.detectionVal,item.style,item.startTime,item.endTime]
            newarr.push(subArr)
        } else if (index==3) {
            let subArr =[i+1,item.name,item.style,item.startTime,item.endTime,item.executor,item.taskStle,item.taskGrade]
            newarr.push(subArr)
        }
      })
      return newarr
    }
  }
};
</script>
<style scoped lang="scss">
  .noise{
    width: 100%;
    padding: 2.3vh 1vw 2.5vh;
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
    height: 33.8vh;
  }
  .areaWarnInfo{
    width: 100%;
    height: 25.83vh;
  }
  .airForecast{
    width: 100%;
    height: 24.07vh;
  }
  .noisedata_real{
    width: 100%;
    height: 29.91vh;
  }
  .noiseContrast{
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
    height: 60vh;
    position: relative;
  }
  .noise-bottom{
    margin-top:2.5vh;
    height:25.3vh;
    .warnInfo{
      width: 45.31vw;
      height: 100%;
    }
    .forecastInfo{
      width: 51.51vw;
      height: 100%;
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
      height: 7.5vh;
      margin-bottom: 2.04vh;
      /*background-color: rgba(15, 19, 32, 0.8);*/
      .poloBox{
        width: 4.06vw;
        height: 4.06vw;
        background-size: 100% 100%;
        margin: 0.5vw 0 0 1vw;
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
        transform: translate(2.4vw, 2vh);
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
  .pictorialBarItem{
    margin-top: 0.48vh;
    color:#fff
  }
.areaWarn-ul{
  height: 21vh;
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
