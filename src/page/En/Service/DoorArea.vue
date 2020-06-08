<template>
    <div>
    <div class="banner container">
            <img v-lazy="bannerUrl"/>
        </div>
    <div class="pad-top-40">
        <div class="container">
            <h2 class="text-center font-400 pad-bottom-40">{{door.doorNameEn}}</h2>
            <div class="main text-center">
                <img class="img-fluid" :src="door.doorImg" alt="">
                <p class="pad-top-40 text-left" v-html="door.doorContentEn"></p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import api from '@/api'
import {prefixUrl, formatText} from '@/utils/filters'

export default {
    data(){
        return {
            door: {

            },
            bannerUrl: ''
        }
    },
    methods: {
        getDoor(){
            api.getDoor().then(res  => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
                console.log(object)
                let door = object.webServiceDoor
                door.doorImg = prefixUrl(door.doorImgEn)
                door.doorContentEn = formatText(door.doorContentEn)
                // this.door = object.webServiceDoor
                this.door = door
                if (object.bgImg && object.bgImg.bgImgEn) {
                    this.bannerUrl = prefixUrl(object.bgImg.bgImgEn)
                }
            })
        }
    },
    async mounted(){
        this.getDoor()
    }
}
</script>

<style scoped>

</style>