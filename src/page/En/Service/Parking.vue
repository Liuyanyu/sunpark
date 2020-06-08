<template>
    <div>
    <div class="banner container">
            <img v-lazy="bannerUrl"/>
        </div>
    <div class="main pad-top-40">
        <div class="container">
            <div class="page-header">
                <h2 class="page-title font-400 pad-bottom-10">PARKING INFORMATION
                </h2>
            </div>
            <div class="pad-top-40">
                <dl class="dl-list" v-if="list">
                    <template v-for="(item, index) in list">
                        <dd class="fs-4 dd-title pad-top-30">{{item.parkingNameEn}}</dd>
                        <template v-for="(children, index) in item.childrens" v-if="item.childrens">
                            <dt class="col-1"><i class="icon-dt"></i></dt>
                            <dd v-html="children.detailContentEn"></dd>
                        </template>
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

let list = [], total = 0

export default {
    data(){
        return {
            list: null,
            bannerUrl: ''
        }
    },
    methods: {
        queryParking() {
            api.queryParking().then(res => {
                const { msg, code, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    return
                }
                
                list = object.webServiceParkingList.sort((a, b) => a.sort - b.sort).map((item, index) => {
                    this.getParking(item.parkingId, index)
                    if (object.bgImg && object.bgImg.bgImgEn) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
                    }
                    return item
                })

                total = list.length
            })
        },
        getParking(id, index) {
            api.getParking(id).then(res => {
                const { msg, code, object } = res.data
                if (code != 0) {
                    console.error(msg)
                    return
                }
                
                list[index].childrens = object.webServiceParkingDetailList.map(item => {
                    item.detailContent = formatText(item.detailContent)
                    return item
                })

                if(index === total -1){
                    this.list = list
                }
                // this.list = list

                // this.$set(this.list[index].childrens, childrens)
                // console.log(this.list[index])
                // console.log(object)
                // this.$set('list', this.list)
            })
        }
    },
    async mounted(){
        this.queryParking()
        // this.getParking()
    }
}
</script>

<style lang="scss" scoped>
.dl {
    &-list {
        &>dd {
            padding-bottom: 15px;
            &.dd-title{
                padding-left:4.3%
            }
        }
    }
}
</style>