<template>
    <div>
    <div class="banner container" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-10">失物招领
                    <small>LOST AND FOUND</small>
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list">
                    
                    <template v-for="(item, index) in list">
                        <dt class="col-1"><i class="icon-dt"></i></dt>
                        <dd>{{item.lostContent}}</dd>
                    </template>
                </dl>
            </div>
            <div class="pad-top-40">
                <table class="table-bordered">
                    <thead>
                        <tr>
                            <th>物品名称</th>
                            <th>类别</th>
                            <th>拾捡时间</th>
                            <th>拾捡地点</th>
                        </tr>
                    </thead>
                    <tbody>
                     <tr v-for="(t, index) in articleList">
                        <td>{{t.articleName}}</td>
                        <td>{{t.articleType}}</td>
                        <td>{{t.articleTime}}</td>
                        <td>{{t.articleLocation}}</td>
                    </tr>
                    </tbody>
                </table>
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
            bannerUrl: '',
            articleList: [],
            articleCount: 0
        }
    },
    methods: {
        queryList(){
            api.queryLost().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                console.log(object)
                this.list = object.webServiceLostList
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                }
            })  
        },
        queryArticleList(pageNum){
            api.queryLostArticle(pageNum).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                this.articleCount = Math.ceil(object.totalNum/10)
                this.articleList = object.webServiceLostArticleList
                
            })
        }
    },
    async mounted(){
        this.queryList()
        this.queryArticleList(1)
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
table{
    text-align: center;
}
</style>