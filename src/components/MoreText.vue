<template>
    <div class="more-text">
        <p v-html="substrText"></p>
        <p v-if="text.length>maxLength" :class="'text-'+btnAlign"><a href="javascript:;" @click="showAll = !showAll">{{showAll ? '收起' : '更多信息'}}</a></p>
    </div>
</template>

<script>
    export default {
        props: ['text', 'max-length', 'btn-align'],
        data(){
            return {
                showAll: false
            }
        },
        computed: {
            substrText(){
                const {text, showAll, maxLength} = this
                return showAll || text.length<maxLength ? text : text.substr(0, maxLength) + '...'
            }
        }
    }
</script>

<style scoped lang="scss">
a{
    color: #168c74
}
</style>