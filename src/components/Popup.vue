<template>
    <div class="popup" v-show="isShow">
        <div class="popup-container ab_center" :style="setStyle()">
            <div class="header f_r_between f_c_center">
                <div class="title">{{title}}</div>
                <div class="closeIcon ICON pointer" @click="$emit('update:isShow',false)"></div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props:{
            isShow:{
                type:Boolean,
                default:false
            },
            title: {
                type:String,
                default:''
            },
            w: String,
            h: String
        },
        methods:{
            setStyle() {
                let str = ''
                if (this.w) {
                    str += `width:${this.w};`
                }
                if (this.h) {
                    str += `height:${this.h};`
                }
                return str
            },
            close(el){
                let fu = document.querySelector(".popup");
                if(fu){
                    // console.log(el.target === fu,fu.contains(el.target))
                    if(el.target === fu || !fu.contains(el.target)){            //按钮.app-download以外的区域
                        this.$emit('update:isShow',false)
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .popup{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        /*background: rgba(0,0,0,0.3);*/
        z-index: 999;
    }
    .closeIcon{
        width: 0.73vw;
        height: 1.2vh;
        background-image: url("../assets/image/closeIcon@2x.png");
    }
    .popup-container{
        position: relative;
        width: 22.45vw;
        height: 28.52vh;
        font-size: 0.83vw;
        color: #fff;
        border: 2px solid #01b0ff;
        background-color: rgba(0,0,0,0.5);
        &:before{
            left: 0;
            top: 0;
        }
        &:after{
              right: 0;
              top: 0;
          }
        .header{
            position: relative;
            width: 100%;
            height: 3vh;
            line-height: 3vh;
            padding: 0 0.83vw 0 1.25vw;
            border-bottom: 2px solid #01b0ff;
            box-sizing: border-box;
            &:before{
                left: 0;
                bottom: 0;
            }
            &:after{
                right: 0;
                bottom: 0;
            }
        }
    }
    .popup-container:before,.popup-container:after,.header:before,.header:after{
        content:'';
        position: absolute;
        display: inline-block;
        width: 0.15vw;
        height: 0.15vw;
        background-color: #01f4ff;
    }
</style>
