<template>
  <div class="dropdown" :style="{...styleList}">
    <div :class="{'isDown':!isNoDown}"></div>
    <div class="dropdown-icon" @click.stop="showListFn">
      <template v-for="(item, index) in showList">
        <div
          :key="index"
          :value="item.value"
          :style="{...styleListItem}"
          :class="{addBGC:show}"
          @click.stop="changeList($event, index, item)"
        >{{item.label}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import {pie3} from "../../views/effluent/data";

/**
 *
 * @作者: LinWenJun
 * dropdownList: 数据
 *     数据格式：[{},{}]
 * dropdownItem(父组件的数据)：
 *     子组件将选中的数据返回给父组件， 父组件直接使用
 *     接受
 * dropdownOptionListStyle：样式配置
 *     直接传递style样式
 * dropdownOptionListItemStyle: 列表item样式
 *    直接传递style样式
 * @时间 2020/06/19 10:59:22
 */

export default {
  props: [
    "dropdownList",
    "dropdownOptionListStyle",
    "dropdownOptionListItemStyle",
    "isNoDown"
  ],
  created() {
    this.dropdownDom = this.dropdownList[0].label;
  },
  data() {
    return {
      item: {},
      show: false,
      SelectIndex: 0,
      dropdownDom: "",
      showList: [this.dropdownList[0]]
    };
  },
  methods: {
    showListFn() {
      if(this.show) {
        this.showList = [this.dropdownList[this.SelectIndex]]
      } else {
        this.showList = this.dropdownList
      }
      this.show = !this.show

    },
    changeList(e, index, item) {
      this.SelectIndex = index;
      // console.log('dropdowncomponent',this.SelectIndex,item);

      if(this.show) {
        this.showList = [this.dropdownList[this.SelectIndex]]
        this.$store.commit('effluent/setPieValue',this.showList[0])
      } else {
        this.showList = this.dropdownList
        
      }
      // 切换显示
      this.show = !this.show
      this.dropdownList.unshift(item);
      this.dropdownList.splice(index+1, 1);
      // console.log(' this.item', item)
      this.$emit("changeSelectItemed", item);
    }
  },
  computed: {
    styleList() {
      return this.dropdownOptionListStyle;
    },
    styleListItem() {
      return this.dropdownOptionListItemStyle;
    },
    iconLeft() {
      return this.dropdownOption.left;
    },
    iconTop() {
      return this.dropdownOption.top;
    },
    BGImg() {
      return this.dropdownOption.icon;
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  color: white;
  width: 4.67vw;
  height: 1.9vh;
  line-height: 1.9vh;
  /*background: rgb(15, 19, 32);*/
  position: relative;
  text-align: left;
  text-indent: 0.5vw;
  box-sizing: border-box;
  .dropdown-icon {
    cursor: pointer;
    width: 4.67vw;
    position: absolute;
    z-index: 9;
    box-sizing: border-box;
    > div {
      cursor: pointer;
      height: 1.9vh;
      transition: all 0.5s;
      /*background: rgb(9, 29, 53);*/
      box-sizing: border-box;
    }
    > div:hover {
      box-sizing: border-box;
      background: rgb(48, 56, 72) !important;
    }
  }

  .isDown{
    &:after{
      content: "";
      position: absolute;
      display: block;
      width: 0.63vw;
      height: 0.56vh;
      background: url("../../assets/image/effluent/more.png");
      background-size: 100%;
      right: 0;
      top: 0;
      margin: 0.7vh 0.5vw 0 0 ;
      z-index: 99;
    }
  }
}
.addBGC{
  background: rgb(15, 19, 32)!important;
}
</style>