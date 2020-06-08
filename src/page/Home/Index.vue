<template>
	<div class="home-page">
		<slider class="slider" :arrows="true" :infinite="true" :autoplay="true" v-if="slideHeight && slides.length>0">
			<div class="slide" @click="openLink(item.link)" v-for="(item, index) in slides" _____style="'background-image:url('+item.url+');height:'+slideHeight+'px'">
				<img :src="item.url" alt="" :style="'max-height:' + slideHeight + 'px'">
			</div>
		</slider>
		<div class="summary-section">
			<div class="container">
				<div class="clear summary-list text-center">
					<div class="pad-top-10 pad-bottom-10 col-1-4">
						<router-link to="/booking/entrance#btns" class="icon block">
							<i class="block iconfont icon-icon_"></i>
							<span class="block">在线预订</span>
						</router-link>
					</div>
					<div class="pad-top-10 pad-bottom-10 col-1-4">
						<router-link to="/service/notice" class="icon block">
							<i class="block iconfont icon-icon_1"></i>
							<span class="block">入园须知</span>
						</router-link>
					</div>
					<div class="pad-top-10 pad-bottom-10 col-1-4">
						<router-link to="/service/location" class="icon block">
							<i class="block iconfont icon-icon_3"></i>
							<span class="block">公园交通</span>
						</router-link>
					</div>
					<div class="pad-top-10 pad-bottom-10 col-1-4">
						<router-link to="/ours/contact" class="icon block">
							<i class="block iconfont icon-icon_2"></i>
							<span class="block">联系我们</span>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="feature-scetion pad-top-60-m">
			<div class="container">
				<div class="row pad-top-30 pad-bottom-30">
					<div class="col-12 col-1-2-l" v-for="(item, index) in masterProject">
						<a class="feature" target="blank" :href="item.listLink">
							<div class="feature-image img-transition image is-16by9">
								<img v-lazy="item.listImg" class="img-fluid" :alt="item.listName">
							</div>
							<h2 class="feature-title pad-top-5 pad-bottom-5-m text-overflow line-1">{{item.listName}}</h2>
							
							<a>
								<i class="iconfont icon-icon"></i>了解更多</a>
							</a>
					</div>
				</div>
				<div class="row pad-bottom-30">
					<div class="col-1-2 col-1-4-m" v-for="(item, index) in secondary1Project">
						<a class="feature" target="blank" :href="item.listLink">
							<div class="feature-image img-transition image is-16by9">
								<img v-lazy="item.listImg" class="img-fluid" :alt="item.listName">
							</div>
							<h3 class="feature-title pad-top-5 pad-bottom-5-m text-overflow line-1">{{item.listName}}</h3>
							<a href="">
								<i class="iconfont icon-icon"></i>了解更多</a>
						</a>
					</div>
				</div>
				<div class="row pad-bottom-30">
					<div class="col-1-2 col-1-4-m" v-for="(item, index) in secondary2Project">
						<a class="feature" target="blank" :href="item.listLink">
							<div class="feature-image img-transition image is-16by9">
								<img v-lazy="item.listImg" class="img-fluid" :alt="item.listName">
							</div>
							<h3 class="feature-title pad-top-5 pad-bottom-5-m text-overflow line-1">{{item.listName}}</h3>
							<a href="">
								<i class="iconfont icon-icon"></i>了解更多</a>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/api'
import Agile from '@/components/Agile'
import { mapActions, mapGetters } from 'vuex'
import {prefixUrl, openLink} from '@/utils/filters'

export default {
	name: 'index',
	data() {
		return {
			slides: [],
			projects: []
		}
	},
	components: {
		Slider: Agile
	},
	computed: {
		...mapGetters({
			device: 'device',
		}),
		slideHeight(){
			return this.device.isMobile ? window.innerWidth - 100 : this.device.height - 62
		},
		masterProject(){
			return this.projects.slice(0,2)
		},
		secondary1Project(){
			return this.projects.slice(2, 6)
		},
		secondary2Project(){
			return this.projects.slice(6, 10)
		}
	},
	async mounted(){
		this.queryBanner()
		this.queryHomeList()
	},
	methods: {
		queryBanner(){
			api.queryBanner(1).then(res => {
				const {code, msg, object} = res.data
				if(code!=0){
					console.error(msg)
					return
				}

				console.log(object)
				this.slides = object.webHomeBannerList.map(item => ({
					url: prefixUrl(item.bannerImg),
					link: item.bannerLink
				}))
			})
		},
		queryHomeList(){
			api.queryHomeList().then(res => {
				const {code, msg, object} = res.data
				if(code!=0){
					console.error(msg)
					return
				}

				this.projects = object.webHomeList.map(item => {
					item.listImg = prefixUrl(item.listImg)
					return item
				})
				console.log(object)
			})
		},
		openLink
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/sass/base/_mixins";

.slider {
	// margin-top: -62px;
	&-placeholder{
		background-color: #eee;
	}
}

.slide {
	&>img{
		width: 100%
	}
	background: {
		position: 50%; // size: auto 100%;
		size: cover
	}
}

.summary {
	&-section {
		box-shadow: 0 2px 10px rgba(10, 10, 10, 0.1)
	}
	&-list {
		padding: 10px 0;
		@include breakpoint(m){
			padding: 20px 0
		}
		.icon {
			margin-top: 6px;
			font-size: 16px;
			height: 130px;

			@include m(){
				height: 65px;
				font-size: 12px;
			}
			&>span{
				padding-top: 5px;
				@include breakpoint(m){
					padding-top: 20px;
				}
			}
		}
		.iconfont {
			// transition 0.2s color 0.2s;
			background-color: #1ba68a;
			border-color: #1ba68a;
			color: #fff;
			font-size: 46px;
			height: 80px;
			width: 80px;
			border-radius: 50%; // background: #eee;
			// text-align: 
			display: inline-block;
			line-height: 80px;
			position: relative;

			@include m(){
				line-height: 40px;
				font-size: 22px;
				height: 40px;
				width: 40px;
			}

			&:hover {
				background-color: #168c74;
				&:after {
					transform: scale(1);
					opacity: 1;
					box-shadow: 0 0 0 2px #168c74
				}
			}
			&:after {
				top: -4px;
				left: -4px;
				padding: 4px;
				transition: transform 0.2s, opacity 0.2s;
				transform: scale(0.8);
				opacity: 0;
				pointer-events: none;
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				content: '';
				box-sizing: content-box;
				box-shadow: 0 0 0 2px #1ba68a
			}
		}
	}
}

.feature {
	// padding: 15px;
	display: block;
	margin-bottom: 20px;
	&-title {
		// font-size: 30px;
		font-weight: 400;
		@include m(){
			font-size: 16px
		}
	}
	img {
		width: 100%
	}
}

@include breakpoint(m) {
	.feature {
		padding: 10px;
		border: 1px solid #eee;
	}
	.project{
		box-shadow: none
	}
}

</style>
