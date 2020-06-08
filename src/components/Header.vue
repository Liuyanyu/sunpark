<template>
	<div class="header">
		<div class="navbar">
			<div class="container clear relative">
				<router-link :to="isEnglish ? '/en/index' : '/'" class="navbar-brand left">
					<img :src="logoUrl" class="img-fluid" alt="朝阳公园">
				</router-link>
				<span class="navbar-burger right none-m" :class="{'active': showSecondaryNav}" @click="showSecondaryNav=!showSecondaryNav">
					<i></i>
					<i></i>
					<i></i>
				</span>
				
				<span class="right wechat-dropdown relative navbar-wechat-icon" >
					<img :src="typeImg" style="float:left;margin-top:-5px;margin-right:10px;">
					<div class="navbar-weather">
						<p style="margin:0;" v-text="isEnglish ? 'Chaoyang District：'+wendu+'℃' : '朝阳区：'+wendu+'℃'"></p>
					</div>
					<!-- <div class="navbar-weather">
						<p style="margin:0;" v-text="isEnglish ? 'People in the park：'+peopleNum+'' : '入园人数：'+peopleNum+''"></p>
					</div>		 -->
					<i class="iconfont icon-erweima" @click="toggleWechatMenu()" @mouseenter="toggleWechatMenu(false)" @mouseleave="toggleWechatMenu(true)"></i>
					<div class="wechat-menu text-center" :class="{'none': hideWechatMenu}">
						<img src="@assets/wechat.jpg" class="img-fluid" alt="">
						<p class="no-margin" v-text="isEnglish ? 'wechat' : '朝阳公园公众号'"></p>
					</div>
				</span>
				<div class="navbar-nav-m none-m" :class="{'none': !showSecondaryNav}">
					<ul _style="'height:'+ mDropdownHeight + 'px'" class="nav-transition" :class="{'open': showSecondaryNav}">
						<li v-for="(nav, i) in navs" @click="toggleChildNav(i)" :key="i" :class="{'open': nav.open}">
							<router-link :to="nav.path">{{nav.name}}</router-link @click="showSecondaryNav=false">
							<div class="navbar-nav-m-children" :class="{'none': !nav.open}" @click="showSecondaryNav=false">
								<router-link v-for="(nav, j) in nav.children" :key="j" :to="nav.path">{{nav.name}}</router-link>
							</div>
						</li>
					</ul>
				</div>
				<div class="right none block-m"  @mouseleave="toggleDropdown(false)">
					<ul class="navbar-nav">
						<li v-for="(nav, index) in navs" :key="index" @mouseenter="toggleDropdown(true, index)" @click="toggleDropdown(false)" :class="{'active': index === navIndex && showSecondaryNav}">
 							<router-link :to="nav.path">{{nav.name}}</router-link>
						</li>
					</ul>
					
					<div class="navbar-dropdown relative" :class="{'active': showSecondaryNav}">
						<div class="row clear">
							<div class="col-5">
								<div class="dropdown-left">
									<ul class="list-unstyled">
										<li class="first fs-4">
											<a href="">{{secondaryNav.name}}</a>
										</li>
										<li v-for="(nav, index) in secondaryNav.children" :key="index" @click="toggleDropdown(false)">
											<a target="_blank" v-if="/menpiao/.test(nav.path)" href="http://presell.sun-park.com/">{{nav.name}}</a>
											<a target="_blank" v-else-if="/nianyuepiao/.test(nav.path)" href="http://presell.sun-park.com/">{{nav.name}}</a>
											<router-link v-else :to="nav.path">{{nav.name}}</router-link>
										</li>
									</ul>
								</div>
							</div>
							<div class="col-7">
								<div class="dropdown-right">
									<h4 class="pad-bottom-30">{{secondaryNav.name}}</h4>
									<!-- <p>{{secondaryNav.desc}}</p> -->
								</div>
								<div class="dropdown-right-bg" v-lazy:background-image="secondaryNav.navImage"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="navbar-dropdown-mask" v-show="showSecondaryNav"></div>
	</div>
</template>

<script>
import api from '@/api'
import { mapGetters, mapActions } from 'vuex'

export default {
	props: ['navs'],
	data() {
		return {
			// navs,
			showSecondaryNav: false,
			navIndex: 0,
			hideWechatMenu: true,
			peopleNum: 0,
			wendu:'',
			typeImg:""
			// logoUrl: 
		}
	},
	computed: {
		secondaryNav() {
			return this.navs[this.navIndex]
		},
		mDropdownHeight() {
			return window.innerHeight - 60
		},
		...mapGetters({
			device: 'device',
			menu: 'menu',
			isEnglish: 'isEnglish'
		}),
		logoUrl(){
			return this.isEnglish ? require('../assets/en_logo.png') : require('../assets/logo.png')

		}
	},
	async mounted(){
		this.queryWeather()
	},
	methods: {
		toggleDropdown(show, index) {
			if(index > 0){
				this.showSecondaryNav = show
				this.navIndex = index || 0
			}else{
				this.showSecondaryNav = false
			}
		},
		toggleWechatMenu(hide) {
			this.hideWechatMenu = hide === undefined ? !this.hideWechatMenu : hide
		},
		toggleChildNav(i) {
			this.navs.forEach((nav, index) => {
				nav.open = i === index ? !nav.open : false
			})
		},
		queryWeather() {
 			api.getWeather().then(res => {
                const {code, msg, object} = res.data
                if(code!=0){
                    console.error(msg)
                    return
                }
				this.typeImg = 'http://weixin.sun-park.com/weather/'+object.weatherInfo.type+'.gif'
				this.peopleNum = object.peopleNum
				this.wendu = object.weatherInfo.wendu
				console.log('>>>>>>>>>'+object.peopleNum)
                //this.btns = object.webRaidersStallList
                
                //this.queryList(object.webRaidersStallList[0])
            })
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~@/sass/base/_mixins";

.navbar {
	// box-shadow: 0 2px 10px rgba(10, 10, 10, 0.1);
	// border-bottom: 1px solid #ccc;
	position: absolute;
	width: 100%;
	background: #fff;
	z-index: 1010;
	&::before {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: #ccc;
		content: ''
	}
	&-burger {
		cursor: pointer; // display: block;
		height: 62px;
		position: relative;
		width: 62px; // margin-left: auto;
		right: -10px;
		&.active {
			&>i:nth-child(1) {
				margin-left: -5px;
				transform: rotate(45deg);
				transform-origin: left top;
			}
			&>i:nth-child(2) {
				opacity: 0;
			}
			&>i:nth-child(3) {
				margin-left: -5px;
				transform: rotate(-45deg);
				transform-origin: left bottom;
			}
		}
		&>i {
			background-color: currentColor;
			display: block;
			height: 1px;
			left: 50%;
			margin-left: -10px;
			position: absolute;
			top: 50%;
			transition: none 86ms ease-out;
			transition-property: background, left, opacity, transform;
			width: 20px;
			&:nth-child(1) {
				margin-top: -8px;
			}
			&:nth-child(2) {
				margin-top: -1px;
			}
			&:nth-child(3) {
				margin-top: 6px;
			}
		}
	}
	&-brand {
		height: 62px;
		padding: 6px 20px 6px 0;
		width: 160px;
	}
	&-nav {
		margin: 0;
		list-style: none;
		padding-left: 0;
		overflow: hidden;

		@include breakpoint(m) {
			width: 350px
		}
		@include breakpoint(l) {
			width: 550px;
			margin-right: 40px;
		}

		&-m {
			position: absolute;
			left: 0;
			top: 61px;
			width: 100%;
			height: 100%;
			&>ul {
				list-style: none;
				background: #fff;
				padding: 0 20px 10px;
				margin: 0;
				&>li {
					border-bottom: 1px solid #eee;
					padding: 10px;
					position: relative;
					// height: 40px;
					&:after,
					&:before {
						content: '';
						display: block;
						position: absolute;
						top: 19px;
						right: 10px;
						width: 15px;
						height: 1px;
						background-color: #999;
						transform-origin: 50% 50%;
						transition: all 0.3s ease-out;
					}
					&:before {
						transform: rotate(-90deg); // opacity: 1;
						z-index: 2;
					}
					&.open {
						&::before {
							transform: rotate(0deg)
						}
						&::after {
							transform: rotate(180deg)
						}
					}
				}
			}
			&-children {
				padding-top: 10px;
				&>a {
					display: block;
					padding: 8px 15px;
					border-top: 1px solid #eee
				}
			}
		}

		&>li {
			float: left;
			position: relative;
			width: 16.666%;
			&.active {
				&::after {
					display: block;
				}
			}
			&::after {
				display: none;
				position: absolute;
				left: 50%;
				top: 100%;
				width: 16px;
				height: 16px;
				background: #fff;
				border: 1px solid #ccc;
				transform: rotate(45deg);
				content: '';
				margin-top: -9px;
				margin-left: -8px;
			}
			&>a {
				// padding: 20px;
				display: block;
				height: 62px;
				line-height: 62px;
				text-align: center;
				&.active {
					font-weight: 700;
					color: #168c74
				}
			}
		}
	}
	&-wechat {
		&-icon {
			cursor: pointer;
			position: relative;
			top: 20px;
			height: 54px;
			width: 80px;
			@include breakpoint(m) {
				width: 180px;
			}
			@include breakpoint(l) {
				width: 180px;
			}
			
			text-align: right;
			&>.iconfont {
				font-size: 18px
			}
		}
	}
	&-weather {
		float:left;
		text-align:center;
		margin-right:10px;
		display: none;
		@include breakpoint(m) {
			display: block;
		}
		@include breakpoint(l) {
			display: block;
		}
	}
	&-dropdown {
		// z-index: 1100;
		position: absolute; // border: 1px solid #ccc;
		left: 10px;
		top: 62px;
		right: 10px;
		height: 480px;
		display: none;
		background-color: #fff;
		&.active {
			display: block;
		}
		&-mask {
			position: fixed;
			z-index: 1000;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, .6)
		}
	}
}

.dropdown {
	&-left {
		padding: 50px 10px 10px 50%;
		box-shadow: 2px 0px 15px rgba(10, 10, 10, 0.1);
		height: 480px;
		li {
			padding: 8px 0;
			&.first {
				margin-top: -7px;
				padding-bottom: 20px;
				font-weight: 700
			}
		}
	}
	&-right {
		padding-top: 50px;
		height: 480px;
		&-bg {
			right: 9px;
			bottom: 0;
			position: absolute;
			// background-image: url(@assets/n1.png);
			// background-color: #333;
			background-repeat: no-repeat;
			background-size: cover;
			width: 100.1%;
			height: 360px
		}
	}
}

.wechat {
	&-menu {
		// display: none;
		position: absolute;
		width: 200px;
		background-color: #fff;
		top: 44px;
		right: 0;
		padding: 20px;
		// border: 1px solid #eee
		box-shadow: 0 0 2 0px #ccc
	}
}

.nav {
	&-transition {
		&>* {
			opacity: 0;
			display: block;
			border-bottom: 1px solid #333;
			transform: scale(1.1) translateY(-24px);
			transition: opacity 0.1s ease-out, transform 0.35s;
			transition-delay: 400ms;
			&:nth-child(2) {
				transition-delay: 200ms;
			}
			&:nth-child(3) {
				transition-delay: 200ms;
			}
			&:nth-child(4) {
				transition-delay: 150ms;
			}
			&:nth-child(5) {
				transition-delay: 100ms;
			}
			&:nth-child(6) {
				transition-delay: 100ms;
			}
			&:nth-child(7) {
				transition-delay: 50ms;
			}
			&:nth-child(8) {
				transition-delay: 50ms;
			}
			&:nth-child(9) {
				transition-delay: 50ms;
			}
		}
		&.open {
			&>* {
				opacity: 1;
				// pointer-events: auto;
				transform: none;
				// transition-delay: 200ms;
				&:nth-child(2) {
					transition-delay: 200ms;
				}
				&:nth-child(3) {
					transition-delay: 250ms;
				}
				&:nth-child(4) {
					transition-delay: 300ms;
				}
				&:nth-child(5) {
					transition-delay: 350ms;
				}
				&:nth-child(6) {
					transition-delay: 400ms;
				}
				&:nth-child(7) {
					transition-delay: 450ms;
				}
				&:nth-child(8) {
					transition-delay: 500ms;
				}
				&:nth-child(9) {
					transition-delay: 550ms;
				}
			}
		}
	}
}
</style>