<template>
    <div>
        <div class="raiders-container">
            <div class="recommend-img">
                <img width="100%" :src="prefixUrl(curMapObj.recommendImg)" />
            </div>
            <div :class="barFixed == true ? 'isFixed' :'mapbar'">
                <div class="container">
                    <div class="mapbar-btns">
                        <button :class="{'active': curMapObj.recommendId === item.recommendId}" v-for="item in btns" @click="getRecommend(item)">{{item.recommendName}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="main" style="z-index: 100;position: relative;background-color: white;">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <router-link class="button" :to="{path: '/raiders/openTime#btns'}">开放时间</router-link>
                    <router-link class="button active" :to="{path: '/raiders/recommend#btns'}">游园路线</router-link>
                    <router-link class="button" :to="{path: '/raiders/attractions#btns'}">园区景点</router-link>
                    <router-link class="button" :to="{path: '/raiders/traffic#btns'}">园内交通</router-link>
                    <router-link class="button" :to="{path: '/raiders/stalls#btns'}">游园导览</router-link>
                </div>
                <!-- {{maps}} -->
                <div class="content pad-top-40" v-html="content">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import BusRoutes from '@/components/BusRoutes'
import { mapActions, mapGetters } from 'vuex'
import {prefixUrl} from '@/utils/filters'
import ScrollTop from '@/components/ScrollTop'

export default {
    data() {
        return {
            routes: [],
            // curMapId: 1,
            curMapObj: {},
            btns: null,
            content: "",
            barFixed: false
        }
    },
    components: {
        BusRoutes
    },
    computed: {
        ...mapGetters({
            device: 'device',
        }),
        slideHeight() {
            return this.device.isMobile ? 360 : this.device.height - 62
        },
    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(scrollTop >=60){
                this.barFixed = true
            }else{
                this.barFixed = false
            }
        },
        queryRecommend(){
            api.queryRecommend().then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                const list = object.webRaidersRecommendList
                this.btns = list
                this.getRecommend(list[0])
            })
        },
        getRecommend(obj){
            // console.log('obj>>>>>>'+obj)
            this.curMapObj = obj
            this.content = obj.contentCn
        },
        prefixUrl
    },
    async mounted(){
        this.queryRecommend()
    }
}
</script>

<style lang="scss" scoped>
.recommend{
    &-img{
        text-align:center;
        overflow:hidden;
        background-size: 100% auto;        
        &>img{
            display: inline-block;
        }
    }
}
</style>