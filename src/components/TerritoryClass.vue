<template>
    <div class="territory">
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
        <div class="f_center chart" v-if="classStyle==1">
            <!--        左侧-->
            <div class="left f_c_center">
                <ul class="leftSide">
                    <li v-for="(item,index) in districtList" :key="index" >
                        <template v-if="index%2==0">
                            {{item.label}} {{item.value}}
                        </template>
                    </li>
                </ul>
                <div class="left_bg"></div>
            </div>
            <!--        中间饼图-->
            <div class="pie f_center">
                <div >
                    <basicPieIII  w="3.49vw" h="3.49vw" :value="classObj.value" :rate="classObj.rate"  :areaName="classObj.label" chartStyle="2"/>
                </div>
            </div>
            <!--        右侧-->
            <div class="right  f_c_center">
                <div class="right_bg"></div>
                <ul class="rightSide">
                    <li v-for="(item,index) in districtList" :key="index">
                        <template v-if="index%2!=0">
                            {{item.label}} {{item.value}}
                        </template>
                    </li>
                </ul>
            </div>
        </div>
        <div class="condition f_c_center" v-else>
            <div class="pie f_center">
                <div>
                    <basicPieIII  w="3.49vw" h="3.49vw" :value="classObj.value" :rate="classObj.rate"  :areaName="classObj.label" chartStyle="2"/>
                </div>
            </div>
            <div class="data ">
                <div class="suspiciousDot">
                    <div class="iconName flex">
                        <i :class="[`${isWork?'workingIcon':'normalDotIcon'}`,'ICON']"></i>
                        <div class="text f_r_between">
                            <span>{{isWork?'正常工作点位':'正常监测点位'}}</span>
                            <span class="num">{{subclassObj.normal}}个</span>
                        </div>
                    </div>
                </div>
<!--                <div class="normalDot"></div>-->
                <div class="normalDot">
                    <div class="iconName flex">
                        <i :class="[`${isWork?'stopworkIcon':'suspiciousDotIcon'}`,'ICON']"></i>
                        <div class="text f_r_between">
                            <span>{{isWork?'已停工点位':'可疑监测点位'}}</span>
                            <span class="num">{{subclassObj.suspicious}}个</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicPieIII from './basicPieIII'
    import DropDownComponent from "./common/DropDownComponent";

    export default {
        name: "TerritoryClass",
        components: {
            basicPieIII,
            DropDownComponent
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
                        label:'工作状态'
                    },
                    {
                        label:'监控情况'
                    },
                    {
                        label:'监控类型'
                    }
                ],
                classStyle: 1,
                isWork:true,
                classObj: {},
                subclassObj:{}
            }
        },
        // computed: {
        //   workObj: {
        //       get() {
        //           return
        //       }
        //   }
        // },
        created() {
            this.districtList = this.airQualityObj.noiseAreaObj.list
            this.classObj = this.airQualityObj.noiseAreaObj
            // this.subclassObj
            console.log(this.districtList)
            // this.districtObj = this.dropdownList[0]
        },
        methods: {
            changeSelectItemed(val) {
                console.log(val)
                this.classStyle = val.label === '地域分类' || val.label === '监控类型' ? 1 : 2
                this.isWork = val.label === '工作状态'
                if (val.label === '地域分类') {
                    this.districtList = this.airQualityObj.noiseAreaObj.list
                } else if(val.label === '监控类型') {
                    this.districtList = this.airQualityObj.noiseClassObj.list
                }else if(val.label === '监控情况') {
                    this.subclassObj = this.airQualityObj.situation
                }else if(val.label === '工作状态') {
                    this.subclassObj = this.airQualityObj.workClass
                }
            },
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
    .condition{
        position: relative;
        /*height: 16.02vh;*/
        .pie{
            position: relative;
            width: 4.01vw;
            height: 4.01vw;
            margin-top: 4vh;
            /*margin: 0 2.81vw;*/
            background-image: url("../assets/image/effluent/地域分类图表装饰@3x.png");
            background-size: 100% 100%;
        }
        .data{
            margin-top: 4vh;
            margin-left: 2.6vw;
            .suspiciousDot,.normalDot{

                width: 8.96vw;
                height: 2.5vh;
                line-height: 2.5vh;
                color: #fff;
                .text{
                    width: 7.14vw;
                    margin-left: 0.42vw;
                    border-bottom: 1px solid rgba(255,255,255,0.3);

                }
            }
            .normalDot{
                margin-top: 2.13vh;
                .num{
                    color: rgba(0, 154, 255, 1);
                }
            }
            .suspiciousDot{
                .num{
                    color: rgba(255, 37, 55, 1);

                }
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
    .suspiciousDotIcon{
        width: 1.41vw;
        height: 1.41vw;
        background-image: url("../assets/image/suspiciousDot@3x.png");
    }
    .normalDotIcon{
        width: 1.41vw;
        height: 1.41vw;
        background-image: url("../assets/image/normalDot@3x.png");
    }
    .stopworkIcon{
        width: 1.41vw;
        height: 1.41vw;
        background-image: url("../assets/image/stopwork@3x.png");
    }
    .workingIcon{
        width: 1.41vw;
        height: 1.41vw;
        background-image: url("../assets/image/working@3x.png");
    }
    /*.rightSide{*/
    /*    display: flex;*/
    /*    flex-direction: row-reverse*/
    /*}*/
</style>