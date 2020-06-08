<template>
    <div>
    <div class="banner container">
            <img v-lazy="bannerUrl"/>
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-10">PERIPHERAL SERVICES
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    <template v-for="(item, index) in list">
                        <dt class="col-1">
                            <i class="icon-dt"></i>
                        </dt>
                        <dd>
                            <h4 v-text="item.peripheryNameEn"></h4>
                            <p v-html="item.peripheryContent"></p>
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

export default {
    data(){
        return {
            list: [],
            bannerUrl: ''
        }
    },
    methods: {
        queryList(){
            api.queryPeriphery().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                // console.log(object)
                this.list = object.webServicePeripherieList.map(item => {
                    item.peripheryContent = formatText(item.peripheryContentEn)
                    if (object.bgImg && object.bgImg.bgImgEn) {
                        this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
                    }
                    return item
                })
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