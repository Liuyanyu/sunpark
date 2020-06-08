<template>
    <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-40">医务室
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                   <template>
                       <p v-html="webServiceInfirmaryCnInfo.infirmaryContent"></p>
                    </template>
                </dl>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {prefixUrl} from '@/utils/filters'
import api from '@/api'
export default {
    data(){
        return {
            webServiceInfirmaryCnInfo: {
                infirmaryContent: null
            },
            bannerUrl: ''
        }
    },
    methods: {
        queryList(){
            api.queryInfirmaryCn().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                console.log(object)
                this.webServiceInfirmaryCnInfo = object.webServiceInfirmaryCnInfo
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