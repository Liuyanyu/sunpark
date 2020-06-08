<template>
    <router-view>
    </router-view>
    <!-- <div class="">
       
        <div class="main">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <router-link class="button" :to="{path: '/booking/entrance#btns'}">门票购买</router-link>
                    <a class="button" style="border-color: #ebebeb;background-color: #ebebeb;" target="_blank" href="http://www.baidu.com">年月票续费</a>
                    <router-link class="button" :to="{path: '/booking/amusement#btns'}">游乐票预订</router-link>
                    <router-link class="button" :to="{path: '/booking/site#btns'}">场地预订</router-link>
                    <router-link class="button" :to="{path: '/booking/other#btns'}">其它票务</router-link>
                </div>
                <router-view class="pad-bottom-60"></router-view>
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.banner {
    height: 800px;
    &-section {
        height: 800px;
        background: #333;
        position: relative;
    }
}
</style>