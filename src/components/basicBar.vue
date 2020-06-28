<template>
    <v-chart :options="charOptions"  ref="instance" autoresize  :style="style"></v-chart>
</template>

<script>
    import ECharts from 'vue-echarts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/component/legend';
    import {mapGetters} from 'vuex';
    export default {
        name: "basicBar",
        components: {
            'v-chart': ECharts
        },
        props: {
            w: String,
            h: String,
            yDataArr:Object
        },
        data() {
            return {
                yData_1:[20, 30, 20, 30, 20, 30, 20, 30, 20, 30,10,20],
                yData_2:[9, 30, 9, 60, 70, 20, 59, 20, 49, 20, 30,10],
                yData_3:[20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 30, 20],
                yData_4:[9, 30, 9, 60, 70, 20, 59, 20, 49, 20, 20, 30],
                yData_5:[9, 30, 9, 60, 70, 20, 59, 20, 49, 20, 20, 30],
                yData_6:[20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30],
                datacity:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                status:['优', '良', '轻度', '中度', '重度', '严重'],
                color:['rgb(0,255,134)', 'rgb(0,154,255)', 'rgb(255,228,0)', 'rgb(254,125,68)', 'rgb(255,91,94)', 'rgb(217,10,10)'],
            }
        },
        computed: {
            style() {
                let str = ''
                if (this.w) {
                    str += `width:${this.w};`
                }
                if (this.h) {
                    str += `height:${this.h};`
                }
                return str
            },
            ...mapGetters('index',{
                vwToPx:'vwToPx'
            }),
            charOptions(){
                let self=this
               let options = {
                    color: this.color,
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        show:true,
                        top: '2%',
                        textStyle:{
                            color:'rgba(255,255,255,0.5)',
                            fontSize:this.vwToPx(0.63)
                        },
                        itemWidth:this.vwToPx(0.52),
                        itemHeight:this.vwToPx(0.52),
                        left:'5%',
                        data: self.status,
                    },
                    grid: { //图表的位置
                        top: '20%',
                        left: '3%',
                        right: '4%',
                        bottom: '5%',
                        containLabel: true
                    },
                    yAxis: [{
                        type: 'value',
                        axisLine:{  //X轴颜色
                            lineStyle:{
                                color: new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(255, 255, 255,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,0.5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 255, 255,1)'
                                }]),
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            formatter: '{value} ',
                            textStyle: {
                                fontSize: 10,
                                color: '#fff'
                            },
                        },
                        axisTick:{  //刻度
                            show:false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'solid',
                                color:'rgba(255,255,255,0.1)'
                            }
                        },
                        show: true

                    }],
                    xAxis: [{
                        type: 'category',
                        axisLine:{  //X轴颜色
                            lineStyle:{
                                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgba(255, 255, 255,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,0.5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 255, 255,1)'
                                }]),
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            show: true,
                            splitNumber: 15,
                            textStyle: {
                                fontSize: 10,
                                color: '#fff'
                            },
                        },
                        splitLine:{},
                        axisTick:{  //刻度
                            show:false
                        },
                        data: self.datacity,
                    }],
                    series: [{
                        name: '优',
                        type: 'bar',
                        stack: 'sum',
                        barWidth: this.vwToPx(0.31),
                        data: this.yDataArr.yData_1
                    },
                        {
                            name: '良',
                            type: 'bar',
                            barWidth: this.vwToPx(0.31),
                            stack: 'sum',
                            data: this.yDataArr.yData_2,

                        },
                        {
                            name: '轻度',
                            type: 'bar',
                            stack: 'sum',
                            barWidth: this.vwToPx(0.31),
                            data:this.yDataArr.yData_3

                        },
                        {
                            name: '中度',
                            type: 'bar',
                            stack: 'sum',
                            barWidth: this.vwToPx(0.31),
                            data: this.yDataArr.yData_4
                        },{
                            name: '重度',
                            type: 'bar',

                            stack: 'sum',
                            barWidth: this.vwToPx(0.31),
                            data: this.yDataArr.yData_5

                        },{
                            name: '严重',
                            type: 'bar',
                            stack: 'sum',
                            barWidth: this.vwToPx(0.31),
                            data: this.yDataArr.yData_6
                        },
                    ]
                };
               return options
            },
        },
        created() {

        }
    }
</script>

<style scoped>

</style>