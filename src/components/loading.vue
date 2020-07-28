<template>
    <div class="loading-main" v-show="loading">
        <div class="loading-content">
            <div class="loading-move" :style="{width: widthStyle}">

            </div>
            <div class="loading-text">
                {{ parcent }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        data() {
            return {
                widthStyle: '0vw',
                parcent: '0%',
                loadWidth: 18,
                loading: true,
            }
        },
        created() {
        },
        props: {
            requstNum: Number,
            loadings: Array,
        },
        watch: {
            loadings: {
                handler(val) {
                    if(val.length === this.requstNum) {
                        setTimeout(() => {
                            this.loading = false
                        }, 800)
                    }
                    let width = Number(this.widthStyle.replace('vw', ''))
                    this.widthStyle = width + this.loadWidth / this.requstNum + 'vw'
                    let num = Number(this.parcent.replace('%', ''))
                    this.parcent = parseInt(num + 100 / this.requstNum) + '%'
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .loading-main {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        .loading-content {
            width: 20vw;
            background-size: contain;
            height: 0.6vw;
            position: absolute;
            display: inline-block;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .loading-move {
                background: url("../assets/move.png") no-repeat;
                width: 0vw;
                background-size: 100% 100%;
                height: 0.6vw;
                float: left;
            }
            .loading-text {
                line-height: 0.6vw;
                color: white;
                float: right;
            }
        }
    }
</style>
