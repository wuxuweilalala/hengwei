<template>
    <div class="box">
        <div class="boxList" id="list" ref="list">
            <div>
                <MonitorCardII
                        :districtList="list_data.noiseClassObj"
                        :classObj="list_data.noiseClassObj"
                />
            </div>
            <div v-for="(item,key,index) in list_data" v-if="item.normal && item.suspicious && key!='situation'" >
                <MonitorCard :styleObj="{marginTop:'4vh'}"
                             :classObj="item"
                             :subclassObj="item"
                />
            </div>
            <div v-for="(item,key,index) in list_data" v-if="!item.normal && !item.suspicious" >
                <MonitorCardII
                        :districtList="item"
                        :classObj="item"
                />
            </div>
            <div>
                <MonitorCard :styleObj="{marginTop:'4vh'}"
                             :classObj="list_data.workClass"
                             :subclassObj="list_data.workClass"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import  MonitorCardII from "../MonitorCardII"
    import  MonitorCard from "../MonitorCard"
    export default {
        components:{
            MonitorCardII,
            MonitorCard
        },
        props:["list_data","districtList"],
        data() {
            return {
                num: 1,
                setIner:''
            };
        },
        computed:{
            list_length(){
                let b=document.querySelectorAll('#list>div')
                return b.length
            },
        },
        watch:{
            districtList(){ // 监听点击nav
                this.num=this.districtList
                this.$refs.list.style.left = this.num * -16.75 + "vw";
                this.$refs.list.style.transition = "0.5s";
                clearInterval(this.serIner)
            },
            num(){ // 监听值
                this.$emit('nav_value',this.num)
            },
        },
        mounted() {
            this.timer()
        },
        beforeDestroy() {
            clearInterval(this.serIner)
        },
        methods: {
            timer(){
                this.serIner=setInterval(()=>{
                    this.num++
                    this.$refs.list.style.left = this.num * -16.75 + "vw";
                    this.$refs.list.style.transition = "0.5s";
                    if (this.num == this.list_length - 1) {
                        setTimeout(()=>{
                            this.$refs.list.style.transition = "0s";
                            this.num = 1;
                            this.$refs.list.style.left = this.num * -16.75 + "vw";
                        },500)
                    }
                },3000)
            },
            // left_up() {
            //   if (this.num == 0) {
            //     this.$refs.list.style.transition = "0s";
            //     this.num = this.list_length  - 2;
            //     this.$refs.list.style.left = this.num * -340 + "px";
            //   }
            // },
            // next() {
            //   this.num++;
            //   this.$refs.list.style.left = this.num * -340 + "px";
            //   this.$refs.list.style.transition = "0.5s";
            // },
            // next_up() {
            //   if (this.num == this.list_length - 2) {
            //     this.$refs.list.style.transition = "0s";
            //     this.num = 0;
            //     this.$refs.list.style.left = this.num * -340 + "px";
            //   }
            // },
            // left() {
            //   this.num--;
            //   this.$refs.list.style.left = this.num * -340 + "px";
            //   this.$refs.list.style.transition = "0.5s";
            // }
        }
    };

</script>
<style scoped>
    .box {
        width:16.75vw;
        height: 100%;
        position: relative;
        margin: 0 auto;
        overflow: hidden;
    }
    .boxList {
        width: 3500px;
        height: 100%;
        border: 1px solid #000;
        position: absolute;
        top: 0;
        left: -16.75vw;
        transition: 0.5s;
    }
    .boxList > div {
        width: 16.75vw;
        height: 100%;
        float: left;
    }
</style>
