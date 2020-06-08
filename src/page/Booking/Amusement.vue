<template>
    <div class="">
      <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" alt="公园介绍">
      </div>
        <div class="main">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <a class="button" style="border-color: #ebebeb;background-color: #ebebeb;" target="_blank" href="http://presell.sun-park.com/">门票购买</a>
                    <a class="button" style="border-color: #ebebeb;background-color: #ebebeb;" target="_blank" href="http://presell.sun-park.com/">年月票续费</a>
                    <router-link class="button active" :to="{path: '/booking/amusement#btns'}">游乐票预订</router-link>
                    <router-link class="button" :to="{path: '/booking/site#btns'}">场地预订</router-link>
                    <router-link class="button" :to="{path: '/booking/other#btns'}">其它票务</router-link>
                </div>
                <div>
                    <h3 class="list-heading pad-bottom-10">
                        单项预订
                    </h3>
                    <ul class="imgtext-v-list imgtext-list list-unstyled row">
                        <li class="col-1-4-m col-1-2" v-for="item in facilitys">
                            <div class="relative" :class="{'active': item.active}" @click="selectFacility(item)">
                                <a href="javascript:;" class="img-transition image is-16by9"><img v-lazy="item.facilityImg" class="img-fluid" alt=""></a>
                                <div class="pad-top-5 desc">
                                    <h4 class="text-overflow line-1">
                                        {{item.facilityName}}
                                    </h4>
                                    <div class="text-overflow line-1" :title="item.facilityExplain"><span class="gap-r-5">{{item.facilityPriceYuan}}元</span> {{item.facilityExplain}}</div>
                                    <span class="label check-label" :class="{'active': item.active}">{{item.active? '已选' : '暂未开放'}}</span>
                                </div>
                            
                            </div>
                        </li>
                    </ul>
                    <div class="text-right" v-if="facilityTotal>12">
                        <pager
                            :page-count="facilityCount"
                            :click-handler="queryFacilitys"
                            :prev-text="'上一页'"
                            :next-text="'下一页'"
                            :container-class="'pager'">
                        </pager>
                    </div>  

                    <h3 class="list-heading pad-bottom-10 pad-top-30">
                        套票预订
                    </h3>

                    <ul class="imgtext-h-list imgtext-list list-unstyled">
                        <li class="row" v-for="(item, index) in facilityPackages" :class="{'active': item.active}" @click="selectFacility(item)">
                            <div class="col-12 col-1-4-m"><a href="javascript:;" class="img-transition image is-16by9"><img v-lazy="item.packageImg" class="img-fluid" alt=""></a></div>
                            <div class="col-12 col-3-4-m">
                                <div class="text-nowrap text-overflow line-1">
                                    {{item.packageName}}
                                    <h4 class="price">{{item.packagePriceYuan}}元</h4>
                                </div>
                                <div>
                                    <p class="no-margin text-overflow line-3">{{item.packageInclude}}</p>
                                    <p class="no-margin sub-desc text-overflow line-1">{{item.packageExplain}}</p>
                                </div>
                            </div>
                            <span class="label" :class="{'active': item.active}">{{item.active? '已选' : '暂未开放'}}</span>
                        </li>
                    </ul>
                    <div class="text-right" v-if="facilityPackageTotal>5">
                        <pager
                            :page-count="facilityPackageCount"
                            :click-handler="queryFacilityPackage"
                            :prev-text="'上一页'"
                            :next-text="'下一页'"
                            :container-class="'pager'">
                        </pager>
                    </div>  
                    <div class="pad-top-40 pad-bottom-40 text-center none">
                        <button class="button button-lg">确认购买</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import {prefixUrl} from '@/utils/filters'
import Pager from 'vuejs-paginate'

export default {
    components: {
        Pager
    },
    data(){
        return {
            facilitys: [],
            facilityCount: 0,
            facilityTotal: 0,
            facilityPackageTotal: 0,
            facilityPackageCount: 0,
            facilityPackages: [],
            bannerUrl: ''
        }
    },
    async mounted(){
        this.queryFacilitys(1)
        this.queryFacilityPackage(1)
    },
    methods: {
        queryFacilitys(pageNum){
            api.queryFacilitys(pageNum).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg);
                }
                this.facilitys = object.webBookingAmusementFacilityTickets.map(item => {
                    item.facilityImg = prefixUrl(item.facilityImg)
                    item.active = false
                    return item
                })
                this.facilityTotal = object.totalNum
                this.facilityCount = Math.ceil(object.totalNum/12)
            })
        },
        queryFacilityPackage(pageNum){
            api.queryFacilityPackage(pageNum).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                this.facilityPackages = object.webBookingAmusementFacilityTicketPackageList.map(item => {
                    item.packageImg = prefixUrl(item.packageImg)
                    item.active = false
                    return item
                })
                this.facilityPackageTotal = object.totalNum
                this.facilityPackageCount = Math.ceil(object.totalNum/5)
            })
        },
        selectFacility(item){
            //item.active = !item.active
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/base/_mixins";
$primary: #168c74;

.imgtext {
    &-list {
        // margin-left: -5px;
        // margin-right: -5px;
        &>li {
            // margin: 0 -5px 30px -5px;
            // border: 1px solid #ccc;
            // padding: 5px;
        }
    }
    &-h-list {
        &>li {
            padding: 5px 0;
            border: 1px solid #ccc;
            margin-bottom: 15px;
            &.active{
                border-color: $primary
            }
            .col-5 {
                padding-left: 5px;
            }

            .price{
                color: $primary;
                font-size: 20px;
                padding: 6px 0;
                font-weight: 400
            }

            .sub-desc{
                padding: 5px 45px 5px 0;
                color: #999;
                // position: absolute;
                // bottom: 5px;
                // left: 5px;
                margin-top: 20px
            }
        }
    }
    &-v-list {
        margin-left: -10px;
        margin-right: -10px;
        @include m(){
            margin-left: -5px;
            margin-right: -5px;
        }
        &>li {
             @include m(){
                padding:5px
            }
            padding: 10px;
            margin-bottom: 15px;
            &>div {
                border: 1px solid #ccc;
                padding: 5px;
                &.active{
                    border-color: $primary
                }
            }
            .desc{
                position: relative;
                padding-right: 50px;
            }
            .check-label{
                position: absolute;
                top: 18px;
                right: 0;
                height: 22px;
            }
        }
    }
}

.item {
    &-1 {
        border: 1px solid #ccc;
        padding: 5px;
        margin-bottom: 30px;
        position: relative;
        p {
            margin-bottom: 0
        }
    }
}

.label {
    position: absolute;
    right: 6px;
    bottom: 10px;
    border: 1px solid #ccc;
    font-size: 14px; // line-height: 16px;
    padding: 0 8px;
    &.active {
        background-color: #ccc;
        color: #fff
    }
}
@media screen and (max-width: 740px){
    .relative h4 {
        font-size: 14px;
    }
    .relative span {
        font-size: 12px;
    }
}
</style>