<template>
    <div class="footer text-center">
        <div class="footer-nav-wrap">
            <div class="container">
                <div class="footer-nav">
                    <a href="/en/index" class="first">PARK INTRODUCTION</a>
                    <a href="/en/index">TALENT RECRUITMENT</a>
                    <a href="/en/index">TALENT RECRUITMENT</a>
                    <a href="/en/index">PARK INTRODUCTION</a>
                    <a href="/en/index">CONTACT US</a>
                </div>
            </div>
        </div>
                    <div class="langs pad-top-10 pad-bottom-10">
                <router-link class="first" :to="'/'">中文简体</router-link>
                <router-link :to="'/en'">English</router-link>
            </div>
        <div class="copyright pad-bottom-20">
            Copyright 2012 Beijing chaoyang park development and operation company Beijing ICP 05028481, jing gong network security 110105011673
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">

.footer{
    margin-top: 30px;
    &-nav{
        &-wrap{
            background: #b9b7b8;
            padding: 20px 0
        }
        &>a{
            display: inline-block;
            padding: 0 10px;
            line-height: 16px;
            height: 16px;
            color: #eee;
            border-left: 1px solid #eee;
            &.first{
                border-left: none
            }
        }
    }
}

.langs {
	&>a {
		display: inline;
        padding: 0 10px;
        margin-bottom: 10px;
		border-left: 1px solid #333;
		&.first {
			border-left: none
		}
	}
}
</style>