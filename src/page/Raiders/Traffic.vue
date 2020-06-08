<template>
    <div>
        <div class="raiders-container banner" :style="'max-height:' + slideHeight + 'px'">
            <img v-lazy="bannerUrl" style="width: 100%;" />
            <div class="pos-wrap">
                <span v-for="(item, index) in pointers" class="pos" :style="'left:'+item.distanceLeft+'%;top:'+item.distanceTop+'%'">{{item.locationName}}</span>
            </div>
            <div :class="barFixed == true ? 'isFixed' :'mapbar'">
                <div class="container">
                    <div class="mapbar-btns">
                        <button :class="{'active': curTraffic.trafficId===item.trafficId}" v-for="item in btns" @click="queryList(item)">{{item.trafficName}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="main" style="z-index: 100;position: relative;background-color: white;">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <router-link class="button" :to="{path: '/raiders/openTime#btns'}">开放时间</router-link>
                    <router-link class="button" :to="{path: '/raiders/recommend#btns'}">游园路线</router-link>
                    <router-link class="button" :to="{path: '/raiders/attractions#btns'}">园区景点</router-link>
                    <router-link class="button active" :to="{path: '/raiders/traffic#btns'}">园内交通</router-link>
                    <router-link class="button" :to="{path: '/raiders/stalls#btns'}">游园导览</router-link>
                </div>
                <!-- <h3 class="list-heading">
                    {{curTraffic.trafficName}}
                </h3> -->
                <!-- <ul class="imgtext-list list-unstyled">
                    <li class="row" v-for="item in vehicles">
                        <div class="col-3-m pad-bottom-10">
                            <div class="img-transition block image is-16by9">
                                <img v-lazy="item.vehicleImg" class="img-fluid" :alt="item.vehicleName">
                            </div>
                        </div>
                        <div class="col-9-m">
                            <h4 class="pad-bottom-10">
                                {{item.vehicleName}}
                            </h4>
                            <p>票价： {{item.vehiclePriceYuan}}元</p>
                            <p>押金： {{item.vehiclePledgePriceYuan}}元</p>
                            <p class="date pad-top-20">{{item.vehicleExplain}}</p>
                        </div>
                    </li>
                </ul> -->
                <div style="margin-bottom: 50px;">
                    <a href='javascript:;' :class="{'project':true, 'cursor-default': !item.siteLink}" v-for="(item, index) in vehicles">
                      <div class="row">
                          <div class="col-4 project-title pad-left-10">
                              <div class="text-table">
                                  <div class="text-table-cell">
                                      {{item.vehicleName}}
                                      <small class="none block-l pad-top-20" v-html="item.vehicleExplain"></small>
                                  </div>
                              </div>
                          </div>
                          <div class="col-8 push-4">
                              <div class="project-img" :style="'background-image:url('+item.vehicleImg+')'"></div>
                          </div>
                      </div>
                    </a>
                </div>
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
            vehicles: [],
            curKey: 1,
            btns: [],
             pageNum: 1,
            curTraffic: {},
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
            this.curTraffic = obj
            this.getTrafficLocation()
            this.getTrafficVehicle()
        },
        queryTraffic(){
            api.queryTraffic().then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.btns = object.webRaidersTrafficList
                
                this.queryList(object.webRaidersTrafficList[0])
            })
        },
        getTrafficLocation(){
            // this.curTraffic = obj
            api.getTrafficLocation(this.curTraffic.trafficId).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.pointers = object.webRaidersTrafficLocationList
            })
        },
        getTrafficVehicle(){
            // this.curTraffic = obj
            api.getTrafficVehicle(this.curTraffic.trafficId).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                this.vehicles = object.webRaidersTrafficVehicleList.map(item => {
                    item.vehicleImg = prefixUrl(item.vehicleImg)
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
        this.queryTraffic()
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
.project {
  &-img {
    padding-top: 45%;
    background-color: #ccc;
    background-position: center;
    background-size: 100% auto;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-size: 110% auto;
    }
  }
}
@media screen and (max-width: 740px) {
  .project-title {
    font-size: 14px;
  }
}
</style>