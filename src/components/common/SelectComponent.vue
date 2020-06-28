<template>
  <div class="select" :style="{...style}">
    <div
      class="select-icon"
      :style="{...style}"
      @click.stop="changeStatus"
      v-html="selectDom?selectDom:selectPlaceholder"
    ></div>
    <div :class="{showBorder:show}">
      <template v-for="(item, index) in selectList">
        <div
        :key="index"
        :value="item.value"
        :style="{...style}"
        v-if="show"
        @click="changeDom($event, index, item),show=!show"
      >{{item.label}}</div>
      </template>
    </div>
  </div>
</template>

<script>
/**
 *
 * @作者: LinWenJun
 * selectList: 数据
 *     数据格式：[{},{}]
 * selectItem(父组件的数据)：
 *     子组件将选中的数据返回给父组件， 父组件直接使用selectItem接受
 * selectOptionStyle：样式配置
 *     直接传递style样式
 * @时间 2020/06/17 14:41:08
 */

export default {
  props: ["selectList", "selectOptionStyle", "selectOption"],
  created() {
    this.selectDom = `<div style="color: #6b7786;text-align: left;text-indent: 0.3vw;user-select: none;">${this.selectPlaceholder}</div>`;
  },
  data() {
    return {
      item: {},
      show: false,
      selectDom: ""
    };
  },
  methods: {
    changeStatus() {
      this.show=!this.show
      // 隐藏Select框
      window.onclick = () => {
        this.show = false
      }
    },
    changeDom(e, index, item) {
      this.selectDom = item.label;
      this.item = this.selectList[index];
      // this.$emit("update:selectItemed", this.item);
      this.$emit("changeSelectItemed", item);

      console.log('selectcomponent',this.item);
    }
  },
  computed: {
    style() {
      return this.selectOptionStyle;
    },
    iconLeft() {
      return this.selectOption.left;
    },
    iconTop() {
      return this.selectOption.top;
    },
    BGImg() {
      return this.selectOption.icon;
    },
    selectPlaceholder() {
      return this.selectOption.placeholder;
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  color: white;
  width: 6.67vw;
  height: 1.9vh;
  .select-icon {
    cursor: pointer;
    width: 6.67vw;
    height: 1.9vh;
    border: 0.09vh solid rgba(255, 255, 255, 0.8);
    position: relative;
    // box-sizing: border-box;
    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 0.63vw;
      height: 0.56vh;
      background: url("../../assets/image/effluent/more.png");
      background-size: 100%;
      left: 5.8vw;
      top: 0.7vh;
      z-index: 2;
    }
  }
  > div:nth-child(2) {
    position: absolute;
    z-index: 999;
    cursor: pointer;
    > div {
      background: #091d35;
      transition: all 0.5s;
    }
    > div:hover {
      background: rgb(48, 56, 72)!important;
    }
  }
}
.showBorder {
  border: 1px solid rgba(255, 255, 255, 0.8);
}
</style>