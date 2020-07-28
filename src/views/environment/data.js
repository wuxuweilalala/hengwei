//左边

export let mq_tableOption= {
    tableStyle: {
        height: "33.11vh",
        width: "16.75vw",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {},
    tableTbodyStyle: {
        width: "16.75vw",
        height: "33.11vh"
    },
    tableTrstyle: {},
    isTableHeaderLine: true, // 表头分割线是否使用
    tableHeaderLine: `<div class="siderlist_header"></div>` // dom字符串
}

export let mq_headerList = [
    {
        name: "序号",
        width: "2vw",
        style: {
            marginLeft:'0',
            width: "1vw",
        }
    },
    {
        name: "点位名称",
        width: "4vw",
        style: {
            // marginLeft:'0',
            width: "3.5vw",
        }
    },
    {
        name: "水质类别",
        width: "4vw",
        style: {
            // marginLeft:'0',
            width: "3.5vw",
        }
    },
    {
        name: "目标类别",
        width: "4vw",
        style: {
            // marginLeft:'0',
            width: "3.5vw",
        }
    },
    {
        name: "是否达标",
        width: "4vw",
        color:'red',
        isReach:true,
        style: {
            // marginLeft:'0',
            width: "3vw",
        }
    }
]

export let mq_spListList = [
        [1,
        "点位名称",
        "水质类别",
        "目标类别",
        "是否达标"]
]

//中间

export let rp_tableOption= {
    tableStyle: {
        height: "22.78vh",
        width: "56.09vw",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {},
    tableTbodyStyle: {
        width: "56.09vw",
        height: "16vh"
    },
    tableTrstyle: {},
    isTableHeaderLine: true, // 表头分割线是否使用
    tableHeaderLine: `<div class="hr"></div>` // dom字符串
  }

export let rp_headerList_warn = [   //预警
    {
        name: "序号",
        width: "4vw",
        style: {
            width: "2vw",
        }
    },
    {
        name: "点位名称",
        width: "14vw",
        style: {
            width: "12vw",
        }
    },
    {
        name: "可疑因子",
        width: "10vw",
        style: {
            width: "8vw",
        }
    },
    {
        name: "可疑数据描述",
        width: "10vw",
        style: {
            width: "7vw",
        }
    },
    {
        name: "预警状态",
        width: "10vw",
        // iconClass: "icon-xiaoxi"
        isWarnSyle:true,
        isWarnSyleText:true,
        style: {
            width: "8vw",
            marginLeft: "1vw",
        }
    },
    {
        name: "可疑开始时间",
        width: "10vw",
        style: {
            width: "8vw",
            // marginLeft: "1vw",
        }
    },
    {
        name: "可疑结束时间",
        width: "8vw",
    }
]
export let rp_headerList_forecast = [//预报
    {
        name: "序号",
        width: "3vw",
        style: {
            width: "2vw",
        }
    },
    {
        name: "点位名称",
        width: "11vw",
        style: {
            width: "10vw",
        }
    },
    {
        name: "可疑因子",
        width: "6vw",
        style: {
            width: "4vw",
        }
    },
    {
        name: "预警状态",
        width: "6vw",
        isWarnSyle:true,
        isWarnSyleText:true,
        style: {
            width: "4vw",
        }
    },
    {
        name: "可疑开始时间",
        width: "8vw",
    },
    {
        name: "可疑结束时间",
        width: "8vw",
        style: {
            width: "8vw",
        }
    },
    {
        name: "执行人",
        width: "6vw",
        style: {
            width: "5vw",
        }
    },
    {
        name: "任务状态",
        width: "6vw",
    },
    {
        name: "任务级别",
        width: "6vw",
    }
]

export let rp_spListList = [
    [1,"深圳衡伟环境技术有限公司","站位1","总氮","一般污染","06/08 17:32:12","06/08 17:32:12"]
]

//右边

export let sp_tableOption= {
    tableStyle: {
        height: "42vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "42vh"
    },
    tableTrstyle: {},
    isTableHeaderLine: true, // 表头分割线是否使用
    tableHeaderLine: `<div class="siderlist_header1"></div>` // dom字符串
}

export let sp_headerList = [
    {
        name: "序号",
        width: "2vw",
        style: {
            width: "1vw",
        }
    },
    {
        name: "企业名称",
        width: "4vw",
        style: {
            width: "3vw",
        }
    },
    {
        name: "污染等级",
        width: "3.8vw",
        style: {
            width: "2vw",
        }
    },
    {
        name: "排污口等级",
        width: "4.5vw",
        style: {
            width: "2vw",
        }
    },
    {
        name: "排污特征",
        width: "4.5vw",
        style: {
            width: "3.5vw",
        }
    },
    {
        name: "主要污染物",
        width: "4.2vw",
    }
]

export let sp_spListList = [
    [1,"企业名称","A级","A级级","排污特征","主要污染物"]
]
