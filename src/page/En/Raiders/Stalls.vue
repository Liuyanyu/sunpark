<template>
    <div>
        <div class="raiders-container banner" :style="'max-height:' + slideHeight + 'px'">
            <img v-lazy="bannerUrl" style="width: 100%;" />
            <div class="pos-wrap">
                <span v-for="(item, index) in pointers" class="pos" :style="'left:'+item.distanceLeft+'%;top:'+item.distanceTop+'%'">{{item.sellNameEn}}</span>
            </div>
            <div :class="barFixed == true ? 'isFixed' :'mapbar'">
                <div class="container">
                    <div class="mapbar-btns">
                        <button :class="{'active': curStall.stallId===item.stallId}" v-for="item in btns" @click="queryList(item)">{{item.stallNameEn}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="main" style="z-index: 100;position: relative;background-color: white;">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <router-link class="button" :to="{path: '/en/raiders/openTime#btns'}">TIME</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/recommend#btns'}">RECOMMEND</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/attractions#btns'}">ATTRACTIONS</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/traffic#btns'}">TRAFFIC</router-link>
                    <router-link class="button active" :to="{path: '/en/raiders/stalls#btns'}">STALLS</router-link>
                </div>
                <h3 class="list-heading">
                    {{curStall.stallNameEn}}
                </h3>
                <ul class="imgtext-list list-unstyled">
                    <li class="row" v-for="item in commoditys">
                        <div class="col-3-m pad-bottom-10">
                            <div class="img-transition block image is-16by9">
                                <img v-lazy="item.commodityImg" class="img-fluid" :alt="item.commodityNameEn">
                            </div>
                        </div>
                        <div class="col-9-m">
                            <h4 class="pad-bottom-10">
                                {{item.commodityNameEn}}
                            </h4>
                            <p>Price： ${{item.commodityPriceYuan}}</p>
                            <p class="date pad-top-20">{{item.commodityExplainEn}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import {prefixUrl} from '@/utils/filters'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            commoditys: [],
            curKey: 1,
            btns: [],
            curStall: {},
            pointers: [],
            bannerUrl: '',
            barFixed: false
        }
    }, 
    computed: {
        ...mapGetters({
            device: 'device',
        }),
        slideHeight() {
            return this.device.isMobile ? 360 : this.device.height - 62
        }
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
        queryList(obj){
            this.curStall = obj
            this.getStallSell()
            this.getStallCommodity()
        },
        queryStall(){
            api.queryStall().then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.btns = object.webRaidersStallList
                
                this.queryList(object.webRaidersStallList[0])
            })
        },
        getStallSell(){
            // this.curStall = obj
            api.getStall(this.curStall.stallId).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.pointers = object.webRaidersStallSellList
            })
        },
        getStallCommodity(){
            // this.curStall = obj
            api.getStallCommodity(this.curStall.stallId).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.commoditys = object.webRaidersStallCommodityList.map(item => {
                    item.commodityImg = prefixUrl(item.commodityImg)
                    return item
                })
            })
        },
        getRaidersBanner(){
            api.getRaidersBanner().then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.bannerUrl = prefixUrl(object.webRaidersBannerInfo.bannerImg)
                console.log(object)
            })
        }
    },
    async mounted(){
        this.queryStall()
        this.getRaidersBanner()
    }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/base/_mixins";

.raiders{
    &-container{
        // background-size:100% auto
    }
}
.imgtext-list {
    &>li {
        padding: 40px 0;
        border-bottom: 1px solid #eee;
        &>.col-3 {
            padding-left: 0;
        }
        p {
            margin: 0
        }
    }
}

@include breakpoint(m) {
    .imgtext-list {
        &>li {
            padding: 50px 0;
            .date {
                padding-top: 40px
            }
        }
    }
}
</style>