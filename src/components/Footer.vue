<template>
	<div class="footer">
		<!-- <div class="pad-bottom-60 pad-top-60 none block-m">
			<div class="container">
				<div class="row">
					<div class="col-1-5" v-for="(nav, index) in navs" :key="index">
						<div class="friend text-center">
							<div class="friend-heading">
								<i :class="['iconfont', 'icon-'+nav.icon]"></i>
								<h5>{{nav.name}}</h5>
							</div>
							<div class="friend-body">
								<router-link :to="nav.path" v-for="(nav, index) in nav.children" :key="index" class="block pad-5">{{nav.name}}</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<div class="footer-content pad-top-40 pad-bottom-40 text-center">
			<div class="container">
				<p class="langs">
					<router-link class="first" :to="'/'">中文简体</router-link>
					<router-link :to="'/en'">English</router-link>
				</p>
				<p class="links">
					<router-link :to="nav.path" v-for="(nav, index) in navs[4].children" :key="index">{{nav.name}}</router-link>
				</p>
				<p class="copyright">
					Copyright 2012 北京朝阳公园开发经营公司 京ICP备05028481、京公网安备110105011673
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import {data as navs} from '@/data/nav'

export default {
	data() {
		return {
			navs: navs.filter(item => !item.noFooter)
		}
	}
}
</script>

<style lang="scss" scoped>
.footer {
	&-content {
		border-top: 2px solid #eee;
		background: #f9f9f9
	}
}

.friend {
	&-heading {
		color: #666;
		&>.iconfont {
			font-size: 60px;
			line-height: 60px;
			display: block;
			color: #999
		}
		&>h5 {
			padding: 20px 0 10px;
			color: #666
		}
	}
}

.langs {
	&>a {
		display: inline;
		padding: 0 10px;
		border-left: 1px solid #333;
		&.first {
			border-left: none
		}
	}
}

.links {
	&>a {
		display: inline;
		padding: 0 10px;
	}
}
</style>