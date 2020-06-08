<template>
    <div>
        <div class="banner" :style="'max-height:' + slideHeight + 'px'">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
        <div class="main">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                     <router-link class="button active" :to="{path: '/en/raiders/openTime#btns'}">TIME</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/recommend#btns'}">RECOMMEND</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/attractions#btns'}">ATTRACTIONS</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/traffic#btns'}">TRAFFIC</router-link>
                    <router-link class="button" :to="{path: '/en/raiders/stalls#btns'}">STALLS</router-link>
                </div>
                <div class="content">
                    <dl class="dl-list">
                        <template v-for="(item, index) in timeList">
                            <dt class="col-1">
                                <i class="icon-dt"></i>
                            </dt>
                            <dd>
                                <h4>{{item.timeNameEn}}</h4>
                                <p v-html="item.timeContentEn"></p>
                            </dd>
                        </template>

                        <template v-if="timeTable">
                            <dt class="col-1">
                                <i class="icon-dt"></i>
                            </dt>
                            <dd>
                                <h4>Park equipment operation ：</h4>
                                <table class="table-bordered">
                                    <thead>
                                        <tr>
                                            <th>project name</th>
                                            <th>opening hours</th>
                                            <th>turn-off time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in timeTable">
                                            <td>{{item.facilityNameEn}}</td>
                                            <td>{{item.beginTime}}</td>
                                            <td>{{item.endTime}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </dd>
                        </template>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import {formatText, prefixUrl} from '@/utils/filters'
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            timeList: [],
            timeTable: [],
            bannerUrl: ''
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
    async mounted(){
        this.getOpenTime()
        this.getRaidersBanner()
    },
    methods:{
        getOpenTime(){
            api.getOpenTime().then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }

                let timeList = [], timeTable = []
                object.webRaidersTimeList.forEach(item => {
                    if(item.timeType === 1){
                        timeList.push({
                            timeNameEn: item.timeNameEn,
                            timeContentEn: formatText(item.timeContentEn)
                        })
                    }else if(item.timeType === 2){
                        timeTable = item.webRaidersTimeFacilityList
                    }
                })

                this.timeList = timeList
                this.timeTable = timeTable
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
    }
}
</script>

<style scoped>

</style>