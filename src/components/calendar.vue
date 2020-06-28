<template>
    <div class="calendar" v-if="showUpdate">
        <ul class="week_ul f_r_between">
            <li class="week_li" v-for="(item,index) in week" :key="index">{{item}}</li>
        </ul>
        <div class="headerLine">
            <div class="line"></div>
            <div class="btLine"></div>
        </div>
        <ul class="calendar-col">
            <li class="calendarItem" v-for="(item,index) in day" :key="index">
                <ul class="calendar-row f_r_between">
                    <li :class="['item',`${setColor(subItem)}`]" v-for="(subItem,index) in item" :key="index">{{subItem==0?'':subItem}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "calendar",
        props: {
            dateArr:Array,
            nowDay:String
        },
        data() {
            return{
                week:['日','一','二','三','四','五','六'],
                day:[],
                dayTotal:null,
                weekNum:null,
                // dateArr: [
                //     {
                //         date: '2020-05-16', //日期
                //         grade: 2
                //     },
                //     {
                //         date: '2020-05-20', //日期
                //         grade: 3
                //     }
                // ],
                daysArr: null,
                showUpdate:true
            }
        },
        created() {
            this.day = this.setDay(this.nowDay)
            this.daysArr = this.getDaysArr()
        },
        watch: {
            nowDay(val) {
                this.showUpdate = false
                this.day = this.setDay(this.nowDay)
                this.daysArr = this.getDaysArr()
                this.$nextTick(() => {
                    this.showUpdate = true
                })
            }
        },
        methods: {
            setColor(date) {
                if (!this.dateArr.length) return ''
                let arr = this.daysArr
                // console.log('this.daysArr',arr)
                for (let i = 0;i<arr.length;i++) {
                    if (arr[i].date == date) {
                        let grade = arr[i].grade
                        return grade==1?'excellent_c':
                               grade==2?'good_c':
                               grade==3?'mild_c':
                               grade==4?'medium_c':
                               grade==5?'severe_c':
                               grade==6?'severity_c':''
                    }
                }
            },
            getDaysArr() {
                let month = this.nowDay.split('-')[1]
                // console.log('this.currMonth',this.nowDay,month,this.dateArr)

                if (!this.dateArr) return
                let arr = this.dateArr.reduce((sum,currItem) => {
                    let itemMonth = new Date(currItem.date).getMonth()+1
                    let subArr =  currItem.date.split('-')
                    // console.log('this.currMonth',month,itemMonth)

                    if (month==itemMonth) {
                        let obj = {
                            date:subArr[subArr.length-1],
                            grade: currItem.grade
                        }
                        sum.push(obj)
                    }
                    return sum
                },[])
                // console.log(arr)
                return arr
            },
            setDay(date) {
                let newdate = new Date(date)
                let year = newdate.getFullYear()
                let month = newdate.getMonth()+1
                let day01 = `${year}-${month}-01`
                this.weekNum = new Date(day01).getDay()
                // this.dayTotal = this.getDays(year,month)
                this.dayTotal = new Date(year,month,0).getDate()
                return  this.setDoubleArr()
            },
            getDays(year, month) {
                let days = [31,28,31,30,31,30,31,30,30,31,30,31]
                if ( (year % 4 ===0) && (year % 100 !==0 || year % 400 ===0) ) {
                    days[1] = 29
                }
                return days[month]
            },
            //生成一个二维数组
            setDoubleArr() {
                let arr = []
                let total = this.dayTotal+this.weekNum
                console.log(this.dayTotal,this.weekNum,total)

                let subArr = []
                this.complementArr(null,null,0)
                for (let i =0;i<=total;i++) {
                    let num = i
                    if (this.weekNum!=0) {
                        num = i-this.weekNum+1
                    }
                    if(subArr.length==6||num==this.dayTotal) {
                        if (num==this.dayTotal) {
                            subArr.push(num)
                            arr.push(this.complementArr(subArr,6,1))
                            return arr
                        }
                        subArr.push(num)
                        arr.push(subArr)
                        subArr = []
                    } else {
                        if (i<this.weekNum) {
                            subArr.push(null)
                        } else {
                            subArr.push(num)
                        }
                    }
                }
                return arr
            },
            complementArr(arr,num,style) {
                let  newarr = []
                if (style ===1) {  //补全后面
                    let len = num - arr.length
                    for (let i = 0;i<=len; i++) {
                        newarr.push(null)
                    }
                    return [...arr,...newarr]
                } else {//补全前面
                    if(this.weekNum!=0) {
                        for (let i = 0; i<this.weekNum;i++ ) {
                            newarr.push(null)
                        }
                        return newarr
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .calendar{
        width: 100%;
        height: 100%;
    }
    .week_ul{
        padding-left: 0.16vw;
        font-size: 0.63vw;
        color: rgba(255,255,255,0.5);
        margin-bottom: 0.93vh;
    }

    .calendar-ul{
        display: flex;

        .calendarItem{
            font-size: 0.63vw;
            color: #fff;
        }
    }
    .calendar-col{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 15vh;
        margin-top: 1vh;
        color: #fff;
    }
    .calendar-row{
        width: 100%;
        .item{
            width: 1vw;
            height: 2vh;
        }
    }

    /*  日历的线*/
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

    //字体颜色
    .excellent_c{
        color: #00ff86;
    }
    .good_c{
        color: #009aff;
    }
    .mild_c{
        color: #ffe400;
    }
    .medium_c{
        color: #fe7d44;
    }
    .severe_c{
        color: #ff5b5e;
    }
    .severity_c{
        color: #d90a0a;
    }

</style>