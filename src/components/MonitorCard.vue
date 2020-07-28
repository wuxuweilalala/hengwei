<template>
    <div class="condition f_c_center" :style="{...styleObj}">
        <div class="pie f_center">
            <div>
                <basicPieIII  w="3.49vw" h="3.49vw"
                              :value="subclassObj.value"
                              :rate="parseInt(subclassObj.rate)"
                              :areaName="subclassObj.label"
                              chartStyle="2"
                />
            </div>
        </div>
        <div class="data ">
            <div class="suspiciousDot">
                <div class="iconName flex">
                    <i :class="[`${isWork?'workingIcon':'normalDotIcon'}`,'ICON']"></i>
                    <div class="text f_r_between">
                        <span>{{isWork?'正常工作点位':'在线企业'}}</span>
                        <span class="num">{{subclassObj.normal}}个</span>
                    </div>
                </div>
            </div>
            <!--                <div class="normalDot"></div>-->
            <div class="normalDot">
                <div class="iconName flex">
                    <i :class="[`${isWork?'stopworkIcon':'suspiciousDotIcon'}`,'ICON']"></i>
                    <div class="text f_r_between">
                        <span>{{isWork?'已停工点位':'达标企业'}}</span>
                        <span class="num">{{subclassObj.suspicious}}个</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicPieIII from './basicPieIII'

    export default {
        name: "MonitorCard",
        components: {
            basicPieIII,
        },
        props: {
            classObj:Object,
            subclassObj:Object,
            isWork:Boolean,
            styleObj:Object
        },
        data() {
            return {
            }
        },
        mounted(){
          // console.log(this.classObj)
            // console.log(this.districtList)
        }
    }
</script>

<style scoped lang="scss">
    .condition{
        position: relative;
        /*height: 16.02vh;*/
        .pie{
            position: relative;
            width: 4.01vw;
            height: 4.01vw;
            /*margin-top: 2vh;*/
            /*margin: 0 2.81vw;*/
            background-image: url("../assets/image/effluent/地域分类图表装饰@3x.png");
            background-size: 100% 100%;
        }
        .data{
            /*margin-top: 2vh;*/
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
</style>
