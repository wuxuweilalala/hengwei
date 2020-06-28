<template>
    <div class="header">
        <div class="header-logo">
            <img src="../assets/image/effluent/logo.png"/>
        </div>
        <div class="select-all">
            <div class="header-select">
                <div v-for="(item,index) in list"
                  :key="index"
                  @click="toSelect(index,item)"
                  :class="[index===currentIndex?'active-select':'']"><span>{{item.title}}</span>
                    <img v-show="item.seconds"
                      src='../assets/image/effluent/more.png'/>
                    <ul
                      :class="[index===currentIndex&&seconds?'active-second':'']"
                    >
                        <li v-for="(items,num) in item.seconds"
                          @click.stop="toSeconds(items)"
                          :class="[item.title===items.title?'active-seconds':'']"
                          :key="num">{{items.title}}
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div class="header-date">
            <span class="header-date-time">{{nowTime}}</span>
            <span class="header-date-day">{{nowDate}}</span>
        </div>
        <div class="under-line"></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                nowDate: '',
                nowTime: '',
                timer: '',
                list: [
                    {
                        title: '企业废水在线监管',
                        seconds: [{title: "企业废水在线监管", path: '/effluent'}, {title: '企业废气在线监管', path: '/waste'}]
                    },
                    {
                        title: '大气环境在线监管',path: '/atmosphere'
                    },
                    {
                        title: '地表水环境在线监管', src: '',path:'/environment'
                    },
                    {
                        title: '噪声与辐射安全综合监管', src: '',path:'/noise'
                    }
                ],
                currentIndex: 0,
                seconds: false,
            };
        },
        computed: {},
        methods: {
            showTime() {
                let nowtime = new Date();
                let year = nowtime.getFullYear();//年
                let month = ('0' + (nowtime.getMonth() + 1)).slice(-2);//月
                let day = ('0' + nowtime.getDate()).slice(-2);//日
                let hour = ('0' + nowtime.getHours()).slice(-2);//时
                let minutes = ('0' + nowtime.getMinutes()).slice(-2); //分
                let seconds = ('0' + nowtime.getSeconds()).slice(-2); //秒
                let week = "星期" + "日一二三四五六".charAt(new Date().getDay());
                this.nowDate = `${year}-${month}-${day}  ${week}`;
                this.nowTime = `${hour} : ${minutes} : ${seconds}`;
            },
            toSelect(index,item) {
                this.currentIndex=index;
                if (!item.seconds) {
                    this.seconds = false; //显示下拉选择框
                    this.$router.push({path: item.path})
                } else {
                    this.seconds = true; //显示下拉选择框
                }

            },
            toSeconds(item) {
                this.seconds = false;
                this.$router.push({path: item.path})
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                this.showTime()
            }, 1000);
        },
        created() {

        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
        watch: {
            $route: {
                handler: function(val, oldVal){  //路由导航栏
                    console.log('val',val.meta.name)
                    if (val.meta.name === '表格页面') return
                    let item=val.meta;
                    // debugger
                    // if(!item.index) return
                    this.currentIndex=item.index;
                    this.list[item.index].title = item.name;
                },
                // 深度观察监听
                deep: true
            }
        }
        };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
  lang="scss">
    .header {
        position: relative;
        width: 100%;
        height: 6.2vh;
        background: url("../assets/image/effluent/title-bg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        z-index: 99;
        padding: 0 1.85vw 0 0.99vw;
        box-sizing: border-box;
        &-logo {
            margin-top: 0.83vh;

            img {
                width: 11.93vw;
                height: 2.29vw;
            }

            .name {
                font-size: 1.48vh;
                color: #fff;
                font-family: SourceHanSansCN-Medium;;
                font-style: italic;
            }
        }

        .select-all {
            flex-grow: 1;
            display: flex;
            font-family: 'SourceHanSansCN-Regular';
            align-items: center;
            padding-left: 6.64vw;
        }

        &-select {
            width: 40.52vw;
            display: flex;
            align-items: center;
            justify-content: space-between;

            div {
                font-size: 0.83vw;
                color:rgba(255,255,255,0.5);
                display: flex;
                align-items: center;
                position: relative;
                cursor: pointer;

                ul {
                    position: fixed;
                    top: 6.2vh;
                    color: #333;
                    height: 0;
                    z-index: 99;
                    visibility: hidden;
                    transition: opacity 0.5s;
                    opacity: 0;
                    .active-seconds {
                        background-color: rgba(0, 126, 255, 1);
                    }
                    li{
                        height: 2.08vw;
                        line-height: 2.08vw;
                        padding: 0 0.6vw;
                        font-family: SourceHanSansCN-Regular;
                        font-size: 0.83vw;
                        color: #fff;
                    }
                }

                .active-second {
                    visibility: visible;
                    height: 4.17vw;
                    background-color: rgba(4, 11, 39, 0.5);
                    opacity: 1;
                }
            }

            img {
                width: 0.63vw;
                height: 0.31vw;
                margin-left: 0.52vw;
            }

            .active-select {
                opacity: 1;

                span {
                    position: relative;
                    display: inline-block;

                    &:after {
                        content: '';
                        width: 100%;
                        height: 0.19vh;
                        background-color: #009aff;
                        position: absolute;
                        bottom: -1.5vh;
                        left: 0;
                    }
                }

            }
        }

        &-date {
            padding-top: 1.39vh;
            color: #fff;

            span {
                display: block;
                font-family: SourceHanSansCN-Regular;

            }

            &-time {
                height: 1.76vh;
                font-size: 2.22vh;
                font-family: SourceHanSansCN-Light;
                line-height: 1.76vh;
                margin-bottom: 0.65vh;
            }

            &-day {
                font-size: 1.11vh;
                font-family: SourceHanSansCN-Regular;
                line-height: 2.13vh;
                letter-spacing: 0.06vh;
                color: #ffffff;
                opacity: 0.5;
            }
        }

        .under-line {
            position: absolute;
            width: 15.16vw;
            height: 0.26vw;
            background-image: url("../assets/image/effluent/title-bottom.png");
            background-size: 100% 100%;
            top: 4.72vh;
            right: 21.56vw;
        }
    }

    @keyframes ease {
        from {
            height: 0;
        }
        to {
            height: 10vh
        }
    }
</style>
