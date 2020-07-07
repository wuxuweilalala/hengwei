<template>
    <Swiper :options="swiperOption">
        <template v-for="(item, index) in dataList">
            <swiper-slide :key="index">
                <WarnTips :msgForecast="item" />
            </swiper-slide>
        </template>
    </Swiper>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "Swiper",
        components: {
            Swiper,
            SwiperSlide
        },
        props: {
            dataList:Array,
            swiperOption:Object
        }
    }
</script>

<style scoped lang="scss">
    .swiper-container{
        height: 100%;
        .swiper-slide{
            display: flex;
            align-items: center;
        }
    }
</style>