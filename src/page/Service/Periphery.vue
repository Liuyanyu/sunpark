<template>
    <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-40">周边服务
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                     <template>
                        <p v-html="webServicePeripheryCnInfo.peripheryContent"></p>
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

export default {
    data(){
        return {
            webServicePeripheryCnInfo: {
                peripheryContent: null
            },
            bannerUrl: ''
        }
    },
    methods: {
        queryList(){
            api.queryPeripheryCn().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                // console.log(object)
                this.webServicePeripheryCnInfo = object.webServicePeripheryCnInfo
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                }
            })
        }
    },
    async mounted(){
        this.queryList()
    }
}
</script>

<style lang="scss" scoped>
.dl {
    &-list {
        &>dd {
            padding-bottom: 15px
        }
    }
}
</style>