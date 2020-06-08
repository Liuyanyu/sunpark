<template>
    <div>
        <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" alt="公园介绍">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
                    <div class="page-header">
                        <h2 class="page-title font-400 pad-bottom-40">公园介绍
                        </h2>
                    </div>
                    <div class="content pad-top-40" v-html="intro">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//getIntroduction 
import api from '@/api'
import {prefixUrl} from '@/utils/filters'

console.log(api)
export default {
    data() {
        return {
            intro: '',
            bannerUrl: ''
        }
    },
    created() {
        this.getIntroduction()
    },
    methods: {
        getIntroduction() {
            api.getAboutCn().then(res => {
                const { code, msg, object } = res.data
                if (code == 0) {
                    this.intro = (object.webOursAboutCnInfo.aboutContent)
                    if(object.bgImg && object.bgImg.bgImg){
                        this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                    }
                } else {
                    this.intro = msg
                }
            })
        }
    }
}
</script>

<style scoped>
.content{
    word-break: break-word
}
</style>