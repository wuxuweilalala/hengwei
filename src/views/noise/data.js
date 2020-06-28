export let tableOption= {
    tableStyle: {
        height: "16.1vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "16.1vh"
    },
    tableTrstyle: {},
    isTableHeaderLine: true, // 表头分割线是否使用
    tableHeaderLine: `<div class="siderlist_header1"></div>` // dom字符串
}
//噪声超标预警信息
export let wi_headerList = [
    {
        name: "序号",
        width: "4vw",
    },
    {
        name: "监控点名称",
        width: "9vw",
    },
    {
        name: "可疑因子",
        width: "9vw",
    },
    {
        name: "检测值",
        width: "9vw",
    },
    {
        name: "预警状态",
        width: "9vw",
        isGrade:true,
        textArr:['一般污染','中度污染','严重污染']
    },
    {
        name: "可疑开始时间",
        width: "10vw",
    },
    {
        name: "可疑结束时间",
        width: "6vw",
    }
]
//噪声超标预报信息
export let fi_headerList = [
    {
        name: "序号",
        width: "4vw",
    },
    {
        name: "监控点名称",
        width: "8vw",
    },
    {
        name: "预警状态",
        width: "8vw",
        isGrade:true,
        textArr:['一般污染','中度污染','严重污染']
    },
    {
        name: "有效开始时间",
        width: "8vw",
    },
    {
        name: "有效结束时间",
        width: "8vw",
    },
    {
        name: "执行人",
        width: "8vw",
    },
    {
        name: "任务状态",
        width: "8vw",
        isDispose:true
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
    },
    {
        name: "监控点名称",
        width: "6vw",
    },
    {
        name: "噪声",
        width: "4vw",
    },
    {
        name: "湿度",
        width: "4vw",
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
        width: "3vw",
    },
    {
        name: "功能区类别",
        width: "6vw",
    },
    {
        name: "标准",
        width: "4vw",
    },
    {
        name: "实际监测",
        width: "4vw",
    },
    {
        name: "是否达标",
        width: "4vw",
        isReach_i:true
    }
]


