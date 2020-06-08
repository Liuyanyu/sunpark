<template>
    <div>
        <div class="page-header">
            <div class="row">
                 <div class="col-1-3-l text-center push-1-3-l">
                    <h2 class="page-title font-400 pad-bottom-10">新闻公告
                        <small>IN THE NEWS</small>
                    </h2>
                </div>
                <div class="col-1-3-l pull-1-3-l pad-bottom-10">
                    <v-select :options="dateOptions" class="page-header-select" placeholder="更多资讯" @change="selectMonth" :value="dateVal"></v-select>
                </div>
            </div>
        </div>
        <div class="imgtext-list list-unstyled">
            <div class="row imgtext-item" v-for="(item, index) in list">
                <div class="col-3-m pad-bottom-10">
                    <router-link :to="'/ours/news/' + item.newsId" class="img-transition block">
                        <img v-lazy="item.newsLogo" class="img-fluid" :alt="item.newsName">
                    </router-link>
                </div>
                <div class="col-9-m">
                    <h4 class="pad-bottom-20">
                        <router-link :to="'/ours/news/' + item.newsId">{{item.newsName}}</router-link>
                    </h4>
                    <p>{{item.newsIntro | newsText}}</p>
                    <p class="date pad-top-20">{{item.newsDate}}</p>
                </div>
            </div>
            <infinite-loading ref="infiniteLoading" @infinite="queryList">
                <span slot="no-more">
                    没有更多了:)
                </span>
                <no-result slot="no-results"></no-result>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import {prefixUrl, todu} from '@/utils/filters'
import Select from '@/components/Select'
import NoResult from '@/components/NoResult'
import InfiniteLoading from 'vue-infinite-loading'
import api from '@/api'

export default {
    components: {
        VSelect: Select,
        InfiniteLoading,
        NoResult
    },
    data() {
        return {
            list: [],
            pageNum: 1,
            dateVal: '-'
        }
    },
    methods: {
        queryList($state, val) {
            const [selectYear, selectMonth] = this.dateVal.split('-')
            api.queryNews(this.pageNum, selectYear, selectMonth).then(res => {
                const { msg, code, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    $state.complete()
                    return
                }
                // console.log(prefixUrl)
                const newList = object.webOursNewList.map(item => {
                    item.newsLogo = prefixUrl(item.newsLogo)
                    return item
                })

                if(newList.length){
                    this.list = this.list.concat(newList)
                    this.pageNum++
                    $state.loaded()
                }else{
                    $state.complete()
                }
            })
        },
        selectMonth(val){
            this.dateVal = val
            this.pageNum = 1
            this.list = []
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            })
        }
    },
    filters: {
        newsText(text) {
            return text.length > 240 ? text.substr(0, 240) + '...' : text
        },
        prefixUrl
    },
    async mounted() {
        // this.queryList()
    },
    computed: {
        dateOptions(){
            const month = 24
            let result = []
            let dateObj = new Date()
            dateObj.setMonth(dateObj.getMonth()-month + 1)
            for(let i=0; i< month; i++){
                const curYear = dateObj.getFullYear()
                const curMonth = dateObj.getMonth() + 1
                result.push({
                    label: curYear + '年' + curMonth + '月',
                    value: curYear + '-' + todu(curMonth)
                })
                dateObj.setMonth(curMonth)
            }
            result.push({
                label: '全部',
                value: '-'
            })

            return result.reverse()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/base/_mixins";

.imgtext{
    &-list{
        min-height: 300px;
    }
    &-item {
        padding: 40px 0;
        border-bottom: 1px solid #eee;
        &>.col-3 {
            padding-left: 0;
        }
        p {
            margin: 0
        }
        @include breakpoint(m){
            padding: 50px 0;
            .date {
                padding-top: 60px
            }
        }
    }
}

</style>