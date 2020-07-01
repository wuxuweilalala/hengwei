<template>
    <div class="tablePage">
        <div class="header">
            <div class="back pointer" @click="$router.go(-1)"></div>
            <div class="tableNav f_r_center">
                <div :class="['responseBtn pointer', {active:currIndex==0}]" @click="currIndex=0">应急响应</div>
                <div :class="['operation pointer', {active:currIndex==1}]"  @click="currIndex=1">日常运维</div>
            </div>
        </div>
        <div class="tableList" v-if="tableObj">
            <div class="container">
                <TableComponent
                        :tableHeaderList="tableHeader"
                        :tableOption="tableOption"
                        :data="tableList"
                        :taskClass="taskClass"
                        @filtrateClass="filtrateClass"
                />
            </div>
        </div>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page="pageNum"
                @current-change="pageTurning"
        >
        </el-pagination>
    </div>
</template>

<script>
    import TableComponent from "../../components/common/TableComponent";

    export default {
        name: "index",
        components: {
            TableComponent
        },
        computed: {
            tableHeader: {
                get() {
                    return this.currIndex === 0 ? [...this.table,...this.operationTable] : [...this.table,...this.emergencyTable]
                },
                set(val) {}
            },
        },
        created() {
            this.getData()
            console.log(this.$route.query.style)
        },
        watch: {
            currIndex() {
                this.setTableList()
            }
        },
        methods: {
            filtrateClass(val) {
                console.log('aaaaaaaaa',val)
                this.isFirstNO = !this.isFirstNO
                if (this.isFirstNO) return
                this.pageNum = 1
                this.getData(val)
            },
            setTableList() {
                this.tableList = this.currIndex === 0 ? this.emergencyTableData : this.operationTableData
            },
            pageTurning(val) {
                this.pageNum = val
                this.getData()
            },
          getData(val) {
                let params ={
                    pageNum:this.pageNum,
                    popName:this.$route.query.style
                }
              if (val!=='任务类型') {
                  let str = this.currIndex==0?'应急响应':'日常运维'
                  params.taskClass=  str + '-' + val

              }
              this.$get('/i309PopupTable',params).then(res => {
                  if (res.code == 0) {
                      this.tableObj = res.data
                      this.total = res.data.total
                      this.pageNum = res.data.pageNum
                      this.pageSize = res.data.pageSize
                      this.emergencyTableData = this.dataDispose(res.data.emergencyTable,1)
                      this.operationTableData = this.dataDispose(res.data.operationTable,2)
                      this.setTableList()
                      this.taskClass = res.data.taskClass
                      // console.log('this.taskClass ',this.taskClass)
                  } else {
                      console.log(res.err_msg)
                  }
              })
          },
            dataDispose(arr,index) {
              let newarr = []
              arr.forEach((item,i) => {
                  if (index==1){
                      let subarr = [i+1,item.taskClass,item.name,item.stance,item.startTime,item.endTime,item.executor,item.style,item.taskGrade]
                      newarr.push(subarr)
                  }else if(index==2) {
                      let subarr = [i+1,item.taskClass,item.name,item.stance,item.startTime,item.endTime,item.executor,item.style,item.taskGrade,item.factor,item.warnStyle]
                      newarr.push(subarr)
                  }
              })
                return newarr
            }
        },
        data() {
            return {
                isFirstNO:false,
                pageSize: 20,
                pageNum:1,
                total:1,
                tableList:[],
                taskClassed:'',//筛选类型
                taskClass:'',
                currIndex:0,
                tableObj:null,
                emergencyTableData:[],
                operationTableData:[],
                table: [
                    {
                        name: "序号",
                        width: "8vw",
                        marginLeft:"3vw"
                    },
                    {
                        name: "任务类型",
                        width: "12vw",
                        style: {
                            width:'10vw'
                        }
                    },
                    {
                        name: "公司名称",
                        width: "12vw",
                    },
                    {
                        name: "站位名称",
                        width: "12vw",
                    },
                    {
                        name: "有效开始时间",
                        width: "12vw",
                        style: {
                            marginLeft:'1vw'
                        }
                    },
                    {
                        name: "有效结束时间",
                        width: "12vw",
                    },
                    {
                        name: "执行人",
                        width: "12vw",
                        // isDispose:true,
                    }
                ],
                // 日常运维
                operationTable: [
                    {
                        name: "任务状态",
                        width: "12vw",
                        isDispose:true,
                    },
                    {
                        name: "任务级别",
                        width: "4vw",
                        marginRight:"3vw"
                    }
                ],
                //应急响应
                emergencyTable: [
                    {
                        name: "任务状态",
                        width: "10vw",
                        isDispose:true,
                    },
                    {
                        name: "任务级别",
                        width: "10vw",
                        // isGrade: true
                    },
                    {
                        name: "可疑因子",
                        width: "10vw",
                        // isReach: true
                    },
                    {
                        name: "预警状态",
                        width: "4vw",
                        marginRight:"3vw"
                    }
                ],
                tableOption: {
                    tableStyle: {
                        height: "72vh",
                        width: "100%",
                        margin: "0 auto"
                    }, // 表格样式
                    tableHeaderStyle: {
                        fontSize:'0.63vw'

                    },
                    tableTbodyStyle: {
                        width: "100%",
                        height: "72vh"
                    },
                    tableTrstyle: {},
                    isTableHeaderLine: true, // 表头分割线是否使用
                    tableHeaderLine: `<div class="siderlist_header1"></div>` // dom字符串
                },
                // tableList: [
                //     [1,2,3,4,5,2,1,true,2,true,'B级'],
                //     [1,2,3,4,5,0,0,false,1,false,'A级']
                // ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .tablePage{
        width: 100%;
        height: 93.8vh;
        padding: 2.96vh 2.85vw 3.8vh;
        box-sizing: border-box;
        font-family: SourceHanSansCN-Regular;
        .header{
            position: relative;
            .back{
                position: absolute;
                left: 0;
                top: 0;
                width: 2.4vw;
                height: 2.78vh;
                /*background-color: red;*/
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-image: url("../../assets/image/back@2x.png");
            }
            .tableNav{

                >div{
                    width: 4.58vw;
                    height: 2.78vh;
                    line-height: 2.78vh;
                    font-size: 0.73vw;
                    color:#fff;
                    background-image: url("../../assets/image/cancel_i@2x.png");
                }
                .responseBtn{
                    margin-right: 2.97vw;
                }
                .active{
                    background-image: url("../../assets/image/affirm_i@2x.png");
                }
            }
        }
        .tableList{
            width: 100%;
            height: 77.78vh;
            padding: 0 0.5vw;
            margin-top: 1.85vh;
            background-color: rgba(0, 0, 0, 0.7);
            box-sizing: border-box;
            .container{
                width: 100%;
            }
        }
    }
</style>
<style scoped lang="scss">
    .el-pagination{
        margin-top: 2.22vh;
        /deep/ .btn-prev , /deep/ .el-pager .number,/deep/ .el-pager  .btn-quicknext, /deep/ .btn-next{
            color: #fff;
            border: solid 0.09vh rgba(0, 154, 255, 1);
            background: rgba(255,255,255,0.1);
        }
    }
    /deep/.el-icon-arrow-right,/deep/.el-icon-arrow-left{
        color: rgba(0, 154, 255, 1);
    }
</style>