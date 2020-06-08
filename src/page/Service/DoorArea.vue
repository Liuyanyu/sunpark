<template>
    <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-40">门区分布
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    <template>
                       <p v-html="webServiceDoorCnInfo.doorContent"></p>
                    </template>
                </dl>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import api from '@/api'
import {prefixUrl, formatText} from '@/utils/filters'

export default {
    data(){
        return {
            webServiceDoorCnInfo: {
                doorContent:null
            },
            bannerUrl: ''
        }
    },
    methods: {
        getDoor(){
            api.getDoorCn().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                this.webServiceDoorCnInfo = object.webServiceDoorCnInfo
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                }
            })
        }
    },
    async mounted(){
        this.getDoor()
    }
}
</script>

<style scoped>

</style>