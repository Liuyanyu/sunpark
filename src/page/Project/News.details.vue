<template>
    <div class="main">
        <div class="container">
            <div class="pad-top-60 pad-bottom-60">
                <div class="page-header">
                <div class="row">
                    <div class="col-1-3-l text-center push-1-3-l">
                        <h2 class="page-title font-400 pad-bottom-10">新闻
                            <small>NEWS</small>
                        </h2>
                    </div>
                </div>
            </div>
            <slider v-if="slides && slides.length" class="slider" :arrows="true" :infinite="true" :autoplay="true">
                <div class="slide" v-for="(item, index) in slides" :style="'background-image:url('+item+');padding-top:'+paddingTop+''"></div>
            </slider>
            <div v-if="news" class="article pad-top-20">
                <p>{{news.newsDate}}</p>
                <h3 class="pad-bottom-20">{{news.newsName}}</h3>
                <p v-html="news.newsContent"></p>
            </div>
            <no-result v-else></no-result>
            <div class="player" v-if="video.url">
                <d-player :video="video"
                        :contextmenu="contextmenu"
                        ref="player">
                </d-player>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefixUrl, formatText } from '@/utils/filters'
import api from '@/api'
import Slider from '@/components/Agile'
import NoResult from '@/components/NoResult'
import VueDPlayer from 'vue-dplayer'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            slides: null,
            news: null,
            video: {},
            autoplay: false, 
            player: null,
            contextmenu: []
        }
    },
    components: {
        Slider,
        'd-player': VueDPlayer,
        NoResult
    },
    computed: {
        ...mapGetters({
            device: 'device',
        }),
        slideHeight() {
            return this.device.isMobile ? 300 : 500
        },
        paddingTop() {
            return (0.5625 / (this.slides.length*2)) * 100 + '%'
        }
    },
    async mounted() {
        const { id } = this.$route.params
        this.getNews(id)
    },
    methods: {
        getNews(id) {
            api.getNews(id).then(res => {
                console.log(res)
                const { code, msg, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    return false
                }

                // const {newsBanners}
                this.news = object.webOursNewsInfo
                this.news.newsContent = formatText(object.webOursNewsInfo.newsContent)
                this.slides = this.news.newsBanners.map(item => prefixUrl(item.bannerImg))
                if(object.webOursNewsInfo.newsVideo){
                    this.video.url = prefixUrl(object.webOursNewsInfo.newsVideo)
                    // this.player = this.$refs.player.dp
                }

                console.log(this.slides)
            })
        }
    },
    filters: {
        prefixUrl,
        formatText
    }
}
</script>

<style scoped lang="scss">
.slider {
    margin-top: 50px;
}

.slide {
    background: {
        position: center;
        size: cover;
    }
}
.player{
    max-width: 100%;
    width:600px;
    padding-top: 50px;
}
</style>