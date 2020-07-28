//噪声监测实时数据
export let wr_headerList = [
    {
        name: "序号",
        width: "3vw",
        style:{
            marginLeft:'0.5vw',
            width:'1vw'
        }
    },
    {
        name: "公司名称",
        width: "10vw",
        style:{
            // marginLeft:'0.5vw',
            width:'10vw'
        }
    },
    {
        name: "点位名称",
        width: "8.5vw",
        style:{
            // marginLeft:'0.5vw',
            width:'10vw'
        }
    },
    {
        name: "可疑因子",
        width: "4vw",
        marginLeft:'3vw',

        style:{
            marginLeft:'1vw',
            width:'4vw'
        }
    },
    {
        name: "可疑数据描述",
        width: "6vw",

        style: {
            width: "4vw",
        }
    },
    {
        name: "预警状态",
        width: "6vw",
        // iconClass: "icon-xiaoxi",
        isWarnSyle:true,
        isWarnSyleText:true,
        // textArr:['一般污染','中度污染','严重污染'],
        style: {
            marginLeft:'1vw',
        }
    },
    {
        name: "处理状态",
        width: "6vw",
        isDispose:true,
        style: {
            width: "4vw",
        }
    },
    {
        name: "可疑开始时间",
        width: "6vw",
    },
    {
        name: "可疑结束时间",
        width: "6vw",
    }
]
export let wr_tableOption= {
    tableStyle: {
        height: "16vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "16vh"
    },
    tableTrstyle: {},
    // isTableHeaderLine: true, // 表头分割线是否使用
}
