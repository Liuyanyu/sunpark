<template>
    <div>
        <en-header :navs="navs"></en-header>
        <router-view class="body" :style="'min-height:'+minHeight+'px'"></router-view>
        <en-footer></en-footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EnHeader from "@/components/Header"
import EnFooter from "@/components/EnFooter"
import { data as navs } from '@/data/enNav'

navs.forEach((item) => {
	item.open = false
})

export default {
    components: {
        EnHeader,
        EnFooter
    },
    data(){
        return {
            navs,
            // minHeight: window.innerHeight - 180 
        }
    },
    computed: {
        ...mapGetters({
			device: 'device',
			menu: 'menu',
			isEnglish: 'isEnglish'
        }),
        minHeight(){
            const pageName = this.$route.name || ''
            return pageName === 'home' ? '' : window.innerHeight - 180 
        }
    },
    mounted(){
        console.log(this.$route)
    }
}
</script>

<style scoped>

</style>