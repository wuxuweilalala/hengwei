export function vhTopx(vh) {
    let data;
    if (typeof vh == "string") {
        data = vh.replace('vh', '') * innerHeight / 100
    } else {
        data = vh * innerHeight / 100
    }
    return data
}

export let territory_swiperOption = {
    // 分页器配置
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    // 设定初始化时slide的索引
    initialSlide: 0,
    //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    direction: 'horizontal', //vertical horizontal 方向
    // 自动切换图配置
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true
    },
    // 箭头配置
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 环状轮播
    loop: true,
    loopedSlides: 3,
    loopAdditionalSlides: 0,
    // 一个屏幕展示的数量
    slidesPerView: 1,
    // 间距
    // spaceBetween: 26,
    // 修改swiper自己或子元素时，自动初始化swiper
    observer: true,
    // 修改swiper的父元素时，自动初始化swiper
    observeParents: true,
    speed:1000, //速度
    // freeMode:true,
    // slidesPerView : 5,
    // autoplayDisableOnInteraction : false,
    // spaceBetween : 5,
}
export let  table_swiperOption = {
    //滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    height: vhTopx(3)*5,
    //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    direction: 'vertical', //vertical horizontal 方向
    // 自动切换图配置
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        // disableOnInteraction
    },
    mousewheelControl : true,
    // 环状轮播
    loop: true,
    // 一个屏幕展示的数量
    slidesPerView: 5,
    // 间距
    // spaceBetween: 26,
    // 修改swiper自己或子元素时，自动初始化swiper
    observer: true,
    // 修改swiper的父元素时，自动初始化swiper
    observeParents: true,
    speed:1000, //速度
}
export let  effluent_swiperOption = {
    //滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    height: vhTopx(5)*5,
    //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    direction: 'vertical', //vertical horizontal 方向
    // 自动切换图配置
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        // disableOnInteraction
    },
    mousewheelControl : true,
    // 环状轮播
    loop: true,
    // 一个屏幕展示的数量
    slidesPerView: 5,
    // 间距
    // spaceBetween: 26,
    // 修改swiper自己或子元素时，自动初始化swiper
    observer: true,
    // 修改swiper的父元素时，自动初始化swiper
    observeParents: true,
    speed:1000, //速度
}
export let  noise_swiperOption = {
    //滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    height: vhTopx(3.8)*5,
    //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    direction: 'vertical', //vertical horizontal 方向
    // 自动切换图配置
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        // disableOnInteraction
    },
    mousewheelControl : true,
    // 环状轮播
    loop: true,
    // 一个屏幕展示的数量
    slidesPerView: 5,
    // 间距
    spaceBetween: 5,
    // 修改swiper自己或子元素时，自动初始化swiper
    observer: true,
    // 修改swiper的父元素时，自动初始化swiper
    observeParents: true,
    speed:1000, //速度
}


export let forecast_swiperOption = {
    //滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    // height: vhTopx(2)*5,
    //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    direction: 'vertical', //vertical horizontal 方向
    // 自动切换图配置
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        // disableOnInteraction
    },
    mousewheelControl : true,
    // 环状轮播
    loop: true,
    // autoHeight:true,
    // 一个屏幕展示的数量
    slidesPerView: 1,
    // 间距
    // spaceBetween: 5,
    // 修改swiper自己或子元素时，自动初始化swiper
    observer: true,
    // 修改swiper的父元素时，自动初始化swiper
    observeParents: true,
    speed:1000, //速度
}