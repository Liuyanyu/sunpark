<template>
    <div>
        <div class="raiders-container">
            <div class="recommend-img" :style="'background-image:url('+ prefixUrl(curMapObj.recommendBgImg)+')'">
                <img width="100%" :src="prefixUrl(curMapObj.recommendImgEn)" />
            </div>
            <div :class="barFixed == true ? 'isFixed' :'mapbar'">
                <div class="container">
                    <div class="mapbar-btns">
                        <button :class="{'active': curMapObj.recommendId === item.recommendId}" v-for="item in btns" @click="getRecommend(item)">{{item.recommendNameEn}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                     <router-link class="button" :to="{path: '/en/raiders/openTime#btns'}">TIME</router-link>
                    <router-link class="button active" :to="{path: '/en/raiders/recommend#btns'}">RECOMMEND</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/attractions#btns'}">ATTRACTIONS</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/traffic#btns'}">TRAFFIC</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/stalls#btns'}">STALLS</router-link>
                </div>
                <!-- {{maps}} -->
                <bus-routes :routes="item" v-for="item in maps"></bus-routes>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import BusRoutes from '@/components/BusRoutes'
import { mapActions, mapGetters } from 'vuex'
import {prefixUrl} from '@/utils/filters'

export default {
    data() {
        return {
            routes: [],
            // curMapId: 1,
            curMapObj: {},
            btns: null,
            maps: [],
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
        // curMap() {
        //     return this.maps.find(map => map.id === this.curMapKey).map
        // }
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
            this.curMapObj = obj
            api.getRecommend(obj.recommendId).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                // this.routes = object.raidersRecommendPathList.map(item => ({name: item.pathName}))
                const list  = object.raidersRecommendPathList
                this.maps = list.reduce((result, next) => {
                    const key = next.recommendNumType
                    console.log(result)
                    if(result[key]){
                        result[key].push({
                            name: next.pathNameEn
                        })
                    }else{
                        result[key] = [{
                            name: next.pathNameEn
                        }]
                    }
                    return result
                }, {})

            })
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