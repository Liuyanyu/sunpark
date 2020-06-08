<template>
    <div>
    <div class="banner container">
            <img v-lazy="bannerUrl"/>
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-10">ADMISSION NOTICE
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    <template v-for="(item, index) in notice">
                        <dt class="col-1">
                            <i class="icon-dt"></i>
                        </dt>
                        <dd>{{item.noticeContentEn}}</dd>
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
            notice: [],
            bannerUrl: ''
        }
    },
    methods: {
        query() {
            api.getNotices().then(res => {
                const { code, msg, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    return false
                }

                this.notice = object.webServiceNoticeList
                if (object.bgImg && object.bgImg.bgImgEn) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
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