<template>
    <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-40">停车场
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    <template>
                       <p v-html="webServiceParkingCnInfo.parkingContent"></p>
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

let list = [], total = 0

export default {
    data(){
        return {
            webServiceParkingCnInfo: {
                parkingContent:null
            },
            bannerUrl: ''
        }
    },
    methods: {
        query() {
            api.getParkingCn().then(res => {
                const { msg, code, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    return
                }
                
                this.webServiceParkingCnInfo = object.webServiceParkingCnInfo
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                }
            })
        }
    },
    async mounted(){
        this.query()
    }
}
</script>

<style lang="scss" scoped>
.dl {
    &-list {
        &>dd {
            padding-bottom: 15px;
            &.dd-title{
                padding-left:4.3%
            }
        }
    }
}
</style>