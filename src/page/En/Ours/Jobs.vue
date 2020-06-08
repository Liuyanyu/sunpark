<template>
    <div>
        <div class="banner">
            <img v-lazy="bannerUrl" alt="TALENT RECRUITMENT">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
        <div class="page-header">
            <h2 class="page-title font-400 pad-bottom-10">TALENT RECRUITMENT
            </h2>
        </div>
        <div class="pad-top-40">
            <dl class="dl-list">
                <template v-for="(item, index) in jobs">
                    <dt class="col-1">
                        <i class="icon-dt"></i>
                    </dt>
                    <dd>
                        <p class="fs-4">招聘： {{item.jobNameEn}}</p>
                        <p>招聘人数：{{item.jobNum}}人</p>
                        <p class="subtitle">招聘条件：</p>
                        <p v-html="item.jobCondition"></p>
                        <p class="subtitle">岗位职责：</p>
                        <p v-html="item.jobDutyEn"></p>
                        <p class="text-indent" v-html="item.jobRemarkEn"></p>
                    </dd>
                </template>
            </dl>
        </div>
    </div>
            </div></div></div>
</template>

<script>
import {formatText, prefixUrl} from '@/utils/filters'
import api from '@/api'
export default {
    data() {
        return {
            jobs: [],
            bannerUrl: ''
        }
    },
    methods: {
        queryJobs() {
            api.queryJobs().then(res => {
                const { code, object, msg } = res.data
                if (code != 0) {
                    console.error(msg)
                    return false
                }

                this.jobs = object.webOursJobList.map(item => {
                    item.jobCondition = formatText(item.jobConditionEn)
                    return item
                })

                if(object.bgImg && object.bgImg.bgImg){
                    this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
                }
            })
        }
    },
    async mounted() {
        this.queryJobs()
    }
}
</script>

<style scoped lang="scss">
.subtitle{
    margin-bottom: 5px
}
</style>