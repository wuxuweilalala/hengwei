<template>
    <div class="f_center chart">
        <!--        左侧-->
        <div class="left f_c_center">
            <ul class="leftSide">
                <li v-for="(item,index) in districtList.list" :key="index" >
                    <template v-if="index%2==0">
                        {{item.label}} {{item.value}}
                    </template>
                </li>
            </ul>
            <div class="left_bg"></div>
        </div>
        <!--        中间饼图-->
        <div class="pie f_center">
            <div>
                <basicPieIII  w="3.49vw" h="3.49vw"
                              :value="districtList.value"
                              :rate="parseInt(districtList.rate)"
                              :areaName="districtList.label"
                              chartStyle="2"
                />
            </div>
        </div>
        <!--        右侧-->
        <div class="right  f_c_center">
            <div class="right_bg"></div>
            <ul class="rightSide">
                <li v-for="(item,index) in districtList.list" :key="index">
                    <template v-if="index%2!=0">
                        {{item.label}} {{item.value}}
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import basicPieIII from "./basicPieIII";
    export default {
        name: "MonitorCardII",
        components: {
            basicPieIII
        },
        props: {
            districtList:Object,
            classObj:Object
        },
      mounted(){
        //   console.log(this.classObj)
        // console.log(this.districtList)
      }
    }
</script>

<style scoped lang="scss">
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
