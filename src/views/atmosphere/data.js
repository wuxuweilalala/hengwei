//空气质量监测情况
export let aq_tableOption= {
    tableStyle: {
        height: "35.11vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "30.11vh"
    },
    tableTrstyle: {},
    // isTableHeaderLine: true, // 表头分割线是否使用
}
//区域预警信息
export let aw_tableOption= {
    tableStyle: {
        height: "19.4vh",
        width: "100%",
        margin: "0 auto"
    }, // 表格样式
    tableHeaderStyle: {
        fontSize:'0.63vw'
    },
    tableTbodyStyle: {
        width: "100%",
        height: "19.4vh"
    },
    tableTrstyle: {},
    // isTableHeaderLine: true, // 表头分割线是否使用
}
//空气质量监测情况
export let aq_headerList = [
    {
        name: "序号",
        width: "3vw",
        style: {
            marginLeft:'0.5vw',
            width:'1.5vw'
        }
    },
    {
        name: "区域",
        width: "5.5vw",
        style: {
            // marginLeft:'0.5vw',
            width:'6vw'
        }
    },
    {
        name: "AQI",
        width: "3vw",
        style: {
            marginLeft:'0.5vw',
            // width:'2vw'
        }
    },
    {
        name: "首要污染物",
        width: "4vw",
    },
    {
        name: "污染情况",
        width: "5vw",
        isGrade:true,
        textArr: ['轻度污染','中度污染','重度污染'],
        marginLeft:"0.5vw"
    }
]
//区域预警信息
export let aw_headerList = [
    {
        name: "序号",
        width: "3vw",
        style: {
            marginLeft:'0.5vw',
            width:'1.5vw'
        }
    },
    {
        name: "区域",
        width: "3.5vw",
        style: {
            // marginLeft:'1vw',
            width:'3.5vw'
        }
    },
    {
        name: "因子",
        width: "3.5vw",
        style: {
            // marginLeft:'1vw',
            width:'3vw'
        }
    },
    {
        name: "全市均值",
        width: "4vw",
    },
    {
        name: "目标值",
        width: "4vw",
    },
    {
        name: "累计均值",
        width: "4vw",
    }
]

export let aqiList = [
    {
        value:156,
        label:'PM2.5'
    },
    {
        value:156,
        label:'PM2.5'
    },
    {
        value:156,
        label:'PM2.5'
    },
    {
        value:156,
        label:'PM2.5'
    },
    {
        value:156,
        label:'PM2.5'
    }
]