//噪声监测实时数据
export let wr_headerList = [
    {
        name: "序号",
        width: "5vw",
    },
    {
        name: "公司名称",
        width: "12vw",
    },
    {
        name: "站位名称",
        width: "8vw",
    },
    {
        name: "可疑因子",
        width: "8vw",
    },
    {
        name: "可疑数据描述",
        width: "8vw",
    },
    {
        name: "预警状态",
        width: "8vw",
        // iconClass: "icon-xiaoxi",
        isGrade:true,
        textArr:['一般污染','中度污染','严重污染']
    },
    {
        name: "可疑开始时间",
        width: "10vw",
    },
    {
        name: "可疑结束时间",
        width: "8vw",
    }
]
export let wr_tableOption= {
    tableStyle: {
        height: "16.8vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "16.8vh"
    },
    tableTrstyle: {},
    // isTableHeaderLine: true, // 表头分割线是否使用
}