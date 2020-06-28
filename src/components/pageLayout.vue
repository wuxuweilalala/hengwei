<template>
    <div class="page-container f_r_between">
        <div class="leftSide" :style="{width:width_l,height:height_l}">
            <slot name="pageLeft" ></slot>
        </div>
        <div class="page-center" :style="{width:width_c,height:height_c}">
            <slot name="pageCenter"></slot>
        </div>
        <div class="rightSide" :style="{width:width_r,height:height_r}">
            <slot name="pageRight"></slot>
        </div>
    </div>
</template>

<script>
    /**
     * @作者: ZouYouWen
     *
     * width_l，height_l 左边布局宽高
     * width_c，height_c 中间布局宽高
     * width_r，height_r 右边布局宽高
     *
     * @时间 2020/06/19 13:15
     */
    export default {
        name: "pageLayout",
        props: {
            width_l:{
                type:String,
                default:'18.75vw'
            },
            height_l:{
                type:String,
                default:'88.87vh'
            },
            width_c:{
                type:String,
                default:'58.28vw'
            },
            height_c:{
                type:String,
                default:'88.87vh'
            },
            width_r:{
                type:String,
                default:'18.75vw'
            },
            height_r:{
                type:String,
                default:'88.87vh'
            },
        }
    }
</script>

<style scoped>
.page-container{
    width: 100%;
    height: 100%;
}
</style>