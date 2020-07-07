<template>
    <div class="territory" v-if="airQualityObj">
        <div class="regionTitle">
            <div v-if>
                <DropDownComponent
                        :dropdownList="classList"
                        :dropdownOptionListStyle="dropdownOptionListStyle"
                        :isNoDown="isNoDown"
                        @changeSelectItemed="changeSelectItemed"
                ></DropDownComponent>
            </div>
        </div>
        <Swiper :options="swiperOption" >
            <swiper-slide >
                 <MonitorCardII
                         :districtList="districtList"
                         :classObj="classObj"
                 />
            </swiper-slide>
            <template v-for="(item,index) in [1]">
                <swiper-slide :key="index">
                    <MonitorCard :styleObj="{marginTop:'4vh'}"
                                 :classObj="classObj"
                                 :subclassObj="subclassObj"
                                 :isWork="isWork"
                    />
                </swiper-slide>
            </template>
        </Swiper>
    </div>
</template>

<script>
    // import swiper from './common/Swiper'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import {territory_swiperOption} from './common/swiperOption'
    import basicPieIII from './basicPieIII'
    import DropDownComponent from "./common/DropDownComponent";
    import MonitorCard from './MonitorCard'
    import MonitorCardII from "./MonitorCardII";
    export default {
        name: "TerritoryClass",
        components: {
            MonitorCardII,
            basicPieIII,
            DropDownComponent,
            Swiper,
            SwiperSlide,
            MonitorCard
        },
        props: {
            isNoDown: {
                type:Boolean,
                default:false
            },
            // dropdownList:Array,
            airQualityObj:Object
        },
        data(){
            return {
                swiperOption:territory_swiperOption,
                dropdownOptionListStyle: {
                    marginLeft: '1.2vw'
                },
                districtList: [],
                districtObj:null,
                classList: [
                    {
                        label:'地域分类'
                    },
                    {
                        label:'工作状况'
                    },
                    {
                        label:'监控情况'
                    },
                    // {
                    //     label:'监控类型'
                    // }
                ],
                classStyle: 1,
                classObj:{},
                subclassObj:{},
                isWork:false
            }
        },
        created() {
            this.districtList = this.airQualityObj.noiseAreaObj.list
            this.classObj = this.airQualityObj.noiseAreaObj
            this.situationObj = this.airQualityObj.situation
        },
        methods: {
            changeSelectItemed(val) {
                // console.log(val)
                this.classStyle = val.label === '地域分类' || val.label === '监控类型' ? 1 : 2
                this.isWork = val.label === '工作状况'
                if (val.label === '地域分类') {
                    this.districtList = this.airQualityObj.noiseAreaObj.list
                } else if(val.label === '监控类型') {
                    this.districtList = this.airQualityObj.noiseClassObj.list
                }else if(val.label === '监控情况') {
                    this.subclassObj = this.airQualityObj.situation
                }else if(val.label === '工作状况') {
                    this.subclassObj = this.airQualityObj.workClass
                }
            },
        },
        mounted() {
            this.$nextTick(() => {
                let echarts = document.getElementsByClassName('echarts')
                for(var i=0;i<echarts.length;i++){
                    var myChart = echarts.init(echarts[i]);
                    myChart.setOption(option);
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .regionTitle {
        /*width: 18.75vw;*/
        margin: 0.93vh 0 0 0;
        position: relative;
        border-bottom: 1px solid rgba(255,255,255,0.3);

        > div:nth-child(1) {
        width: 16.82vw;
        height: 2.41vh;
        display: flex;
        margin: 0 auto;
        font-size: 1.3vh;
        font-weight: normal;
        font-stretch: normal;
        color: #ffffff;
        background: url("../assets/image/effluent/标题装饰 1@3x.png");
        background-size: 100% 100%;
        line-height: 1.8vh;

    }
    }
    .territory {
        .chart{
            height: 16.02vh;
            .left,.right{
                position: relative;
                width: 6vw;
                height: 12.41vh;
                color: #fff;
            }
            .right{
                display: flex;
                flex-direction: row-reverse
            }
            .pie{
                position: relative;
                width: 4.01vw;
                height: 4.01vw;
                /*margin: 0 2.81vw;*/
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url("../assets/image/effluent/地域分类图表装饰@3x.png");
                background-size: 100% 100%;
            }
        }
    }
    .left_bg{
        position: absolute;
        right: 0;
        top: 0;
    }
    .right_bg{
        position: absolute;
        left: 0;
        top: 0;
    }
    .left_bg,.right_bg{
        width: 1.56vw;
        height: 12.41vh;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        li{
            padding-right: 2.81vw;
        }
    }
    .left_bg{
        /*padding-right: 2.81vw;*/
        background-image: url("../assets/image/effluent/左@3x.png");

    }
    .right_bg{
        /*padding-left: 2.81vw;*/
        background-image: url("../assets/image/effluent/右@3x.png");
    }
    .leftSide,.rightSide{
        display: flex;
        white-space: nowrap;
        flex-direction: column;
        >li {
            line-height: 2.75vh;
        }
        /*margin-right: 2vw;*/
        font-size: 0.63vw;
        line-height: 2.5vh;
    }
</style>