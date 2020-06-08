<template>
    <div>
    <div class="banner image is-3by1" v-if="bannerUrl">
            <img v-lazy="bannerUrl" style="width: 100%;" />
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-40">游客咨询
                </h2>
            </div>
            <div class="pad-top-40">
                <div class="row commit-row" v-if="helpList">
                    <div class="col-10-l push-1-l">
                        <dl class="dl-list">
                            <template v-for="(item, index) in helpList">
                                <dt class="col-1">
                                    <i class="icon-dt"></i>
                                </dt>
                                <dd>
                                    <h5 class="text-overflow commit-title">{{item.helpContent}} <small class="pull-right text-gray">{{item.createTime | getDay}}</small></h5>
                                    <p class="gap-b-0" v-text="item.helpReply"></p>
                                </dd>
                            </template>
                        </dl>
                        <div class="text-right" v-if="helpTotal>5">
                            <pager
                                :page-count="helpCount"
                                :click-handler="queryHelp"
                                :prev-text="'上一页'"
                                :next-text="'下一页'"
                                :container-class="'pager'">
                            </pager>
                        </div>  

                    </div>
                </div>
                
                <no-result v-else></no-result>

                <div class="text-center pad-top-40">
                    <button class="button" @click="showCommit">我要咨询</button>
                </div>
            </div>
        </div>
        <modal height="auto" :scrollable="true" name="commit">
            <commit-form actions="help" @close="hideCommit"></commit-form>
        </modal>
    </div>
    </div>
</template>

<script>
import {prefixUrl} from '@/utils/filters'
import api from '@/api'
import CommitForm from '@/components/CommitForm'
import NoResult from '@/components/NoResult'
import Pager from 'vuejs-paginate'

export default {
    components: {
        CommitForm,
        Pager,
        NoResult
    },
    data() {
        return {
            helpList: [],
            helpCount: 0,
            helpTotal: 0,
            bannerUrl: ''
        }
    },
    methods: {
        showCommit () {
            this.$modal.show('commit');
        },
        hideCommit () {
            this.$modal.hide('commit');
        },
        queryHelp(pageNum){
            api.queryHelp('help', pageNum).then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                // console.log(object)
                this.helpTotal = object.totalNum
                this.helpCount = Math.ceil(object.totalNum/5)
                this.helpList = object.webServiceHelpList
                if (object.bgImg && object.bgImg.bgImg) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImg)
                }
            })
        }
    },
    filters: {
        getDay(time){
            return time.substr(0, 10)
        }
    },
    async mounted(){
        this.queryHelp(1)
    }
}
</script>

<style scoped lang="scss">

</style>