<template>
    <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-40">卫生间
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    <template >
                        <p v-html="webServiceTolietCnInfo.tolietContent"></p>
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
    data() {
        return {
            webServiceTolietCnInfo: {
                tolietContent: null
            },
            bannerUrl: ''
        }
    },
    methods: {
        query() {
            api.getToiletCn().then(res => {
                const { code, msg, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    return false
                }

                this.webServiceTolietCnInfo = object.webServiceTolietCnInfo
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                }
            })
        }
    },
    async mounted() {
        // console.log(this.filters)
        this.query()
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