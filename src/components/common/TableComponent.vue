<template>
  <div class="proportionListContent" :style="{...tableStyle}">
    <div class="proportionTableHeader">
      <template v-for="(item, index) in tableHeaderList">
        <div
                v-if="item.name!='任务类型'"
                :key="index"
                :style="{
          width: tableHeaderList[index].width,
          marginLeft: tableHeaderList[index].marginLeft,
          marginRight: tableHeaderList[index].marginRight,
         ...tableHeaderStyle}"
                class="tableHeader"
        >{{item.name}}
        </div>
        <div class="tableHeader f_c_center"
             v-else
             :style="{
          width: tableHeaderList[index].width,
          marginLeft: tableHeaderList[index].marginLeft,
          marginRight: tableHeaderList[index].marginRight,
         ...tableHeaderStyle}">
          <DropDownComponent
                  :dropdownList="classList"
                  :dropdownOptionListStyle="dropdownOptionListStyle"
                  @changeSelectItemed="changeSelectItemed"
          ></DropDownComponent>
        </div>
      </template>
    </div>
    <div class="headerLine">
      <div class="line"></div>
      <div class="btLine"></div>
    </div>
<!--    <div v-if="isTableHeaderLine" v-html="tableHeaderLine"></div>-->
    <div class="proportionTableDate" :style="{...tableTbodyStyle}">
      <div
        v-for="(itemList, index) in data"
        :key="index"
        class="proportionTableTr"
        :style="{...tableTrstyle,}"
      >
        <div
          v-for="(item,subIndex) in itemList"
          :key="subIndex"
          :style="{
            width: tableHeaderList[subIndex].width,
            marginLeft: tableHeaderList[subIndex].marginLeft,
            marginRight: tableHeaderList[subIndex].marginRight,
            color:setFontColor(subIndex,index)}"
          class="proportionTableTd"
        >
          <div
            v-if="tableHeaderList[subIndex].isGrade"
            :class="setGradeDot(item)"
          ></div>
          <div v-if="tableHeaderList[subIndex].isReach"
               :class="setReachDot(item)"
          ></div>
          <div :class="['text',`${setColor(item,subIndex)}`]">
            {{tableHeaderList[subIndex].isReach
            ||tableHeaderList[subIndex].isReach_i ? (item?'达标':'不达标'):
            tableHeaderList[subIndex].isDispose?(item==0?'未处理':item==1?'处理中':'已处理'):
            tableHeaderList[subIndex].isGrade?(item==1?tableHeaderList[subIndex].textArr[0]:item==2?tableHeaderList[subIndex].textArr[1]:tableHeaderList[subIndex].textArr[2]):
            item}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *
 * @作者: LinWenJun
 * 属性： 
 *      tableHeaderList 单元格配置(宽度必须传, 作为每行表头单元格的固定大小)
        tableHeaderList： [{
            name: "预警状态",// 表头名称
            width: "6.46vw",// 表头宽度
            height: "",// 表头高度
            iconClass: "icon-xiaoxi",// 字体图标类名方式
            // iconHtml: '&#xe6a1;',// 字体图标unicode方式
            // iconHtml: '<div style="padding: 5px;">cc</div>',// 字体图标dom方式
        }]

 *      data 表数据
        data格式(二维数组： [[],[]]

 *      tableOption配置项
        tableOption: {
            tableStyle: {},// 表格样式
            tableHeaderStyle: {},// 表头样式
            tableTbodyStyle: {}，// 表体的样式
            tableTrstyle: {},// 行高的样式
            isTableHeaderLine: true, // 表头分割线是否使用
            tableHeaderLine: `<div class="hr"></div>` // 分割线为dom字符串
        }
 * @时间 2020/06/16 12:52:25
 */
import DropDownComponent from "./DropDownComponent";

export default {
  components: {
    DropDownComponent
  },
  props: ["tableHeaderList", "data", "tableOption",'taskClass'],
  computed: {
    isTableHeaderLine() {
      return this.tableOption.isTableHeaderLine;
    },
    tableStyle() {
      return this.tableOption.tableStyle;
    },
    tableHeaderStyle() {
      return this.tableOption.tableHeaderStyle;
    },
    tableTbodyStyle() {
      return this.tableOption.tableTbodyStyle;
    },
    tableTrstyle() {
      return this.tableOption.tableTrstyle;
    },
    tableHeaderLine() {
      return this.tableOption.tableHeaderLine;
    },
  },
  data() {
    return {
      classList: [
        {
          label:'任务类型'
        }
      ],
      dropdownOptionListStyle: {
        // width:'8vw'

        // marginLeft: '1.2vw'
      },
    }
  },
  created() {
    if (this.taskClass) {
      let arr = []
      this.taskClass.forEach(item => {
        let subArr = item.name.split('-')
        // console.log(item)
        let obj = {
          label: subArr[subArr.length-1]
        }
        // let obj = {
        //   label: item.name
        // }
        arr.push(obj)
      })
      this.classList.push(...arr)
    }
    // console.log('this.taskClassthis.taskClass',this.taskClass)
  },
  methods: {
    changeSelectItemed(val) {
      this.$emit('filtrateClass',val.label)
      console.log('表格',val.label)
    },
    setFontColor(subIndex,index) {
      let arr = this.tableHeaderList[subIndex]

      if (!arr.effectArr) {
        return '#fff'
      } else {
        let num = arr.effectArr.indexOf(index)
        let isChangeColor =  num > -1
        return isChangeColor ?  this.tableHeaderList[subIndex].color : '#fff'
      }
    },
    setGradeDot(item) {
      return item == 1 ? 'mild_dot' : item == 2 ? 'medium_dot' : 'severe_dot'
    },
    setReachDot(item) {
      return item ? 'reach_dot' : 'noreach_dot'
    },
    setColor(item,index) {
      let str
      if (this.tableHeaderList[index].isReach_i) {
        str = item?'reach_c':'noreach_c'
      } else if(this.tableHeaderList[index].isDispose) {
        // console.log(item)
        str = item==0?'noDispose':item==1?'disposing':'disposed'
      } else {
        str = item==='A级'?'a_c':item==='B级'?'b_c':item==='C级'?'c_c':item==='D级'?'d_c':item==='E级'?'e_c':''
      }
      return str
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/common.scss";
.proportionListContent {
  height: 22.78vh;
  //   4.07vh 2.69vh
  width: 56.09vw;
  margin: 0 auto;
  .proportionTableHeader {
    display: flex;
    .tableHeader {
      text-align: left;
      height: 4.07vh;
      color: #fff;
      font-family: SourceHanSansCN-Regular;
      font-size: 0.73vw;
      font-weight: normal;
      font-stretch: normal;
      line-height: 4.07vh;
    }
  }
  .headerLine{
    position: relative;
    width: 100%;
    height: 7px;
    .line{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .btLine{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.1);
    }
    &:before{
      content:'';
      position: absolute;
      bottom: 2px;
      left: -3.5px;
      width: 3px;
      height: 3px;
      /*background: transparent;*/
      border-radius: 3px 0 0 0;
      border-width: 0.5px;
      border-color: rgba(255, 255, 255, 0.5) transparent transparent rgba(255, 255, 255, 0.5);
      border-style: solid;
    }
  &:after{
    content:'';
    position: absolute;
    bottom: 2px;
    right: -2.5px;
    width: 3px;
    height: 3px;
    /*background: transparent;*/
    border-radius:  0 3px 0 0 ;
    border-width: 0.5px;
    border-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.5) transparent transparent;
    border-style: solid;

  }
  }
  .proportionTableDate {
    width: 56.09vw;
    height: 16.11vh;
  }
  .proportionTableTr {
    display: flex;
    &:nth-child(odd) {
      height: 4.07vh;
      line-height: 4.07vh;
      color: #fff;
    }
    &:nth-child(even) {
      height: 2.59vh;
      line-height: 2.59vh;
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
    .proportionTableTd {
      display: flex;
      align-items: center;
    }
  }
}

.text{
  white-space: nowrap;
}
  .a_c{
    color: rgba(0, 154, 255, 1);
  }
  .b_c{
    color: rgba(4, 252, 252, 1);
  }
  .c_c{
    color: rgba(255, 228, 0, 1);
  }
  .d_c{
    color: rgba(255, 129, 62, 1);
  }
  .e_c{
    color: rgba(255, 69, 72, 1);
  }
  .reach_c{
    color: rgba(0, 246, 255, 1);
  }
  .noreach_c{
    color: rgba(255, 69, 72, 1);
  }
  .noDispose{
    color: rgba(255, 69, 72, 1);
  }
  .disposing{
    color: rgba(0, 246, 255, 1);
  }
  .disposed{
    color: rgba(255, 255, 255, 1);
  }
</style>
