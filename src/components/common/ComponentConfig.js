// 下拉框配置项
function DropDownConfig() {
    let config = {
        // dropdownList: [{
        //         label: "地区分类1",
        //         value: "aa"
        //     }, {
        //         label: "地区分类2",
        //         value: "aa"
        //     },
        //     {
        //         label: "地区分类3",
        //         value: "aa"
        //     },
        //     {
        //         label: "地区分类4",
        //         value: "aa"
        //     }
        // ], // dropdo
        // wn列表
        dropdownItem: {}, // 选中option的值
        dropdownOptionListStyle: {
            marginLeft: '1.2vw'
        }, // 设置宽度和高度
        dropdownOptionListItemStyle: {}, // 设置宽度和高度
        dropdownOption: {
            icon: '', // 背景图
            left: '', // 定位left
            top: '' // 定位top
        }
    }
    return config
}

// Select配置项
function SelectConfig(data) {
    let config = {
        selectList: data, // select列表
        selectItem: {}, // 选中option的值
        selectOptionStyle: {
            height: "1.9vh",
            width: "6.67vw",
            background: '#091d35'
        }, // 设置宽度和高度
        selectOption: {
            icon: '', // 背景图
            left: '', // 定位left
            top: '', // 定位top
            placeholder: '因子选择栏' // 文字
        }
    }
    return config
}
export {
    DropDownConfig,
    SelectConfig
}