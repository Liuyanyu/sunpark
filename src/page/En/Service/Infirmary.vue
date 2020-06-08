<template>
    <div>
    <div class="banner container">
            <img v-lazy="bannerUrl"/>
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-10">CLINIC INFORMATION
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    <template v-for="(item, index) in list">
                        <dt class="col-1">
                            <i class="icon-dt"></i>
                        </dt>
                        <dd v-text="item.infirmaryContentEn"></dd>
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
            list: [],
            bannerUrl: ''
        }
    },
    methods: {
        queryList(){
            api.queryInfirmary().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                console.log(object)
                this.list = object.webServiceInfirmarieList
                if (object.bgImg && object.bgImg.bgImgEn) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
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