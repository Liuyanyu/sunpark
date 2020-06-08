<template>
    <div>
        <div class="banner">
            <img v-lazy="bannerUrl" alt="PARK INTRODUCTION">
        </div>
        <div class="main">
            <div class="container">
                <div class="pad-top-40 pad-bottom-60">
                    <div class="page-header">
                        <h2 class="page-title font-400 pad-bottom-10">PARK INTRODUCTION
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
import api from '@/api'
import {formatText, prefixUrl} from '@/utils/filters'

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
            api.getIntroduction().then(res => {
                const { code, msg, object } = res.data
                if (code == 0) {
                    this.intro = formatText(object.webOursAboutInfo.contentEn)
                    if(object.bgImg && object.bgImg.bgImg){
                        this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
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