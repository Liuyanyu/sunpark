<template>
    <div>
        <div class="banner image is-3by1">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
        <div class="main">
            <div class="container">
                <div class="nav-btns text-center pad-top-40 pad-bottom-40" id="btns">
                    <router-link class="button active" :to="{path: '/raiders/openTime#btns'}">开放时间</router-link>
                    <router-link class="button" :to="{path: '/raiders/recommend#btns'}">游园路线</router-link>
                    <router-link class="button" :to="{path: '/raiders/attractions#btns'}">园区景点</router-link>
                    <router-link class="button" :to="{path: '/raiders/traffic#btns'}">园内交通</router-link>
                    <router-link class="button" :to="{path: '/raiders/stalls#btns'}">游园导览</router-link>
                </div>
                <div class="content">
                    <div class="content pad-top-40" v-html="intro">
                    </div>
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
            intro: '',
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
        //this.getRaidersBanner()
    },
    methods:{
        getOpenTime(){
            api.getOpenTimeCn().then(res => {
                const { code, object, msg } = res.data
                if (code == 0) {
                    this.intro = (object.webRaidersTimeCnInfo.timeContent)
                    if(object.bgImg && object.bgImg.bgImg){
                        this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                    }
                } else {
                    this.intro = msg
                }
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