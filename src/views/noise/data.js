let option = {
    tableStyle: {
        // height: "16.1vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "16.1vh"
    }
}
export let tableOption = option

let option_1 = {
    tableStyle: {
        // height: "23.1vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "18.1vh"
    }
}
export let tableOption_1 = option_1

let option_2 = {
    tableStyle: {
        // height: "25.1vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "20.1vh"
    }
 }
export let tableOption_2 = option_2

//噪声超标预警信息
export let wi_headerList = [
    {
        name: "序号",
        width: "4vw",
        style:{
            marginLeft:'0.5vw',
            width:'1.5vw'
        }
    },
    {
        name: "监控点名称",
        width: "9vw",
        style:{
            width:'9vw'
        }
    },
    {
        name: "可疑因子",
        width: "6vw",
        style:{
            marginLeft: '1vw',
            width: "4vw",
        }
    },
    {
        name: "检测值",
        width: "6vw",
        style:{
            marginLeft: '1vw',
            width:'4.5vw'
        }
    },
    {
        name: "预警状态",
        width: "7vw",
        isWarnSyle:true,
        isWarnSyleText:true,
        style:{
            width:'5.5vw',
            // paddingLeft:'1vw'
        }
    },
    {
        name: "可疑开始时间",
        width: "7vw",
        style:{
            width:'6.5vw',
            // paddingLeft:'1vw'
        }
    },
    {
        name: "可疑结束时间",
        width: "8vw",
    }
]
//噪声超标预报信息
export let fi_headerList = [
    {
        name: "序号",
        width: "4vw",
        style:{
            marginLeft:'0.5vw',
            width:'1.5vw'
        }
    },
    {
        name: "监控点名称",
        width: "11vw",
        style:{
            width:'11.5vw'
        }
    },
    {
        name: "预警状态",
        width: "5vw",
        isWarnSyle:true,
        isWarnSyleText:true,
        style:{
            marginLeft:'1vw',
            width:'5vw'
        }
    },
    {
        name: "有效开始时间",
        width: "8vw",
        style:{
            width:'8vw',
        }
    },
    {
        name: "有效结束时间",
        width: "8vw",
        style:{
            width:'7vw',
        }
    },
    {
        name: "执行人",
        width: "6vw",
        style:{
            marginLeft:'1vw',
            width: "5vw",
        }
    },
    {
        name: "任务状态",
        width: "6vw",
        isDispose:true,
        style:{
            marginLeft:'1vw',
            // width: "4vw",
        }
    },
    {
        name: "任务级别",
        width: "4vw",
    }
]
//噪声监测实时数据
export let nr_headerList = [
    {
        name: "序号",
        width: "3vw",
        style:{
            width:'1vw'
        }
    },
    {
        name: "监控点名称",
        width: "6vw",
        style:{
            width:'5vw'
        }
    },
    {
        name: "噪声",
        width: "3vw",
        style:{
            width:'2vw'
        }
    },
    {
        name: "湿度",
        width: "4vw",
        style:{
            width:'2vw'
        }
    },
    {
        name: "采集时间",
        width: "4vw",
    }
]
//功能区噪声标准及实际监测情况对照
export let nc_headerList = [
    {
        name: "序号",
        width: "2vw",
        style:{
            width:'1vw'
        }
    },
    {
        name: "功能区类别",
        width: "5vw",
        style:{
            width:'4vw'
        }
    },
    {
        name: "标准",
        width: "3vw",
        style:{
            width:'3vw'
        }
    },
    {
        name: "实际监测",
        width: "4vw",
        style:{
            width:'3vw'
        }
    },
    {
        name: "是否达标",
        width: "4vw",
        isReach_i:true
    }
]


